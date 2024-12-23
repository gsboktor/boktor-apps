import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/Inter_18pt-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/Inter_18pt-Bold.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: bisque;
  }
`;
