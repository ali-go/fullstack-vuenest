import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('全栈之巅-前端API')
    .setDescription('供网站和APP调用的服务端API')
    .setVersion('1.0')
		.addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3002;
  console.log('process.env:', process.env.SERVER_PORT);
  console.log(`http://localhost:${PORT}/api-docs`);
  await app.listen(PORT);
}
bootstrap();
