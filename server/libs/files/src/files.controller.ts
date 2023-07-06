import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OssService } from 'oss/oss/oss.service';

@Controller('files')
@ApiTags('文件')
export class FilesController {
  constructor(private readonly ossService: OssService) {}
  // 本地上传：
  @Post('local/upload')
  @ApiOperation({ summary: '本本地服务文件上传' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadLocalFile(@UploadedFile('file') file: Express.Multer.File) {
    console.log('file:', file);
		// 使用multer-aliyun-oss插件云存储
		// return file;
		// 本地：
    return {
      // url: `http://localhost:${process.env.ADMIN_PORT}/uploads/${file.filename}`,
      url: `uploads/${file.filename}`,
    };
  }
  // 云服务上传：暂时无效
  @Post('oss/upload')
  @ApiOperation({ summary: '云服务文件上传' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadOssFile(@UploadedFile('file') file: Express.Multer.File) {
    this.ossService.uploadOssFile(file);
  }
}
