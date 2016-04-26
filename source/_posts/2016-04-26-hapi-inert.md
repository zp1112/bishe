title: hapi-inert
date: 2016-04-26 16:07:50
categories: 南京
city: 南京
tags: hapi
type: full
banner: /socket.png
---

### 创建视图文件

hapi静态文件渲染机制：

引入插件inert用于处理静态文件<!--more-->

```js
const server = new hapi.Server({
connections: {
routes: {
files: {
relativeTo: path.join(__dirname, 'public')
}
}
}});
```

```js
server.route({
method: 'GET',
path: '/{param*}',
handler: {
directory: {
path: '.',
redirectToSlash: true,
index: true
}
}
});
```
引入插件vision用于渲染静态页面
引入插件handlebars用于模板引擎

```js
server.views({
path: `${__dirname}/views`,
engines: { html: handlebars },
isCached: false
});
```

以上都可以在npmjs官网查看详细文档。

views文件夹下面存放index.html和signin.html和signup.html。
