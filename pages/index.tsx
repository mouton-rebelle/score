import * as React from 'react'
import { Config } from '../components/config'
import { Game } from '../components/game'
import { Nav, type Page } from '../components/nav/nav'
import { History } from '../components/history'
import { initialState, scoreReducer } from '../components/state'
export default function App() {
  const [configActive, setConfigActive] = React.useState(false)
  const [state, dispatch] = React.useReducer(scoreReducer, initialState)

  const goto = React.useCallback((page: Page) => {
    setConfigActive(page === 'settings')
    const initVoice = new SpeechSynthesisUtterance('o')
    initVoice.volume = 1
    speechSynthesis.speak(initVoice)
  }, [])

  React.useEffect(() => {
    if (typeof window !== undefined) {
      if (configActive) window.document.body.classList.remove('scrollLock')
      else window.document.body.classList.add('scrollLock')
    }
  }, [configActive])
  return (
    <>
      <Nav active={configActive ? 'settings' : 'score'} goto={goto} />
      {configActive ? (
        <Config
          players={state.players}
          dispatch={dispatch}
          archivedPlayers={state.archivedPlayers}
        />
      ) : (
        <>
          <Game players={state.players} dispatch={dispatch} />
          <History players={state.players} />
        </>
      )}
    </>
  )
}
