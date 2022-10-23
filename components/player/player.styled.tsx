import styled, { css } from 'styled-components'
// import { color, hsl } from 'd3-color'
import {
  buildScheme,
  gradientPurpleCyan,
  background,
  white,
  type availableColors,
} from '../styled/colors'
import { animated } from '@react-spring/web'

type PlayerContainerProps = {
  readonly $color: availableColors
  readonly $isArchived?: boolean
  readonly $isVarianceShown?: boolean
  readonly $isScorePage?: boolean
}
type PlayerGridProps = {
  readonly $color: availableColors
  readonly $template: string
}

export const Variance = styled.div`
  font-weight: 800;
  padding-left: 0.3em;
  font-size: 1.4em;
  font-size: 2em;
  padding: 0 10px;
  transition: all 0.3s ease-in-out;
`
export const Score = styled.div`
  font-weight: 800;
  padding-left: 0.3em;
  font-size: 2em;
  padding: 0 10px;
  text-align: right;
  transition: all 0.3s ease-in-out;
`
export const Name = styled.div`
  font-weight: 800;
  font-size: 1.4em;
  padding: 10px;
  text-transform: uppercase;
`

export const PlayerContainer = styled(animated.div)<PlayerContainerProps>`
  ${(p) => buildScheme(p.$color, p.$isScorePage ? 'fill' : 'outline')}
  touch-action: pan-y;
  opacity: ${(props) => (props.$isArchived ? 0.3 : 1)};
  border-radius: 10px;
  margin: 1em;
  user-select: none;
  display: flex;
  input {
    flex-grow: 1;
    &:focus,
    &:hover {
      outline: none;
    }
    padding: 0.2em 0.6em;
    font-size: 1.2em;
    font-weight: 500;
    background: transparent;
    border: none;
    border-radius: 8px 0 0 8px;
  }
  button {
    border-radius: 0 8px 8px 0;
    padding: 0.3em;
  }
  ${(p) =>
    p.$isVarianceShown
      ? css`
          ${Score} {
            border-radius: 8px 0 0 8px;
            background: rgba(255, 255, 255, 0.2);
          }
          ${Variance} {
            background: rgba(255, 255, 255, 0.2);
            margin-left: 2px;
          }
        `
      : css`
          ${Score} {
            border-radius: 8px;
          }
          ${Variance} {
            padding: 0.3em 0;
            margin-left: 0;
            overflow: hidden;
          }
        `}
  button {
    padding: 1em;
    border: 0;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
  }
`

export const PlayerGrid = styled.div<PlayerGridProps>`
  display: grid;
  grid-template-columns: ${(p) => p.$template};
  flex-grow: 1;
`
export const HistoryPane = styled(animated.div)`
  background: ${gradientPurpleCyan};
  padding: 1em;
  position: absolute;
  touch-action: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  user-select: none;
  border-radius: 22px;
  top: 82vh;
  left: 0;
  right: 0;
  height: 100vh;
  box-shadow: 1px -10px 10px 1px rgba(0, 0, 0, 0.2);
`
export const HistoryPaneContent = styled.div`
  background: ${background};
  display: grid;
  grid-gap: 10px;
  border-radius: 20px;
  padding: 8px 24px;
`
export const HistoryVarianceLine = styled.div<{
  readonly $color: availableColors
}>`
  ${(p) => buildScheme(p.$color, 'text')}
  display: grid;
  grid-template-columns: 1fr auto 40px;
  .date {
    color: ${white};
  }
  .variance {
    text-align: right;
  }
`
