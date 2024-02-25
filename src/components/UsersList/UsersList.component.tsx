import type { User, UserPhone } from '~types';
import type { Dayjs } from 'dayjs';
import type { TableColumnsType } from 'antd';
import { Table, Checkbox, Space, Flex, Button, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { usersState, countriesState } from '../../atoms';
import { UserForm } from '../UserForm';
import { getCountries } from '../../pages/api/countries';

export default function UsersList() {
  const [usersList, setUsersList] = useRecoilState(usersState);
  const [, setCountries] = useRecoilState(countriesState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [entryToEdit, setEntryToEdit] = useState<User | null>(null);
  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    getCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const columns: TableColumnsType<User> = [
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
      defaultSortOrder: 'descend',
      sorter: (a, b) => sort(a.username as string, b.username as string),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      defaultSortOrder: 'descend',
      sorter: (a, b) => sort(a.gender as string, b.gender as string),
      filters: [
        { text: 'M', value: 'M' },
        { text: 'F', value: 'F' },
        { text: 'none', value: '' },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: 'Date of birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (dateOfBirth: Dayjs) => <p>{dayjs(dateOfBirth).format(dateFormat)}</p>,
      defaultSortOrder: 'descend',
      sorter: (a, b) => sort(a.dateOfBirth, b.dateOfBirth),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      defaultSortOrder: 'descend',
      sorter: (a, b) => sort(a.city as string, b.city as string),
    },
    {
      title: 'Newsletter',
      dataIndex: 'newsletter',
      key: 'newsletter',
      render: (isSubscribed: boolean) => <Checkbox disabled defaultChecked={isSubscribed} />,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      defaultSortOrder: 'descend',
      sorter: (a, b) => sort(a.country as string, b.country as string),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: UserPhone) => {
        return <p>{`${phone.countryCode}${phone.number}`}</p>;
      },
    },
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
            <p
              className="action-item"
              onClick={() => {
                handleClickEdit(record);
              }}
            >
              Edit
            </p>
            <p
              className="action-item"
              onClick={() => {
                handleDeleteEntry(record);
              }}
            >
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
        title={entryToEdit ? 'Edit user' : 'Add new user'}
        footer={null}
        onCancel={handleCloseModal}
        width="900px"
      >
        <UserForm
          onAddUser={handleAddUser}
          onEditUser={handleEditUser}
          form={form}
          userToEdit={entryToEdit}
        />
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

  function handleEditUser(userData: User) {
    setIsLoading(true);
    setIsModalOpen(false);

    setTimeout(() => {
      const updatedUsersList = usersList.map((user: User) =>
        user.index === userData.index ? userData : user
      );
      setUsersList(updatedUsersList);
      setIsLoading(false);
      setEntryToEdit(null);
    }, 1000);
  }

  function handleShowModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    form.resetFields();
    setEntryToEdit(null);
  }

  function handleClickEdit(entry: User) {
    setIsModalOpen(true);
    setEntryToEdit(entry);
  }

  function getNewUserIndex() {
    return usersList.length + 1;
  }

  function sort(a: string | Dayjs, b: string | Dayjs) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }
}
