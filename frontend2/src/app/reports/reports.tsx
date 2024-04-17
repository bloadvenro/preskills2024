"use client";

import React from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { green, red } from "@ant-design/colors";
import { faker } from "@faker-js/faker";
import { CloseOutlined, EditTwoTone, CheckOutlined } from "@ant-design/icons";
import Link from "next/link";

enum ReportStatus {
  Created, // 0
  Approved, // 1
  Rejected, // 2
  Sent, // 3
}

const tagMap = {
  [ReportStatus.Created]: <Tag color="processing">{ReportStatus[ReportStatus.Created]}</Tag>,
  [ReportStatus.Approved]: <Tag color="success">{ReportStatus[ReportStatus.Approved]}</Tag>,
  [ReportStatus.Rejected]: <Tag color="error">{ReportStatus[ReportStatus.Rejected]}</Tag>,
  [ReportStatus.Sent]: <Tag color="default">{ReportStatus[ReportStatus.Sent]}</Tag>,
};

interface DataType {
  key: React.Key;
  name: string;
  scientist: string;
  modifiedAt: Date;
  status: ReportStatus;
  actions: any;
}

const data: DataType[] = Array.from({ length: 30 }).map((_, i) => ({
  key: i.toString(),
  name: faker.commerce.productDescription(),
  scientist: faker.person.fullName(),
  modifiedAt: faker.date.anytime(),
  status: faker.helpers.enumValue(ReportStatus),
  actions: ["1", "2"],
}));

const columns: TableColumnsType<DataType> = [
  {
    title: "Report name",
    dataIndex: "name",
    render: (value) => (
      <Link href="/reports/1">
        <Button
          type="link"
          style={{
            wordBreak: "break-all",
            whiteSpace: "normal",
            textAlign: "left",
          }}
        >
          {value}
        </Button>
      </Link>
    ),
  },
  {
    title: "Scientist name",
    dataIndex: "scientist",
    filters: data.map((record) => ({ value: record.scientist, text: record.scientist })),
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.scientist.startsWith(value as string),
    width: "20%",
  },
  {
    title: "Modified date",
    dataIndex: "modifiedAt",
    defaultSortOrder: "descend",
    sorter: (a, b) => +a.modifiedAt - +b.modifiedAt,
    render: (date) => date.toLocaleDateString(),
    width: "15%",
  },
  {
    title: "Status",
    dataIndex: "status",
    defaultFilteredValue: [
      ReportStatus.Created.toString(),
      ReportStatus.Approved.toString(),
      ReportStatus.Rejected.toString(),
    ],
    filters: Array.from(new Set(data.map((record) => record.status)))
      .sort()
      .map((status) => ({
        value: status.toString(),
        text: `${ReportStatus[status]} ${status}`,
      })),
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.status.toString() === value.toString(),
    render: (value: ReportStatus) => tagMap[value],
    sorter: (a, b) => a.status - b.status,
    width: "10%",
  },
  {
    width: "10%",
    title: "Actions",
    dataIndex: "actions",
    render: (availableActions) => {
      const actions = [
        {
          name: "1",
          icon: (
            <CheckOutlined
              style={{ color: green[4] }}
              onClick={() => alert("APPROVED")}
              title="Approve"
            />
          ),
        },
        {
          name: "1",
          icon: (
            <CloseOutlined
              style={{ color: red[3] }}
              onClick={() => alert("REJECTED")}
              title="Reject"
            />
          ),
        },
        {
          name: "2",
          icon: (
            <Link href={`/report/1`}>
              <EditTwoTone title="Edit" />
            </Link>
          ),
        },
      ].filter((action) => availableActions.find((name: string) => name === action.name));

      return (
        <Space size="large" style={{ fontSize: "1.32em" }}>
          {actions.map((action, i) => (
            <div key={i}>{action.icon}</div>
          ))}
        </Space>
      );
    },
  },
];

const onChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Reports: React.FC = () => (
  <Table
    tableLayout="fixed"
    columns={columns}
    dataSource={data}
    onChange={onChange}
    className="w-full"
  />
);

export default Reports;
