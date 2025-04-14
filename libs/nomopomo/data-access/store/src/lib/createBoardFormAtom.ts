import { atom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { ZodError } from 'zod';
import { activeModalAtom } from './activeModalAtom';
import { createNewBoardAtom } from './kanbanAtom';
import { createBoardFormSchema } from './schema';

type BoardForm = {
  boardName?: string;
  boardTheme?: string;
};

type BoardFormValidationError = Record<keyof Pick<BoardForm, 'boardName'>, { message: string; valid: boolean }>;

const _boardFormValues = atomWithReset<BoardForm>({} as BoardForm);
const _boardFormFieldErrors = atomWithReset<BoardFormValidationError>({} as BoardFormValidationError);

export const setBoardFormValues = atom<BoardForm | undefined, [Partial<BoardForm>], void>(
  (get) => get(_boardFormValues),
  (get, set, update) => {
    if (update) {
      set(_boardFormValues, { ...get(_boardFormValues), ...update });
    }
  },
);

export const boardFormErrors = atom<BoardFormValidationError | undefined, [BoardFormValidationError], void>(
  (get) => get(_boardFormFieldErrors),
  (_, set, update: BoardFormValidationError) => {
    if (update) {
      set(_boardFormFieldErrors, update);
    }
  },
);

export const validateBoardForm = atom<null, [undefined], void>(null, (get, set) => {
  try {
    const fields = createBoardFormSchema.parse(get(_boardFormValues));
    set(createNewBoardAtom, {
      boardName: fields.boardName,
      boardTheme: get(_boardFormValues)?.boardTheme ?? '#D3D3D3',
    });
    set(activeModalAtom, {
      show: false,
      Component: null,
    });

    set(_boardFormFieldErrors, RESET);
    set(_boardFormValues, RESET);
  } catch (e) {
    if (e instanceof ZodError) {
      console.log(e);
      const errors = e.errors;
      const fieldErrors = errors.reduce(
        (acc, e) => ({ ...acc, [e.path[0]]: { message: e.message, valid: false } }),
        {} as BoardFormValidationError,
      );
      set(boardFormErrors, fieldErrors);
    }
  }
});
