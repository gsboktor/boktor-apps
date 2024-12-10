import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { storage } from './searchCacheAtom';

export type UserInfo = {
  name: string;
  email: string;
  phoneNumber: string;
};

const nameAtom = atomWithStorage('bok-name', '', storage<string>(), { getOnInit: true });
const emailAtom = atomWithStorage('bok-email', '', storage<string>(), { getOnInit: true });
const phoneNumberAtom = atomWithStorage('bok-phone-number', '', storage<string>(), { getOnInit: true });

export const userInfoAtomSelector = atom<UserInfo, [Partial<UserInfo>], void>(
  (get) => {
    let name = get(nameAtom);
    let email = get(emailAtom);
    let phoneNumber = get(phoneNumberAtom);

    return { name, email, phoneNumber } as UserInfo;
  },
  (_, set, newValue: Partial<UserInfo>) => {
    newValue.name && set(nameAtom, newValue.name);
    newValue.email && set(emailAtom, newValue.email);
    newValue.phoneNumber && set(phoneNumberAtom, newValue.phoneNumber);
  },
);
