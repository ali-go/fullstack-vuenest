import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
const fs = require('fs');

@Injectable()
export class FilesService {
  // 移除本地文件：
  removeLocalFile(oldUrl: string, newUrl?: string) {
    if (newUrl === oldUrl) return;
    // console.log('oldUrl:', oldUrl);
    // console.log('newUrl:', newUrl);
    if (oldUrl) {
      const arr = oldUrl.split('/');
      const filename = arr[arr.length - 1];
      let filePath = resolve(process.cwd(), `uploads/${filename}`);
      // console.log(filePath);
      // 异步删除
      fs.unlink(filePath, (err) => {
        if (err) {
          // throw err;
          console.log('err:', err);
					return;
        }
        console.log('文件删除成功');
      });
    }
  }
}
