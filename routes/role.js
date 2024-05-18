var express = require('express');
var router = express.Router();

const {
    getRoleById,
    getRoleList,
    searchRole,
    insertRole,
    updateRole,
    deleteRole,
} = require('../database/roleApi');

/* GET role list. */
router.get('', function (req, res, next) {
    getRoleList()
        .then(roles => {
            res.json({
                code: 200,
                message: '获取角色列表成功',
                data: roles,
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
    insertRole(req.body)
        .then(() => {
            res.json({
                code: 200,
                message: '添加角色成功',
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
    updateRole(req.body)
        .then(() => {
            res.json({
                code: 200,
                message: '更新角色成功',
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
    deleteRole(req.query.id)
        .then(() => {
            res.json({
                code: 200,
                message: '删除角色成功',
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
