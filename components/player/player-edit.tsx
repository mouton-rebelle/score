import * as React from 'react'

import { Player } from '../state'
import { PlayerContainer } from './player.styled'
import { ColorPicker } from '../color/color-picker'
type PlayerEditProps = {
  player: Player
  update: (p: Player) => void
  remove?: (p: Player) => void
}

export const PlayerEdit = ({ player, update }: PlayerEditProps) => {
  return (
    <PlayerContainer $color={player.color}>
      <input
        value={player.name}
        placeholder="player name"
        onChange={(evt) => update({ ...player, name: evt.target.value })}
      />
      <ColorPicker
        color={player.color}
        onChange={(color) => update({ ...player, color })}
      />
    </PlayerContainer>
  )
}
