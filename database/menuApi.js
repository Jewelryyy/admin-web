const { get } = require('../routes');
const connection = require('./db')

// 获取一级菜单
const getFirstLevelMenu = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from menu where menuLevel = 1", (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

// 获取二级菜单
const getSecondLevelMenuById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("select * from menu where parentMenu = ?", id, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

// 获取树形菜单
const getTreeMenu = () => {
    return new Promise((resolve, reject) => {
        connection.query("select * from menu", (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                let menu = data;
                let treeMenu = [];
                menu.forEach(item => {
                    if (item.menuLevel === 1) {
                        treeMenu.push(item);
                    }
                });
                treeMenu.forEach(item => {
                    item.children = [];
                    menu.forEach(child => {
                        if (child.parentMenu === item.mid) {
                            item.children.push(child);
                        }
                    });
                });
                resolve(treeMenu);
            }
        })
    })
};

// 添加菜单
const insertMenu = (menu) => {
    return new Promise((resolve, reject) => {
        connection.query("insert into menu set ?", menu, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

// 更新菜单
const updateMenu = (menu) => {
    return new Promise((resolve, reject) => {
        connection.query("update menu set ? where mid = ?", [menu, menu.mid], (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

// 删除菜单
const deleteMenu = (id) => {
    return new Promise((resolve, reject) => {
        // 删除父菜单和所有子菜单
        let query = "DELETE FROM menu WHERE mid = ? OR parentMenu = ?";
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
    getTreeMenu,
    getFirstLevelMenu,
    getSecondLevelMenuById,
    insertMenu,
    updateMenu,
    deleteMenu,
};
