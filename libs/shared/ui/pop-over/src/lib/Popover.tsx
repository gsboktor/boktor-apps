import { useRenderDirection } from '@boktor-apps/shared/ui/hooks';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type PopoverProps = {
  iconAttr: React.HTMLAttributes<HTMLDivElement>;
  containerAttr: React.HTMLAttributes<HTMLDivElement>;
  Icon: React.ReactNode;
};

const PopoverRoot = styled.div`
  position: relative;
  overflow: visible;
  display: flex;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
`;

const PopoverBox = styled.div`
  position: absolute;
  width: 128px;
  height: 88px;
`;

export const Popover = ({ ...props }: PopoverProps) => {
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const popOverRef = useRef<HTMLDivElement>(null);
  const { direction } = useRenderDirection(popOverRef);

  useEffect(() => {
    popOverRef.current?.addEventListener('mouseenter', () => {});

    return () => {
      popOverRef.current?.removeEventListener('mouseenter', () => {});
    };
  }, []);

  return (
    <PopoverRoot ref={popOverRef}>
      {showPopover && <PopoverBox>Test</PopoverBox>}
      {props.Icon}
    </PopoverRoot>
  );
};
