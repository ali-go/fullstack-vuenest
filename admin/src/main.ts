// import "element-plus/theme-chalk/base.css";
// import "element-plus/theme-chalk/index.css";
import "element-plus/theme-chalk/el-loading.css";  
import "element-plus/theme-chalk/el-message.css";  
import "element-plus/theme-chalk/el-notification.css";  
import "element-plus/theme-chalk/el-message-box.css";  



import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerApp } from './global';

const app = createApp(App);
registerApp(app);
app.use(router);
app.mount('#app');
