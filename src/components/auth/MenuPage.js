import React, { useContext, useState, useEffect } from 'react';
import { Card, Input, Space, Table, Button, Switch, Modal, Form, Checkbox, Select, message } from 'antd';
import {
    ProfileOutlined,
    AuditOutlined,
    HomeOutlined,
    ShoppingFilled,
    BarChartOutlined,
    PropertySafetyFilled,
    KeyOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    ProductOutlined,
    DatabaseOutlined,
    HomeFilled,
} from '@ant-design/icons';
import { TriggerContext } from '../DashBoard';
import HttpService from '../../utils/HttpService';

const iconMap = {
    HomeFilled: <HomeFilled />,
    HomeOutlined: <HomeOutlined />,
    ShoppingFilled: <ShoppingFilled />,
    AuditOutlined: <AuditOutlined />,
    BarChartOutlined: <BarChartOutlined />,
    PropertySafetyFilled: <PropertySafetyFilled />,
    KeyOutlined: <KeyOutlined />,
    UserOutlined: <UserOutlined />,
    UsergroupAddOutlined: <UsergroupAddOutlined />,
    ProductOutlined: <ProductOutlined />,
    DatabaseOutlined: <DatabaseOutlined />,
    // 添加其他的图标...
};

export default function MenuPage() {
    const setTrigger = useContext(TriggerContext); // 获取 setTrigger 函数
    // 创建状态变量和设置函数
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState([]);
    const [firstLevel, setFirstLevel] = useState([]);
    const [menuForm] = Form.useForm();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    // 在组件挂载时加载数据
    useEffect(() => {
        HttpService.get('/menu/first').then((res) => {
            if (res.code === 200) {
                setData(res.data);
                setFirstLevel(res.data);
            }
        });
    }, []);

    const showMenuModal = () => {
        setIsMenuModalOpen(true);
    };
    const handleMenuOk = () => {
        // 如果MenuModal是打开的，说明是编辑菜单信息
        if (isMenuModalOpen) {
            HttpService.put('/menu', menuForm.getFieldsValue()).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '更新成功',
                    });
                    HttpService.get('/menu/first').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                            setFirstLevel(res.data);
                            setTrigger(prevTrigger => prevTrigger + 1);
                        }
                    });
                }
            });
            setIsMenuModalOpen(false);
        }
        // 如果AddModal是打开的，说明是添加菜单
        if (isAddModalOpen) {
            HttpService.post('/menu', menuForm.getFieldsValue()).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '添加成功',
                    });
                    HttpService.get('/menu/first').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                            setFirstLevel(res.data);
                            setTrigger(prevTrigger => prevTrigger + 1);
                        }
                    });
                }
            });
            setIsAddModalOpen(false);
        }
    };
    const handleMenuCancel = () => {
        setIsMenuModalOpen(false);
        setIsAddModalOpen(false);
    };

    const hasNextLevel = (record) => {
        // 如果菜单级数为1，有下级菜单
        if (record.menuLevel === 1) {
            return true;
        }
        return false;
    };

    const handleNextLevel = (id) => {
        console.log('查看下级', id);
        HttpService.get(`/menu/second`, { id: id }).then((res) => {
            if (res.code === 200) {
                setData(res.data);
            }
        });
    };

    const handlePrevLevel = (id) => {
        console.log('查看上级', id);
        HttpService.get(`/menu/first`, { id: id }).then((res) => {
            if (res.code === 200) {
                setData(res.data);
            }
        });
    };

    const handleEdit = (record) => {
        // 在这里添加处理编辑的代码
        console.log('编辑', record.mid);
        menuForm.setFieldsValue({
            menuName: record.menuName,
            parentMenu: record.parentMenu,
            menuLevel: record.menuLevel,
            frontName: record.frontName,
            icon: record.icon,
            isEnabled: record.isEnabled,
        });
        // 打开对话框
        showMenuModal();
    };

    const handleDelete = (id) => {
        // 找到对应的数据项
        const item = data.find(item => item.id === id);
        if (item) {
            // 删除数据项
            data.splice(data.indexOf(item), 1);
            // 更新组件的状态以重新渲染
            setData([...data]);
        }
        HttpService.delete('/menu', { id: id }).then(res => {
            if (res.code === 200) {
                HttpService.get('/menu/first').then(res => {
                    if (res.code === 200) {
                        setData(res.data);
                        setFirstLevel(res.data);
                        messageApi.open({
                            type: 'success',
                            content: '删除成功',
                        });
                        setTrigger(prevTrigger => prevTrigger + 1);
                    }
                });
            }
        });
        console.log('删除', menuForm.getFieldsValue());
    };

    // 添加角色
    const handleAdd = () => {
        menuForm.resetFields();
        setIsAddModalOpen(true);
    }

    const handleToggleEnabled = (id) => {
        // 找到对应的数据项
        const item = data.find(item => item.mid === id);
        if (item) {
            // 切换 isEnabled 属性的值
            item.isEnabled = !item.isEnabled;
            let param = {
                mid: item.mid,
                menuName: item.menuName,
                menuLevel: item.menuLevel,
                frontName: item.frontName,
                icon: item.icon,
                isEnabled: item.isEnabled
            };
            // 更新组件的状态以重新渲染
            HttpService.put('/menu', param).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '更新成功',
                    });
                    HttpService.get('/menu/first').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                            setFirstLevel(res.data);
                            setTrigger(prevTrigger => prevTrigger + 1);
                        }
                    });
                }
            });
        }
    };

    const columns = [
        {
            title: '编号',
            dataIndex: 'mid',
            key: 'mid',
            align: 'center',
        },
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            key: 'menuName',
            align: 'center',
        },
        {
            title: '菜单级数',
            dataIndex: 'menuLevel',
            key: 'menuLevel',
            align: 'center',
        },
        {
            title: '前端名称',
            dataIndex: 'frontName',
            key: 'frontName',
            align: 'center',
        },
        {
            title: '前端图标',
            dataIndex: 'icon',
            key: 'icon',
            align: 'center',
            render: icon => iconMap[icon],
        },
        {
            title: '是否启用',
            dataIndex: 'isEnabled',
            key: 'isEnabled',
            align: 'center',
            render: (isEnabled, record) => (
                <Switch checked={isEnabled} onChange={() => handleToggleEnabled(record.mid)} />
            ),
        },
        {
            title: '查看下级',
            key: 'viewChildren',
            align: 'center',
            render: (record) => (
                <>
                    <Button
                        type="link"
                        disabled={!hasNextLevel(record)}
                        onClick={() => handleNextLevel(record.mid)}
                    >
                        查看下级
                    </Button>
                    {record.menuLevel !== 1 ? <Button type="link" onClick={() => handlePrevLevel(record.mid)}>查看上级</Button> : ''}
                </>
            ),
        },
        {
            title: '操作',
            key: 'operation',
            align: 'center',
            render: (record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
                    <Modal
                        title="编辑菜单信息"
                        open={isMenuModalOpen}
                        onOk={handleMenuOk}
                        onCancel={handleMenuCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={menuForm}>
                            <Form.Item label="菜单名" name="menuName" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="上一级菜单"
                                name="parentMenu"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                initialValue={record.parentMenu}
                            >
                                <Select>
                                    <Select.Option value={0}>无上级菜单</Select.Option>
                                    {/* 渲染一级菜单的内容 */}
                                    {firstLevel.map((item) => (
                                        <Select.Option key={item.mid} value={item.mid}>
                                            {item.menuName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="前端名称" name="frontName" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="前端图标" name="icon" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input suffix={iconMap[menuForm.getFieldValue('icon')]} />
                            </Form.Item>
                            <Form.Item label="是否启用" name="isEnabled" valuePropName="checked" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Checkbox />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="link" onClick={() => handleDelete(record.mid)}>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <div>
                <Card
                    style={{
                        width: '100%',
                        display: 'flex',
                        marginBottom: '20px',
                    }}
                >
                    <ProfileOutlined /> 数据列表
                    <Button style={{ position: 'absolute', right: '30px' }} onClick={handleAdd}>添加</Button>
                    <Modal
                        title="添加菜单"
                        open={isAddModalOpen}
                        onOk={handleMenuOk}
                        onCancel={handleMenuCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={menuForm}>
                            <Form.Item label="菜单名" name="menuName" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="上一级菜单" name="parentMenu" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Select>
                                    <Select.Option value={0}>无上级菜单</Select.Option>
                                    {/* 渲染一级菜单的内容 */}
                                    {firstLevel.map((item) => (
                                        <Select.Option key={item.mid} value={item.mid}>
                                            {item.menuName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="前端名称" name="frontName" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="前端图标" name="icon" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="是否启用" name="isEnabled" valuePropName="checked" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Checkbox />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Card>
                <Card
                    style={{
                        width: '100%',
                    }}
                >
                    <Table columns={columns} dataSource={data} />
                </Card>
            </div>
        </>
    );
}