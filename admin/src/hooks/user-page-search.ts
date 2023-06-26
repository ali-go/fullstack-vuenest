import type { IFormItem } from '@/components/content/page-form/types';
import { ref } from 'vue';

// 根据字段渲染search模块时，获取表单字段
export function getSearchForm(formItems: IFormItem[], assignObj?: Object) {
  let formData: any = {};
  for (const item of formItems) {
    formData[item.prop] = '';
  }
  // 处理合并：编辑+查看
  if (assignObj) {
    Object.assign(formData, assignObj);
  }
  return [{ ...formData }, ref(formData)];
}
