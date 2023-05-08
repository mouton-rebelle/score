import styled, { css } from 'styled-components'
import * as colors from '../styled/colors'
export const NavContainer = styled.nav`
  margin: 1em 1em 3em 1em;
  background: ${colors.white};
  border-radius: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border: 2px solid ${colors.background};
  color: ${colors.background};
  box-shadow: 1px 10px 10px 1px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(#2d323d, #10141c);
`
const NavElement = css`
  padding: 8px;
  border: 0;
  outline: none;
  background: transparent;
  box-shadow: none;
  border: 1px solid ${colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Button = styled.button<{ $isActive: boolean }>`
  ${NavElement}

  svg {
    fill: ${colors.white};
    stroke: none;
    width: 30px;
    height: 30px;
    display: block;
    opacity: ${(p) => (p.$isActive && !p.disabled ? 1 : 0.2)};
  }
`

export const Form = styled.form<{ $isActive: boolean }>`
  ${NavElement}
  margin: 0;
  input {
    color: ${colors.white};
    text-align: center;
    -webkit-touch-callout: none;
    background: transparent;
    width: 44px;
    border: 1px solid white;
    border-radius: 16px;
    font-size: 18px;
    line-height: 18px;
    height: 28px;
    outline: none;
  }
`
