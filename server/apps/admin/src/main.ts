import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// 导入NestExpressApplication申明app类型，从而需要使用express的底层api：此处目的是为了使得上传文件夹变为静态访问文件，前端可直接访问
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);
  app.enableCors(); // 允许跨域
  // 文件保存在本地时：设置上传文件目录为静态法访问目录
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });
  const options = new DocumentBuilder()
    .setTitle('全栈-后台管理系统api')
    .setDescription('供后台系统管理界面调用的api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  const PROT = process.env.ADMIN_PORT || 3001;
  console.log(`http://localhost:${PROT}/api-docs`);
  await app.listen(PROT);
}
bootstrap();
