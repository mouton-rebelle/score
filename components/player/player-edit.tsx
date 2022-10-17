import * as React from 'react'

import { Player } from '../definitions'
import { PlayerContainer } from './player.styled'
import { ColorPicker } from '../color/color-picker'
type PlayerEditProps = { player: Player; save: (p: Player) => void }

export const PlayerEdit = ({ player, save }: PlayerEditProps) => {
  return (
    <PlayerContainer $color={player.color}>
      <input
        value={player.name}
        onChange={(evt) => save({ ...player, name: evt.target.value })}
      />
      <ColorPicker
        color={player.color}
        onChange={(color) => save({ ...player, color })}
      />
    </PlayerContainer>
  )
}
