import React, { useState } from 'react';
import { Card, Input, Space, Table, Button, Switch, Modal, Form, Checkbox } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';

const { Search } = Input;

var initialData = [
    {
        id: '001',
        username: 'john123',
        email: 'johnbrown@example.com',
        addTime: '2022-01-01 12:00:00',
        lastLogin: '2022-01-02 12:00:00',
        isEnabled: true,
    },
    {
        id: '002',
        username: 'jim123',
        email: 'jimgreen@example.com',
        addTime: '2022-01-01 12:00:00',
        lastLogin: '2022-01-02 12:00:00',
        isEnabled: false,
    },
    {
        id: '003',
        username: 'joe123',
        email: 'joeblack@example.com',
        addTime: '2022-01-01 12:00:00',
        lastLogin: '2022-01-02 12:00:00',
        isEnabled: true,
    },
];

export default function UserPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleRole = (id) => {
        // 在这里添加处理分配角色的代码
        console.log('分配角色', id);
    };

    const handleEdit = (id) => {
        // 在这里添加处理编辑的代码
        console.log('编辑', id);
        // 打开对话框
        showModal();
    };

    const handleDelete = (id) => {
        // 在这里添加处理删除的代码
        console.log('删除', id);
    };
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
                    <Button type="link" onClick={() => handleEdit(record.id)}>编辑</Button>
                    <Modal
                        title="编辑用户信息"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form>
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