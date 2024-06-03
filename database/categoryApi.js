const connection = require('./db')

// 获取一级分类
const getFirstLevelCategory = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from category where level = 1", (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

// 获取二级分类
const getSecondLevelCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("select * from category where parentId = ?", id, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

// 获取可用的树形分类
const getTreeCategory = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from category where isEnabled = 1", (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                let category = data;
                let treeCategory = [];
                category.forEach(item => {
                    if (item.categoryLevel === 1) {
                        treeCategory.push(item);
                    }
                });
                treeCategory.forEach(item => {
                    item.children = [];
                    category.forEach(child => {
                        if (child.parentCategory === item.categoryId) {
                            item.children.push(child);
                        }
                    });
                });
                resolve(treeCategory);
            }
        })
    })
};

// 添加分类
const insertCategory = (category) => {
    return new Promise((resolve, reject) => {
        connection.query("insert into category set ?", category, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

// 更新分类
const updateCategory = (category) => {
    return new Promise((resolve, reject) => {
        connection.query("update category set ? where categoryId = ?", [category, category.categoryId], (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

const updateCategoryAndChildren = async (category) => {
    // 更新分类
    await updateCategory(category);

    // 如果isEnabled被设置为0，更新所有子分类
    let children = await getSecondLevelCategoryById(category.categoryId);
    if (children) {
        for (let child of children) {
            child.isEnabled = category.isEnabled;
            await updateCategory(child);
        }
    }
};

// 删除分类
const deleteCategory = (id) => {
    console.log('delete: ' + id);
    return new Promise((resolve, reject) => {
        // 删除父分类和所有子分类
        let query = "DELETE FROM category WHERE categoryId = ? OR parentId = ?";
        connection.query(query, [id, id], (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

module.exports = {
    getTreeCategory,
    getFirstLevelCategory,
    getSecondLevelCategoryById,
    updateCategoryAndChildren,
    insertCategory,
    updateCategory,
    deleteCategory,
};
