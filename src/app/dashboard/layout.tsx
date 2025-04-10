
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
        deleteCookie('role')
        router.push('/login')
      }

    const role = getCookie('role') || 'undefined'
    const hiddenForVendor = ['Subjects', 'Attendance', 'Employee', 'Finance', 'Profits']
    const allMenuItems = [
        { key: '1', label: 'Dashboard', href: '/dashboard' },
        { key: '2', label: 'Subjects', href: '/dashboard' },
        { key: '3', label: 'Products', href: '/dashboard' },
        { key: '4', label: 'Attendance', href: '/dashboard' },
        { key: '5', label: 'Projects', href: '/dashboard' },
        { key: '6', label: 'Employee', href: '/dashboard' },
        { key: '7', label: 'Finance', href: '/dashboard' },
        { key: '8', label: 'Profits', href: '/dashboard' },
      ]
  const visibleItems =
    role === 'vendor'
      ? allMenuItems.filter(item => !hiddenForVendor.includes(item.label))
      : allMenuItems
    
    
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} style={{ background: "transparent" , color:"white" ,  overflowX:"auto"}}>
            {visibleItems.map(item => (
        <Menu.Item key={item.key} icon={<UserOutlined />} style={{ color: 'white' }}>
          <Link href={item.href}>{item.label}</Link>
        </Menu.Item>
         ))}
            {/* <Menu.Item style={{ color: "white" }} key="1" icon={<UserOutlined />}>
            <Link href='/dashboard'>Dashboard</Link>
            </Menu.Item>
            <Menu.Item style={{ color: "white" }} key="2" icon={<UserOutlined />}>
            <Link href='/dashboard'>Subjects</Link>
            </Menu.Item>
            <Menu.Item style={{ color: "white" }} key="3" icon={<UserOutlined />}>
            <Link href='/dashboard'>Products</Link>
            </Menu.Item>
            <Menu.Item style={{ color: "white" }} key="4" icon={<UserOutlined />}>
            <Link href='/dashboard'>Attendance</Link>
            </Menu.Item>
            <Menu.Item style={{ color: "white" }} key="5" icon={<UserOutlined />}>
            <Link href='/dashboard'>Projects</Link>
            </Menu.Item>
            <Menu.Item style={{ color: "white" }} key="6" icon={<UserOutlined />}>
            <Link href='/dashboard'>Employee</Link>
            </Menu.Item>
            <Menu.Item style={{ color: "white" }} key="7" icon={<UserOutlined />}>
            <Link href='/dashboard'>Finance</Link>
            </Menu.Item>
            <Menu.Item style={{ color: "white" }} key="8" icon={<UserOutlined />}>
            <Link href='/dashboard'>Profits</Link>
            </Menu.Item> */}

            {/* <Menu.SubMenu style={{ color: "white" }} key="2" icon={<TeamOutlined />} title="Organization">
              <Menu.Item key="2-1" icon={<RightCircleFilled />}>
              <Link href='#'>Department</Link>
              </Menu.Item>
              <Menu.Item key="2-2" icon={<RightCircleFilled />}>
              <Link href='#'>Sub Department</Link>
              </Menu.Item>
              <Menu.Item key="2-3" icon={<RightCircleFilled />}>
              <Link href='#'>Announcements</Link>
              </Menu.Item>
              <Menu.Item key="2-4" icon={<RightCircleFilled />}>
              <Link href='#'>Company Policy</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu style={{ color: "white" }} key="3" icon={<ClockCircleOutlined />} title="Time Sheet">
              <Menu.Item key="3-1" icon={<RightCircleFilled />}>
              <Link href='#'>Attendance</Link>
              </Menu.Item>
              <Menu.Item key="3-2" icon={<RightCircleFilled />}>
              <Link href='#'>
              TimeSheet Calender</Link>
              </Menu.Item>
              <Menu.Item key="3-3" icon={<RightCircleFilled />}>
              <Link href='#'>Overtime Request</Link>
              </Menu.Item>
              <Menu.Item key="3-4" icon={<RightCircleFilled />}>
              <Link href='#'>Office Shift</Link>
              </Menu.Item>
              <Menu.Item key="3-5" icon={<RightCircleFilled />}>
              <Link href='#'>Manage Holidays</Link>
              </Menu.Item>
              <Menu.Item key="3-6" icon={<RightCircleFilled />}>
              <Link href='#'>Manage Leaves</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu style={{ color: "white" }} key="4" icon={<ReadOutlined />} title="Training">
              <Menu.Item key="4-1" icon={<RightCircleFilled />}>
              <Link href='#'>Training</Link>
              </Menu.Item>
              <Menu.Item key="4-2" icon={<RightCircleFilled />}>
              <Link href='#'>Training Type</Link>
              </Menu.Item>
              <Menu.Item key="4-3" icon={<RightCircleFilled />}>
              <Link href='#'>Trainers</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu style={{ color: "white" }} key="5" icon={<TrophyOutlined />} title="Performance">
              <Menu.Item key="5-1" icon={<RightCircleFilled />}>
              <Link href='#'>Indicators</Link>
              </Menu.Item>
              <Menu.Item key="5-2" icon={<RightCircleFilled />}>
              <Link href='#'>Appraisal</Link>
              </Menu.Item>
              <Menu.Item key="5-3" icon={<RightCircleFilled />}>
              <Link href='#'>KPI</Link>

              </Menu.Item>
              <Menu.Item key="5-4" icon={<RightCircleFilled />}>
              <Link href='#'>KPI Report</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="6" style={{ color: "white" }} icon={<ToolOutlined />}>
            <Link href='#'>Tickets</Link>
            </Menu.Item>
            <Menu.Item key="7" style={{ color: "white" }} icon={<FolderOutlined />}>
            <Link href='#'>Files Manager</Link>
            </Menu.Item>

            <Menu.SubMenu style={{ color: "white" }} key="8" icon={<ProjectOutlined />} title="Project Manager">
              <Menu.Item key="8-1" icon={<RightCircleFilled />}>
              <Link href='#'>Projects</Link>
              </Menu.Item>
              <Menu.Item key="8-2" icon={<RightCircleFilled />}>
              <Link href='#'>Tasks</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu style={{ color: "white" }} key="9" icon={<CalendarOutlined />} title="Events & Meetings">
              <Menu.Item key="9-1" icon={<RightCircleFilled />}>
              <Link href='#'>Events</Link>
              </Menu.Item>
              <Menu.Item key="9-2" icon={<RightCircleFilled />}>
              <Link href='#'>Meetings</Link>
              </Menu.Item>
            </Menu.SubMenu> */}

            <Menu.Item style={{ color: "white" }} key="10" onClick={handleLogout} icon={<LogoutOutlined />}>Logout</Menu.Item>
          </Menu>
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
            visible={drawerVisible}
            width={250}
            bodyStyle={{ padding: 0, background: "gray" }}
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} style={{ backgroundColor: "transparent", color: "white" }}>

