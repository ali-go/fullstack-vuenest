import { instance } from '@/network/index';
// 通用模块：
// 上传
export function upload(data: any) {
  // 云存储和本地存储二选一
  let urlLocal = `files/${import.meta.env.VITE_LOCAL_UPLOAD_URL}`;
  let urlOss = `files/${import.meta.env.VITE_OSS_UPLOAD_URL}`;
  return instance.post(urlLocal, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
