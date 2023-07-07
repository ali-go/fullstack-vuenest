# fullstack-vuenest
NodeJs+Vue3Js+TS全栈开发视频网站

# 说明
1. admin为前端项目;
2. server为服务端项目；
   - 其中apps目录下有两个服务端项目；
   - admin是支持pc客户端的服务端；
   - server待确定；
   - ********
   - 其中libs是包管理模块：
   - db是关于mangondb的配置模块；
   - common是设置暴露全局环境变量的模块；
   - 考虑到common和db都需要全局暴露，为了方便把db挂载在common上，然后单独全局暴露common即可；
   - 需要用到时，把common导入到指定模块即可，比如admin的module模块中，供admin这个项目使用；


## 补充
**nestjs的部署：**
- 使用了cross-env库去给package.json的scripts的开发和生产脚本设置环境变量，app或admin根据环境变量去加载对应的环境配置文件；
- .gitignore忽略了github上传.env/.env.dev/.env.prod，只保留了.env.example文件作为例子提到github；
- 服务端项目采用了monorepo模式，打包需要分别执行：
```cmd
	yarn build server

	yarn build admin
```
- 但是打完的包是不能单独执行的，部署需要三份文件，`dist+package.json+node_modules`;
- 把三份文件拷贝到服务器后，用pm2去执行dist文件夹内部的不同子项目的main.js文件，如`pm2 start -n server-server dist/apps/server/main.js`；
- nest内部会根据里面的依赖关系去node_modules文件夹使用依赖；

**nuxtjs的部署：**
nuxjs的ssr项目我们采用如下方式部署
1. 把所有文件(其实这些就够了`.nuxt+static+nuxt.config.js+package.json+package-lock.json`)拷贝到服务器（可以在服务器yarn install安装node_modules）；
2. 用pm2启动nuxt项目，默认会跑在3000端口；

```cmd
# 1.打包
npm run build
# 2.启动
# 经测试window系统该方式会一直报错
pm2 start npm --name "your app name" -- run start
# 3.如果2失败，则可选择用下面方式启动
pm2 start ./node_modules/nuxt/bin/nuxt.js
```
1. 启动后的服务，默认运行在 localhost:3000，但这样外网是访问不到的，所以需要使用 nginx 进行代理；
```cmd
# etc/nginx.conf文件中指定端口（此处8000可自行定义，只要不被冲突占用），转发给3000端口；
server {
    listen       8000;
    server_name  localhost;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://localhost:3000/;
    }
}
```
1. 重启nginx，重启后，访问 IP:8000 即可看到你的页面。将 IP 替换为你的服务器地址。
```cmd
systemctl restart nginx
```
由于我们使用了.env环境变量，因此也需要拷贝进服务器（看起来好像完全可以不需要用到环境变量啊。。。）

参考文章地址：
- https://juejin.cn/post/7218756461538279483
- https://www.jianshu.com/p/b47791999072