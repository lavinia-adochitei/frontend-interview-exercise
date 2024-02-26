import UserForm from './UserForm.component';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import '../../utils/test-utils';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { USERS } from '~mocks';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
);

const mockOnAddUser = jest.fn();
const mockOnEditUser = jest.fn();

import { Form } from 'antd';
import { User } from '~types';

const renderUserForm = (userToEdit: User | null = null) => {
  // @ts-ignore
  const FormWrapper = (props) => {
    const [form] = Form.useForm();

    return <UserForm form={form} {...props} />;
  };

  const { getByTestId, getByText, queryByText } = render(
    <RecoilRoot>
      <FormWrapper userToEdit={userToEdit} onAddUser={mockOnAddUser} onEditUser={mockOnEditUser} />
    </RecoilRoot>
  );

  return { getByTestId, getByText, queryByText };
};

describe('UserForm component', () => {
  it('should render the form without prepopulating the fields', () => {
    const { getByTestId } = renderUserForm();
    expect(getByTestId('user-form')).toBeInTheDocument();
    expect(getByTestId('username-input')).toBeInTheDocument();
    expect(getByTestId('first-name-input')).toBeInTheDocument();
    expect(getByTestId('last-name-input')).toBeInTheDocument();
  });

  it('should render the form with prepopulated fields', () => {
    const firstUser = USERS[0];
    const { getByTestId } = renderUserForm(firstUser);
    expect(getByTestId('username-input')).toHaveValue(firstUser.username);
    expect(getByTestId('first-name-input')).toHaveValue(firstUser.firstName);
    expect(getByTestId('last-name-input')).toHaveValue(firstUser.lastName);
  });

  it('should validate username field', async () => {
    const { getByText, getByTestId } = renderUserForm();
    const usernameInput = getByTestId('username-input');
    fireEvent.click(getByText('Add user'));

    let error;
    await waitFor(() => {
      error = getByText('Username is required');
      expect(error).toBeInTheDocument();
    });

    userEvent.type(usernameInput, 'tst');
    await waitFor(() => {
      expect(usernameInput).toHaveValue('tst');
      error = getByText('Min 4 characters');
      expect(error).toBeInTheDocument();
    });

    userEvent.type(usernameInput, '$^3');
    await waitFor(() => {
      expect(usernameInput).toHaveValue('tst$^3');
      error = getByText('Username must include only letters, digits or #@!');
      expect(error).toBeInTheDocument();
    });
  });

  it('should validate first name field', async () => {
    const { getByText, getByTestId } = renderUserForm();
    const firstNameInput = getByTestId('first-name-input');
    fireEvent.click(getByText('Add user'));

    let error;
    await waitFor(() => {
      error = getByText('First name is required');
      expect(error).toBeInTheDocument();
    });

    userEvent.type(firstNameInput, 'L');
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('L');
      error = getByText('Min 2 characters');
      expect(error).toBeInTheDocument();
    });

    userEvent.type(firstNameInput, 'av97');
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('Lav97');
      error = getByText("First name must include only letters or '");
      expect(error).toBeInTheDocument();
    });
  });
});
