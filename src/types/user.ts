import type { Dayjs } from 'dayjs';

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
  phone?: string;
  details?: string;
  hobbies?: string;
}
