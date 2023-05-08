import * as React from 'react'
import * as Icons from '../components/icons'
import { type Actions, type Player, buildNewPlayer } from './state'

import { PlayerEdit } from './player/player-edit'

export const Config = ({
  players,
  archivedPlayers,
  dispatch,
}: {
  players: Player[]
  archivedPlayers: Player[]
  dispatch: React.Dispatch<Actions>
}) => {
  const [newPlayer, setNewPlayer] = React.useState<Player>(buildNewPlayer())
  const [confirm, setConfirm] = React.useState('none')
  return (
    <div>
      <PlayerEdit player={newPlayer} update={setNewPlayer}>
        <button
          onClick={() => {
            if (newPlayer.name !== '') {
              dispatch({
                type: 'addPlayer',
                payload: {
                  name: newPlayer.name,
                  color: newPlayer.color,
                },
              })
              setNewPlayer(buildNewPlayer())
            }
          }}
        >
          <Icons.Add />
        </button>
      </PlayerEdit>
      {players.map((player) => (
        <PlayerEdit
          key={player.id}
          player={player}
          update={({ id, name, color }) =>
            dispatch({ type: 'editPlayer', payload: { id, name, color } })
          }
        >
          <button
            onClick={() => dispatch({ type: 'archivePlayer', payload: player })}
          >
            <Icons.Archive />
          </button>
        </PlayerEdit>
      ))}
      {archivedPlayers.map((player) => (
        <PlayerEdit
          key={player.id}
          player={player}
          isArchived
          update={({ id, name, color }) =>
            dispatch({ type: 'editPlayer', payload: { id, name, color } })
          }
        >
          <button
            style={
              confirm === player.id
                ? { background: 'crimson', fill: 'white' }
                : {}
            }
            onClick={() => {
              if (confirm === player.id) {
                dispatch({ type: 'removePlayer', payload: player })
              } else {
                setConfirm(player.id)
              }
            }}
          >
            <Icons.Close />
          </button>
          <button
            onClick={() => dispatch({ type: 'restorePlayer', payload: player })}
          >
            <Icons.Restore />
          </button>
        </PlayerEdit>
      ))}
    </div>
  )
}
