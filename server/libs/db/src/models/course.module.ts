import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from './episode.module';
// 课程模块
@modelOptions({
  schemaOptions: {
    timestamps: true,
		// 关联查询Episode数组时此处必须设置
    toJSON: {
      virtuals: true,
    },
  },
})
export class Course {
  @prop({ required: true })
  @ApiProperty({ description: '课程名称' })
  name: string;

  @prop()
  @ApiProperty({ description: '封面图' })
  cover: string;

  @prop({
    ref: () => Episode,
    foreignField: 'course',
    localField: '_id',
  })
  @ApiProperty({ description: '课时', type: [Episode] })
  episodes?: Ref<Episode>[];
}
