import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <Button type="primary" onClick={() => navigate('/dashboard')}>
                回首页
            </Button>
            <div>
                <img
                    src="https://gd-hbimg.huaban.com/201c0b74fc74dfc000442a943392e9d9f5efbd294430-woQFje_fw658webp"
                    alt='页面还未制作'
                />
            </div>
        </div>
    );
};

export default NotFound;