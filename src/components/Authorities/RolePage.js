import React, { useState } from 'react';
import { Card, Input, Space, Table, Button, Switch, Modal, Form, Checkbox } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';

const { Search } = Input;

var initialData = [
    {
        id: '1',
        roleName: '商品管理员',
        description: '只能查看及操作商品',
        userNum: 0,
        addTime: '2022-01-01 12:00:00',
        isEnabled: true,
    },
    {
        id: '2',
        roleName: '订单管理员',
        description: '只能查看及操作订单',
        userNum: 0,
        addTime: '2022-01-01 12:00:00',
        isEnabled: true,
    },
    {
        id: '3',
        roleName: '超级管理员',
        description: '拥有所有查看和操作功能',
        userNum: 0,
        addTime: '2022-01-01 12:00:00',
        isEnabled: true,
    },
];

export default function RolePage() {
    const [roleForm] = Form.useForm();
    const [menuForm] = Form.useForm();
    const [resourceForm] = Form.useForm();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

    const showRoleModal = () => {
        setIsRoleModalOpen(true);
    };
    const handleRoleOk = () => {
        setIsRoleModalOpen(false);
        setIsAddModalOpen(false);
        // 在这里添加分配角色的代码
        console.log('编辑角色', roleForm.getFieldsValue());
    };
    const handleRoleCancel = () => {
        setIsRoleModalOpen(false);
        setIsAddModalOpen(false);
    };

    const showMenuModal = () => {
        setIsMenuModalOpen(true);
    };
    const handleMenuOk = () => {
        setIsMenuModalOpen(false);
        // 在这里添加分配菜单的代码
        console.log('分配菜单', menuForm.getFieldsValue());
    };
    const handleMenuCancel = () => {
        setIsMenuModalOpen(false);
    };

    const showResourceModal = () => {
        setIsResourceModalOpen(true);
    };
    const handleResourceOk = () => {
        setIsResourceModalOpen(false);
        // 在这里添加分配菜单的代码
        console.log('分配菜单', resourceForm.getFieldsValue());
    };
    const handleResourceCancel = () => {
        setIsResourceModalOpen(false);
    };

    const handleMenu = (id) => {
        // 在这里添加处理分配菜单的代码
        console.log('分配菜单', id);
        roleForm.setFieldsValue({
            roles: ['admin', 'order'],
        });
        showMenuModal();
    };

    const handleResource = (record) => {
        // 在这里添加处理分配资源的代码
        console.log('分配资源', record.id);
        showResourceModal();
    }

    const handleEdit = (record) => {
        // 在这里添加处理编辑的代码
        console.log('编辑', record.id);
        roleForm.setFieldsValue({
            username: record.username,
            email: record.email,
            password: 'password',
            isEnabled: record.isEnabled
        });
        // 打开对话框
        showRoleModal();
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
        console.log('删除', roleForm.getFieldsValue());
    };

    // 添加角色
    const handleAdd = () => {
        roleForm.resetFields();
        setIsAddModalOpen(true);
    }

    // 创建状态变量和设置函数
    const [data, setData] = useState(initialData);

    const handleToggleEnabled = (id) => {
        // 找到对应的数据项
        const item = data.find(item => item.id === id);
        if (item) {
            // 切换 isEnabled 属性的值
            item.isEnabled = !item.isEnabled;
            // 更新组件的状态以重新渲染
            setData([...data]);
        }
    };

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: '角色名',
            dataIndex: 'roleName',
            key: 'roleName',
            align: 'center',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
        },
        {
            title: '用户数',
            dataIndex: 'userNum',
            key: 'userNum',
            align: 'center',
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            key: 'addTime',
            align: 'center',
        },
        {
            title: '是否启用',
            dataIndex: 'isEnabled',
            key: 'isEnabled',
            align: 'center',
            render: (isEnabled, record) => (
                <Switch checked={isEnabled} onChange={() => handleToggleEnabled(record.id)} />
            ),
        },
        {
            title: '操作',
            key: 'operation',
            align: 'center',
            render: (record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleMenu(record.id)}>分配菜单</Button>
                    <Modal
                        title="分配菜单"
                        open={isMenuModalOpen}
                        onOk={handleMenuOk}
                        onCancel={handleMenuCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={menuForm}>
                            <Form.Item label="菜单" name="roles" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                todo...
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="link" onClick={() => handleResource(record)}>分配资源</Button>
                    <Modal
                        title="分配资源"
                        open={isResourceModalOpen}
                        onOk={handleResourceOk}
                        onCancel={handleResourceCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={resourceForm}>
                            <Form.Item label="资源" name="roles" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                todo...
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
                    <Modal
                        title="编辑角色信息"
                        open={isRoleModalOpen}
                        onOk={handleRoleOk}
                        onCancel={handleRoleCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={roleForm}>
                            <Form.Item label="角色名" name="roleName" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="描述" name="description" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="是否启用" name="isEnabled" valuePropName="checked" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Checkbox />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="link" onClick={() => handleDelete(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    return (
        <div>
            <Card
                style={{
                    width: '100%',
                    marginBottom: '20px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '150px', marginRight: '20px' }}>输入搜索内容：</span>
                    <Search
                        placeholder="输入搜索内容"
                        allowClear
                        enterButton="搜索"
                        size="large"
                        onSearch={onSearch}
                    />
                </div>
            </Card>
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
                    title="添加角色"
                    open={isAddModalOpen}
                    onOk={handleRoleOk}
                    onCancel={handleRoleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form form={roleForm}>
                        <Form.Item label="角色名" name="roleName" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="描述" name="description" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
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
    );
}