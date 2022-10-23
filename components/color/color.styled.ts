import styled from 'styled-components'
import { background } from '../styled/colors'
export const ColorPalette = styled.div`
  display: grid;
  grid-gap: 0px;
  justify-content: space-evenly;
  grid-template-columns: repeat(6, 30px);
  margin-bottom: 1.5em;
`
export const Color = styled.div<{ $color: string; $isActive: boolean }>`
  background-color: ${(props) => props.$color};
  cursor: pointer;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 6px solid ${(props) => (props.$isActive ? props.$color : background)};
`
