import * as React from 'react'
import { Config } from '../components/config'
import { initialState, scoreReducer } from '../components/state'

export default function App() {
  const [configActive, setConfigActive] = React.useState(false)
  const [state, dispatch] = React.useReducer(scoreReducer, initialState)
  return (
    <>
      <button onClick={() => setConfigActive((c) => !c)}>configurer</button>
      {configActive ? (
        <div>
          <Config players={state.players} dispatch={dispatch} />
        </div>
      ) : (
        <div>le devant</div>
      )}
    </>
  )
}
