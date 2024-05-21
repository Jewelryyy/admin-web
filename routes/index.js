//导入模块
var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const {
  searchUser,
  insertUser,
  updateLastLogin
} = require('../database/api');
const { getRoleListByUserId } = require('../database/userroleApi');

// 拦截所有请求
// extended: false  方法内部使用 querystring 模块处理请求参数的格式
// extended: true   方法内部使用第三方模块 qs 来处理请求参数的格式
// 建议使用false
router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
  console.log(req.body);
  const { username, password } = req.body;
  // 验证用户名和密码是否正确
  searchUser(username, 'username')
    .then(users => {
      const user = users[0];
      if (user && user.password === password) {
        getRoleListByUserId(user.userId)
          .then(roles => {
            res.json({
              code: 200,
              message: '登录成功',
              token: username,
              role: roles.map(role => role.roleId),
            });
          });
      } else {
        res.json({
          code: 400,
          message: '用户名或密码错误',
        });
      }
    })
    .catch(error => {
      console.error(error);
      res.json({
        code: 500,
        message: '服务器错误',
      });
    });
  // 把登录时间戳更新到数据库
  updateLastLogin(username)
    .then(() => {
      console.log('更新登录时间成功');
    })
    .catch(error => {
      console.error(error);
    });
});

router.post('/register', function (req, res, next) {
  console.log(req.body);
  const { email } = req.body;
  // 验证邮箱是否已经注册
  searchUser(email, 'email')
    .then(user => {
      if (user) {
        res.json({
          code: 400,
          message: '邮箱已被注册',
        });
      } else {
        return insertUser(req.body);
      }
    })
    .then(user => {
      if (user) {
        console.log(user);
        res.json({
          code: 200,
          message: '注册成功',
        });
      }
    })
    .catch(error => {
      console.error(error);
      res.json({
        code: 500,
        message: '服务器错误',
      });
    });
});

module.exports = router;
