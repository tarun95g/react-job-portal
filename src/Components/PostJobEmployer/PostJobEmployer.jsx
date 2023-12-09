import { Button, Form, Input, Select } from 'antd';
import { locationOptions } from '../../Constants/search';
import { useAlertContext } from '../../Contexts/AlertContext/AlertContext';
import { useAuthContext } from '../../Contexts/Auth/Auth';
import { getJobSchema } from '../../Utils/jobs';

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

const PostJobEmployer = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const { openNotification } = useAlertContext()
  const { postJob } = useAuthContext();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    openNotification({ type: 'success', message: 'Job Posted Successfully' })
    postJob(getJobSchema(values));
    onSubmit(values);
    onReset();
  };

  return (
    <Form
      {...layout}
      form={form}
      labelAlign={'left'}
      name="nest-messages"
      onFinish={onFinish}
      style={{}}
      validateMessages={validateMessages}
    >
      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name={'jobTitle'}
        label="Job Title">
        <Input placeholder={'Select title'} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name={'companyName'}
        label="Company Name">
        <Input placeholder={'Select Company'} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name={'location'}
        label="Job Location">

        <Select
          placeholder={'Select Location'}
          options={locationOptions}
        />

      </Form.Item>


      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name={['experience']}
        label="Experience">
        <Input placeholder={'Write experience eg (0-2 years)'} />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
          },
        ]}
        name={['tagsAndSkills']}
        label="Tags and Skills">
        <Input placeholder={'Write skills'} />
      </Form.Item>

      <Form.Item
        rules={[]}
        name={['salary']}
        label="Salary">
        <Input placeholder={'Write Salary range eg (1.75 lakh - 3 lakh)'} />
      </Form.Item>

      <Form.Item
        rules={[

        ]}
        name={'jobDescription'}
        label="Job Description">
        <Input.TextArea placeholder={'Write description, including markup <>, can be a long one too ... '} size='large' autoSize />
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

export default PostJobEmployer;

