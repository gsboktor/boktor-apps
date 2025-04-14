import { deleteBoardTaskAtom } from '@boktor-apps/nomopomo/data-access/store';
import { CloseComponent } from '@boktor-apps/shared/ui/assets/svgs';
import { Popover } from '@boktor-apps/shared/ui/pop-over';
import { useSetAtom } from 'jotai';
import styled from 'styled-components';

const DeleteTaskContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  width: fit-content;
  height: fit-content;
  z-index: ${Number.MAX_SAFE_INTEGER};
`;
export const DeleteTaskButton = ({ boardKey, taskId }: { boardKey: string; taskId: string }) => {
  const removeBoardTask = useSetAtom(deleteBoardTaskAtom);
  return (
    <DeleteTaskContainer onClick={() => removeBoardTask({ boardKey: boardKey, taskId: taskId })}>
      <Popover
        Icon={<CloseComponent width={14} height={14} />}
        renderHorizontal="left"
        Content={
          <p
            style={{
              margin: 0,
              fontSize: 10,
              letterSpacing: 1,
              color: 'white',
              display: 'flex',
              flexWrap: 'wrap',
              width: 75,
            }}
          >
            Remove task
          </p>
        }
      ></Popover>
    </DeleteTaskContainer>
  );
};
