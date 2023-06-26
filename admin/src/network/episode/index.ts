import { instance } from '@/network/index';
// 课时模块：
// 列表
export function list(url: string, data: any) {
  return instance.get(url, {
    params: data
  });
}

// 新增
export function add(url: string, data: any) {
  return instance.post(url, data);
}

// 编辑
export function edit(url: string, data: any) {
  return instance.put(url, data);
}

// 删除
export function remove(url: string, data: any) {
  return instance.delete(url, data);
}

// 获取所有课程数据
export function getCourses(url: string, data?: any) {
  return instance.get(url, data);
}
