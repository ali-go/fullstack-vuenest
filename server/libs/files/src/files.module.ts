import { Global, Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { OssModule } from 'oss/oss/oss.module';
const MAO = require('multer-aliyun-oss');
@Module({
  imports: [
    // 本地存储：上传文件目录配置(如要启动注释下面阿里云代码，反之同理)
    MulterModule.register({
      dest: 'uploads',
    }),
		OssModule,
		// 阿里云存储multer-aliyun-oss插件：此处使用环境变量，也必须是异步注册
    // MulterModule.registerAsync({
    //   useFactory() {
    //     return {
    //       storage: MAO({
    //         config: {
    //           region: process.env.OSS_REGION,
    //           accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    //           accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    //           bucket: process.env.OSS_BUCKET,
    //         },
    //         destination: '',
    //       }),
    //     };
    //   },
    // }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
	exports: [FilesService],
})
export class FilesModule {}
