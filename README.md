## 个性化导航页面

fork from https://ljquan.github.io/

一个基于service worker和单页面应用（SPA）的[导航页面](https://anaer.github.io/)


## 特性
1. 静态, 可部署在githbu.io或cdn服务器上
2. 支持离线使用
3. 支持拼音首字母和键盘快捷键

## 使用方式

1. 把本项目fork一份到你的仓库,更改项目名称为`your_name.github.io`,几分钟后Github会自动为你开通[your_name.github.io](https://github.com/anaer/anaer.github.io)的个人主页

2. 通过Git的命令行(Git Bash)把your_name.github.io项目clone到本地

3. 配置文件是`./json/link.json`可以按需修改。

4. 把变更push到远程仓库，配置文件的改动会在第二次访问后生效。

## 部署

```yml
npm install # 安装依赖
npm start # 本地启动

gulp dev
gulp server
gulp watch
```

## FAQ

```log
Q: gulp命令执行报错, 如`gulp dev`, `gulp server`, 错误信息: ReferenceError: primordials is not defined
A: NodeJS可能版本太高(当前最新: 16.8.0), 调整使用8.6.0可以执行
```


## link.json说明

```json
[
    {
        "title": "组标题",
        "groupid": 1, // 组id
        "limit": 8, // 限制条目数, 默认6条
        "rows": [  // 书签列表
            "标题(不超过10个字, 过长有样式问题) | URL链接(与标题之前|分隔且前后带空格)"
        ]
    }
]
```

## 许可
MIT