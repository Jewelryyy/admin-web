import React, { useState, useEffect } from 'react';
import { Card, Select, Input, Space, Table, Button, Switch, Modal, Form, Checkbox, message } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import httpService from '../../utils/HttpService';

const { TextArea } = Input;

export default function CategoryPage() {
    // 创建状态变量和设置函数
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState([]);
    const [firstLevel, setFirstLevel] = useState([]);
    const [categoryForm] = Form.useForm();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    // 在组件挂载时加载数据
    useEffect(() => {
        httpService.get('/category/first').then((res) => {
            if (res.code === 200) {
                setData(res.data);
                setFirstLevel(res.data);
            }
        });
    }, []);

    const showMenuModal = () => {
        setIsCategoryModalOpen(true);
    };
    const handleCategoryOk = () => {
        // 如果MenuModal是打开的，说明是编辑分类信息
        if (isCategoryModalOpen) {
            httpService.put('/category', categoryForm.getFieldsValue()).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '更新成功',
                    });
                    httpService.get('/category/first').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                            setFirstLevel(res.data);
                        }
                    });
                }
            });
            setIsCategoryModalOpen(false);
        }
        // 如果AddModal是打开的，说明是添加商品分类
        if (isAddModalOpen) {
            httpService.post('/category', categoryForm.getFieldsValue()).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '添加成功',
                    });
                    httpService.get('/category/first').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                            setFirstLevel(res.data);
                        }
                    });
                }
            });
            setIsAddModalOpen(false);
        }
    };
    const handleCategoryCancel = () => {
        setIsCategoryModalOpen(false);
        setIsAddModalOpen(false);
    };

    const hasNextLevel = (record) => {
        // 如果菜单级数为1，有下级菜单
        if (record.level === 1) {
            return true;
        }
        return false;
    };

    const handleNextLevel = (id) => {
        console.log('查看下级', id);
        httpService.get(`/category/second`, { id: id }).then((res) => {
            if (res.code === 200) {
                setData(res.data);
            }
        });
    };

    const handlePrevLevel = (id) => {
        console.log('查看上级', id);
        httpService.get(`/category/first`, { id: id }).then((res) => {
            if (res.code === 200) {
                setData(res.data);
            }
        });
    };

    const handleEdit = (record) => {
        // 在这里添加处理编辑的代码
        console.log('编辑', record);
        categoryForm.setFieldsValue({
            categoryId: record.categoryId,
            name: record.name,
            level: record.level,
            unit: record.unit,
            sortOrder: record.sortOrder,
            isEnabled: record.isEnabled,
            desc: record.desc,
            parentId: record.parentId
        });
        // 打开对话框
        showMenuModal();
    };

    const handleDelete = (id) => {
        // 找到对应的数据项
        const item = data.find(item => item.categoryId === id);
        if (item) {
            // 删除数据项
            data.splice(data.indexOf(item), 1);
            // 更新组件的状态以重新渲染
            setData([...data]);
        }
        httpService.delete('/category', { id: id }).then(res => {
            if (res.code === 200) {
                httpService.get('/category/first').then(res => {
                    if (res.code === 200) {
                        setData(res.data);
                        setFirstLevel(res.data);
                        messageApi.open({
                            type: 'success',
                            content: '删除成功',
                        });
                    }
                });
            }
        });
        console.log('删除', categoryForm.getFieldsValue());
    };

    // 添加角色
    const handleAdd = () => {
        categoryForm.resetFields();
        setIsAddModalOpen(true);
    }

    const handleToggleEnabled = (id) => {
        // 找到对应的数据项
        const item = data.find(item => item.categoryId === id);
        if (item) {
            // 切换 isEnabled 属性的值
            item.isEnabled = !item.isEnabled;
            let param = {
                categoryId: item.categoryId,
                name: item.name,
                level: item.level,
                unit: item.unit,
                sortOrder: item.sortOrder,
                isEnabled: item.isEnabled
            };
            // 更新组件的状态以重新渲染
            httpService.put('/category', param).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '更新成功',
                    });
                    httpService.get('/category/first').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                            setFirstLevel(res.data);
                        }
                    });
                }
            });
        }
    };

    const handleTransfer = (id) => {
        messageApi.open({
            type: 'success',
            content: id + '转移成功'
        })
    };

    const columns = [
        {
            title: '编号',
            dataIndex: 'categoryId',
            key: 'categoryId',
            align: 'center',
        },
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '级别',
            dataIndex: 'level',
            key: 'level',
            align: 'center',
        },
        {
            title: '商品数量',
            dataIndex: 'goodsNum',
            key: 'goodNum',
            align: 'center',
        },
        {
            title: '数量单位',
            dataIndex: 'unit',
            key: 'unit',
            align: 'center',
        },
        {
            title: '是否显示',
            dataIndex: 'isEnabled',
            key: 'isEnabled',
            align: 'center',
            render: (isEnabled, record) => (
                <Switch checked={isEnabled} onChange={() => handleToggleEnabled(record.categoryId)} />
            ),
        },
        {
            title: '排序',
            dataIndex: 'sortOrder',
            key: 'sortOrder',
            align: 'center',
        },
        {
            title: '设置',
            key: 'viewChildren',
            align: 'center',
            render: (record) => (
                <>
                    <Space size="middle">
                        <Button
                            disabled={!hasNextLevel(record)}
                            onClick={() => handleNextLevel(record.categoryId)}
                        >
                            查看下级
                        </Button>
                        {record.level !== 1 ? <Button onClick={() => handlePrevLevel(record.categoryId)}>查看上级</Button> : ''}
                        <Button
                            onClick={() => handleTransfer(record.categoryId)}
                        >
                            转移商品
                        </Button>
                    </Space>
                </>
            ),
        },
        {
            title: '操作',
            key: 'operation',
            align: 'center',
            render: (record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>编辑</Button>
                    <Modal
                        title="编辑分类信息"
                        open={isCategoryModalOpen}
                        onOk={handleCategoryOk}
                        onCancel={handleCategoryCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={categoryForm}>
                            <Form.Item
                                label="分类名称"
                                name="name"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入分类名!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="上级分类"
                                name="parentId"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <Select>
                                    <Select.Option value={0}>无上级分类</Select.Option>
                                    {/* 渲染一级菜单的内容 */}
                                    {firstLevel.map((item) => (
                                        <Select.Option key={item.categoryId} value={item.categoryId}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="数量单位" name="unit" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="排序" name="sortOrder" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="是否启用" name="isEnabled" valuePropName="checked" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Checkbox />
                            </Form.Item>
                            <Form.Item label="分类描述" name="desc" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <TextArea rows={2} />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button danger onClick={() => handleDelete(record.categoryId)}>删除</Button>
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
                        title="添加分类"
                        open={isAddModalOpen}
                        onOk={handleCategoryOk}
                        onCancel={handleCategoryCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form form={categoryForm}>
                            <Form.Item
                                label="分类名称"
                                name="name"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入分类名!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="上级分类"
                                name="parentCategory"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 16 }}
                            >
                                <Select>
                                    <Select.Option value={0}>无上级分类</Select.Option>
                                    {/* 渲染一级菜单的内容 */}
                                    {firstLevel.map((item) => (
                                        <Select.Option key={item.categoryId} value={item.categoryId}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="数量单位" name="unit" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="排序" name="sortOrder" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="是否启用" name="isEnabled" valuePropName="checked" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Checkbox />
                            </Form.Item>
                            <Form.Item label="分类描述" name="desc" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <TextArea rows={2} />
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