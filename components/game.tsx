import * as React from 'react'

import { type Actions, type Player } from './state'

import { PlayerScore } from './player/player-score'

export const Game = ({
  players,
  winnerFirst,
  voiceOverEnabled,
  dispatch,
}: {
  players: Player[]
  voiceOverEnabled: boolean
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
  const [editedPlayer, setEditedPlayer] = React.useState<string>(null)
  return (
    <div>
      {sortedPlayer.map((player) => (
        <PlayerScore
          key={player.id}
          player={player}
          voiceOverEnabled={voiceOverEnabled}
          dispatch={dispatch}
          isDimmed={editedPlayer && editedPlayer !== player.id}
          onActiveStateChange={(isActive) => {
            setEditedPlayer(isActive ? player.id : null)
          }}
        />
      ))}
    </div>
  )
}
