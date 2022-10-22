import * as React from 'react'

import { type Actions, type Player } from './state'

import { PlayerScore } from './player/player-score'

export const Game = ({
  players,
  dispatch,
}: {
  players: Player[]
  dispatch: React.Dispatch<Actions>
}) => {
  return (
    <div>
      {players.map((player) => (
        <PlayerScore key={player.id} player={player} dispatch={dispatch} />
      ))}
    </div>
  )
}
