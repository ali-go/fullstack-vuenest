import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@lib/db';
// import { FilesModule } from 'files/files/files.module';
import { UtilsModule } from 'utils/utils';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    // 导入全局环境变量模块
    ConfigModule.forRoot({
      isGlobal: true, // 暴露到全局
    }),
    DbModule, //导入db模块，让common模块作为统一暴露的模块点
    // FilesModule,
    UtilsModule,
    // 导入jwt加密模块（获取token令牌）
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
        };
      },
    }),
  ],
  providers: [CommonService],
  // exports: [CommonService, FilesModule, UtilsModule],
  exports: [CommonService, UtilsModule, JwtModule],
})
export class CommonModule {}
