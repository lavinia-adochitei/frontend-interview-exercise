import { Form, Input, Button, Switch, DatePicker, Checkbox, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { countriesState } from '../../atoms';
import type { Country, User } from '~types';
const { TextArea } = Input;

interface Props {
  onAddUser: (data: User) => void;
}
export default function AddUserForm({ onAddUser }: Props) {
  const [form] = Form.useForm();
  const [countries] = useRecoilState<Country[]>(countriesState);
  const dateFormat = 'YYYY-MM-DD';

  return (
    <Form form={form} labelCol={{ span: 4 }} layout="horizontal">
      <Form.Item
        label="Username"
        name="username"
        messageVariables={{ input: 'Username' }}
        rules={[
          { required: true, message: '${input} is required' },
          { min: 4, message: 'Min 4 characters' },
          { max: 80, message: 'Max 80 characters' },
          {
            pattern: new RegExp('^[a-zA-Z0-9#!@]*$'),
            message: '${input} must include only letters, digits or #@!',
          },
        ]}
        validateTrigger="onChange"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="First name"
        name="firstName"
        messageVariables={{ input: 'First name' }}
        rules={[
          { required: true, message: '${input} is required' },
          { min: 2, message: 'Min 2 characters' },
          { max: 80, message: 'Max 80 characters' },
          {
            pattern: new RegExp("^[a-zA-Z']*$"),
            message: "${input} must include only letters or '",
          },
        ]}
        validateTrigger="onChange"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastName"
        messageVariables={{ input: 'Last name' }}
        rules={[
          { required: true, message: '${input} is required' },
          { min: 2, message: 'Min 2 characters' },
          { max: 80, message: 'Max 80 characters' },
          {
            pattern: new RegExp("^[a-zA-Z']*$"),
            message: "${input} must include only letters or '",
          },
        ]}
        validateTrigger="onChange"
      >
        <Input />
      </Form.Item>
      <Form.Item label="Gender" name="gender" valuePropName="checked">
        <Switch checkedChildren="F" unCheckedChildren="M" />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="dateOfBirth"
        messageVariables={{ input: 'Date of birth' }}
        rules={[{ required: true, message: '${input} is required' }]}
        validateTrigger="onChange"
      >
        <DatePicker minDate={dayjs(new Date(getMinDate()))} />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>
      <Form.Item label="City" name="city">
        <Input />
      </Form.Item>
      <Form.Item
        label="Register to newsletter"
        name="newsletter"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item label="Country" name="country">
        <Select options={getCountryOptions()} />
      </Form.Item>
      <Form.Item label="Details" name="details">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Phone number" name="phone">
        <Space.Compact>
          <Input style={{ width: '20%' }} />
          <Input style={{ width: '80%' }} />
        </Space.Compact>
      </Form.Item>
      <Form.Item label="Hobbies" name="hobbies">
        <TextArea rows={4} />
      </Form.Item>
      <Button type="primary" onClick={handleAddUser}>
        Add user
      </Button>
    </Form>
  );

  function handleAddUser() {
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      const getGender = (gender: boolean | undefined) => {
        switch (gender) {
          case true:
            return 'F';
          case false:
            return 'M';
          case undefined:
            return '';
          default:
            return '';
        }
      };
      const dataToSave = {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: getGender(values.gender),
        dateOfBirth: dayjs(values.dateOfBirth).format(dateFormat),
        address: values.address,
        city: values.city,
        newsletter: values.newsletter,
        country: values.country,
        phone: values.phone,
        details: values.details,
        hobbies: values.hobbies,
      };
      onAddUser(dataToSave);
      form.resetFields();
    });
  }

  function getMinDate() {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);
    return minDate;
  }

  function getCountryOptions() {
    return countries.map((country) => {
      const countryName = country.name.common;
      return { value: countryName, label: countryName };
    });
  }
}
