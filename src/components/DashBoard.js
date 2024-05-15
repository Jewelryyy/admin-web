import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    HomeFilled,
    BarChartOutlined,
    ShoppingFilled,
    AuditOutlined,
    PropertySafetyFilled,
    KeyOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    ProductOutlined,
    DatabaseOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopFilled,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme, Avatar, Dropdown } from 'antd';

const { Header, Sider, Content } = Layout;
const breadcrumbNames = {
    '/dashboard': '首页',
    '/dashboard/home': '仪表盘',
    '/dashboard/auth': '权限',
    '/dashboard/auth/user': '用户管理',
    '/dashboard/auth/role': '角色管理',
    '/dashboard/auth/menu': '菜单管理',
    '/dashboard/auth/resource': '资源管理',
};

function DashBoard() {
    const navigate = useNavigate();
    const location = useLocation();
    const menu = (
        <Menu>
            <Menu.Item danger onClick={() => navigate('/login')}>退出</Menu.Item>
        </Menu>
    );

    const [breadItem, setBreadItem] = useState([{ href: '/dashboard/home', title: '首页' }]);
    // 在页面挂载时调整面包屑内容
    useEffect(() => {
        const pathnames = location.pathname.split('/').filter((x) => x);
        const breadcrumbItems = pathnames.map((value, index) => {
            const url = `/${pathnames.slice(0, index + 1).join('/')}`;
            return {
                title: breadcrumbNames[url] || value,
                href: url,
            };
        });
        setBreadItem(breadcrumbItems);
    }, [location.pathname]);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onClick = (e) => {
        navigate(e.key, { replace: true });
    };

    return (
        <Layout style={{ position: 'absolute', height: '100%', width: '100%' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                }}
            >
                <h2 style={{ color: 'white', textAlign: 'center' }}><ShopFilled /></h2>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <HomeFilled />,
                            label: '首页',
                            children: [
                                {
                                    key: '/dashboard/home',
                                    icon: <BarChartOutlined />,
                                    label: '仪表盘',
                                },
                            ],
                        },
                        {
                            key: '2',
                            icon: <ShoppingFilled />,
                            label: '商品',
                            children: [
                                {
                                    key: '/dashboard/product/manage',
                                    icon: <ShoppingFilled />,
                                    label: '商品管理',
                                },
                                {
                                    key: '/dashboard/product/category',
                                    icon: <ShoppingFilled />,
                                    label: '商品分类',
                                },
                            ],
                        },
                        {
                            key: '3',
                            icon: <AuditOutlined />,
                            label: '订单',
                            children: [
                                {
                                    key: '/dashboard/order/manage',
                                    icon: <AuditOutlined />,
                                    label: '订单管理',
                                },
                                {
                                    key: '/dashboard/order/statistics',
                                    icon: <AuditOutlined />,
                                    label: '订单统计',
                                },
                            ],
                        },
                        {
                            key: '4',
                            icon: <PropertySafetyFilled />,
                            label: '营销',
                            children: [
                                {
                                    key: '/dashboard/sms/coupon',
                                    icon: <PropertySafetyFilled />,
                                    label: '优惠券',
                                },
                                {
                                    key: '/dashboard/sms/seckill',
                                    icon: <PropertySafetyFilled />,
                                    label: '秒杀活动',
                                },
                            ],
                        },
                        {
                            key: '5',
                            icon: <KeyOutlined />,
                            label: '权限',
                            children: [
                                {
                                    key: '/dashboard/auth/user',
                                    icon: <UserOutlined />,
                                    label: '用户管理',
                                },
                                {
                                    key: '/dashboard/auth/role',
                                    icon: <UsergroupAddOutlined />,
                                    label: '角色管理',
                                },
                                {
                                    key: '/dashboard/auth/menu',
                                    icon: <ProductOutlined />,
                                    label: '菜单管理',
                                },
                                {
                                    key: '/dashboard/auth/resource',
                                    icon: <DatabaseOutlined />,
                                    label: '资源管理',
                                },
                            ],
                        },
                    ]}
                    onClick={onClick}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        display: 'flex',
                        padding: 0,
                        background: colorBgContainer,
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Breadcrumb items={breadItem} />
                    <div style={{ position: 'absolute', paddingRight: '20px', right: 0 }}>
                        <Dropdown overlay={menu} >
                            <Avatar
                                size="large"
                                style={{
                                    backgroundColor: '#87d068',
                                }}
                                icon={<UserOutlined />}
                            />
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '16px 16px',
                        overflow: 'auto',
                        padding: 16,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default DashBoard;