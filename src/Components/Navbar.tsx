'use client';

import { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header } = Layout;

const UserNavbar = () => {
  const [open, setOpen] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <a onClick={() => alert('Logging out...')}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
        padding: '0 20px',
        borderBottom: '2px solid #d9d9d9',
      }}
    >
      {/* Left Side Logo */}
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'green' }}>
        <Link href="/">User Home Page</Link>
      </div>

      {/* Right Side Dropdown */}
      <Dropdown overlay={menu} trigger={["click"]} onOpenChange={setOpen} open={open}>
        <MenuOutlined style={{ fontSize: '24px', color: 'gray', cursor: 'pointer' }} />
      </Dropdown>
    </Header>
  );
};

export default UserNavbar;