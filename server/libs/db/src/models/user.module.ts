import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
// 用户模块
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop()
  @ApiProperty({ description: '用户名', default: 'user1' })
  username: string;

  // 对密码进行bcryptjs加密:（修改该字段时会加密）
  @prop({
		select: false, // 列表查询的时候不会被查询返回该字段
    set(val) {
      return val ? hashSync(val) : '';
    },
  })
  @ApiProperty({ description: '密码', default: 'password1' })
  password: string;
}
