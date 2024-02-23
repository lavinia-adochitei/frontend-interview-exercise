import type { User } from '~types';
import { Table, Checkbox, Tag, Space } from 'antd';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { usersState } from '../../atoms';

export default function UsersList() {
  const [usersList, setUsersList] = useRecoilState(usersState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        return hobbies.map((hobby: string) => (
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
            <p style={{ cursor: 'pointer', color: 'blue' }}>Edit</p>
            <p
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => handleDeleteEntry(record)}
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
      <p style={{ paddingTop: '20px', paddingBottom: '20px', fontSize: '20px', fontWeight: '600' }}>
        Users list
      </p>
      <Table
        columns={columns}
        dataSource={usersList}
        pagination={{ pageSize: 5 }}
        loading={isLoading}
      />
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
}
