import { atom } from 'jotai/vanilla';

export const boardEnumAtom = atom<string[]>(['backlog', 'done']);
