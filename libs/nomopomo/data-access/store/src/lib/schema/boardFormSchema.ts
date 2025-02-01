import * as z from 'zod';
import { boardEnumAtom } from '../boardEnumAtom';
import { store } from '../defaultStore';

export const createBoardFormSchema = z.object({
  boardName: z
    .string({ required_error: 'Please enter a board name!', invalid_type_error: "That doesn't look right" })
    .min(2, 'Board name should be longer')
    .refine(
      (val: string) => !store.get(boardEnumAtom).some((boardName) => boardName.toLowerCase() === val.toLowerCase()),
      { message: 'A board with that name already exists!' },
    ),
});
