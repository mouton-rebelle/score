import * as React from 'react'

import { type Actions, type Player } from './state'

import { PlayerScore } from './player/player-score'

export const Game = ({
  players,
  winnerFirst,
  dispatch,
}: {
  players: Player[]
  winnerFirst: boolean
  dispatch: React.Dispatch<Actions>
}) => {
  const sortedPlayer = React.useMemo(
    () =>
      winnerFirst
        ? [...players].sort((a, b) => (a.score > b.score ? -1 : 1))
        : players,
    [players, winnerFirst]
  )
  return (
    <div>
      {sortedPlayer.map((player) => (
        <PlayerScore key={player.id} player={player} dispatch={dispatch} />
      ))}
    </div>
  )
}
