import { RESET } from 'jotai/utils';

export enum PomoTimerMode {
  WORK = 'work',
  BREAK = 'break',
}

export type PomoTimer = { [T in PomoTimerMode]: number };

export type PomoTimerSelector = {
  time: number;
  mode: PomoTimerMode;
  active: boolean;
};

export type PomoUpdateSelector = {
  newTime: number | typeof RESET;
  newMode: PomoTimerMode;
  active: boolean;
};
