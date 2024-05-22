import React, { createContext, useState, useEffect } from 'react';
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
import httpService from '../utils/HttpService';

export const TriggerContext = createContext(); // 创建一个新的 context 对象

const { Header, Sider, Content } = Layout;
const breadcrumbNames = {
    '/dashboard': '首页',
    '/dashboard/home': '仪表盘',
    '/dashboard/product': '商品',
    '/dashboard/product/list': '商品列表',
    '/dashboard/product/category': '商品分类',
    '/dashboard/order': '订单',
    '/dashboard/order/list': '订单列表',
    '/dashboard/order/settings': '订单设置',
    '/dashboard/sms': '营销',
    '/dashboard/sms/couponlst': '优惠券列表',
    '/dashboard/sms/seckilllst': '秒杀活动列表',
    '/dashboard/auth': '权限',
    '/dashboard/auth/user': '用户管理',
    '/dashboard/auth/role': '角色管理',
    '/dashboard/auth/menu': '菜单管理',
    '/dashboard/auth/resource': '资源管理',
};

const sideBarItems = [
    {
        key: '2',
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
        key: '3',
        icon: <ShoppingFilled />,
        label: '商品',
        children: [
            {
                key: '/dashboard/product/list',
                icon: <ShoppingFilled />,
                label: '商品列表',
            },
            {
                key: '/dashboard/product/category',
                icon: <ShoppingFilled />,
                label: '商品分类',
            },
        ],
    },
    {
        key: '4',
        icon: <AuditOutlined />,
        label: '订单',
        children: [
            {
                key: '/dashboard/order/list',
                icon: <AuditOutlined />,
                label: '订单列表',
            },
            {
                key: '/dashboard/order/settings',
                icon: <AuditOutlined />,
                label: '订单设置',
            },
        ],
    },
    {
        key: '5',
        icon: <PropertySafetyFilled />,
        label: '营销',
        children: [
            {
                key: '/dashboard/sms/couponlst',
                icon: <PropertySafetyFilled />,
                label: '优惠券列表',
            },
            {
                key: '/dashboard/sms/seckilllst',
                icon: <PropertySafetyFilled />,
                label: '秒杀活动列表',
            },
        ],
    },
    {
        key: '6',
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
];

function DashBoard() {
    const [sidebar, setSidebar] = useState([]);
    const [trigger, setTrigger] = useState(0); // 新增的状态变量
    const navigate = useNavigate();
    const location = useLocation();
    const menu = (
        <Menu>
            <Menu.Item danger onClick={() => navigate('/login')}>退出</Menu.Item>
        </Menu>
    );

    // 在页面挂载时调整菜单内容   
    useEffect(() => {
        let data = JSON.parse(sessionStorage.getItem('token'));
        let roleIds = data.role;
        if (roleIds) {
            httpService.post('/role/menuName', { roleIds: roleIds }).then((res) => {
                let data = res.data;
                // 添加新的菜单项
                if (data) {
                    let newSideBarItems = [...sideBarItems];
                    data.forEach((item) => {
                        let parentItem = newSideBarItems.find((sidebarItem) => sidebarItem.key === item.parentMenu.toString());
                        if (parentItem) {
                            if (!parentItem.children.some((child) => child.label === item.menuName)) {
                                let newItem = {
                                    key: item.frontName,
                                    icon: parentItem.icon,
                                    label: item.menuName,
                                };
                                if (item.menuLevel === 1) {
                                    newItem.children = [];
                                }
                                parentItem.children.push(newItem);
                            }
                        } else if (!newSideBarItems.some((sidebarItem) => sidebarItem.label === item.menuName)) {
                            let newItem = {
                                key: item.frontName,
                                icon: sideBarItems[0].icon,
                                label: item.menuName,
                            };
                            if (item.menuLevel === 1) {
                                newItem.children = [];
                            }
                            newSideBarItems.push(newItem);
                        }
                    });
                    // 删除不存在于 data 的菜单项和子菜单项
                    newSideBarItems = newSideBarItems.filter((sidebarItem) => {
                        sidebarItem.children = sidebarItem.children.filter((child) => {
                            return data.some((item) => item.menuName === child.label);
                        });
                        // 如果是一级菜单，且没有子菜单，则删除
                        return sidebarItem.children.length > 0 || data.some((item) => item.menuName === sidebarItem.label);
                    });
                    setSidebar(newSideBarItems);
                } else {
                    setSidebar([]);
                }
            });
        }
    }, [trigger]);

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
                    items={sidebar}
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
                    <TriggerContext.Provider value={setTrigger}> {/* 提供 setTrigger 函数 */}
                        <Outlet />
                    </TriggerContext.Provider>
                </Content>
            </Layout>
        </Layout>
    );
}

export default DashBoard;