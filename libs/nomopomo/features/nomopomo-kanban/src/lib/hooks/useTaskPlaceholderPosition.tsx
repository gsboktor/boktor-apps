import { Task } from '@boktor-apps/nomopomo/data-access/store';
import { Over } from '@dnd-kit/core';
import { RefObject, useEffect, useMemo, useState } from 'react';

type PlaceholderPositionProps = {
  activeTask?: Task;
  overlayRef: RefObject<HTMLDivElement>;
  over: Over | null;
};

export const useTaskPlaceholderPosition = ({ activeTask, overlayRef, over }: PlaceholderPositionProps) => {
  const [placeholderPosition, setPlaceholderPosition] = useState<{
    taskId: string;
    position: 'above' | 'below';
  } | null>(() => null);

  useMemo(() => {
    if (!activeTask) {
      setPlaceholderPosition(null);
    }
  }, [activeTask]);

  useEffect(() => {
    if (!activeTask || !overlayRef.current) return;

    let animationFrameId: number;
    let isThrottled = false;

    const updatePlaceholder = () => {
      if (!over?.id || over.id === activeTask.id) {
        setPlaceholderPosition(null);
        isThrottled = false;
        return;
      }

      const isBelowTask = overlayRef.current!.getBoundingClientRect().top > over.rect.top;
      setPlaceholderPosition({
        taskId: over.id as string,
        position: isBelowTask ? 'below' : 'above',
      });
      isThrottled = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isThrottled) return;
      animationFrameId = window.requestAnimationFrame(updatePlaceholder);
      isThrottled = true;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeTask, over, overlayRef]);

  return { placeholderPosition };
};
