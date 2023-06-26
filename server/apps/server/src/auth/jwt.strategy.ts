// 校验token的策略

import { User } from '@lib/db/models/user.module';
import { PassportStrategy } from '@nestjs/passport';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ExtractJwt, StrategyOptions, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(User) private readonly userModel: ModelType<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //获取头中的token
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

	// 由于我们获取token是根据用户的_id加密，token校验此处也会还原处这个_id，因此可以根据id获取用户信息
  async validate(id) {
		// console.log(id)
    // 直接这么返回结果是req.user挂了这个数据，盲猜是根据User模型取得小写字母
    return await this.userModel.findById(id);
  }
}
