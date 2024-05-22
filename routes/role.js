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
const { getMenusByRoleId, getMenusByRoleIds, insertRoleMenus } = require('../database/rolemenuApi');

router.get('', function (req, res, next) {
    getRoleById(req.query.id)
        .then(role => {
            res.json({
                code: 200,
                message: '获取角色成功',
                data: role,
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

/* GET role list. */
router.get('/list', function (req, res, next) {
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

router.get('/menulist', function (req, res, next) {
    getMenusByRoleId(req.query.roleId)
        .then(menus => {
            res.json({
                code: 200,
                message: '成功',
                data: menus.map(menus => menus.mid),
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

router.post('/menuName', function (req, res, next) {
    getMenusByRoleIds(req.body.roleIds)
        .then(menus => {
            res.json({
                code: 200,
                message: '成功',
                data: menus,
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

router.post('/assign', function (req, res, next) {
    insertRoleMenus(req.body)
        .then(() => {
            res.json({
                code: 200,
                message: '分配成功',
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

router.get('/search', function (req, res, next) {
    searchRole(req.query.query)
        .then(roles => {
            res.json({
                code: 200,
                message: '搜索角色成功',
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
