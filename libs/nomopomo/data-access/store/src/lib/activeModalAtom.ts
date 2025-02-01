import { atom } from 'jotai';
import { ForwardRefExoticComponent, LazyExoticComponent, RefAttributes } from 'react';

export interface ModalComponentProps {
  closeModal: (show: boolean) => void;
}

export type ModalConfig = {
  Component:
    | ForwardRefExoticComponent<ModalComponentProps & RefAttributes<HTMLDivElement>>
    | LazyExoticComponent<ForwardRefExoticComponent<ModalComponentProps & RefAttributes<HTMLDivElement>>>
    | null;
  show: boolean;
};

type ModalComponentType =
  | ForwardRefExoticComponent<ModalComponentProps & RefAttributes<HTMLDivElement>>
  | LazyExoticComponent<ForwardRefExoticComponent<ModalComponentProps & RefAttributes<HTMLDivElement>>>
  | null;

const modalComponentAtom = atom<ModalComponentType>(null);

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
    update?.hasOwnProperty('show') && set(modalShowAtom, update.show!);
  },
);
