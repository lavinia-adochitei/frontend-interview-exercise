import type { User } from '~types';
import { Table, Checkbox, Tag, Space, Flex, Button, Modal } from 'antd';
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
      render: (hobbies: string[]) => {
        return hobbies?.map((hobby: string) => (
          <Tag color="blue" key={hobby}>
            {hobby.toUpperCase()}
          </Tag>
        ));
      },
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

      <Modal open={isModalOpen} title="Add new user" footer={null} onCancel={handleCloseModal}>
        <AddUserForm onAddUser={handleAddUser} />
      </Modal>
    </>
  );

  function handleDeleteEntry(entry: User) {
    setIsLoading(true);
    setTimeout(() => {
      const updatedList = usersList.filter((user) => user.key !== entry.key);
      setUsersList(updatedList);
      setIsLoading(false);
    }, 1000);
  }

  function handleShowModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleAddUser(userData: User) {
    setIsLoading(true);
    setIsModalOpen(false);

    setTimeout(() => {
      setUsersList((oldList) => [...oldList, userData]);
      setIsLoading(false);
    }, 1000);
  }
}
