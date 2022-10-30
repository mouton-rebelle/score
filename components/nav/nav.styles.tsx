import styled from 'styled-components'
import * as colors from '../styled/colors'
export const NavContainer = styled.nav`
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr auto auto;
`
export const Button = styled.button`
  background: ${colors.gradientYellowPink};
  &:last-child {
    background: ${colors.gradientCyanGreen};
    margin-left: 10px;
  }
  border: none;
  border-radius: 8px;
  color: ${colors.background};
  width: 36px;
`
