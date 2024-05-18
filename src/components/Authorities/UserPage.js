import React, { useState, useEffect } from 'react';
import { Card, Input, Space, Table, Button, Switch, Modal, Form, Checkbox } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import HttpService from '../../utils/HttpService';

const { Search } = Input;

export default function UserPage() {
    const [roleForm] = Form.useForm();
    const [userForm] = Form.useForm();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

    // 创建状态变量和设置函数
    const [data, setData] = useState([]);
    // 在组件挂载时获取用户列表
    useEffect(() => {
        HttpService.get('/user/list').then(res => {
            if (res.code === 200) {
                setData(res.data);
            }
        });
    }, []);

    const showUserModal = () => {
        setIsUserModalOpen(true);
    };
    const handleUserOk = () => {
        setIsUserModalOpen(false);
        setIsAddModalOpen(false);
        // 在这里添加处理提交的代码
        console.log('提交', userForm.getFieldsValue());
        HttpService.put('/user', userForm.getFieldsValue()).then(res => {
            if (res.code === 200) {
                console.log('修改成功');
            }
        });
        HttpService.get('/user/list').then(res => {
            if (res.code === 200) {
                setData(res.data);
            }
        });
    };
    const handleUserCancel = () => {
        setIsUserModalOpen(false);
        setIsAddModalOpen(false);
    };

    const showRoleModal = () => {
        setIsRoleModalOpen(true);
    };
    const handleRoleOk = () => {
        setIsRoleModalOpen(false);
        // 在这里添加分配角色的代码
        console.log('分配角色', roleForm.getFieldsValue());
    };
    const handleRoleCancel = () => {
        setIsRoleModalOpen(false);
    };

    const handleRole = (id) => {
        // 在这里添加处理分配角色的代码
        console.log('分配角色', id);
        roleForm.setFieldsValue({
            roles: ['admin', 'order'],
        });
        showRoleModal();
    };

    const handleEdit = (record) => {
        // 在这里添加处理编辑的代码
        console.log('编辑', record.id);
        userForm.setFieldsValue({
            id: record.id,
            username: record.username,
            email: record.email,
            password: record.password,
            isEnabled: record.isEnabled
        });
        // 打开对话框
        showUserModal();
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
        HttpService.delete('/user', { id: id }).then(res => {
            if (res.code === 200) {
                console.log('删除成功');
            }
        });
        console.log('删除', userForm.getFieldsValue());
    };

    // 添加用户
    const handleAdd = () => {
        userForm.resetFields();
        setIsAddModalOpen(true);
    }

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
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            key: 'addTime',
            align: 'center',
        },
        {
            title: '最后登录',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
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
                    <Button type="link" onClick={() => handleRole(record.id)}>分配角色</Button>
                    <Modal
                        title="分配角色"
                        open={isRoleModalOpen}
                        onOk={handleRoleOk}
                        onCancel={handleRoleCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={roleForm}>
                            <Form.Item label="角色" name="roles" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Checkbox.Group>
                                    <Checkbox value="admin">超级管理员</Checkbox>
                                    <Checkbox value="product">商品管理员</Checkbox>
                                    <Checkbox value="order">订单管理员</Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
                    <Modal
                        title="编辑用户信息"
                        open={isUserModalOpen}
                        onOk={handleUserOk}
                        onCancel={handleUserCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={userForm}>
                            <Form.Item label="ID" name="id" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="用户名" name="username" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="邮箱" name="email" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="密码" name="password" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input.Password />
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
                    title="添加用户"
                    open={isAddModalOpen}
                    onOk={handleUserOk}
                    onCancel={handleUserCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form form={userForm}>
                        <Form.Item label="用户名" name="username" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="邮箱" name="email" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="密码" name="password" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                            <Input.Password />
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