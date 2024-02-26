import UsersList from './UsersList.component';
import { render, fireEvent, waitFor, getByText, getAllByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import { USERS } from '~mocks';
import '../../utils/test-utils';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
);

jest.mock('../../pages/api/countries', () => ({
  getCountries: jest.fn().mockResolvedValue([
    {
      name: {
        common: 'Cyprus',
        official: 'Republic of Cyprus',
        nativeName: {
          ell: {
            official: 'Δημοκρατία της Κύπρος',
            common: 'Κύπρος',
          },
          tur: {
            official: 'Kıbrıs Cumhuriyeti',
            common: 'Kıbrıs',
          },
        },
      },
      idd: {
        root: '+3',
        suffixes: ['57'],
      },
      flag: '🇨🇾',
    },
    {
      name: {
        common: 'Vatican City',
        official: 'Vatican City State',
        nativeName: {
          ita: {
            official: 'Stato della Città del Vaticano',
            common: 'Vaticano',
          },
          lat: {
            official: 'Status Civitatis Vaticanæ',
            common: 'Vaticanæ',
          },
        },
      },
      idd: {
        root: '+3',
        suffixes: ['906698', '79'],
      },
      flag: '🇻🇦',
    },
  ]),
}));

describe('UsersList component', () => {
  afterEach(() => jest.clearAllMocks());

  it('should display the `Add user` button', () => {
    const { getByText } = render(
      <RecoilRoot>
        <UsersList />
      </RecoilRoot>
    );
    expect(getByText('Add user')).toBeInTheDocument();
  });

  it('should open modal on `Add user` button click', async () => {
    const { getByText } = render(
      <RecoilRoot>
        <UsersList />
      </RecoilRoot>
    );
    fireEvent.click(getByText('Add user'));
    await waitFor(() => {
      expect(getByText('Add new user')).toBeInTheDocument();
    });
  });

  it('should display user details correctly for the first user', async () => {
    const { getAllByText, getByText } = render(
      <RecoilRoot>
        <UsersList />
      </RecoilRoot>
    );
    const firstUser = USERS[0];
    await waitFor(() => {
      expect(getByText(firstUser.username)).toBeInTheDocument();
      expect(getAllByText('F')[0]).toBeInTheDocument();
      expect(getAllByText('1997-10-15')[0]).toBeInTheDocument();
      expect(getAllByText('Bucharest')[0]).toBeInTheDocument();
      expect(getAllByText('Romania')[0]).toBeInTheDocument();
      expect(getAllByText('+40712345678')[0]).toBeInTheDocument();
      expect(getAllByText('reading, playing guitar')[0]).toBeInTheDocument();
    });
  });

  it('should delete the first user on delete button click', async () => {
    const { getAllByText, queryByText } = render(
      <RecoilRoot>
        <UsersList />
      </RecoilRoot>
    );
    const firstUser = USERS[0];

    await waitFor(() => {
      fireEvent.click(getAllByText('Delete')[0]);
    });

    await waitFor(() => {
      expect(queryByText(firstUser.username)).not.toBeInTheDocument();
    });
  });

  it('should display edit modal and the details for the first user', async () => {
    const { getByText, getAllByText, getByTestId } = render(
      <RecoilRoot>
        <UsersList />
      </RecoilRoot>
    );
    const firstUser = USERS[0];

    await waitFor(() => {
      fireEvent.click(getAllByText('Edit')[0]);
    });

    await waitFor(() => {
      expect(getByText('Edit user details')).toBeInTheDocument();
      const usernameInput = getByTestId('username-input');
      const firstNameInput = getByTestId('first-name-input');
      const lastNameInput = getByTestId('last-name-input');
      expect(usernameInput).toHaveValue(firstUser.username);
      expect(firstNameInput).toHaveValue(firstUser.firstName);
      expect(lastNameInput).toHaveValue(firstUser.lastName);
    });
  });
});
