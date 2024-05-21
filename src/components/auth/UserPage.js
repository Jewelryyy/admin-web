import React, { useState, useEffect } from 'react';
import { Card, Input, Space, Table, Button, Switch, Modal, Form, Checkbox, message } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import HttpService from '../../utils/HttpService';

const { Search } = Input;

export default function UserPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [currentUserId, setCurrentUserId] = useState(0); // 用于保存当前用户的ID
    const [roles, setRoles] = useState([]);
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
        // 如果UserModal是打开的，说明是编辑用户信息
        if (isUserModalOpen) {
            HttpService.put('/user', userForm.getFieldsValue()).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '更新成功',
                    });
                    HttpService.get('/user/list').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                        }
                    });
                }
            });
            setIsUserModalOpen(false);
        }
        // 如果AddModal是打开的，说明是添加用户
        if (isAddModalOpen) {
            HttpService.post('/user', userForm.getFieldsValue()).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '添加成功',
                    });
                    HttpService.get('/user/list').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                        }
                    });
                }
            });
            setIsAddModalOpen(false);
        }
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
        HttpService.post('/user/assign', { userId: currentUserId, roleIdList: roleForm.getFieldsValue().roles }).then(res => {
            if (res.code === 200) {
                messageApi.open({
                    type: 'success',
                    content: '分配成功',
                });
            }
        });
    };
    const handleRoleCancel = () => {
        setIsRoleModalOpen(false);
    };

    const handleRole = (id) => {
        // 在这里添加处理分配角色的代码
        console.log('分配角色', id);
        setCurrentUserId(id);
        HttpService.get('/role/list').then(res => {
            if (res.code === 200) {
                setRoles(res.data);
                HttpService.get('/user/rolelist', { userId: id }).then(res => {
                    if (res.code === 200) {
                        console.log('用户角色', res.data);
                        roleForm.setFieldsValue({ roles: res.data });
                    }
                });
                showRoleModal();
            } else {
                messageApi.open({
                    type: 'error',
                    content: res.message,
                });
            }
        });
    };

    const handleEdit = (record) => {
        // 在这里添加处理编辑的代码
        console.log('编辑', record.userId);
        userForm.setFieldsValue({
            userId: record.userId,
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
        const item = data.find(item => item.userId === id);
        if (item) {
            // 删除数据项
            data.splice(data.indexOf(item), 1);
            // 更新组件的状态以重新渲染
            setData([...data]);
        }
        HttpService.delete('/user', { id: id }).then(res => {
            if (res.code === 200) {
                HttpService.get('/user/list').then(res => {
                    if (res.code === 200) {
                        setData(res.data);
                    }
                });
                messageApi.open({
                    type: 'success',
                    content: '删除成功',
                });
            }
        });
    };

    // 添加用户
    const handleAdd = () => {
        userForm.resetFields();
        setIsAddModalOpen(true);
    }

    const handleToggleEnabled = (id) => {
        // 找到对应的数据项
        const item = data.find(item => item.userId === id);
        if (item) {
            // 切换 isEnabled 属性的值
            item.isEnabled = !item.isEnabled;
            let param = {
                userId: item.userId,
                username: item.username,
                email: item.email,
                password: item.password,
                isEnabled: item.isEnabled
            };
            // 更新组件的状态以重新渲染
            HttpService.put('/user', param).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '更新成功',
                    });
                    HttpService.get('/user/list').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                        }
                    });
                }
            });
        }
    };

    const columns = [
        {
            title: '编号',
            dataIndex: 'userId',
            key: 'userId',
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
            render: text => {
                const date = new Date(text);
                return date.toLocaleString();
            },
        },
        {
            title: '最后登录',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
            align: 'center',
            render: text => {
                const date = new Date(text);
                return text ? date.toLocaleString() : 'N/A'; // 如果日期为空，将显示'N/A'
            },
        },
        {
            title: '是否启用',
            dataIndex: 'isEnabled',
            key: 'isEnabled',
            align: 'center',
            render: (isEnabled, record) => (
                <Switch checked={isEnabled} onChange={() => handleToggleEnabled(record.userId)} />
            ),
        },
        {
            title: '操作',
            key: 'operation',
            align: 'center',
            render: (record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleRole(record.userId)}>分配角色</Button>
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
                                    {roles.map(role => (
                                        <Checkbox value={role.roleId}>{role.roleName}</Checkbox>
                                    ))}
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
                            <Form.Item label="ID" name="userId" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
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
                    <Button type="link" onClick={() => handleDelete(record.userId)}>删除</Button>
                </Space>
            ),
        },
    ];

    const onSearch = (value, _e, info) => {
        console.log(value, _e, info);
        if (value) {
            HttpService.get('/user/search', { keyword: value }).then(res => {
                if (res.code === 200) {
                    setData(res.data);
                }
            });
        }
        else {
            HttpService.get('/user/list').then(res => {
                if (res.code === 200) {
                    setData(res.data);
                }
            });
        }
    }

    return (
        <>
            {contextHolder}
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
        </>
    );
}