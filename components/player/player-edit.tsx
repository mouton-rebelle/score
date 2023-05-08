import * as React from 'react'

import { Player } from '../state'
import { PlayerContainer } from './player.styled'
import { ColorPicker } from '../color/color-picker'

type PlayerEditProps = {
  player: Player
  update: (p: Player) => void
  remove?: (p: Player) => void
  isArchived?: boolean
  children: React.ReactNode
}

export const PlayerEdit = ({
  player,
  update,
  children,
  isArchived,
}: PlayerEditProps) => {
  return (
    <>
      <PlayerContainer $color={player.color} $isArchived={Boolean(isArchived)}>
        <input
          value={player.name}
          disabled={isArchived}
          placeholder="player name"
          onChange={(evt) => update({ ...player, name: evt.target.value })}
        />
        {children}
      </PlayerContainer>
      {isArchived ? null : (
        <ColorPicker
          color={player.color}
          onChange={(color) => update({ ...player, color })}
        />
      )}
    </>
  )
}
