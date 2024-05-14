import Mock from 'mockjs';

let login_success = {
    status: 'ok', // 表示账号密码正确，登录成功
    token: 'test_token', // 登录成功后返回的 token
};

let login_error = {
    status: 'error', // 表示账号密码错误，登录失败
};

let register_success = {
    status: 'ok', // 表示注册成功
};

let register_error = {
    status: 'error', // 表示注册失败
};

// 登录接口
Mock.mock(
    '/login', 'post',
    (req) => {
        console.log(req)
        let req_data = JSON.parse(req.body)
        if (req_data.username === "admin" && req_data.password === 'admin') {
            return login_success;
        }
        return login_error;
    }
)

// 注册接口
Mock.mock(
    '/register', 'post',
    (req) => {
        console.log(req)
        let req_data = JSON.parse(req.body)
        if (req_data.username && req_data.password) {
            return register_success;
        }
        return register_error;
    }
)

export default Mock;