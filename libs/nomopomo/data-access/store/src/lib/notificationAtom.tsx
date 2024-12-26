import { atom } from 'jotai/vanilla';

const dispatcher = (message: string) => {
  Notification.permission === 'granted' && new Notification(message);
};

export const notificationAtom = atom<{ dispatch: (message: string) => void }>({
  dispatch: dispatcher,
});
