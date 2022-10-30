import * as React from 'react'
import { NavContainer, Button } from './nav.styles'
export type Page = 'settings' | 'score'
type NavProps = {
  goto: (p: Page) => void
  active: Page
  changeOrder: () => void
}
export const Nav = ({ goto, active, changeOrder }: NavProps) => {
  return (
    <NavContainer>
      <h1>MAGIC SCORE</h1>
      {active === 'score' && (
        <Button onClick={changeOrder}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="33"
            viewBox="0 0 29 33"
          >
            <path
              d="M360.679,1632.96a1.479,1.479,0,0,0,1.323-.39l5.467-6.33a1.54,1.54,0,0,0,.041-2.15,1.471,1.471,0,0,0-2.11-.05l-3.415,3.81v-22.36a1.506,1.506,0,0,0-1.518-1.49c-0.839,0-1.467,1.19-1.467,2.02v22.06l-3.4-4.23a1.479,1.479,0,0,0-2.109-.08,1.537,1.537,0,0,0-.48,1.12,1.522,1.522,0,0,0,.4,1.03l5.97,6.59A1.477,1.477,0,0,0,360.679,1632.96Zm13.612-32.92a1.488,1.488,0,0,0-1.328.39l-5.493,6.36a1.537,1.537,0,0,0-.041,2.15,1.48,1.48,0,0,0,2.118.05l3.432-3.82v22.43a1.525,1.525,0,0,0,3.049,0v-22.66l3.365,4.24a1.488,1.488,0,0,0,2.117.08,1.532,1.532,0,0,0,.482-1.12,1.562,1.562,0,0,0-.4-1.04l-5.993-6.61A1.487,1.487,0,0,0,374.291,1600.04Z"
              transform="translate(-353 -1600)"
            />
          </svg>
        </Button>
      )}
      <Button
        onClick={() => goto(active === 'settings' ? 'score' : 'settings')}
      >
        {active === 'score' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )}
      </Button>
    </NavContainer>
  )
}
