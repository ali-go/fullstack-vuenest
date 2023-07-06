import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { CommonModule } from '@app/common/common.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';

// 根据开发或生产环境去加载环境配置文件（envFilePath默认优先级从左到右）
let envFilePath = [];
if (process.env.NODE_ENV === 'production') {
  envFilePath = ['.env.prod', '.env.dev', '.env.example'];
} else {
  envFilePath = ['.env.dev', 'env.prod', '.env.example'];
}
console.log('envFilePath:', envFilePath);
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
    }),
    CommonModule,
    CoursesModule,
    AuthModule,
    ActionsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
