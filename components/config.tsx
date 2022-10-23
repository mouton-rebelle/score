import * as React from 'react'

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user-plus"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="21 8 21 21 3 21 3 8"></polyline>
              <rect x="1" y="3" width="22" height="5"></rect>
              <line x1="10" y1="12" x2="14" y2="12"></line>
            </svg>
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
            onClick={() => dispatch({ type: 'restorePlayer', payload: player })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="16 12 12 8 8 12"></polyline>
              <line x1="12" y1="16" x2="12" y2="8"></line>
            </svg>
          </button>
        </PlayerEdit>
      ))}
    </div>
  )
}
