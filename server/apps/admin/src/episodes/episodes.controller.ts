import { Episode } from '@lib/db/models/episode.module';
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

@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly episode: ModelType<Episode>,
		private readonly utilsService:UtilsService
  ) {}
  @Get()
  @ApiOperation({ summary: '课时列表' })
  async findAll(@Query() commonQuery: CommonQuery) {
    return await this.utilsService.handleQueryData(
      this.episode,
      commonQuery,
      // ['_id', 'name'],
      [],
      ['name'],
    );
  }
  // 新增课时
  @Post()
  @ApiOperation({ summary: '新增课时' })
  async create(@Body() course: Episode) {
    return await this.episode.create(course);
  }
  // 课时详情
  @Get(':id')
  @ApiOperation({ summary: '课时详情' })
  async findOne(@Param('id') id: string) {
    return await this.episode.findById(id);
  }
  // 修改课时
  @Put(':id')
  @ApiOperation({ summary: '修改课时' })
  async update(@Param('id') id: string, @Body() updateBody: Episode) {
    return await this.episode.findOneAndUpdate({ _id: id }, updateBody);
  }
  // 删除课时
  @Delete(':id')
  @ApiOperation({ summary: '删除课时' })
  async remove(@Param('id') id: string) {
    return await this.episode.findOneAndRemove({ _id: id });
  }
}
