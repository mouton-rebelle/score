import * as React from 'react'
import { Config } from '../components/config'
import { Game } from '../components/game'
import { initialState, scoreReducer } from '../components/state'

export default function App() {
  const [configActive, setConfigActive] = React.useState(false)
  const [state, dispatch] = React.useReducer(scoreReducer, initialState)
  return (
    <>
      <button
        onClick={() => {
          setConfigActive((c) => !c)
          const utterance = new SpeechSynthesisUtterance(`salut`)
          speechSynthesis.speak(utterance)
        }}
      >
        configurer
      </button>
      {configActive ? (
        <div>
          <Config
            players={state.players}
            dispatch={dispatch}
            archivedPlayers={state.archivedPlayers}
          />
        </div>
      ) : (
        <Game players={state.players} dispatch={dispatch} />
      )}
    </>
  )
}
