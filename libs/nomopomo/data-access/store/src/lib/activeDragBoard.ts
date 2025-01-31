import { atomWithReset } from 'jotai/utils';

export const activeDragBoardId = atomWithReset<string | undefined>(undefined);
