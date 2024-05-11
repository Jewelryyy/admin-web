import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const toRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        // 在这里处理登录逻辑
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={toRegister}>Register</button>
        </div>
    );
}

export default Login;