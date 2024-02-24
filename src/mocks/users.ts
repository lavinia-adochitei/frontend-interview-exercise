import type { User } from '~types';
import dayjs from 'dayjs';

export const USERS: User[] = [
  {
    username: 'user13',
    firstName: 'Joe',
    lastName: 'Doe',
    gender: 'F',
    dateOfBirth: dayjs('1997-10-15'),
    address: 'Main street',
    city: 'Bucharest',
    newsletter: true,
    country: 'Romania',
    phone: {
      countryCode: '+40',
      number: '712345678',
    },
    details: 'some details',
    hobbies: 'reading, playing guitar',
    index: 1,
  },
  {
    username: 'user2',
    firstName: 'Joe',
    lastName: 'Doe',
    gender: 'M',
    dateOfBirth: dayjs('1998-10-15'),
    address: 'Main street',
    city: 'Cluj',
    newsletter: true,
    country: 'Romania',
    phone: {
      countryCode: '+40',
      number: '712345678',
    },
    details: 'some details',
    hobbies: 'reading, playing guitar',
    index: 2,
  },
  {
    username: 'user345',
    firstName: 'Joe',
    lastName: 'Doe',
    gender: 'F',
    dateOfBirth: dayjs('1997-10-15'),
    address: 'Main street',
    city: 'Bucharest',
    newsletter: true,
    country: 'Kenya',
    phone: {
      countryCode: '+40',
      number: '712345678',
    },
    details: 'some details',
    hobbies: 'reading, playing guitar',
    index: 3,
  },
  {
    username: 'user',
    firstName: 'Joe',
    lastName: 'Doe',
    gender: 'F',
    dateOfBirth: dayjs('1997-10-15'),
    address: 'Main street',
    city: 'Bucharest',
    newsletter: true,
    country: 'Romania',
    phone: {
      countryCode: '+40',
      number: '712345678',
    },
    details: 'some details',
    hobbies: 'reading, playing guitar',
    index: 4,
  },
  {
    username: 'user5',
    firstName: 'Joe',
    lastName: 'Doe',
    gender: 'F',
    dateOfBirth: dayjs('1997-10-15'),
    address: 'Main street',
    city: 'Bucharest',
    newsletter: true,
    country: 'Romania',
    phone: {
      countryCode: '+40',
      number: '712345678',
    },
    details: 'some details',
    hobbies:
      'reading, playing guitar, reading, playing guitar, reading, playing guitar, reading, playing guitar, reading, playing guitar',
    index: 5,
  },
  {
    username: 'user6',
    firstName: 'Joe',
    lastName: 'Doe',
    gender: 'F',
    dateOfBirth: dayjs('1997-10-15'),
    address: 'Main street',
    city: 'Bucharest',
    newsletter: true,
    country: 'Romania',
    phone: {
      countryCode: '+40',
      number: '712345678',
    },
    details: 'some details',
    hobbies: 'reading, playing guitar, reading, playing guitar',
    index: 6,
  },
];