{/* Dashboard */}
<Menu.Item key="1" style={{ color: "white" }} icon={<DashboardOutlined />} className="menu-item">
  <Link href='/'>Dashboard</Link>
</Menu.Item>

{/* Organization */}
<Menu.SubMenu
  key="sub1"
  icon={<TeamOutlined />}
  title="Organization"
  className="text-white"
  style={{ color: "white" }}
>
<Menu.Item key="2-1" icon={<RightCircleFilled />}>
              <Link href='#'>Department</Link>
              </Menu.Item>
              <Menu.Item key="2-2" icon={<RightCircleFilled />}>
              <Link href='#'>Sub Department</Link>
              </Menu.Item>
              <Menu.Item key="2-3" icon={<RightCircleFilled />}>
              <Link href='#'>Announcements</Link>
              </Menu.Item>
              <Menu.Item key="2-4" icon={<RightCircleFilled />}>
              <Link href='#'>Company Policy</Link>
              </Menu.Item>
</Menu.SubMenu>

{/* Time Sheet */}
<Menu.SubMenu key="sub2" style={{ color: "white" }} icon={<ClockCircleOutlined />} title="Time Sheet">
<Menu.Item key="3-1" icon={<RightCircleFilled />}>
              <Link href='#'>Attendance</Link>
              </Menu.Item>
              <Menu.Item key="3-2" icon={<RightCircleFilled />}>
              <Link href='#'>
              TimeSheet Calender</Link>
              </Menu.Item>
              <Menu.Item key="3-3" icon={<RightCircleFilled />}>
              <Link href='#'>Overtime Request</Link>
              </Menu.Item>
              <Menu.Item key="3-4" icon={<RightCircleFilled />}>
              <Link href='#'>Office Shift</Link>
              </Menu.Item>
              <Menu.Item key="3-5" icon={<RightCircleFilled />}>
              <Link href='#'>Manage Holidays</Link>
              </Menu.Item>
              <Menu.Item key="3-6" icon={<RightCircleFilled />}>
              <Link href='#'>Manage Leaves</Link>
              </Menu.Item>
