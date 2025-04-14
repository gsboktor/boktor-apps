import { atom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { ZodError } from 'zod';
import { activeModalAtom } from './activeModalAtom';
import { addBoardTaskAtom, boardOperations } from './kanbanAtom';
import { kanbanConfigAtom } from './kanbanConfigAtom';
import { createTaskSchema } from './schema';
import { Task } from './types';

export type RequiredTaskKeys = Pick<Task, 'name' | 'desc' | 'parentBoardKey' | 'tags' | 'estimatedCycles'>;

type TaskFormRequiredFieldsErrors = Record<keyof RequiredTaskKeys, { valid: boolean; message?: string }>;

const _taskForm = atomWithReset<RequiredTaskKeys>({} as RequiredTaskKeys);
const _taskFieldErrors = atomWithReset<TaskFormRequiredFieldsErrors>({} as TaskFormRequiredFieldsErrors);
const _taskFormComplete = atom<boolean>(false);

export const setTaskFormValues = atom<RequiredTaskKeys, [Partial<RequiredTaskKeys>], void>(
  (get) => get(_taskForm),
  (get, set, update) => {
    if (update) {
      set(_taskForm, { ...get(_taskForm), ...update });
    }
  },
);

export const taskFieldErrors = atom<TaskFormRequiredFieldsErrors, [TaskFormRequiredFieldsErrors], void>(
  (get) => get(_taskFieldErrors),
  (_, set, update: TaskFormRequiredFieldsErrors) => {
    if (update) {
      set(_taskFieldErrors, update);
      Object.values(update).forEach((curr) => {
        !curr.valid && set(_taskFormComplete, false);
      });
    }
  },
);

export const validateFormAtom = atom<null, [undefined], void>(null, (get, set, _) => {
  const formValues = get(_taskForm);
  try {
    createTaskSchema.parse(formValues);
    set(addBoardTaskAtom, {
      boardKey: formValues.parentBoardKey,
      newTask: {
        id: crypto.randomUUID(),
        index: get(boardOperations).getBoardConfigByKey(formValues.parentBoardKey).taskCount + 1,
        name: formValues.name,
        desc: formValues.desc,
        createdAt: Date.now(),
        tags: formValues?.tags ? formValues.tags : [],
        completedCycles: 0,
        estimatedCycles: formValues.estimatedCycles ?? 0,
        parentBoardKey: formValues.parentBoardKey,
        checklist: [],
      },
    });

    const oldConfig = get(kanbanConfigAtom)[formValues.parentBoardKey];
    set(kanbanConfigAtom, {
      ...get(kanbanConfigAtom),
      [formValues.parentBoardKey]: { ...oldConfig, taskCount: oldConfig.taskCount + 1 },
    });

    set(_taskForm, RESET);
    set(_taskFieldErrors, RESET);
    set(activeModalAtom, { show: false });
  } catch (e) {
    if (e instanceof ZodError) {
      const values = e.errors;
      const fieldErrors: TaskFormRequiredFieldsErrors = values.reduce((acc, curr) => {
        return { ...acc, [curr.path[0]]: { valid: false, message: curr.message } };
      }, {} as TaskFormRequiredFieldsErrors);
      set(taskFieldErrors, fieldErrors);
    }
  }
});
