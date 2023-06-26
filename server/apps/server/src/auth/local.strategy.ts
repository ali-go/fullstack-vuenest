import { User } from '@lib/db/models/user.module';
import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compareSync } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { IStrategyOptions, Strategy } from 'passport-local';

// 本地策略：用于检验密码是否正确
// 第二个参数是自定义策略名称，不写的话默认以文件名前面第一个单词为准
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {
    super({
      usernameField: 'username', // 指定字段
      passwordField: 'password', // 指定字段
    } as IStrategyOptions);
  }

  // 注意这里的参数字段要和上面指定字段一致
  // 1.这里的validate处理是加密插件内部执行的，并且发生在实际登录请求之前；
  // 2.这里返回的user最后会作为参数传递给实际的下一个调用该策略的接口；
  // 3.我们可以通过@Req装饰圈定义req参数（express的），则req.user就是该return出去的数据；
  async validate(username: string, password: string) {
    console.log('password:', password);
    // User模块类型中限制了password字段在列表查询不返回，此处需要select单独获取
    const user = await this.userModel.findOne({ username }).select('+password');
    // console.log('user',user)
    if (!user) {
      throw new BadRequestException('用户名不正确');
    }
    // 使用bcryptjs方法判断这个密码是否正确：
    // 第一个参数是用户传递来未经加密的数据，第二个参数是数据库现存的加密密码
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确');
    }
    // return出去的数据会传递给实际使用该策略的接口，用express原生的方式@Req req去拿，会挂在同名属性上，即req.user
    return user;
  }
}
