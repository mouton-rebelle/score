import * as React from 'react'

import { type Actions, type Player, buildNewPlayer } from './state'

import { PlayerEdit } from './player/player-edit'

export const Config = ({
  players,
  dispatch,
}: {
  players: Player[]
  dispatch: React.Dispatch<Actions>
}) => {
  const [newPlayer, setNewPlayer] = React.useState<Player>(buildNewPlayer())
  return (
    <div>
      {players.map((player) => (
        <PlayerEdit
          key={player.id}
          player={player}
          update={({ id, name, color }) =>
            dispatch({ type: 'editPlayer', payload: { id, name, color } })
          }
        />
      ))}
      <PlayerEdit player={newPlayer} update={setNewPlayer} />
      <button
        onClick={() => {
          dispatch({
            type: 'addPlayer',
            payload: {
              name: newPlayer.name,
              color: newPlayer.color,
            },
          })
          setNewPlayer(buildNewPlayer())
        }}
      >
        save
      </button>
    </div>
  )
}
