import React from 'react';
import styled from 'styled-components';
import noise from './assets/noise.svg';
import { ReactComponent as Nomopomo } from './assets/nomopomo-letters.svg';

const AnimationContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: fit-content;
  &:hover {
    cursor: pointer;
    > #logo {
      transform: scale(1.25);
    }
    > #sun {
      transform: scale(0.75);
      box-shadow: 0px 0px 64px 32px #ffc039a9;
      background: #ffcd62a8;
    }
  }
`;

const StyledNomopomo = styled(Nomopomo)`
  position: absolute;
  width: 96px;
  height: 96px;
  border-radius: 30px;
  z-index: 1;
  transform: translateX(-1.5px) translateY(1.5px);
  transition: transform ease-in-out 150ms;
`;

const NomopomoSun = styled.div`
  background-color: #ffcd62;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 0px transparent;
  transition: transform ease-in-out 150ms, box-shadow ease-in-out 150ms;
  background: linear-gradient(#ffcd62a8, #ffcd62a8), url(${noise});
`;

export const NomopomoDashboard = () => {
  return (
    <React.Fragment>
      <AnimationContainer>
        <StyledNomopomo id="logo" />
        <NomopomoSun id="sun" />
      </AnimationContainer>
    </React.Fragment>
  );
};
