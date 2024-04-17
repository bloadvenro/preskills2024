"use client";

import { LockOutlined, UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import { Form, Input, Button, Col, Row, Typography, Space } from "antd";
import { useFormState, useFormStatus } from "react-dom";

import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import Link from "next/link";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "attachment",
  multiple: false,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

interface Values {
  name: string;
  attachment: File | null;
}

const initialValues: Values = {
  name: "",
  attachment: null,
};

const initialState = {
  values: initialValues,
};

interface FormState {
  values: Values;
}

const onFormStateChange = (prevState: FormState, formData: FormData): FormState => {
  const values: Values = {
    name: formData.get("name")?.toString() ?? "",
    attachment: formData.get("attachment") as any,
  };

  return {
    values,
  };
};

export default function ReportEditForm({ data }: any) {
  const [state, action] = useFormState(onFormStateChange, {
    ...initialState,
    values: { ...initialState.values, ...data },
  } as any);

  return (
    <Row justify="center" align="middle" className="min-h-screen">
      <Col span={8}>
        <Typography.Title level={2}>Edit report</Typography.Title>
        <Form
          layout="vertical"
          initialValues={state.values}
          action={action}
          onFinish={(values) => console.log("YAY", values)}
          onFinishFailed={() => console.log("PPC")}
        >
          <Space direction="vertical" size="middle">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "report name is required!",
                },
              ]}
            >
              <Input placeholder="Report name" name="name" />
            </Form.Item>
            <Form.Item
              name="attachment"
              label="Attachment"
              rules={[
                {
                  required: true,
                  message: "please input your password!",
                },
              ]}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company
                  data or other banned files.
                </p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Space direction="vertical" className="w-full">
                <SubmitButton />
                <CancelButton />
              </Space>
              <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                {false && (
                  <>
                    <ExclamationCircleOutlined className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{"err msg not implemented"}</p>
                  </>
                )}
              </div>
            </Form.Item>
          </Space>
        </Form>
      </Col>
    </Row>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className="w-full"
      disabled={pending}
      htmlType="submit"
      type="primary"
    >
      Proceed
    </Button>
  );
}

function CancelButton() {
  return (
    <Link href="/reports" className="w-full">
      <Button type="link" className="w-full">
        Back to reports
      </Button>
    </Link>
  );
}
