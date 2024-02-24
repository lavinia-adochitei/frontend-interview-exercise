import type { User } from '~types';
import { Table, Checkbox, Space, Flex, Button, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { usersState, countriesState } from '../../atoms';
import { AddUserForm } from '../AddUserForm';
import { getCountries } from '../../pages/api/countries';

export default function UsersList() {
  const [usersList, setUsersList] = useRecoilState(usersState);
  const [, setCountries] = useRecoilState(countriesState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      render: (text: number) => <p>{text}</p>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    { title: 'Date of birth', dataIndex: 'dateOfBirth', key: 'dateOfBirth' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    {
      title: 'Newsletter',
      dataIndex: 'newsletter',
      key: 'newsletter',
      render: (isSubscribed: boolean) => <Checkbox disabled defaultChecked={isSubscribed} />,
    },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Hobbies',
      dataIndex: 'hobbies',
      key: 'hobbies',
      render: (hobbies: string) => <p style={{ width: '150px' }}>{hobbies}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => {
        return (
          <Space size="middle">
            <p className="action-item">Edit</p>
            <p className="action-item" onClick={() => handleDeleteEntry(record)}>
              Delete
            </p>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="center">
        <p className="label">Users list</p>
        <Button type="primary" onClick={handleShowModal}>
          Add new user
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={usersList}
        pagination={{ pageSize: 5 }}
        loading={isLoading}
      />

      <Modal
        open={isModalOpen}
        title="Add new user"
        footer={null}
        onCancel={handleCloseModal}
        width="800px"
      >
        <AddUserForm onAddUser={handleAddUser} form={form} />
      </Modal>
    </>
  );

  function handleDeleteEntry(entry: User) {
    setIsLoading(true);
    setTimeout(() => {
      const updatedList = usersList.filter((user) => user.index !== entry.index);
      setUsersList(updatedList);
      setIsLoading(false);
    }, 1000);
  }

  function handleShowModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    form.resetFields();
  }

  function handleAddUser(userData: User) {
    setIsLoading(true);
    setIsModalOpen(false);

    setTimeout(() => {
      const newUser = {
        ...userData,
        index: getNewUserIndex(),
      };
      setUsersList((oldList) => [...oldList, newUser]);
      setIsLoading(false);
    }, 1000);
  }

  function getNewUserIndex() {
    return usersList.length + 1;
  }
}
