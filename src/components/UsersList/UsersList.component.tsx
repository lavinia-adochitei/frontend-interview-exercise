import type { User, UserPhone } from '~types';
import type { Dayjs } from 'dayjs';
import type { TableColumnsType, InputRef, TableColumnType } from 'antd';
import { Table, Checkbox, Space, Flex, Button, Modal, Form, Input } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { usersState, countriesState } from '../../atoms';
import { UserForm } from '../UserForm';
import { getCountries } from '../../pages/api/countries';
import type { FilterDropdownProps } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';

type DataIndex = keyof User;

export default function UsersList() {
  const [usersList, setUsersList] = useRecoilState(usersState);
  const [, setCountries] = useRecoilState(countriesState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [entryToEdit, setEntryToEdit] = useState<User | null>(null);
  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';

  const [, setSearchText] = useState('');
  const [, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<User> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) ?? false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

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
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sort(a.username as string, b.username as string),
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sort(a.gender as string, b.gender as string),
      filters: [
        { text: 'M', value: 'M' },
        { text: 'F', value: 'F' },
        { text: 'N/A', value: '' },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: 'Date of birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (dateOfBirth: Dayjs) => <p>{dayjs(dateOfBirth).format(dateFormat)}</p>,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => sort(a.dateOfBirth, b.dateOfBirth),
    },
    {
      title: 'City',
      dataIndex: 'city',
      sortDirections: ['descend', 'ascend'],
      key: 'city',
      sorter: (a, b) => sort(a.city as string, b.city as string),
      ...getColumnSearchProps('city'),
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
      sortDirections: ['descend', 'ascend'],
      key: 'country',
      sorter: (a, b) => sort(a.country as string, b.country as string),
      ...getColumnSearchProps('country'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: UserPhone) => {
        const { countryCode, number } = phone;
        const hasPhoneNumber = countryCode && number;
        return <p>{hasPhoneNumber ? `${countryCode}${number}` : ''}</p>;
      },
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Hobbies',
      dataIndex: 'hobbies',
      key: 'hobbies',
      render: (hobbies: string) => <p style={{ width: '150px' }}>{hobbies}</p>,
      ...getColumnSearchProps('hobbies'),
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
          Add user
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
        title={entryToEdit ? 'Edit user details' : 'Add new user'}
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

  function handleReset(clearFilters: () => void, confirm: FilterDropdownProps['confirm']) {
    clearFilters();
    setSearchText('');
    confirm();
  }

  function handleSearch(
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
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
