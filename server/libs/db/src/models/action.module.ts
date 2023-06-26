import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.module';
import { Episode } from './episode.module';
import { Course } from './course.module';
// 用户行为模块：收藏、点赞
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Action {
  @ApiProperty({ description: '用户' })
  @prop({
    ref: () => User,
    required: true,
  })
  user: Ref<User>;

  @ApiProperty({ description: '操作对象' })
  @prop({ required: true, enum: ['Course', 'Episode'] })
  type: string;

  // 基于上面type对应值的模型
  @ApiProperty({ description: '类型id对应的object对象' })
  @prop({ refPath: 'type' })
  object: Ref<Course | Episode>;

  @ApiProperty({ description: '操作类型' })
  @prop({ enum: ['like', 'upVote'] })
  name: string;
}

