// dracula UI color scheme

import { css } from 'styled-components'

export const background = '#282a36'

export const white = '#f8f8f2'

export const cyan = '#92ffff'
export const green = '#8aff80'
export const orange = '#ffca80'
export const pink = '#ff80bf'
export const purple = '#9580ff'
export const red = '#ff957f'
export const yellow = '#ffff80'
export type availableColors =
  | 'cyan'
  | 'green'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
export const gradientPurpleCyan = `linear-gradient(135deg, ${purple} 0%, ${cyan} 100%)`
export const gradientYellowPink = `linear-gradient(135deg, ${yellow} 0%, ${pink} 100%)`
export const gradientCyanGreen = `linear-gradient(135deg, ${cyan} 0%, ${green} 100%)`
export const gradientPinkPurple = `linear-gradient(135deg, ${pink} 0%, ${purple} 100%)`

export const gradients = [
  gradientPurpleCyan,
  gradientYellowPink,
  gradientCyanGreen,
  gradientPinkPurple,
]

export const colors = {
  cyan,
  green,
  orange,
  pink,
  purple,
  red,
}

export const buildScheme = (
  color: availableColors,
  mode: 'outline' | 'fill' | 'text'
) => {
  return mode === 'outline'
    ? css`
        background: ${background};
        border: 2px solid ${colors[color]};
        color: ${colors[color]};
        input {
          color: ${colors[color]};
        }
        button {
          background: ${colors[color]};
        }
      `
    : mode === 'fill'
    ? css`
        background: ${colors[color]};
        color: ${background};
      `
    : css`
        color: ${colors[color]};
      `
}
