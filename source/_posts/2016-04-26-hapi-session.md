title: hapi-session
date: 2016-04-26 16:22:02
categories: 南京
city: 南京
tags: hapi
type: left
banner:
---

### 使用hapi自带的session缓存机制

#### HAPI  session缓存机制

将用户名存在cookie的session键里面，客户的读取from的时候使用$.cookie('session')。<!--more-->
server.state,定义一个名字为session的cookie

```js
server.state('session', {
ttl: 24 * 60 * 60 * 1000, // One day
isSecure: false, //暂时不考虑使用安全连接
path: '/' //暂时不转码session
});
```

#### 登录

在/signin路由里面设置handler

```js
let session = request.state.session;
if (!session) {
session = username;
}
session.last = Date.now();
return reply.redirect('/').state('session', session);//存入session
```
#### 注册

创建数据库candy，新建表users，字段为id自增，username用户名，password密码。

#### 注册路由

* 验证用户名是否已经存在，如果存在则重定向到注册页。
* 用户名不存在，注册成功，存入session，自动登录。
