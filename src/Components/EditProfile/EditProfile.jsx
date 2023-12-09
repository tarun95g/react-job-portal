import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAlertContext } from '../../Contexts/AlertContext/AlertContext';
import { useAuthContext } from '../../Contexts/Auth/Auth';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const EditProfile = () => {
  const [form] = Form.useForm();

  const { openNotification } = useAlertContext()
  const { updateUser, auth: { user } } = useAuthContext();
  const navigate = useNavigate();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    openNotification({ type: 'success', message: 'Profile Edited Successfully' });
    updateUser(values);

    navigate({ pathname: `../` })
    onReset();
  };

  return (
    <Form
      {...layout}
      form={form}
      labelAlign={'left'}
      name="nest-messages"
      onFinish={onFinish}
      initialValues={{ ...user }}
      style={{}}
      validateMessages={validateMessages}
    >

      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name={['email']}
        label="User Id">
        <Input disabled placeholder={'Select user id'} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name={['details', 'name']}
        label="Name">
        <Input placeholder={'Enter user name'} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: false,
          },
        ]}
        name={['details', 'experience']}
        label="Experience">
        <Input placeholder={'Write your experience eg (0-2 years)'} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: false,
          },
        ]}
        name={['details', 'skills']}
        label="Tags and Skills">
        <Input placeholder={'Write skills (comma separated for better job search)'} />
      </Form.Item>

      <Form.Item
        rules={[]}
        name={['details', 'salary']}
        label="Pay expectation ">
        <Input placeholder={'Write Salary range eg (1.75 lakh - 3 lakh)'} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: false,
          },
        ]}
        name={['details', 'github_username']}
        label="Github User Id">
        <Input placeholder={'Write github user name'} />
      </Form.Item>



      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProfile;

