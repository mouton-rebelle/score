import * as React from 'react'
import { ColorPalette, Color } from './color.styled'
import { colors } from './colors'

export const ColorPicker = ({
  color,
  onChange,
}: {
  color: string
  onChange: (color: string) => void
}) => {
  return (
    <ColorPalette>
      {colors.map((c) => (
        <Color
          key={c}
          $color={c}
          onClick={() => onChange(c)}
          $isActive={c === color}
        />
      ))}
    </ColorPalette>
  )
}
