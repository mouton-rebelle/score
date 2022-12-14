import * as colors from '../styled/colors'

export const Logo = () => (
  <svg
    viewBox="0 0 160 35"
    xmlns="http://www.w3.org/2000/svg"
    width="160"
    height="35"
  >
    <defs>
      <linearGradient id="g1" gradientTransform="rotate(90)">
        <stop offset="25%" stopColor={colors.pink} />
        <stop offset="95%" stopColor={colors.yellow} />
      </linearGradient>
      <mask id="m1">
        <path
          fill="white"
          d="M912.925,3566.5a10.606,10.606,0,0,0-20.07-4.68c-0.056.05-.123,0.07-0.174,0.12l-16.146,16a1.487,1.487,0,0,0,0,2.12,1.521,1.521,0,0,0,2.14,0l13.088-12.97a10.549,10.549,0,0,0,9.774,9.87l-12.858,11.95a1.49,1.49,0,0,0-.069,2.12,1.535,1.535,0,0,0,1.105.47,1.481,1.481,0,0,0,1.035-.41l16.147-15a1.32,1.32,0,0,0,.147-0.2A10.491,10.491,0,0,0,912.925,3566.5Zm-10.6,7.5a7.5,7.5,0,1,1,7.569-7.5A7.536,7.536,0,0,1,902.329,3574Zm-6.5,2.94a1.516,1.516,0,0,0-2.141,0l-12.614,12.5a1.487,1.487,0,0,0,0,2.12,1.521,1.521,0,0,0,2.14,0l12.615-12.5A1.489,1.489,0,0,0,895.831,3576.94Zm-4.037-4a1.515,1.515,0,0,0-2.14,0l-12.615,12.5a1.489,1.489,0,0,0,0,2.12,1.522,1.522,0,0,0,2.141,0l12.614-12.5A1.489,1.489,0,0,0,891.794,3572.94Z"
          transform="translate(-876.094 -3556)"
        />
        <text
          x="45"
          y="28"
          fontStyle="italic"
          fill="white"
          style={{ fontSize: 32, fontWeight: 600 }}
        >
          SCORE
        </text>
      </mask>
    </defs>
    <rect fill="url(#g1)" x="0" y="0" width="160" height="35" mask="url(#m1)" />
  </svg>
)
