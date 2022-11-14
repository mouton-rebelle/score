import * as React from 'react'

import { Config } from '../components/config'
import { Game } from '../components/game'
import { NavContainer, Button, Form } from '../components/nav/nav.styles'
import * as Icons from '../components/icons'
import { History } from '../components/history'
import { initialState, scoreReducer } from '../components/state'

export default function App() {
  const [configActive, setConfigActive] = React.useState(false)
  const [state, dispatch] = React.useReducer(scoreReducer, initialState)
  const [winnerFirst, setWinnerFirst] = React.useState(false)
  const [voiceOver, setVoiceOver] = React.useState(false)
  const [scoreReset, setScoreReset] = React.useState('0')
  const inputRef = React.useRef<HTMLInputElement>(null)

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
          $isActive={voiceOver}
          onClick={() => {
            setVoiceOver(!voiceOver)
            if (!voiceOver) {
              const utterance = new SpeechSynthesisUtterance('hello')
              speechSynthesis.speak(utterance)
            }
          }}
        >
          <Icons.Voice />
        </Button>
        <Form
          $isActive={!configActive}
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
            value={scoreReset}
            onChange={(evt) => setScoreReset(evt.target.value)}
          />
        </Form>

        <Button
          $isActive={winnerFirst}
          disabled={configActive}
          onClick={() => setWinnerFirst((v) => !v)}
        >
          <Icons.Sort />
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
            winnerFirst={winnerFirst}
          />
          <History players={state.players} />
        </>
      )}
    </>
  )
}
