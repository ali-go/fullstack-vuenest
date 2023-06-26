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
