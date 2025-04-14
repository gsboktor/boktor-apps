import { NoiseE, NomopomoLettersComponent } from '@boktor-apps/shared/ui/assets/svgs';
import styled from 'styled-components';

const AnimationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: fit-content;
  &:hover {
    cursor: pointer;
    > #logo {
      transform: scale(1.5);
    }
    > #sun {
      transform: scale(0.6);
      box-shadow: 0px 0px 76px 64px #ffc039a9;
      background: #ffcd62a8;
    }
  }
  @media screen and (width <= 768px) {
    top: calc(100% - 96px);
  }

  transition: top cubic-bezier(0.455, 0.03, 0.515, 0.955) 400ms;
`;

const StyledNomopomo = styled(NomopomoLettersComponent)`
  position: absolute;
  width: 96px;
  height: 96px;
  border-radius: 30px;
  z-index: 1;
  transform: translateX(-1.5px) translateY(1.5px);
  transition: transform var(--bounce-effect) 150ms;
`;

const NomopomoSun = styled.div`
  background-color: #ffcd62;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  box-shadow: 0px 0px 0px 0px transparent;
  transition: transform var(--bounce-effect) 150ms, box-shadow var(--bounce-effect) 150ms;
  background: linear-gradient(#ffcd62a8, #ffcd62a8), url(${NoiseE});
`;

export const NomopomoBlurLogo = () => {
  return (
    <AnimationContainer>
      <StyledNomopomo id="logo" />
      <NomopomoSun id="sun" />
    </AnimationContainer>
  );
};
