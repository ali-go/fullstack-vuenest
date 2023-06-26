import { Global, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { CommonModule } from '@app/common/common.module';
import { FilesModule } from 'files/files/files.module';

@Global()
@Module({
  imports: [
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
