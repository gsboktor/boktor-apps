import { Direction, useRenderDirection } from '@boktor-apps/shared/ui/hooks';
import { AnimatePresence, motion } from 'motion/react';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

type PopoverProps = {
  iconAttr?: React.HTMLAttributes<HTMLDivElement>;
  containerAttr?: React.HTMLAttributes<HTMLDivElement>;
  renderHorizontal?: 'left' | 'right';
  Icon: React.ReactNode;
  Content: React.ReactNode;
  onClick?: () => void;
};

const PopoverRoot = styled.div`
  position: relative;
  overflow: visible;
  display: flex;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
`;

const PopoverBox = styled(motion.div)<{ $dir?: { ver?: Direction; hor?: 'left' | 'right' } }>`
  position: absolute;
  background-color: black;
  display: flex;
  flex: 1;
  height: fit-content;
  align-items: center;
  justify-content: center;
  max-width: 248px;
  padding: 6px 12px;
  z-index: 10000;
  ${({ $dir }) => {
    if ($dir?.ver === Direction.UP)
      return css`
        transform: translateY(-100%);
      `;
    return css`
      top: 24px;
    `;
  }}

  ${({ $dir }) => {
    return $dir?.hor === 'right'
      ? css`
          left: 2px;
        `
      : css`
          right: 2px;
        `;
  }}
`;

export const Popover = ({ ...props }: PopoverProps) => {
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const popOverRef = useRef<HTMLDivElement>(null);
  const { direction, directionHorizontal } = useRenderDirection(popOverRef, 'popover');

  return (
    <PopoverRoot
      onMouseEnter={() => setShowPopover(true)}
      onMouseLeave={() => setShowPopover(false)}
      ref={popOverRef}
      {...props.containerAttr}
    >
      <AnimatePresence>
        {showPopover && (
          <PopoverBox
            $dir={{ ver: direction.current, hor: props.renderHorizontal ?? directionHorizontal.current }}
            initial={{
              y: direction.current === Direction.UP ? `-100%` : '0%',
              scale: 0.75,
              borderRadius: '24px',
              opacity: 0,
            }}
            animate={{ scale: 1, borderRadius: '8px', opacity: 0.7 }}
            exit={{
              scale: 0.75,
              borderRadius: '24px',
              opacity: 0,
              transition: {
                duration: 0.1,
              },
            }}
          >
            {props.Content}
          </PopoverBox>
        )}
      </AnimatePresence>
      <div
        style={{ width: 'fit-content', height: 'fit-content', display: 'flex' }}
        role="button"
        onClick={() => props.onClick?.()}
      >
        {props.Icon}
      </div>
    </PopoverRoot>
  );
};
