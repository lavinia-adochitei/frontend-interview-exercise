import { atom } from 'recoil';
import { USERS } from '~mocks';

export const usersState = atom({
  key: 'users',
  default: USERS,
});
