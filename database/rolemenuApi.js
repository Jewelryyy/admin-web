const connection = require('./db')

//查询
const getMenusByRoleId = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("select mid from rolemenu where rmId in (select rmId from rolemenu where roleId = ?)", [id], (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};


// 插入
const insertRoleMenus = (body) => {
    const { roleId, midList } = body;
    return new Promise((resolve, reject) => {
        // 确保 roleId 和 midList 存在
        if (!roleId || !midList) {
            reject(new Error('Invalid rolemenu object: missing roleId or midList'));
            return;
        }

        // 首先删除所有与 roleId 相关的旧记录
        let deleteQuery = 'DELETE FROM rolemenu WHERE roleId = ?';
        connection.query(deleteQuery, [roleId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            // 创建一个 promise 数组，每个 promise 对应一个插入操作
            let promises = midList.map(mid => {
                return new Promise((resolve, reject) => {
                    let insertQuery = 'INSERT INTO rolemenu (roleId, mid) VALUES (?, ?)';
                    connection.query(insertQuery, [roleId, mid], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            });

            // 并行执行所有插入操作
            Promise.all(promises)
                .then(results => resolve(results))
                .catch(err => reject(err));
        });
    });
};

module.exports = {
    getMenusByRoleId,
    insertRoleMenus
};