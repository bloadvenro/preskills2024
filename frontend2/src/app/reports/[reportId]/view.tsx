"use client";

import { Button, Col, Flex, Row, Space, Typography } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

const getKeyLabel = (key: string) => {
  switch (key) {
    case "id": {
      return "Report ID";
    }

    case "name": {
      return "Report name";
    }

    case "userId": {
      return "Scientist (ID)";
    }

    case "status": {
      return "Status";
    }

    case "editDate": {
      return "Modified at";
    }

    case "comment": {
      return "Rejection reason";
    }

    case "fileId": {
      return "Attachment";
    }

    default: {
      return `Unknown field (${key})`;
    }
  }
};

enum ReportStatus {
  Created, // 0
  Approved, // 1
  Rejected, // 2
  Sent, // 3
}

const getValue = (key: string, value: any) => {
  switch (key) {
    case "id": {
      return value;
    }

    case "name": {
      return value;
    }

    case "userId": {
      return value;
    }

    case "status": {
      return ReportStatus[value];
    }

    case "editDate": {
      return new Date(Date.parse(value)).toLocaleString();
    }

    case "comment": {
      return value || "-";
    }

    case "fileId": {
      return "coming-soon.pdf";
    }

    default: {
      return `Unknown field (${key})`;
    }
  }
};

const ReportView: NextPage<any> = ({ data }: any) => {
  const router = useRouter();

  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Typography.Title>Report summary</Typography.Title>
        </Col>
      </Row>

      <ul style={{ marginTop: "20px" }}>
        {data.map(([key, value]: any) => {
          return (
            <li key={key} style={{ marginBottom: "2em" }}>
              <Row>
                <Col offset={6} span={3}>
                  <Typography.Text strong>{getKeyLabel(key)}</Typography.Text>
                </Col>
                <Col span={9}>
                  <Typography.Text>{getValue(key, value)}</Typography.Text>
                </Col>
              </Row>
            </li>
          );
        })}
      </ul>

      <Row style={{ marginTop: "40px" }} justify="start">
        <Col offset={6} span={12}>
          <Flex justify="space-between">
            <Space>
              <Button type="primary">Edit</Button>
              <Button type="primary">Approve</Button>
              <Button danger>Reject</Button>
            </Space>
            <Button type="link" onClick={() => router.push("/reports")}>
              Back to reports
            </Button>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default ReportView;
