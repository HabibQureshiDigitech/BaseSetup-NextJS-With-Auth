
'use client'

import { useState, useEffect } from "react";
import '@/Css/DashboardLayout.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  WechatOutlined,
  StarOutlined,
  FlagOutlined,
  SettingOutlined,
  RightCircleFilled,
  TeamOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  TrophyOutlined,
  ToolOutlined,
  FolderOutlined,
  ProjectOutlined,
  CalendarOutlined,
  // CheckCircleOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// import { useCookies } from "react-cookie";

const { Header, Sider, Content } = Layout;

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // initialize false for SSR
  
    useEffect(() => {
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        if (!mobile) {
          setDrawerVisible(false);
        }
      };
  
      handleResize(); // Initial check
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const toggleDrawer = () => setDrawerVisible(!drawerVisible);
    const toggleSidebar = () => setCollapsed(!collapsed);
    const router = useRouter()


    const handleLogout = () => {
      deleteCookie('role');
      router.push('/login');
    };
  
    const role = getCookie('role') || 'undefined';
    const hiddenForVendor = ['Subjects', 'Attendance', 'Employee', 'Finance', 'Profits'];
  
    const allMenuItems = [
      { key: '1', icon: <UserOutlined />, label: 'Dashboard', href: '/dashboard' },
      { key: '2', icon: <UserOutlined />, label: 'Subjects', href: '/dashboard' },
      { key: '3', icon: <UserOutlined />, label: 'Products', href: '/dashboard' },
      { key: '4', icon: <UserOutlined />, label: 'Attendance', href: '/dashboard' },
      { key: '5', icon: <UserOutlined />, label: 'Projects', href: '/dashboard' },
      { key: '6', icon: <UserOutlined />, label: 'Employee', href: '/dashboard' },
      { key: '7', icon: <UserOutlined />, label: 'Finance', href: '/dashboard' },
      { key: '8', icon: <UserOutlined />, label: 'Profits', href: '/dashboard' },
    ];
  
    const visibleItems = role === 'vendor'
      ? allMenuItems.filter(item => !hiddenForVendor.includes(item.label))
      : allMenuItems;
  
    const menuItems = [
      ...visibleItems.map(item => ({
        key: item.key,
        icon: item.icon,
        label: <Link href={item.href}>{item.label}</Link>
      })),
      {
        key: '10',
        icon: <LogoutOutlined />,
        label: <span onClick={handleLogout}>Logout</span>
      }
    ];
  
    
    
          const queryClient = new QueryClient();

          
      


  return (
    <QueryClientProvider client={queryClient}>
<Layout className="h-screen">
        {/* Sidebar */}
        {!isMobile && (
          <Sider
            // collapsible
            collapsed={collapsed}
            style={{
              background: "gray",
              height: "100vh",
              position: "fixed",
              left: 0,
              transition: "width 0.3s ease",
              overflowX: "hidden",
            }}
            className="hide-scrollbar" 
          >
            
            <div className="mt-4 mb-4">
        <div className="flex justify-center align-middle text-center">
  <img src="/logo.JPG" className="w-15 h-15 rounded mt-2" alt="Logo" />
 
</div>

        </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-auto p-2">
            <Menu 
            items={menuItems}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{
              background: "transparent",
              color: "white",
              overflowX: "auto"
            }}
              />
            {/* <Menu.Item style={{ color: "white" }} key="10" onClick={handleLogout} icon={<LogoutOutlined />}>Logout</Menu.Item> */}
         
            </div>

            {/* Sidebar Footer */}
            {/* {!collapsed && (
              <div className="absolute bottom-0 w-full bg-gray-200 py-3 text-center text-purple-800 font-bold flex justify-around">
                <DashboardOutlined />
                <UserOutlined />
                <LogoutOutlined />
              </div>
            )} */}
          </Sider>
        )}

        {/* Drawer for Mobile */}
        {isMobile && (
          <Drawer
            title="Dashboard"
            placement="left"
            closable
            onClose={toggleDrawer}
            open={drawerVisible}
            width={250}
            style={{ padding: 0, background: "gray" }}
          >
            {/* <div className="flex justify-center items-center py-4">
              <img className="h-10 w-10" src="/Logo.png" alt="Logo" />
              <h3 className="text-white font-bold text-lg ml-2">HRMS - Digitech</h3>
            </div> */}
            <div 
            className="rounded-2xl mt-4"
            style={{margin: 5 }}>
        <div className="flex justify-center p-2 gap-2">
  <img src="/logo.JPG" className="w-10 h-10 mt-2" alt="Logo" />
  {/* {!collapsed && (
    <div>
      <h1 className="mt-2 text-md">Muhammad Riyan</h1>
      <div className="flex justify-start gap-1">
       <div className=" mt-1 w-3 h-3 bg-green-600 rounded-full"></div> 
      <h1 className="text-sm">Online</h1>
      </div>
    </div>
  )}  */}
</div>

        </div>
            <Menu 
            items={menuItems}
            theme="dark" 
            mode="inline" 
            defaultSelectedKeys={["1"]} 
            style={{ backgroundColor: "transparent", color: "white" }} />

          </Drawer>
        )}

        {/* Main Layout */}
        <Layout style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 200, transition: "margin-left 0.3s ease" }}>
          <Header style={{ padding: 0, background: "#fff" }}>
            <div className="flex justify-between mx-6">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={isMobile ? toggleDrawer : toggleSidebar}
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />
              <div className="flex gap-4 items-center">
                <WechatOutlined className="text-lg" />
                <StarOutlined className="text-lg" />
                <FlagOutlined className="text-lg" />
                {/* <img src="/Ustad.jpg" className="w-9 h-9 rounded-full" alt="" /> */}
                <SettingOutlined className="text-lg" />
              </div>
            </div>
          </Header>

          <Content
        className="hide-scrollbar"
        style={{
          margin: "10px 10px",
          padding: 15,
          minHeight: 310,
          borderRadius: "8px", 
          overflowY: "auto",
          height: "calc(100vh - 64px)",
        }}
      >
        <div className="flex gap-2">
          <div style={{ flex: 1 }}>
            
                {children}
            
          </div>
        </div>
      </Content>

          {/* <Footer /> */}
        </Layout>
      </Layout>

    </QueryClientProvider>
      
   
  );
};

export default MainDashboardLayout;
