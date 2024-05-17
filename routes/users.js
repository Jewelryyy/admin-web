var express = require('express');
var router = express.Router();

const {
  getUserList,
  searchUser,
  insertUser,
  updateUser,
  deleteUser
} = require('../database/api');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/add', function (req, res, next) {
  res.json({ message: 'User created!' });
});

module.exports = router;
