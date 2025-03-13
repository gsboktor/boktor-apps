import { motion } from 'motion/react';
import styled from 'styled-components';

export const CardContainer = styled(motion.div)<{ $theme?: string }>`
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #ffe7cc;
  box-shadow: 0px 0px 0px 1px inset #4f4f4f2c;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0px 0px 0px 3px inset ${({ $theme }) => $theme ?? `lightgray`};
  }
  padding: 12px;
  padding-top: 24px;
  position: relative;
`;

export const QueuedCardContainer = styled(CardContainer)`
  padding-top: 12px;
`;

export const DragWrapper = styled.div`
  position: absolute;
  top: 6px;
  align-self: center;
  justify-content: center;
  display: flex;
  width: 80%;
  margin: auto;
  z-index: 100;
  border-radius: 12px;
  transition: background-color ease-in-out 200ms;
  cursor: move !important;

  &:hover {
    background-color: #3d3d3d11;
  }
`;

export const TaskPreviewBody = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  max-height: 300px;
  scrollbar-width: none;
  margin-bottom: 42px;
  gap: 10px;
`;

export const TaskTagContainer = styled.div`
  width: 100%;
  padding: 4px 2px;
  position: sticky;
  top: 0;
  flex: 1;
  user-select: none;
  flex-wrap: wrap;

  box-sizing: border-box;
  scrollbar-width: none;
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const TaskCardName = styled.p`
  margin: 0;
  font-size: 20;
  font-weight: 400;
  color: #242424;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export const TaskCardDesc = styled.p`
  margin: 0;
  font-size: 16;
  font-weight: 300;
  color: #3a3a3a;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export const ShimmerBackdrop = styled(motion.div)<{ $theme: string }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  border-radius: 20px;
  opacity: 0.8;
  background: linear-gradient(
    45deg,
    ${({ $theme }) => `${$theme}20`} 0%,
    ${({ $theme }) => `${$theme}30`} 10%,
    ${({ $theme }) => `${$theme}40`} 20%,
    ${({ $theme }) => `${$theme}50`} 30%,
    ${({ $theme }) => `${$theme}60`} 40%,
    ${({ $theme }) => `${$theme}90`} 50%,
    ${({ $theme }) => `${$theme}60`} 60%,
    ${({ $theme }) => `${$theme}50`} 70%,
    ${({ $theme }) => `${$theme}40`} 80%,
    ${({ $theme }) => `${$theme}30`} 90%,
    ${({ $theme }) => `${$theme}20`} 100%
  );
  background-size: 1000px 100%;
`;

export const NodeRoot = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TaskPreviewDetailsContainer = styled.div`
  position: absolute;
  width: calc(100% - 58px);
  bottom: 10px;
  right: 8px;
  /* height: 36px; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TaskIconAndLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  gap: 2;
`;

export const QueueIndicator = styled(motion.div)`
  width: fit-content;
  height: fit-content;
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
