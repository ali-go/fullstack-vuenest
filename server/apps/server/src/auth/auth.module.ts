import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule], // 导入passport策略模块
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy], // 本地的local策略
})
export class AuthModule {}
