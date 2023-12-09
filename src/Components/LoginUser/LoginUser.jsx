import { Button, Radio, Form, Input } from 'antd';

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthContext, USER_TYPE } from '../../Contexts/Auth/Auth';
import { getLoginType } from '../../Utils/jobs';


const LoginUser = () => {
  const [searchParams] = useSearchParams();
  const { loginUser, auth: { isLoading } } = useAuthContext();
  const userType = getLoginType(searchParams.get('user'))

  const onFinish = async (values) => {
    await loginUser({ userType, params: values });
  };


  return (
    <Form
      labelAlign={'left'}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 32,
      }}
      style={{ maxWidth: '600px' }}
      initialValues={{ userType: userType }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {!userType && <Form.Item
        label="Login as"
        name="userType"
        rules={[
          {
            required: true,
            message: 'Please select type',
          },
        ]}>
        <Radio.Group>
          <Radio value={USER_TYPE.FREELANCE}> Candidate </Radio>
          <Radio value={USER_TYPE.EMPLOYER}> Employer </Radio>
        </Radio.Group>
      </Form.Item>}

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button loading={isLoading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};



export default LoginUser;
