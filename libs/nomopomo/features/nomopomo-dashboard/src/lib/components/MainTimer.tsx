import styled from 'styled-components';

const TimerContainer = styled.p`
  display: inline;
  font-size: 108px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  margin: 0;
  text-transform: uppercase;
  background: black;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const MainTimer = () => {
  return <TimerContainer>30:00</TimerContainer>;
};
