import { Form, Input, Button, Switch, DatePicker, Checkbox, Select, Space } from 'antd';
import type { FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { countriesState } from '../../atoms';
import type { Country, User } from '~types';
const { TextArea } = Input;

interface Props {
  form: FormInstance;
  userToEdit: User | null;
  onAddUser: (data: User) => void;
  onEditUser: (data: User) => void;
}
export default function UserForm({ form, userToEdit, onAddUser, onEditUser }: Props) {
  const [countries] = useRecoilState<Country[]>(countriesState);

  let formInitialValues: Partial<User> = {
    username: '',
    firstName: '',
    lastName: '',
    gender: undefined,
    address: '',
    city: '',
    newsletter: undefined,
    country: '',
    details: '',
    phone: {
      countryCode: '',
      number: '',
    },
    hobbies: '',
  };

  if (userToEdit) {
    const {
      username,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      address,
      city,
      newsletter,
      country,
      details,
      phone,
      hobbies,
    } = userToEdit;

    formInitialValues = {
      ...formInitialValues,
      username,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      address,
      city,
      newsletter,
      country,
      details,
      phone,
      hobbies,
    };
    form.setFieldsValue(formInitialValues);
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      layout="horizontal"
      className="add-user-form"
      data-testid="user-form"
    >
      <div className="form-column">
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
          className="form-item"
        >
          <Input className="form-input" data-testid="username-input" />
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
          className="form-item"
        >
          <Input className="form-input" data-testid="first-name-input" />
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
          className="form-item"
        >
          <Input className="form-input" data-testid="last-name-input" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          valuePropName="checked"
          className="form-item"
          labelCol={{ span: 4 }}
        >
          <Switch checkedChildren="F" unCheckedChildren="M" style={{ marginLeft: '20px' }} />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="dateOfBirth"
          messageVariables={{ input: 'Date of birth' }}
          rules={[{ required: true, message: '${input} is required' }]}
          validateTrigger="onChange"
          className="form-item"
        >
          <DatePicker minDate={dayjs(new Date(getMinDate()))} />
        </Form.Item>
        <Form.Item label="Address" name="address" className="form-item">
          <Input className="form-input" />
        </Form.Item>
        <Form.Item label="City" name="city" className="form-item">
          <Input className="form-input" />
        </Form.Item>
        <Form.Item
          label="Register to newsletter"
          name="newsletter"
          valuePropName="checked"
          initialValue={false}
          className="form-item"
          labelCol={{ span: 12 }}
        >
          <Checkbox />
        </Form.Item>
      </div>
      <div className="form-column">
        <Form.Item label="Country" name="country" className="form-item">
          <Select className="form-input" options={getCountryOptions()} />
        </Form.Item>
        <Form.Item label="Details" name="details" className="form-item">
          <TextArea className="form-input" rows={4} />
        </Form.Item>
        <Form.Item label="Phone number" className="form-item">
          <Space.Compact className="form-input">
            <Form.Item noStyle name={['phone', 'countryCode']}>
              <Select style={{ width: '30%' }} options={getCountryCodeOptions()} />
            </Form.Item>
            <Form.Item noStyle name={['phone', 'number']}>
              <Input style={{ width: '70%' }} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item label="Hobbies" name="hobbies" className="form-item">
          <TextArea className="form-input" rows={4} />
        </Form.Item>
        <Button type="primary" onClick={handleClickButton} className="add-user-button">
          {userToEdit ? 'Edit user' : 'Add user'}
        </Button>
      </div>
    </Form>
  );

  function handleClickButton() {
    form
      .validateFields()
      .then(() => {
        const values = form.getFieldsValue();
        let dataToSave: User = {
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          gender: getGender(values.gender),
          dateOfBirth: values.dateOfBirth,
          address: values.address,
          city: values.city,
          newsletter: values.newsletter,
          country: values.country,
          phone: values.phone,
          details: values.details,
          hobbies: values.hobbies,
        };
        form.resetFields();

        if (userToEdit) {
          dataToSave = {
            ...dataToSave,
            index: userToEdit.index,
          };
          onEditUser(dataToSave);
          return;
        }

        onAddUser(dataToSave);
      })
      .catch((error) => {
        console.log(error);
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

  function getCountryCodeOptions() {
    return countries.map((country) => {
      const { root, suffixes } = country.idd;
      return {
        value: `${root}${suffixes[0]}`,
        label: `${country.flag} ${root}${suffixes[0]}`,
      };
    });
  }

  function getGender(gender: boolean | undefined | string) {
    switch (gender) {
      case true:
        return 'F';
      case false:
        return 'M';
      case undefined:
        return '';
      case 'F':
        return 'F';
      case 'M':
        return 'M';
      default:
        return '';
    }
  }
}
