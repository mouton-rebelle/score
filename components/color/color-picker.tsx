import * as React from 'react'
import { ColorPalette, Color } from './color.styled'
import * as colors from '../styled/colors'

export const ColorPicker = ({
  color,
  onChange,
}: {
  color: colors.availableColors
  onChange: (color: colors.availableColors) => void
}) => {
  return (
    <ColorPalette>
      {Object.keys(colors.colors).map((c: colors.availableColors) => (
        <Color
          key={c}
          $color={colors.colors[c]}
          onClick={() => onChange(c)}
          $isActive={c === color}
        />
      ))}
    </ColorPalette>
  )
}
