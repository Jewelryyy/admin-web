import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space, message } from 'antd';
import HttpService from '../utils/HttpService';

const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 16,
    },
};

function Register() {
    const [email, setEMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        const canvas = document.getElementById('backgroundCanvas');
        const ctx = canvas.getContext('2d');

        // 设置 canvas 的大小为窗口的大小
        canvas.width = window.innerWidth / 2;
        canvas.height = window.innerHeight;

        // 创建点
        const points = [];
        for (let i = 0; i < 50; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
            });
        }

        // 绘制点和线
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < points.length; i++) {
                const point = points[i];

                // 绘制点
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                ctx.fill();

                // 绘制线
                for (let j = i + 1; j < points.length; j++) {
                    const otherPoint = points[j];
                    const dx = otherPoint.x - point.x;
                    const dy = otherPoint.y - point.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(otherPoint.x, otherPoint.y);
                        ctx.stroke();
                    }
                }

                // 更新点的位置
                point.x += point.vx;
                point.y += point.vy;

                if (point.x < 0 || point.x > canvas.width) {
                    point.vx = -point.vx;
                }

                if (point.y < 0 || point.y > canvas.height) {
                    point.vy = -point.vy;
                }
            }

            requestAnimationFrame(draw);
        };

        draw();
    }, []);

    const handleRegister = () => {
        // 在这里处理注册逻辑
        console.log(`
                EMail: ${email}, 
                Username: ${username}, 
                Password: ${password}, 
                Confirm Password: ${confirmPassword}
            `);
    };

    const onFinish = (values) => {
        HttpService.post('/register', values)
            .then(res => {
                console.log('Success:', values);
                console.log(res);
                if (res.code === 200) {
                    alert('注册成功！');
                    navigate('/login');
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
        console.log('Failed:', errorInfo);
        messageApi.open({
            type: 'error',
            content: '表单验证失败，不能进行注册',
        });
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
                <canvas id="backgroundCanvas" style={{ position: 'absolute', right: 0, zIndex: -1 }} />
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
                        border: '1px solid #EBEDEF', // 添加边框
                        padding: '10px 60px 10px 60px', // 添加内边距
                        borderRadius: '10px', // 添加边框圆角
                        backgroundColor: '#EBEDEF', // 更改表单的背景颜色
                        boxShadow: '0 0 20px #EBEDEF' // 添加阴影
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item {...tailLayout}>
                        <h2>注册账号</h2>
                    </Form.Item>

                    <Form.Item
                        label={<span>邮<span style={{ width: '1em', display: 'inline-block' }}></span>箱</span>}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱!',
                            },
                            {
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: '请输入有效的邮箱地址!',
                            },
                        ]}
                    >
                        <Input onChange={e => setEMail(e.target.value)} />
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
                        <Input onChange={e => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label={<span>密<span style={{ width: '1em', display: 'inline-block' }}></span>码</span>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
                                message: '密码必须包含大小写字母和数字，且长度为8-16位!',
                            },
                        ]}
                    >
                        <Input.Password onChange={e => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="确认密码"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: '请再次输入密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password onChange={e => setConfirmPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit" onClick={handleRegister}>
                                注 册
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Register;