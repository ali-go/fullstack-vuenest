import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// 导入NestExpressApplication申明app类型，从而需要使用express的底层api：此处目的是为了使得上传文件夹变为静态访问文件，前端可直接访问
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // 文件保存在本地时：设置上传文件目录为静态法访问目录
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });
  const options = new DocumentBuilder()
    .setTitle('全栈之巅-前端API')
    .setDescription('供网站和APP调用的服务端API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3002;
  // console.log('process.env:', process.env);
  console.log('process.env.SERVER_PORT:', process.env.SERVER_PORT);
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
  console.log(`http://localhost:${PORT}/api-docs`);
  await app.listen(PORT);
}
bootstrap();
