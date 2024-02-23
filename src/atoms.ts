import { atom } from 'recoil';
import { USERS } from '~mocks';
import type { Country } from '~types';

export const usersState = atom({
  key: 'users',
  default: USERS,
});

export const countriesState = atom<Country[]>({
  key: 'countries',
  default: [],
});
