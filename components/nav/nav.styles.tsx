import styled, { css } from 'styled-components'
import * as colors from '../styled/colors'
export const NavContainer = styled.nav`
  margin: 1em 1em 3em 1em;
  background: ${colors.white};
  border-radius: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 2px solid ${colors.background};
  color: ${colors.background};
  box-shadow: 1px 10px 10px 1px rgba(0, 0, 0, 0.2);
`
const NavElement = css`
  padding: 8px;
  border: 0;
  outline: none;
  box-shadow: none;
  border-left: 2px solid ${colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    border-radius: 0 16px 16px 0;
  }
  &:first-child {
    border-radius: 16px 0 0 16px;
    border-left: none;
  }
`
export const Button = styled.button<{ $isActive: boolean }>`
  ${NavElement}
  background: transparent;
  svg {
    fill: ${colors.background};
    stroke: ${colors.background};
    width: 30px;
    height: 30px;
    display: block;
    opacity: ${(p) => (p.$isActive && !p.disabled ? 1 : 0.2)};
  }
`

export const Form = styled.form<{ $isActive: boolean }>`
  ${NavElement}
  background: transparent;
  margin: 0;
  input {
    color: ${colors.background};
    text-align: center;
    -webkit-touch-callout: none;
    opacity: ${(p) => (p.$isActive ? 1 : 0.2)};
    background: transparent;
    width: 44px;
    border: 1px solid transparent;
    border-radius: 16px;
    font-size: 18px;
    line-height: 18px;
    height: 28px;
    outline: none;
    &:focus {
      border: 1px solid ${colors.pink};
    }
  }
`
