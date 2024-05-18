# 基于Node.js的商城后台系统的后端部分

这个后端项目服务于main分支的商城后台管理系统的前端。

## ！！！数据库配置

在database文件夹中，你还需要添加自己的数据库配置文件`config.js`
```
# config.js
module.exports = {
    db: {
        host: '替换为你的主机名称',
        port: 3306,  // 替换为你的端口号
        user: '替换为你的用户名',
        password: '替换为你的密码',
        database: '替换为你的数据库名称'
    }
}
```

### 启动后端项目`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.