# 基于Node.js的商城后台系统的后端部分

这个后端项目服务于main分支的商城后台管理系统的前端。

## ！！！数据库配置

1.打开命令行，登入`mysql`，创建一个数据库如`mall`并使用该数据库`use mall`，

2.在命令行输入`source PATH_TO_SQL`，将`PATH_TO_SQL`替换成`mall.sql`文件的路径，运行`/database`文件夹下的数据库脚本`mall.sql`，

3.在`/database`文件夹中，你还需要添加如下所示的数据库配置文件`config.js`，请注意按自己的数据库替换其中的值。
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

### 启动后端项目

启动项目前，请确保您的`node.js`已经正确配置，

首先安装必要的依赖，在项目所在路径打开命令行，输入`npm install`，等待依赖下载。

下载完毕后，输入`npm start`运行，即可启动后端。
