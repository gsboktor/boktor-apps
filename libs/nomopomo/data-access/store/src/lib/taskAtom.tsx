import { atom } from 'jotai/vanilla';
import { Task, TaskCheckList } from './types';

const _taskIdAtom = atom<string | undefined>(undefined);
const _taskNameAtom = atom<string | undefined>(undefined);
const _taskCreatedAtAtom = atom<string | undefined>(undefined);
const _taskDescAtom = atom<string | undefined>(undefined);
const _taskCompletedCyclesAtom = atom<number | undefined>(undefined);
const _taskTagsAtom = atom<string[] | undefined>(undefined);
const _taskParentBoardkeyAtom = atom<string | undefined>(undefined);
const _taskCheckListAtom = atom<TaskCheckList[] | undefined>(undefined);
const _taskIconAtom = atom<string | undefined>(undefined);

export const taskAtom = atom<Partial<Task>>((get) => {
  return {
    id: get(_taskIdAtom),
    name: get(_taskNameAtom),
    createdAt: get(_taskCreatedAtAtom),
    desc: get(_taskDescAtom),
    completedCycles: get(_taskCompletedCyclesAtom),
    tags: get(_taskTagsAtom),
    parentBoardKey: get(_taskParentBoardkeyAtom),
    checklist: get(_taskCheckListAtom),
    icon: get(_taskIconAtom),
  };
});
