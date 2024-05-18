//api.js

const connection = require('./db')

//查询
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        //第一个参数：sql语句
        //第二个参数：回调函数（err：查询错误，data：查询结果）
        connection.query("select * from user where userId = ?", id, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const getUserList = () => {
    return new Promise((resolve, reject) => {
        //第一个参数：sql语句
        //第二个参数：回调函数（err：查询错误，data：查询结果）
        connection.query("select * from user", (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const searchUser = (query, type) => {
    return new Promise((resolve, reject) => {
        // 确保查询字符串存在
        if (!query) {
            reject(new Error('Invalid query'));
            return;
        }

        // 根据 type 构建 SQL 查询语句
        let searchSql;
        let params;
        if (type === 'username') {
            searchSql = 'SELECT * FROM user WHERE username = ?';
            params = [query];
        } else if (type === 'email') {
            searchSql = 'SELECT * FROM user WHERE email = ?';
            params = [query];
        } else {
            searchSql = 'SELECT * FROM user WHERE username LIKE ? OR email LIKE ?';
            params = [`%${query}%`, `%${query}%`];
        }

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

//添加
const insertUser = (user) => {
    return new Promise((resolve, reject) => {
        // 从用户对象中提取需要的属性
        const { username, email, password, isEnabled } = user;

        // 确保 username, email 和 password 存在
        if (!username || !email || !password) {
            reject(new Error('Invalid user object: missing username, email or password'));
            return;
        }

        // 构建 SQL 插入语句
        let insertSql = 'INSERT INTO user(username, email, password';
        let placeholders = '(?, ?, ?';
        let params = [username, email, password];

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
}
//改
const updateLastLogin = (username) => {
    return new Promise((resolve, reject) => {
        // 构建 SQL 更新语句
        const updateSql = 'UPDATE user SET lastLogin = ? WHERE username = ?';
        const params = [new Date(), username];

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
}
const updateUser = (user) => {
    return new Promise((resolve, reject) => {
        // 从用户对象中提取需要的属性
        const { userId, username, email, password, addTime, lastLogin, isEnabled } = user;

        // 确保 id 存在
        if (!userId) {
            reject(new Error('Invalid user object: missing id'));
            return;
        }

        // 构建 SQL 更新语句
        let updateSql = 'UPDATE user SET ';
        let params = [];

        if (username) {
            updateSql += 'username = ?, ';
            params.push(username);
        }

        if (email) {
            updateSql += 'email = ?, ';
            params.push(email);
        }

        if (password) {
            updateSql += 'password = ?, ';
            params.push(password);
        }

        if (addTime) {
            updateSql += 'addTime = ?, ';
            params.push(addTime);
        }

        if (lastLogin) {
            updateSql += 'lastLogin = ?, ';
            params.push(lastLogin);
        }

        if (isEnabled !== undefined) {
            updateSql += 'isEnabled = ?, ';
            params.push(isEnabled);
        }

        // 去掉最后的逗号和空格
        updateSql = updateSql.slice(0, -2);

        // 添加 WHERE 子句
        updateSql += ' WHERE userId = ?';
        params.push(userId);

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
}

//删除
const deleteUser = (param) => {
    return new Promise((resolve, reject) => {
        connection.query("delete from user where userId = ?", param, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
//导出方法，在需要使用到的模块中导入
module.exports = {
    getUserById,
    getUserList,
    searchUser,
    insertUser,
    updateUser,
    deleteUser,
    updateLastLogin
}
