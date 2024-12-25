import { atomWithStorage, RESET } from 'jotai/utils';
import { atom } from 'jotai/vanilla';
import { generateKey } from './utils';
import { storage } from './utils/storage';

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

const timerActiveAtom = atomWithStorage<boolean>(generateKey('timer-active'), false, storage<boolean>(), {
  getOnInit: true,
});

const timerModeAtom = atomWithStorage<PomoTimerMode>(
  generateKey('timer-mode'),
  PomoTimerMode.WORK,
  storage<PomoTimerMode>(),
  { getOnInit: true },
);

const timerBaseAtom = atomWithStorage<PomoTimer>(
  generateKey('timer'),
  { [PomoTimerMode.WORK]: 30 * 60, [PomoTimerMode.BREAK]: 5 * 60 },
  storage<PomoTimer>(),
  {
    getOnInit: true,
  },
);

export const timerSelectorAtom = atom<PomoTimerSelector, [Partial<PomoUpdateSelector>], void>(
  (get) => {
    const currMode = get(timerModeAtom);
    return {
      time: get(timerBaseAtom)[currMode],
      mode: currMode,
      active: get(timerActiveAtom),
    };
  },
  (get, set, update) => {
    update.hasOwnProperty('active') && set(timerActiveAtom, update.active!);

    if (update.newMode) {
      set(timerBaseAtom, RESET);
      set(timerModeAtom, update.newMode);
    }
    if (update.newTime) {
      if (update.newTime === RESET) {
        set(timerBaseAtom, update.newTime);
      } else {
        const currTimeObj = get(timerBaseAtom);
        const currMode = get(timerModeAtom);

        set(timerBaseAtom, { ...currTimeObj, [currMode]: update.newTime });
      }
    }
  },
);
