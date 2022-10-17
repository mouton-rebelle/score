import styled from 'styled-components'

interface PlayerContainerProps {
  readonly $color: string
}
interface PlayerGridProps {
  readonly $color: string
  readonly $template: string
}

export const PlayerContainer = styled.div<PlayerContainerProps>`
  background: ${(p) => p.$color};
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  input {
    padding: 0.2em;
    font-size: 1.2em;
    background: transparent;
    border: none;
    color: #fff;
    border-bottom: 1px solid #fff;
  }
`

export const PlayerGrid = styled.div<PlayerGridProps>`
  display: grid;
  grid-template-columns: ${(p) => p.$template};
`
