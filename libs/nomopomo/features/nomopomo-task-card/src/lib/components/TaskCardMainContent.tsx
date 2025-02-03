import { Task } from '@boktor-apps/nomopomo/data-access/store';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { motion } from 'motion/react';
import { memo } from 'react';
import styled from 'styled-components';
import { EmojiTag } from './EmojiTag';

const TaskTagContainer = styled.div`
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

const TaskPreviewBody = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  max-height: 300px;
  scrollbar-width: none;
  margin-bottom: 36px;
  gap: 2px;
`;

const ShimmerBackdrop = styled(motion.div)<{ $theme: string }>`
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
export const TaskCardMainContent = memo(
  ({ isActive, theme, task }: { isActive: boolean; theme?: string; task: Task }) => {
    return (
      <>
        {isActive && (
          <ShimmerBackdrop
            $theme={theme ?? '#d3d3d3'}
            animate={{
              backgroundPosition: ['-1000px 0', '1000px 0'],
            }}
            transition={{
              duration: 1.85,
              ease: 'anticipate',
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        )}
        <TaskPreviewBody>
          {task.tags.length > 0 && (
            <TaskTagContainer>
              {task.tags.map((tag) => (
                <ChipCard
                  labelAttr={{ style: { fontSize: 12 } }}
                  key={tag.id}
                  label={tag.label}
                  mainColor={theme}
                  onActionClick={() => {}}
                />
              ))}
            </TaskTagContainer>
          )}
          <p
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 400,
              color: '#242424',
              display: '-webkit-box',
              lineClamp: 3,
              WebkitLineClamp: 3,
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {task.name}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 300,
              color: '#3a3a3a',
              display: '-webkit-box',
              lineClamp: 4,
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {task.desc}
          </p>
        </TaskPreviewBody>
        <EmojiTag theme={theme ?? '#d3d3d3'} emoji={task.tags.length > 0 ? task.tags[0].icon : '🕛'} />
      </>
    );
  },
);
