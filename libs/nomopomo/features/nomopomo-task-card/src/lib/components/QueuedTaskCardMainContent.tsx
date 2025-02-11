import { Task } from '@boktor-apps/nomopomo/data-access/store';
import { ChipCard } from '@boktor-apps/shared/ui/cards';
import { memo } from 'react';
import { ShimmerBackdrop, TaskCardDesc, TaskCardName, TaskPreviewBody, TaskTagContainer } from '../TaskCard.styles';
import { EmojiTag } from './EmojiTag';
import { QueuedTaskActions } from './QueuedTaskActions';

export const QueuedTaskCardMainContent = memo(
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
          <TaskCardName>{task.name}</TaskCardName>
          <TaskCardDesc>{task.desc}</TaskCardDesc>
        </TaskPreviewBody>
        <EmojiTag theme={theme ?? '#d3d3d3'} emoji={task.tags.length > 0 ? task.tags[0].icon : '🕛'} />
        <QueuedTaskActions task={task} theme={theme ?? '#d3d3d3'} />
      </>
    );
  },
);
