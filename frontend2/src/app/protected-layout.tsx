"use client";

import React from "react";
import { Avatar, Breadcrumb, Button, Dropdown, Flex, Layout, Menu, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header, Content, Footer } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
          <div style={{ flex: "1" }}>
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={items}
              style={{ flex: 1, minWidth: 0 }}
            />
          </div>
          <Dropdown
            menu={{
              style: {
                minWidth: "100px",
              },
              items: [
                {
                  label: (
                    <Link href="/logout">
                      <Button type="link">Log out</Button>
                    </Link>
                  ),
                  key: "0",
                },
              ],
            }}
            trigger={["click"]}
          >
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{
                cursor: "pointer",
              }}
            />
          </Dropdown>
        </Flex>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default ProtectedLayout;
