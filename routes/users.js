var express = require('express');
var router = express.Router();

const {
  getUserById,
  getUserList,
  searchUser,
  insertUser,
  updateUser,
  deleteUser
} = require('../database/api');
const { route } = require('.');

/* GET single user. */
router.get('', function (req, res, next) {
  getUserById(req.query.id)
    .then(user => {
      res.json({
        code: 200,
        message: '成功',
        data: user,
      });
    })
    .catch(error => {
      console.error(error);
      res.json({
        code: 500,
        message: '服务器错误',
      });
    });
});

router.get('/list', function (req, res, next) {
  getUserList()
    .then(users => {
      res.json({
        code: 200,
        message: '获取用户列表成功',
        data: users,
      });
    })
    .catch(error => {
      console.error(error);
      res.json({
        code: 500,
        message: '服务器错误',
      });
    });
});

router.post('', function (req, res, next) {
  insertUser(req.body)
    .then(() => {
      res.json({
        code: 200,
        message: '添加成功',
      });
    })
    .catch(error => {
      console.error(error);
      res.json({
        code: 500,
        message: '服务器错误',
      });
    });
});

router.put('', function (req, res, next) {
  updateUser(req.body)
    .then(() => {
      res.json({
        code: 200,
        message: '更新成功',
      });
    })
    .catch(error => {
      console.error(error);
      res.json({
        code: 500,
        message: '服务器错误',
      });
    });
});

router.delete('', function (req, res, next) {
  deleteUser(req.query.id)
    .then(() => {
      res.json({
        code: 200,
        message: '删除成功',
      });
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
