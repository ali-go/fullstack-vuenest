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
- nuxjs的ssr项目同样不能直接部署，需要把打包后的.nuxt和package.json文件同步拷贝到服务器，然后用pm2部署。