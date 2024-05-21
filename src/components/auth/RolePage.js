import React, { useState, useEffect } from 'react';
import { Card, Input, Space, Table, Button, Switch, Modal, Form, Checkbox, message, Tree } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import httpService from '../../utils/HttpService';

const { TextArea, Search } = Input;

function transformData(data) {
    return data.map(item => ({
        key: item.mid, // 假设每个菜单项都有一个唯一的 id
        title: item.menuName, // 假设菜单项的名称存储在 name 属性中
        children: item.children ? transformData(item.children) : [], // 如果有子菜单，递归转换子菜单
    }));
}

export default function RolePage() {
    // 创建状态变量和设置函数
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState([]);
    const [currentRoleId, setCurrentRoleId] = useState(0); // 用于保存当前角色的ID
    const [roleForm] = Form.useForm();
    const [menuList, setMenuList] = useState([]); // 用于保存所有的菜单
    const [menus, setMenus] = useState([]);  // 用于保存当前角色分配的菜单
    const [resourceForm] = Form.useForm();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

    // 树形菜单部分
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
        setMenus(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    // 在页面挂载时获取数据
    useEffect(() => {
        httpService.get('/role/list').then((res) => {
            if (res.code === 200) {
                setData(res.data);
            }
        });
    }, []);

    const showRoleModal = () => {
        setIsRoleModalOpen(true);
    };
    const handleRoleOk = () => {
        // 如果roleModal是打开的，说明是编辑用户信息
        if (isRoleModalOpen) {
            httpService.put('/role', roleForm.getFieldsValue()).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '更新成功',
                    });
                    httpService.get('/role/list').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                        }
                    });
                }
            });
            setIsRoleModalOpen(false);
        }
        // 如果AddModal是打开的，说明是添加用户
        if (isAddModalOpen) {
            httpService.post('/role', roleForm.getFieldsValue()).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '添加成功',
                    });
                    httpService.get('/role/list').then(res => {
                        if (res.code === 200) {
                            setData(res.data);
                        }
                    });
                }
            });
            setIsAddModalOpen(false);
        }
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
        console.log('分配菜单', menus);
        httpService.post('/role/assign', { roleId: currentRoleId, midList: menus }).then(res => {
            if (res.code === 200) {
                messageApi.open({
                    type: 'success',
                    content: '分配成功',
                });
            }
        });
    };
    const handleMenuCancel = () => {
        setIsMenuModalOpen(false);
    };

    const showResourceModal = () => {
        setIsResourceModalOpen(true);
    };
    const handleResourceOk = () => {
        setIsResourceModalOpen(false);
        // 在这里添加分配资源的代码
        console.log('分配资源', resourceForm.getFieldsValue());
    };
    const handleResourceCancel = () => {
        setIsResourceModalOpen(false);
    };

    const handleMenu = (id) => {
        // 在这里添加处理分配菜单的代码
        console.log('分配菜单', id);
        setCurrentRoleId(id);
        httpService.get('/menu').then(res => {
            if (res.code === 200) {
                console.log('菜单', res.data);
                setMenuList(transformData(res.data));
                httpService.get('/role/menulist', { roleId: id }).then(res => {
                    if (res.code === 200) {
                        setMenus(res.data);
                        setCheckedKeys(res.data);
                    }
                });
                showMenuModal();
            } else {
                messageApi.open({
                    type: 'error',
                    content: res.message,
                });
            }
        });
    };

    const handleResource = (record) => {
        // 在这里添加处理分配资源的代码
        console.log('分配资源', record.id);
        showResourceModal();
    }

    const handleEdit = (record) => {
        // 在这里添加处理编辑的代码
        console.log('编辑', record.roleId);
        roleForm.setFieldsValue({
            roleId: record.roleId,
            roleName: record.roleName,
            description: record.description,
            isEnabled: record.isEnabled
        });
        // 打开对话框
        showRoleModal();
    };

    const handleDelete = (id) => {
        // 找到对应的数据项
        const item = data.find(item => item.roleId === id);
        if (item) {
            // 删除数据项
            data.splice(data.indexOf(item), 1);
            // 更新组件的状态以重新渲染
            setData([...data]);
        }
        httpService.delete('/role', { id: id }).then(res => {
            if (res.code === 200) {
                httpService.get('/role/list').then(res => {
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

    // 添加角色
    const handleAdd = () => {
        roleForm.resetFields();
        setIsAddModalOpen(true);
    }

    const handleToggleEnabled = (id) => {
        // 找到对应的数据项
        const item = data.find(item => item.roleId === id);
        if (item) {
            // 切换 isEnabled 属性的值
            item.isEnabled = !item.isEnabled;
            let param = {
                roleId: item.roleId,
                roleName: item.roleName,
                description: item.description,
                isEnabled: item.isEnabled
            };
            // 更新组件的状态以重新渲染
            httpService.put('/role', param).then(res => {
                if (res.code === 200) {
                    messageApi.open({
                        type: 'success',
                        content: '更新成功',
                    });
                    httpService.get('/role/list').then(res => {
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
            dataIndex: 'roleId',
            key: 'roleId',
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
            render: text => {
                const date = new Date(text);
                return date.toLocaleString();
            },
        },
        {
            title: '是否启用',
            dataIndex: 'isEnabled',
            key: 'isEnabled',
            align: 'center',
            render: (isEnabled, record) => (
                <Switch checked={isEnabled} onChange={() => handleToggleEnabled(record.roleId)} />
            ),
        },
        {
            title: '操作',
            key: 'operation',
            align: 'center',
            render: (record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleMenu(record.roleId)}>分配菜单</Button>
                    <Modal
                        title="分配菜单"
                        open={isMenuModalOpen}
                        onOk={handleMenuOk}
                        onCancel={handleMenuCancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Form>
                            <Form.Item label="菜单" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Tree
                                    checkable
                                    onExpand={onExpand}
                                    expandedKeys={expandedKeys}
                                    autoExpandParent={autoExpandParent}
                                    onCheck={onCheck}
                                    checkedKeys={checkedKeys}
                                    onSelect={onSelect}
                                    selectedKeys={selectedKeys}
                                    treeData={menuList}
                                />
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
                                <TextArea rows={2} />
                            </Form.Item>
                            <Form.Item label="是否启用" name="isEnabled" valuePropName="checked" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                                <Checkbox />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="link" onClick={() => handleDelete(record.roleId)}>删除</Button>
                </Space>
            ),
        },
    ];

    const onSearch = (value, _e, info) => {
        console.log(value, _e, info);
        if (value) {
            httpService.get('/role/search', { query: value }).then(res => {
                if (res.code === 200) {
                    setData(res.data);
                }
            });
        }
        else {
            httpService.get('/role/list').then(res => {
                if (res.code === 200) {
                    setData(res.data);
                }
            });
        }
    };

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
        </>
    );
}