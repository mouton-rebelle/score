import styled, { css } from 'styled-components'
import { color, hsl } from 'd3-color'
import { animated } from '@react-spring/web'
type PlayerContainerProps = {
  readonly $color: string
  readonly $isArchived?: boolean
  readonly $isVarianceShown?: boolean
}
type PlayerGridProps = {
  readonly $color: string
  readonly $template: string
}

const rotateColor = (color: string, degrees: number) => {
  const c = hsl(color)
  c.h += degrees
  c.l = c.l > 0.4 ? 0.15 : 0.85
  c.s -= 0.2
  return c
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
  touch-action: pan-y;
  position: relative;
  padding: 0;
  opacity: ${(props) => (props.$isArchived ? 0.3 : 1)};
  background: linear-gradient(
    to right,
    ${(p) => p.$color},
    ${(p) => color(p.$color).darker(0.3).toString()}
  );
  border: 3px solid ${(p) => color(p.$color).darker(0.6).toString()};
  margin: 10px;
  color: ${(p) => rotateColor(p.$color, 180).toString()};
  border-radius: 10px;
  display: flex;
  input {
    text-transform: uppercase;
    flex-grow: 1;
    &:focus,
    &:hover {
      outline: none;
      background: ${(p) => color(p.$color).brighter(1.6).toString()};
      box-shadow: inset 0 0 0px 3px
        ${(p) => rotateColor(p.$color, 180).brighter(0.9).toString()};
    }
    padding: 0.2em 0.6em;
    font-size: 1.2em;
    font-weight: 500;
    background: ${(p) => color(p.$color).brighter(0.6).toString()};
    background: transparent;
    border: none;
    box-shadow: inset 0 0 0 1px
      ${(p) => rotateColor(p.$color, 180).brighter(0.9).toString()};
    border-radius: 8px 0 0 8px;
    color: ${(p) => rotateColor(p.$color, 180).toString()};
    &::placeholder {
      color: ${(p) => color(p.$color).darker(0.6).toString()};
    }
  }
  button {
    background: ${(p) => rotateColor(p.$color, 180).brighter(0.9).toString()};
    color: ${(p) => color(p.$color).brighter(0.6).toString()};
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
    flex-basis: 120px;
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
