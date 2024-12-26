import { atomWithStorage, RESET } from 'jotai/utils';
import { atom } from 'jotai/vanilla';
import { notificationAtom } from './notificationAtom';
import { PomoTimer, PomoTimerMode, PomoTimerSelector, PomoUpdateSelector } from './types';
import { generateKey, mapModeToMessage } from './utils';
import { storage } from './utils/storage';

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
  { [PomoTimerMode.WORK]: 5, [PomoTimerMode.BREAK]: 10 },
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
    const currMode = get(timerModeAtom);
    const currTimeBase = get(timerBaseAtom);
    const notify = get(notificationAtom);

    update.hasOwnProperty('active') && set(timerActiveAtom, update.active!);

    if (update.newMode != undefined) {
      set(timerBaseAtom, RESET);
      set(timerModeAtom, update.newMode);
    }

    if (update.newTime != undefined) {
      if (update.newTime === RESET) {
        set(timerBaseAtom, update.newTime);
      } else {
        if (update.newTime < 0) {
          const switchToMode = currMode === PomoTimerMode.WORK ? PomoTimerMode.BREAK : PomoTimerMode.WORK;
          notify.dispatch(mapModeToMessage[switchToMode]);

          set(timerBaseAtom, RESET);
          set(timerModeAtom, switchToMode);
        } else {
          set(timerBaseAtom, { ...currTimeBase, [currMode]: update.newTime });
        }
      }
    }
  },
);
