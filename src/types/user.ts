import type { Dayjs } from 'dayjs';

export type UserPhone = {
  countryCode: string;
  number: string;
};

export interface User {
  index?: number;
  username: string;
  firstName: string;
  lastName: string;
  gender?: string;
  dateOfBirth: Dayjs;
  address?: string;
  city?: string;
  newsletter?: boolean;
  country?: string;
  phone?: UserPhone;
  details?: string;
  hobbies?: string;
}
