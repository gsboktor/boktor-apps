import { useCallback, useRef } from 'react';
import { animated, easings, useSpring } from 'react-spring';
import styled from 'styled-components';

const Button = styled.button<{ $bg?: string }>`
  border-radius: 10px;
  border: none;
  box-shadow: 0px 0px 0px 0px inset black;
  background-color: ${({ $bg }) => ($bg ? $bg : 'white')};
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  padding: 8px;
  transform: scale(1);
  width: fit-content;

  &:hover {
    background-color: ${({ $bg }) => ($bg ? 'black' : '#e7e7e7b0')};
    cursor: pointer;
    transform: scale(1.05);
  }

  transition: box-shadow 0.1s ease-in-out, transform 0.2s ease;
`;
const NavBarContainer = styled.div`
  position: absolute;
  top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  max-width: 1280px;
  gap: 24px;
  width: 100%;
`;

const ToggleButtonContainer = styled(animated.div)`
  display: flex;
  position: relative;
  background-color: gray;
  min-width: 64px;
  height: 32px;
  border-radius: 24px;
  box-shadow: 0px 0px 4px 4px inset #00000020;
`;

const Toggle = styled(animated.div)`
  position: absolute;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0px 0px 4px 4px #00000020;
  width: 24px;
  height: 24px;
  top: 4px;
  z-index: 1;
`;

export const ToggleButton = () => {
  const [spring, controller] = useSpring(() => ({
    from: { left: 4 },
    config: { duration: 400, easing: easings.easeOutBack, clamp: true },
  }));

  const [containerElasticSpring, containerElasticController] = useSpring(() => ({
    from: { transform: 'scale(1)' },
    config: { duration: 150, bounce: 1.5, clamp: true },
  }));

  const handleStart = useCallback(() => {
    containerElasticController.start({
      to: [{ transform: 'scale(1.075)' }, { transform: 'scale(1)' }],
    });
    controller.start({ left: 36, onRest: () => console.log('rest') });
  }, [containerElasticController, controller]);

  return (
    <ToggleButtonContainer style={containerElasticSpring}>
      <Toggle style={spring} onClick={handleStart} />
    </ToggleButtonContainer>
  );
};

export const PortfolioTabBar = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <NavBarContainer>
      <Button ref={buttonRef}>Go to About</Button>
      <Button ref={buttonRef}>More about me</Button>
      <Button ref={buttonRef}>Projects</Button>
      <Button $bg={'#202020'} ref={buttonRef}>
        <p style={{ display: 'inline', color: 'white' }}>Contact Me</p>
      </Button>
      <ToggleButton />
    </NavBarContainer>
  );
};
