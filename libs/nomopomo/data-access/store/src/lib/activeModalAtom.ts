import { atom } from 'jotai';
import { ForwardRefExoticComponent, LazyExoticComponent, RefAttributes } from 'react';

export interface ModalComponentProps {
  closeModal: (show: boolean) => void;
}

type ModalWithForwardedRef<T> = ForwardRefExoticComponent<T & RefAttributes<HTMLDivElement>>;
type ModalComponentType<T> = ModalWithForwardedRef<T> | LazyExoticComponent<ModalWithForwardedRef<T>> | null;

export type ModalConfig = {
  Component: ModalComponentType<ModalComponentProps>;
  show: boolean;
};

const modalComponentAtom = atom<ModalComponentType<ModalComponentProps>>(null);

const modalShowAtom = atom<boolean>(false);

export const activeModalAtom = atom<ModalConfig | null, [Partial<ModalConfig> | null], void>(
  (get) => {
    return { Component: get(modalComponentAtom), show: get(modalShowAtom) };
  },
  (_, set, update) => {
    if (update === null) {
      set(modalShowAtom, false);
      set(modalComponentAtom, null);
      return;
    }

    update?.Component && set(modalComponentAtom, update.Component);
    Object.prototype?.hasOwnProperty.call(update, 'show') && set(modalShowAtom, update.show!);
  },
);
