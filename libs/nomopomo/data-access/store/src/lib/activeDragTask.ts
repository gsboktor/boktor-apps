import { atomWithReset } from 'jotai/utils';
import { Task } from './types';

export const activeDragTaskAtom = atomWithReset<Task | undefined>(undefined);
