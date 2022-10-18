import * as React from 'react'

import { Player } from '../state'
import { PlayerContainer, PlayerGrid } from './player.styled'

export const PlayerDisplay = ({ player }: { player: Player }) => {
  return (
    <PlayerContainer $color={player.color}>
      <PlayerGrid $color={player.color} $template="1fr auto">
        <div>{player.name}</div>
        <div>{player.score}</div>
      </PlayerGrid>
    </PlayerContainer>
  )
}
