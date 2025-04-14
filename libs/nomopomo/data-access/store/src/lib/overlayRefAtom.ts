import { atom } from 'jotai';
import React from 'react';

export const overlayRefAtom = atom<React.RefObject<HTMLDivElement>>();
