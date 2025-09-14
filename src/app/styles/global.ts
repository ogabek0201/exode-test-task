import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    --color-text: #213547;
    --color-bg: #ffffff;
    --color-primary: #646cff;
    --color-danger: #c74646;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    color: var(--color-text);
    background-color: var(--color-bg);
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  #root {
    width: 100%;
    text-align: center;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s, background-color 0.25s, color 0.25s;
  }
`
