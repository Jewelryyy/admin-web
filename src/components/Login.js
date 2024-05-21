import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Space, message } from 'antd';
import HttpService from '../utils/HttpService';

const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};

function Login() {
    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();

    const toRegister = () => {
        navigate('/register');
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        HttpService.post('/login', values)
            .then(res => {
                console.log(res);
                if (res.code === 200) {
                    sessionStorage.setItem('token', JSON.stringify({ token: res.token, role: res.role }));
                    navigate('/dashboard');
                } else {
                    messageApi.open({
                        type: 'error',
                        content: res.message,
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    const onFinishFailed = (errorInfo) => {
        // messageApi.open({
        //     type: 'error',
        //     content: errorInfo,
        // });
    };

    return (
        <>
            {contextHolder}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // 使其占满整个视口高度
            }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        border: '1px solid #000', // 添加边框
                        padding: '10px 60px 10px 60px', // 添加内边距
                        borderRadius: '10px' // 添加边框圆角
                    }}
                    initialValues={{
                        username: 'admin',
                        password: '123456',
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item {...tailLayout}>
                        <h1>信息管理系统</h1>
                    </Form.Item>

                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={<span>密<span style={{ width: '1em', display: 'inline-block' }}></span>码</span>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        {...tailLayout}
                    >
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                登 录
                            </Button>
                            <Button type="primary" htmlType="submit" onClick={toRegister}>
                                注 册
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Login;