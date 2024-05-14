import React, { useState } from 'react';
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
import { Button, Layout, Menu, theme } from 'antd';
import UserPage from './Authorities/UserPage';

const { Header, Sider, Content } = Layout;

const Home = () => {
    const [selectedKey, setSelectedKey] = useState('11');
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onClick = ({ key }) => {
        setSelectedKey(key); // 当菜单项被点击时，更新 selectedKey        
    }

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
                                    key: '11',
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
                                    key: '21',
                                    icon: <ShoppingFilled />,
                                    label: '商品管理',
                                },
                                {
                                    key: '22',
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
                                    key: '31',
                                    icon: <AuditOutlined />,
                                    label: '订单管理',
                                },
                                {
                                    key: '32',
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
                                    key: '41',
                                    icon: <PropertySafetyFilled />,
                                    label: '优惠券',
                                },
                                {
                                    key: '42',
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
                                    key: '51',
                                    icon: <UserOutlined />,
                                    label: '用户管理',
                                },
                                {
                                    key: '52',
                                    icon: <UsergroupAddOutlined />,
                                    label: '角色管理',
                                },
                                {
                                    key: '53',
                                    icon: <ProductOutlined />,
                                    label: '菜单管理',
                                },
                                {
                                    key: '54',
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
                    {(() => {
                        switch (selectedKey) {
                            case '11':
                                return <UserPage />;
                            case '21':
                                return <UserPage />;
                            case '22':
                                return <UserPage />;
                            case '31':
                                return <UserPage />;
                            case '32':
                                return <UserPage />;
                            case '41':
                                return <UserPage />;
                            case '42':
                                return <UserPage />;
                            case '51':
                                return <UserPage />;
                            case '52':
                                return <UserPage />;
                            case '53':
                                console.log('菜单管理');
                                return <UserPage />;
                            case '54':
                                return <UserPage />;
                            default:
                                return <UserPage />;
                        }
                    })()}
                </Content>
            </Layout>
        </Layout>
    );
};
export default Home;