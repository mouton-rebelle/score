import * as React from 'react'
import { NoSleep } from '../libs/nosleep'
import { Config } from '../components/config'
import { Game } from '../components/game'
import { NavContainer, Button, Form } from '../components/nav/nav.styles'
import * as Icons from '../components/icons'
import { History } from '../components/history'
import { initialState, scoreReducer } from '../components/state'

export default function App() {
  const [configActive, setConfigActive] = React.useState(false)
  const [state, dispatch] = React.useReducer(scoreReducer, initialState)
  const [sort, setSort] = React.useState<'none' | 'dsc' | 'asc'>('none')
  const [voiceOver, setVoiceOver] = React.useState(false)
  const [locked, setLocked] = React.useState(false)
  const [resetting, setResetting] = React.useState(false)
  const [scoreReset, setScoreReset] = React.useState('0')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const noSleepRef = React.useRef<NoSleep>()
  React.useEffect(() => {
    noSleepRef.current = new NoSleep()
  }, [])
  React.useEffect(() => {
    if (typeof window !== undefined) {
      if (configActive) window.document.body.classList.remove('scrollLock')
      else window.document.body.classList.add('scrollLock')
    }
  }, [configActive])
  return (
    <>
      {/* NAV */}
      <NavContainer>
        <Button
          $isActive
          onClick={() => {
            setVoiceOver(!voiceOver)
            noSleepRef.current?.enable?.()
            if (!voiceOver) {
              const utterance = new SpeechSynthesisUtterance('hello')
              speechSynthesis.speak(utterance)
            }
          }}
        >
          {voiceOver ? <Icons.VoiceOff /> : <Icons.VoiceOn />}
        </Button>
        <Button
          $isActive
          onClick={() => {
            if (locked) {
              setLocked(false)
              noSleepRef.current?.disable?.()
            } else {
              setLocked(true)
              noSleepRef.current?.enable?.()
            }
          }}
        >
          {locked ? <Icons.Unlocked /> : <Icons.Locked />}
        </Button>
        {resetting ? (
          <Form
            $isActive
            onClick={() => inputRef.current?.focus()}
            onSubmit={(evt) => {
              evt.preventDefault()
              const score = parseInt(scoreReset)
              if (!isNaN(score)) {
                dispatch({ type: 'resetScore', payload: { score } })
                setScoreReset('0')
                inputRef?.current?.blur()
              }
            }}
          >
            <input
              ref={inputRef}
              type="number"
              autoFocus
              onBlur={() => setResetting(false)}
              value={scoreReset}
              onChange={(evt) => setScoreReset(evt.target.value)}
            />
          </Form>
        ) : (
          <Button
            $isActive
            onClick={() => {
              setResetting(true)
            }}
          >
            <Icons.Reset />
          </Button>
        )}
        <Button
          $isActive
          onClick={() =>
            setSort((v) =>
              v === 'none' ? 'dsc' : v === 'dsc' ? 'asc' : 'none'
            )
          }
        >
          {sort === 'dsc' ? (
            <Icons.SortDesc />
          ) : sort === 'asc' ? (
            <Icons.SortAsc />
          ) : (
            <Icons.Sort />
          )}
        </Button>

        <Button $isActive onClick={() => setConfigActive((a) => !a)}>
          {configActive ? <Icons.Close /> : <Icons.Settings />}
        </Button>
      </NavContainer>
      {/* APP */}
      {configActive ? (
        <Config
          players={state.players}
          dispatch={dispatch}
          archivedPlayers={state.archivedPlayers}
        />
      ) : (
        <>
          <Game
            voiceOverEnabled={voiceOver}
            players={state.players}
            dispatch={dispatch}
            sort={sort}
          />
          <History players={state.players} />
        </>
      )}
    </>
  )
}
