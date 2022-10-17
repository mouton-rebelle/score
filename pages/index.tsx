import { useState, useCallback } from 'react'
import { useLocalStorage } from '../helpers/use-localstorage'
import { Player } from '../components/player'
import { PlayerDisplay } from '../components/player/player-display'
import { PlayerEdit } from '../components/player/player-edit'
import * as api from '../helpers/api'

export default function App() {
  const [configActive, setConfigActive] = useState(false)
  const [players, setPlayers] = useLocalStorage<Player[]>('players', [])
  const [newPlayer, setNewPlayer] = useState<Player>(api.createPlayer())

  const changePlayerScore = useCallback(
    (playerKey: number, variance: number) => {
      setPlayers(
        players.map((player, key) =>
          key === playerKey
            ? { ...player, score: player.score + variance }
            : player
        )
      )
    },
    [players, setPlayers]
  )
  const removePlayer = useCallback(
    (playerKey) => {
      setPlayers(api.removePlayerAt(players, playerKey))
    },
    [players, setPlayers]
  )

  return (
    <>
      {configActive ? (
        <div>
          le derrière
          <button onClick={() => setConfigActive(false)}>jouer</button>
          <div>
            {players.map((p, i) => (
              <div key={i}>
                <PlayerEdit
                  player={p}
                  save={(updatedPlayer) =>
                    setPlayers(api.updatePlayerAt(players, i, updatedPlayer))
                  }
                />
                <button onClick={() => removePlayer(i)}>poubelle</button>
              </div>
            ))}
          </div>
          <form
            onSubmit={(evt) => {
              evt.preventDefault()
              setPlayers(api.addPlayer(players, { ...newPlayer }))
              setNewPlayer(api.createPlayer())
            }}
          >
            <PlayerEdit player={newPlayer} save={setNewPlayer} />
            <button>ajouter</button>
          </form>
        </div>
      ) : (
        <div>
          le devant
          <div>
            {players.map((p, i) => (
              <PlayerDisplay key={i} player={p} />
            ))}
          </div>
          <button onClick={() => setConfigActive(true)}>configurer</button>
        </div>
      )}
    </>
  )
}
