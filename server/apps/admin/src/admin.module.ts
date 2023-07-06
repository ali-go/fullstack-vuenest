import { Global, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { CommonModule } from '@app/common/common.module';
import { FilesModule } from 'files/files/files.module';
import { ConfigModule } from '@nestjs/config';

// 根据开发或生产环境去加载环境配置文件（envFilePath默认优先级从左到右）
let envFilePath = [];
if (process.env.NODE_ENV === 'production') {
  envFilePath = ['.env.prod', 'env.dev', '.env.example'];
} else {
  envFilePath = ['.env.dev', 'env.prod', '.env.example'];
}
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
    }),
    CommonModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
    AdminModule,
    FilesModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, FilesModule],
})
export class AdminModule {}
