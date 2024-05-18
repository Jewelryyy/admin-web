const connection = require('./db')

//查询
const getRoleById = (id) => {
    return new Promise((resolve, reject) => {
        //第一个参数：sql语句
        //第二个参数：回调函数（err：查询错误，data：查询结果）
        connection.query("select * from role where roleId = ?", id, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const getRoleList = () => {
    return new Promise((resolve, reject) => {
        //第一个参数：sql语句
        //第二个参数：回调函数（err：查询错误，data：查询结果）
        connection.query("select * from role", (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const searchRole = (query) => {
    return new Promise((resolve, reject) => {
        // 确保查询字符串存在
        if (!query) {
            reject(new Error('Invalid query'));
            return;
        }

        // 根据 type 构建 SQL 查询语句
        let searchSql;
        let params;
        searchSql = 'SELECT * FROM role WHERE roleName LIKE ?';
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

//添加
const insertRole = (role) => {
    return new Promise((resolve, reject) => {
        // 从用户对象中提取需要的属性
        const { roleName, description, isEnabled } = role;

        // 确保 roleName 存在
        if (!roleName) {
            reject(new Error('Invalid role object: missing roleName'));
            return;
        }

        // 构建 SQL 插入语句
        let insertSql = 'INSERT INTO role(roleName';
        let placeholders = '(?';
        let params = [roleName];

        insertSql += ', addTime';
        placeholders += ', ?';
        params.push(new Date());

        if (description !== undefined) {
            insertSql += ', description';
            placeholders += ', ?';
            params.push(description);
        }

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
const updateRole = (role) => {
    return new Promise((resolve, reject) => {
        // 从用户对象中提取需要的属性
        const { roleId, roleName, description, addTime, isEnabled } = role;

        // 确保 id 存在
        if (!roleId) {
            reject(new Error('Invalid role object: missing id'));
            return;
        }

        // 构建 SQL 更新语句
        let updateSql = 'UPDATE role SET ';
        let params = [];

        if (roleName) {
            updateSql += 'roleName = ?, ';
            params.push(roleName);
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
        updateSql += ' WHERE roleId = ?';
        params.push(roleId);

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
const deleteRole = (param) => {
    return new Promise((resolve, reject) => {
        connection.query("delete from role where roleId = ?", param, (err, data) => {
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
    getRoleById,
    getRoleList,
    searchRole,
    insertRole,
    updateRole,
    deleteRole,
}