</Menu.SubMenu>

{/* Training */}
<Menu.SubMenu key="sub3" style={{ color: "white" }} icon={<StarOutlined />} title="Training">

<Menu.Item key="4-1" icon={<RightCircleFilled />}>
              <Link href='#'>Training</Link>
              </Menu.Item>
              <Menu.Item key="4-2" icon={<RightCircleFilled />}>
              <Link href='#'>Training Type</Link>
              </Menu.Item>
              <Menu.Item key="4-3" icon={<RightCircleFilled />}>
              <Link href='#'>Trainers</Link>
              </Menu.Item>
</Menu.SubMenu>

{/* Performance */}
<Menu.SubMenu key="sub4" icon={<FileOutlined />} title="Performance">
<Menu.Item key="5-1" icon={<RightCircleFilled />}>
              <Link href='#'>Indicators</Link>
              </Menu.Item>
              <Menu.Item key="5-2" icon={<RightCircleFilled />}>
              <Link href='#'>Appraisal</Link>
              </Menu.Item>
              <Menu.Item key="5-3" icon={<RightCircleFilled />}>
              <Link href='#'>KPI</Link>

              </Menu.Item>
              <Menu.Item key="5-4" icon={<RightCircleFilled />}>
              <Link href='#'>KPI Report</Link>
              </Menu.Item>
</Menu.SubMenu>

{/* Tickets */}
<Menu.Item key="5"  style={{ color: "white" }} icon={<ToolOutlined />}>
<Link href='#'>Tickets</Link>
</Menu.Item>

{/* Files Manager */}
<Menu.Item key="6"  style={{ color: "white" }} icon={<FolderOutlined />}>
<Link href='#'>Files Manager</Link>
</Menu.Item>

{/* Project Manager */}
<Menu.SubMenu key="sub5" icon={<ProjectOutlined />} title="Project Manager">
<Menu.Item key="8-1" icon={<RightCircleFilled />}>
              <Link href='#'>Projects</Link>
              </Menu.Item>
              <Menu.Item key="8-2" icon={<RightCircleFilled />}>
              <Link href='#'>Tasks</Link>
              </Menu.Item>
</Menu.SubMenu>

{/* Events & Meetings */}
<Menu.SubMenu key="sub6" style={{ color: "white" }} icon={<CalendarOutlined />}  title="Events & Meetings">
<Menu.Item key="9-2" icon={<RightCircleFilled />}>
<Link href='#'>Events</Link>
              </Menu.Item>
              <Menu.Item key="9-2" icon={<RightCircleFilled />}>
              <Link href='#'>Meetings</Link>
              </Menu.Item>
</Menu.SubMenu>

{/* Logout */}
<Menu.Item key="9" style={{ color: "white" }} icon={<LogoutOutlined />}>Logout</Menu.Item>

</Menu>
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
