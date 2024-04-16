"use client";

import { LockOutlined, UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import { Form, Input, Button, Col, Row, Typography } from "antd";
import { useFormState, useFormStatus } from "react-dom";

const initialValues = {
  username: "",
  password: "",
};

const initialState = {
  values: initialValues,
};

type Values = typeof initialValues;

interface FormState {
  values: Values;
}

const onFormStateChange = (prevState: FormState, formData: FormData): FormState => {
  const values: Values = {
    username: formData.get("username")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  };

  return {
    values,
  };
};

export default function SignInForm() {
  const [state, action] = useFormState(onFormStateChange, initialState);

  return (
    <Row justify="center" align="middle" className="min-h-screen">
      <Col span={8}>
        <Typography.Title level={2}>Sign in</Typography.Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={state.values}
          action={action}
          onFinish={() => console.log("YAY")}
          onFinishFailed={() => console.log("PPC")}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "please input your username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "please input your password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="password"
            />
          </Form.Item>

          <Form.Item>
            <LoginButton />
            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
              {false && (
                <>
                  <ExclamationCircleOutlined className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{"err msg not implemented"}</p>
                </>
              )}
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className="w-full"
      disabled={pending}
      htmlType="submit"
      type="primary"
    >
      log in
    </Button>
  );
}
