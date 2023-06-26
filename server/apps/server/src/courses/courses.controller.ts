import { Course } from '@lib/db/models/course.module';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CommonQuery } from 'utils/utils/common.dto';
import { UtilsService } from 'utils/utils';

@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly course: ModelType<Course>,
    private readonly utilsService: UtilsService,
  ) {}
  @Get()
  @ApiOperation({ summary: '课程列表' })
  async findList(@Query() commonQuery: CommonQuery) {
    return await this.utilsService.handleQueryData(
      this.course,
      commonQuery,
      [],
      ['name'],
    );
  }
  @Get(':id')
  @ApiOperation({ summary: '课程详情' })
  async findOne(@Param('id') id: string, @Query() query) {
    let populate = query.populate || undefined;
    return await this.course.findById(id).populate(populate);
  }
}
