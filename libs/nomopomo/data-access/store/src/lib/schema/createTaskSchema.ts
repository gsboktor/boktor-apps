import * as z from 'zod';
import { boardEnumAtom } from '../boardEnumAtom';
import { store } from '../defaultStore';

export const createTaskSchema = z.object({
  name: z.string({ required_error: 'Task name needs to be added!' }).min(2, 'Task name needs to be longer!'),
  desc: z.string({ required_error: 'Add a description!' }).min(2, 'Description needs to be longer!'),
  parentBoardKey: z.custom<string>((data: string) => {
    let boards = store.get(boardEnumAtom);
    return boards.includes(data);
  }, "This board doesn't exist!"),
});
