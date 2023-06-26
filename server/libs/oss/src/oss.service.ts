import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { Readable } from 'stream';

@Injectable()
export class OssService {
  private client: any; // 云存储对象
  private ossService: OssService; // 单例
  constructor() {
    this.client = new OSS({
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: process.env.OSS_BUCKET,
			secure:true
    });
  }
  // 云服务上传：ali-oss库连接阿里云时，put请求一直连接失败，不清楚原因，故暂时用本地服务上传
  async uploadOssFile(file: Express.Multer.File) {
    if (!this.ossService) this.ossService = new OssService();
    // 处理文件名：
    const filename = `${new Date().getTime()}-${file.originalname}`;
    await this.ossService.putOssFile(filename, file);
  }

  // 执行上传api
  private async putOssFile(filename, file) {
    // 将buffer转成stream流
    function bufferToStream(binary) {
      const readableInstance = new Readable({
        read() {
          this.push(binary);
          this.push(null); // 读取完
        },
      });
      return readableInstance;
    }
    let dest = process.env.OSS_DEST;
    const res =  await this.client.putStream(
      `${dest}/${filename}`,
      bufferToStream(file),
      {
        contentLength: file.size,
      },
    );
		// get和list方法不报错，不清楚上传为何连接不上
    // const res = await this.client.list(
    // const res = this.client.get(
      // `${dest}/${filename}`,
      // `06adbca911b6f3a6d268abf25c99619b.jpg`,
      // bufferToStream(file),
      // {
      //   contentLength: file.size,
      // },
    // );
  }
}
