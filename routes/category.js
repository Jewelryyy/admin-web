var express = require('express');
var router = express.Router();

const {
    getTreeCategory,
    getFirstLevelCategory,
    updateCategoryAndChildren,
    getSecondLevelCategoryById,
    insertCategory,
    deleteCategory
} = require('../database/categoryApi');

/* GET all category. */
router.get('', function (req, res, next) {
    getTreeCategory()
        .then(category => {
            res.json({
                code: 200,
                message: '成功',
                data: category,
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

/* GET first level category. */
router.get('/first', function (req, res, next) {
    getFirstLevelCategory()
        .then(category => {
            res.json({
                code: 200,
                message: '成功',
                data: category,
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

/* GET second level category. */
router.get('/second', function (req, res, next) {
    const { id } = req.query;
    getSecondLevelCategoryById(id)
        .then(category => {
            res.json({
                code: 200,
                message: '成功',
                data: category,
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
    insertCategory(req.body)
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
    updateCategoryAndChildren(req.body)
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
    deleteCategory(req.query.id)
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
