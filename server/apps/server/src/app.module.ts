import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { CommonModule } from '@app/common/common.module';
import { AuthModule } from './auth/auth.module';
import { ActionsModule } from './actions/actions.module';
import { CommentsModule } from './comments/comments.module';

@Global()
@Module({
  imports: [CommonModule, CoursesModule, AuthModule, ActionsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
