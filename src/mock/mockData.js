import Mock from 'mockjs';
import {
    HomeFilled,
    BarChartOutlined,
    ShoppingFilled,
    AuditOutlined,
    PropertySafetyFilled,
    KeyOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    ProductOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';

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

let menuList = [
    {
        key: '1',
        icon: <HomeFilled />,
        label: '首页',
        children: [
            {
                key: '11',
                icon: <BarChartOutlined />,
                label: '仪表盘',
            },
        ],
    },
    {
        key: '2',
        icon: <ShoppingFilled />,
        label: '商品',
        children: [
            {
                key: '21',
                icon: <ShoppingFilled />,
                label: '商品管理',
            },
            {
                key: '22',
                icon: <ShoppingFilled />,
                label: '商品分类',
            },
        ],
    },
    {
        key: '3',
        icon: <AuditOutlined />,
        label: '订单',
        children: [
            {
                key: '31',
                icon: <AuditOutlined />,
                label: '订单管理',
            },
            {
                key: '32',
                icon: <AuditOutlined />,
                label: '订单统计',
            },
        ],
    },
    {
        key: '4',
        icon: <PropertySafetyFilled />,
        label: '营销',
        children: [
            {
                key: '41',
                icon: <PropertySafetyFilled />,
                label: '优惠券',
            },
            {
                key: '42',
                icon: <PropertySafetyFilled />,
                label: '秒杀活动',
            },
        ],
    },
    {
        key: '5',
        icon: <KeyOutlined />,
        label: '权限',
        children: [
            {
                key: '51',
                icon: <UserOutlined />,
                label: '用户管理',
            },
            {
                key: '52',
                icon: <UsergroupAddOutlined />,
                label: '角色管理',
            },
            {
                key: '53',
                icon: <ProductOutlined />,
                label: '菜单管理',
            },
            {
                key: '54',
                icon: <DatabaseOutlined />,
                label: '资源管理',
            },
        ],
    },
];

// 登录接口
Mock.mock(
    '/login', 'post',
    (req) => {
        console.log(req);
        let req_data = JSON.parse(req.body);
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
        console.log(req);
        let req_data = JSON.parse(req.body);
        if (req_data.username && req_data.password) {
            return register_success;
        }
        return register_error;
    }
)

Mock.mock(
    '/menuList', 'get',
    (req) => {
        console.log(req);
        return {
            status: 'ok',
            data: menuList,
        };
    }
)

export default Mock;