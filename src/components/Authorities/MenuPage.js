import React, { useState } from 'react';
import { Card, Input, Space, Table, Button, Switch, Modal, Form, Checkbox, Select } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';

var initialData = [
    {
        id: '001',
        menuName: '首页',
        menuLevel: 1,
        frontName: 'home',
        icon: 'HomeOutlined',
        isEnabled: true,
    },
    {
        id: '002',
        menuName: '商品',
        menuLevel: 1,
        frontName: 'shopping',
        icon: 'ShoppingFilled',
        isEnabled: false,
    },
    {
        id: '003',
        menuName: '订单',
        menuLevel: 1,
        frontName: 'audit',
        icon: 'AuditOutlined',
        isEnabled: true,
    },
];

const nextData = [
    {
        id: '001',
        menuName: '仪表盘',
        menuLevel: 2,
        frontName: 'dashboard',
        icon: 'BarChartOutlined',
        isEnabled: true,
    },
    {
        id: '002',
        menuName: '商品管理',
        menuLevel: 2,
        frontName: 'product',
        icon: 'ShoppingFilled',
        isEnabled: false,
    },
    {
        id: '003',
        menuName: '商品分类',
        menuLevel: 2,
        frontName: 'category',
        icon: 'ShoppingFilled',
        isEnabled: true,
    },
];

export default function MenuPage() {
    const [menuForm] = Form.useForm();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    const showMenuModal = () => {
        setIsMenuModalOpen(true);
    };
    const handleMenuOk = () => {
        setIsMenuModalOpen(false);
        setIsAddModalOpen(false);
        // 在这里添加分配角色的代码
        console.log('编辑角色', menuForm.getFieldsValue());
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
        // 将nextData赋值给table的dataSource
        setData(nextData);
    };

    const handleEdit = (record) => {
        // 在这里添加处理编辑的代码
        console.log('编辑', record.id);
        menuForm.setFieldsValue({
            menuName: record.menuName,
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
        console.log('删除', menuForm.getFieldsValue());
    };

    // 添加角色
    const handleAdd = () => {
        menuForm.resetFields();
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
            title: '查看下级',
            key: 'viewChildren',
            align: 'center',
            render: (record) => (
                <Button
                    type="link"
                    disabled={!hasNextLevel(record)}
                    onClick={() => handleNextLevel(record.id)}
                >
                    查看下级
                </Button>
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
                            <Form.Item label="上一级菜单" name="parentMenu" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Select>
                                    <Select.Option value="001">无上级菜单</Select.Option>
                                    <Select.Option value="002">商品</Select.Option>
                                    <Select.Option value="003">订单</Select.Option>
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
                    <Button type="link" onClick={() => handleDelete(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];

    return (
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
                                <Select.Option value="001">无上级菜单</Select.Option>
                                <Select.Option value="002">商品</Select.Option>
                                <Select.Option value="003">订单</Select.Option>
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
    );
}