var express = require('express');
var router = express.Router();

const {
    getTreeMenu,
    getFirstLevelMenu,
    getSecondLevelMenuById,
    insertMenu,
    updateMenu,
    deleteMenu
} = require('../database/menuApi');

/* GET all menu. */
router.get('', function (req, res, next) {
    getTreeMenu()
        .then(menu => {
            res.json({
                code: 200,
                message: '成功',
                data: menu,
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

/* GET first level menu. */
router.get('/first', function (req, res, next) {
    getFirstLevelMenu()
        .then(menu => {
            res.json({
                code: 200,
                message: '成功',
                data: menu,
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

/* GET second level menu. */
router.get('/second', function (req, res, next) {
    const { id } = req.query;
    getSecondLevelMenuById(id)
        .then(menu => {
            res.json({
                code: 200,
                message: '成功',
                data: menu,
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
    insertMenu(req.body)
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
    updateMenu(req.body)
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
    deleteMenu(req.query.id)
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
