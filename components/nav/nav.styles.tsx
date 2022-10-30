import styled from 'styled-components'
import * as colors from '../styled/colors'
export const NavContainer = styled.nav`
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr auto auto;

  color: ${colors.white};
`
export const Button = styled.button`
  &:last-child {
    margin-left: 1em;
  }
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gradientPurpleCyan};
  color: ${colors.pink};
  border: none;
  border-radius: 8px;
  svg {
    fill: rgba(0, 0, 0, 0.8);
    width: 30px;
    height: 30px;
    display: block;
  }
  width: 36px;
`
