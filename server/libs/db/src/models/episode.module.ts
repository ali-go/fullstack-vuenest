import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from './course.module';
// 课时模块
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @prop()
  @ApiProperty({ description: '课时' })
  name: string;

  @prop()
  @ApiProperty({ description: '文件' })
  file: string;

	// @prop({ ref: () => Course })
  // @ApiProperty({ description: '课程', type: Course })
  // courese: Ref<Course>;
	@prop()
  @ApiProperty({ description: '所属课程' })
  course: string;
}
