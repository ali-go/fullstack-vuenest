import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@lib/db/models/user.module';
import {
  ModelType,
  ReturnModelType,
  DocumentType,
} from '@typegoose/typegoose/lib/types';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';

type UserDocument = DocumentType<User>; // 定义User文档类型

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    // constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {}
    @InjectModel(User) private readonly userModel: ModelType<User>,
    private readonly jwtService: JwtService,
  ) {}
  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    return await this.userModel.create({ username, password });
    // return {
    //   code: '200',
    //   message: '操作成功',
    // };
  }

  @Post('login')
  @UseGuards(AuthGuard('local')) // 指定该接口需要用local色策略进行权限守卫
  @ApiOperation({ summary: '登录' })
  async login(@Body() dto: LoginDto, @Req() req) {
    // req.user是local策略传递的参数
    // 登录成功应该返回token
    return {
      token: this.jwtService.sign(String(req.user._id)), // 根据用户的_id去加密生成token
    };
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() // swagger加token校验
  @ApiOperation({ summary: '用户信息' })
  // 此处直接用Req装饰器获取信息不太友好，比较req是express暴露的包含所有请求信息，此处我们只需要获取user,
  // 为了避免需要req.user，我们可以自定义装饰器直接获取user数据
  // async user(@Req() req) {
  // 	console.log(req.user)
  //   return req.user;
  // }
  // 自定义装饰器：
  async user(@CurrentUser() user: UserDocument) {
    console.log(user);
    return user;
  }
}
