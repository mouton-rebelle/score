import styled from 'styled-components'
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
  readonly $isDimmed?: boolean
  readonly $isScorePage?: boolean
}
type PlayerGridProps = {
  readonly $color: availableColors
  readonly $template: string
}

export const Variance = styled(animated.div)`
  top: -55px;
  width: auto;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 2;
  right: 60px;
  position: absolute;
  white-space: nowrap;
  pointer-events: none;
  font-size: 1.8em;
  text-align: right;
  opacity: 0;
  border-radius: 10px;
  font-weight: 800;
  span {
    opacity: 0.6;
  }
  padding: 0 10px;
`
export const Score = styled.div`
  font-weight: 800;
  font-size: 2em;
  padding: 0 10px;
  touch-action: manipulation;
  text-align: right;
`
export const Name = styled.div`
  font-weight: 800;
  font-size: 1.4em;
  padding: 0 10px;
  touch-action: manipulation;
  text-transform: uppercase;
`

export const PlayerContainer = styled(animated.div)<PlayerContainerProps>`
  ${(p) => buildScheme(p.$color, p.$isScorePage ? 'fill' : 'outline')}
  transition: all 0.2s ease-in-out;

  opacity: ${(props) => (props.$isArchived ? 0.6 : props.$isDimmed ? 0.4 : 1)};

  touch-action: manipulation;
  -moz-user-select: none;
  -webkit-user-drag: none;
  user-select: none;

  border-radius: 10px;
  margin: 1em;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  input {
    touch-action: manipulation;
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

  ${Variance} {
    ${(p) => buildScheme(p.$color, 'outline')}
  }

  button {
    &:last-child {
      border-radius: 0 8px 8px 0;
    }
    svg {
      width: 30px;
      height: 30px;
    }
    padding: 0.3em;
    touch-action: manipulation;
    padding: 1em;
    border: 0;
    user-select: none;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
  }
`
export const PlayerButton = styled.button`
  background: rgba(0, 0, 0, 0);
  position: absolute;
  width: 50%;
  top: 0;
  bottom: 0;
  user-select: none;
  touch-action: manipulation;
  border-radius: 0 !important;
`
export const PlayerGrid = styled.div<PlayerGridProps>`
  display: grid;
  grid-template-columns: ${(p) => p.$template};
  flex-grow: 1;
  user-select: none;
  touch-action: manipulation;
  align-items: center;
`
export const HistoryPane = styled(animated.div)`
  background: ${gradientPurpleCyan};
  padding: 1em;
  position: absolute;
  touch-action: manipulation;
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
