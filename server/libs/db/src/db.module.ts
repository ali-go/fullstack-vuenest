import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.module';
import { Course } from './models/course.module';
import { Episode } from './models/episode.module';
import { Action } from './models/action.module';
import { Comment } from './models/comment.module';

// 使用全局模块的方式暴露数据库模块

const models = TypegooseModule.forFeature([User, Course, Episode, Action, Comment]);
@Global()
@Module({
  imports: [
    // 这里如果用环境变量，由于异步读取，此处必须异步设置
    // TypegooseModule.forRoot(process.env.DB),
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models], // 注意models一定要暴露出去
})
export class DbModule {}
