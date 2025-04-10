import { atom } from 'jotai';

export type Toast = {
  id: string;
  timestamp: number;
  message: string;
  icon?: React.ReactNode;
};

export const toastsAtom = atom<Toast[]>([]);

export const pushToastsAtom = atom<null, [Toast], undefined>(null, (get, set, newToast) => {
  const newToasts = [...get(toastsAtom)];
  newToasts.push(newToast);

  newToasts.sort((t1, t2) => t1.timestamp - t2.timestamp);

  set(toastsAtom, newToasts);
});

export const removeToastAtom = atom<null, [{ id: string }], undefined>(null, (get, set, { id }) => {
  const newToasts = [...get(toastsAtom)].filter((toast) => toast.id !== id);
  set(toastsAtom, newToasts);
});
