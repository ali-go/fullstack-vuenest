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
import { FilesService } from 'files/files/files.service';
import { CommonQuery } from 'utils/utils/common.dto';
import { UtilsService } from 'utils/utils';

@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly course: ModelType<Course>,
    private readonly filesService: FilesService,
    private readonly utilsService: UtilsService,
  ) {}
  // 获取所有(必须放详情接口前面，避免误标中详情接口)
  @Get('all')
  @ApiOperation({ summary: '获取所有课程' })
  async findAll() {
    const data = (await this.course.find({})).map((item) => ({
      label: item.name,
      value: item._id,
    }));
    return {
      data,
    };
  }
  @Get()
  @ApiOperation({ summary: '课程列表' })
  async findList(@Query() commonQuery: CommonQuery) {
    return await this.utilsService.handleQueryData(
      this.course,
      commonQuery,
      // ['_id', 'name'],
      [],
      ['name'],
    );
  }
  // 新增课程
  @Post()
  @ApiOperation({ summary: '新增课程' })
  async create(@Body() course: Course) {
    return await this.course.create(course);
  }
  // 课程详情
  @Get(':id')
  @ApiOperation({ summary: '课程详情' })
  async findOne(@Param('id') id: number) {
    return await this.course.findById(id);
  }
  // 修改课程
  @Put(':id')
  @ApiOperation({ summary: '修改课程' })
  async update(@Param('id') id: string, @Body() updateBody: Course) {
    // console.log(updateBody.cover);
    // findOneAndUpdate不加new:true则默认返回旧数据
    const oldData = await this.course.findOneAndUpdate({ _id: id }, updateBody);
    this.filesService.removeLocalFile(oldData.cover, updateBody.cover);
    return {
      code: '200',
      message: '操作成功',
    };
  }
  // 删除课程
  @Delete(':id')
  @ApiOperation({ summary: '删除课程' })
  async remove(@Param('id') id: string) {
    const oldData = await this.course.findOneAndRemove({ _id: id });
    this.filesService.removeLocalFile(oldData.cover);
    return {
      code: '200',
      message: '操作成功',
    };
  }
}
