"use client";

import React from "react";
import { Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { faker } from "@faker-js/faker";
import {
  AimOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EditTwoTone,
  UpOutlined,
} from "@ant-design/icons";

enum ReportStatus {
  Created = "Created",
  Approved = "Approved",
  Rejected = "Rejected",
  Sent = "Sent",
}

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
  name: faker.commerce.productName(),
  scientist: faker.person.fullName(),
  modifiedAt: faker.date.anytime(),
  status: faker.helpers.enumValue(ReportStatus),
  actions: ["1", "2"],
}));

const columns: TableColumnsType<DataType> = [
  {
    title: "Report name",
    dataIndex: "name",
  },
  {
    title: "Scientist name",
    dataIndex: "scientist",
    filters: data.map((record) => ({ value: record.scientist, text: record.scientist })),
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.scientist.startsWith(value as string),
  },
  {
    title: "Modified date",
    dataIndex: "modifiedAt",
    defaultSortOrder: "descend",
    sorter: (a, b) => +a.modifiedAt - +b.modifiedAt,
    render: (date) => date.toLocaleDateString(),
  },
  {
    title: "Status",
    dataIndex: "status",
    defaultFilteredValue: [ReportStatus.Created, ReportStatus.Approved, ReportStatus.Rejected],
    filters: Array.from(new Set(data.map((record) => record.status))).map((status) => ({
      value: status,
      text: status,
    })),
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.status === value,
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (availableActions) => {
      const actions = [
        {
          name: "1",
          icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "1.32em" }} />,
        },
        {
          name: "1",
          icon: <CloseCircleTwoTone twoToneColor="#f00" style={{ fontSize: "1.32em" }} />,
        },
        {
          name: "2",
          icon: <EditTwoTone style={{ fontSize: "1.32em" }} />,
        },
      ].filter((action) => availableActions.find((name: string) => name === action.name));

      return (
        <Space size="middle">
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

const Reports: React.FC = () => <Table columns={columns} dataSource={data} onChange={onChange} />;

export default Reports;
