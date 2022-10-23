import { createGlobalStyle } from 'styled-components'
import * as colors from './colors'

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Fira Code';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/fira-code-v21-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/fonts/fira-code-v21-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/fonts/fira-code-v21-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/fira-code-v21-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('/fonts/fira-code-v21-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/fira-code-v21-latin-regular.svg#FiraCode') format('svg'); /* Legacy iOS */
}

*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
html, body {
  height: 100%;
  overflow-x: hidden;
  background: ${colors.background};
  color: ${colors.white};
}
body {
  user-select:none;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  &.scrollLock{  
    touch-action:none;
    & > div{
      overflow: hidden;
      height: 100vh;
    }
  }
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}
  html, body{
    font-family: "Fira Code", monospace;
    margin: 0;
    padding: 0;
  }
`
