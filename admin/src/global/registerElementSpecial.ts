import { type App } from 'vue';
import { ElNotification } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { ElLoading } from 'element-plus';

export function registerElementSpecial(app: App) {
  app.component('ElMessage', ElMessage);
  app.component('ElMessageBox', ElMessageBox);
  app.component('ElLoading', ElLoading);
  app.component('ElNotification', ElNotification);
}
