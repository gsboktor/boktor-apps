import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/Inter_18pt-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/Inter_18pt-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/Inter_18pt-SemiBold.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/Inter_18pt-Bold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }


  @font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/Inter_18pt-ExtraBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body {
        --gradient-shadow: 
        linear-gradient(
            45deg,
            #fb0094,
            #0000ff,
            #00ff00,
            #ffff00,
            #ff0000,
            #fb0094,
            #0000ff,
            #00ff00,
            #ffff00,
            #ff0000
        );
        --bounce-effect: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    margin: 0;
    padding: 0;
    background-color: #FFEAD2;
  }
`;
