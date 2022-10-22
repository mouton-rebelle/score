import styled from 'styled-components'

export const ColorPalette = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
  padding: 10px;
`
export const Color = styled.div<{ $color: string; $isActive: boolean }>`
  background-color: ${(props) => props.$color};
  height: 44px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px dotted ${(p) => (p.$isActive ? '#000' : 'transparent')};
`
