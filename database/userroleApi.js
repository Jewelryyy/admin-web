const connection = require('./db')

//查询
const getRoleListByUserId = (id) => {
    return new Promise((resolve, reject) => {
        connection.query("select roleId from userrole where urId in (select urId from userrole where userId = ?)", [id], (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

const getUserroleById = (id) => {
    return new Promise((resolve, reject) => {
        //第一个参数：sql语句
        //第二个参数：回调函数（err：查询错误，data：查询结果）
        connection.query("select * from userrole where urId = ?", id, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

const getUserroleList = () => {
    return new Promise((resolve, reject) => {
        //第一个参数：sql语句
        //第二个参数：回调函数（err：查询错误，data：查询结果）
        connection.query("select * from userrole", (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

const searchUserrole = (query) => {
    return new Promise((resolve, reject) => {
        // 确保查询字符串存在
        if (!query) {
            reject(new Error('Invalid query'));
            return;
        }

        // 根据 type 构建 SQL 查询语句
        let searchSql;
        let params;
        searchSql = 'SELECT * FROM userrole WHERE userroleName LIKE ?';
        params = [`%${query}%`];

        // 执行 SQL 查询操作
        connection.query(searchSql, params, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
};

// 添加
const insertUserroleList = (body) => {
    const { userId, roleIdList } = body;
    return new Promise((resolve, reject) => {
        // 确保 userId 和 roleIdList 存在
        if (!userId || !roleIdList) {
            reject(new Error('Invalid userrole object: missing userId or roleIdList'));
            return;
        }

        // 首先删除所有与 userId 相关的旧记录
        let deleteQuery = 'DELETE FROM userrole WHERE userId = ?';
        connection.query(deleteQuery, [userId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            // 创建一个 promise 数组，每个 promise 对应一个插入操作
            let promises = roleIdList.map(roleId => {
                return new Promise((resolve, reject) => {
                    let insertQuery = 'INSERT INTO userrole (userId, roleId) VALUES (?, ?)';
                    connection.query(insertQuery, [userId, roleId], (err, result) => {
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

const insertUserrole = (userrole) => {
    return new Promise((resolve, reject) => {
        // 从用户对象中提取需要的属性
        const { userroleName, description, isEnabled } = userrole;

        // 确保 userroleName, email 和 password 存在
        if (!userroleName || !description) {
            reject(new Error('Invalid userrole object: missing userroleName or description'));
            return;
        }

        // 构建 SQL 插入语句
        let insertSql = 'INSERT INTO userrole(userroleName, description';
        let placeholders = '(?, ?';
        let params = [userroleName, description];

        insertSql += ', addTime';
        placeholders += ', ?';
        params.push(new Date());

        if (isEnabled !== undefined) {
            insertSql += ', isEnabled';
            placeholders += ', ?';
            params.push(isEnabled);
        }

        insertSql += ') VALUES' + placeholders + ')';

        // 执行 SQL 插入操作
        connection.query(insertSql, params, (err, data) => {
            // 如果 err 为 null 则成功
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
//改
const updateUserrole = (userrole) => {
    return new Promise((resolve, reject) => {
        // 从用户对象中提取需要的属性
        const { urId, userroleName, description, addTime, isEnabled } = userrole;

        // 确保 id 存在
        if (!urId) {
            reject(new Error('Invalid userrole object: missing id'));
            return;
        }

        // 构建 SQL 更新语句
        let updateSql = 'UPDATE userrole SET ';
        let params = [];

        if (userroleName) {
            updateSql += 'userroleName = ?, ';
            params.push(userroleName);
        }

        if (description) {
            updateSql += 'description = ?, ';
            params.push(description);
        }

        if (addTime) {
            updateSql += 'addTime = ?, ';
            params.push(addTime);
        }

        if (isEnabled !== undefined) {
            updateSql += 'isEnabled = ?, ';
            params.push(isEnabled);
        }

        // 去掉最后的逗号和空格
        updateSql = updateSql.slice(0, -2);

        // 添加 WHERE 子句
        updateSql += ' WHERE urId = ?';
        params.push(urId);

        // 执行 SQL 更新操作
        connection.query(updateSql, params, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                // 如果 err 为 null 则成功
                resolve(data);
            }
        });
    });
};

//删除
const deleteUserrole = (param) => {
    return new Promise((resolve, reject) => {
        connection.query("delete from userrole where urId = ?", param, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};

//导出方法，在需要使用到的模块中导入
module.exports = {
    getRoleListByUserId,
    insertUserroleList,
    getUserroleById,
    getUserroleList,
    searchUserrole,
    insertUserrole,
    updateUserrole,
    deleteUserrole,
};
