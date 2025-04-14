import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
        font-family: "Inter";
        --gradient-shadow: 
        linear-gradient(
            45deg,
            #fae0c1,
            #ffcd62,
            #fbb3b3,
            #a7d6c8,
            #fae0c1,
            #ffcd62,
            #fbb3b3,
            #a7d6c8,
            #fae0c1,
            #ffcd62,
            #fbb3b3,
            #a7d6c8
        );
        --silver-gradient: 
        linear-gradient(
            45deg,
            #f4f4f4,
            #e0e0e0,
            #ffffff,
            #d1d1d1,
            #f4f4f4,
            #ffffff,
            #e0e0e0,
            #d1d1d1,
            #f4f4f4,
            #ffffff,
            #e0e0e0,
            #d1d1d1
        );
        --bounce-effect: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    margin: 0;
    padding: 0;
    background-color: #FFEAD2;
  }
`;

// linear-gradient(
//   45deg,
//   #f3ebe5,
//   #f3c5c5,
//   #ef98a1,
//   #d5d2fe,
//   #bff0db,
//   #fae0c1,
//   #a7d6c8,
//   #ffcd62,
//   #fbb3b3,
//   #fbf8f6
// );
