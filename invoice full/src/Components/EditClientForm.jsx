import React from 'react';
import { Form, Input, Button, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Option } = Select;

const EditClientForm = () => {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values) => {
    console.log('Received values from form: ', values);
  };

  return (
    <Form
      form={form}
      name="edit-client"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        country: 'India',
        phoneCode: '+91',
      }}
      style={{ maxWidth: '500px', margin: 'auto' }}
    >
        <Form.Item
        name="clientLogo"
        label="Client Logo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload.Dragger name="files" action="/upload.do" listType="picture">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Choose logo or drop it here</p>
        </Upload.Dragger>
      </Form.Item>

      <Form.Item
        name="companyName"
        label="Company name"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input placeholder="Enter company name" />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First name"
      >
        <Input placeholder="Enter first name" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last name"
      >
        <Input placeholder="Enter last name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email address"
        rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>

      <Form.Item
        name="country"
        label="Country"
      >
        <Select>
          <Option value="India">India</Option>
          <Option value="England">England</Option>
          <Option value="USA">USA</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phoneCode"
        label="Phone code"
      >
        <Select style={{ width: '30%' }}>
          <Option value="+91">+91</Option>
          <Option value="+93">+1</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone number"
        >
        <Input type="number" placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item
        name="addressLine1"
        label="Address line 1"
      >
        <Input placeholder="Enter address line 1" />
      </Form.Item>

      <Form.Item
        name="postalCode"
        label="Postal code"
      >
        <Input type="number" placeholder="Enter postal code" />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
      >
        <Input placeholder="Enter city" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditClientForm;