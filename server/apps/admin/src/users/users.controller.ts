import { User } from '@lib/db/models/user.module';
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
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UtilsService } from 'utils/utils';
import { CommonQuery } from 'utils/utils/common.dto';
// 为了锻炼能力，此处没有使用视频教程中的nestjs-mongoose-crud插件

// class UserPage {
//   pageSize?: string;
//   pageNum?: string;
// }

@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly user: ModelType<User>,
    private readonly utilsService: UtilsService,
  ) {}
  // 用户列表：使用await时可省略exec()
  // 这里有个问题：给username加了可选链，在swagger还是提示必填
  @Get()
  @ApiOperation({ summary: '用户列表' })
  async findAll(@Query() commonQuery: CommonQuery) {
    return await this.utilsService.handleQueryData(
      this.user,
      commonQuery,
      ['_id', 'username'],
      ['username'],
    );
  }
  // 新增用户
  @Post()
  @ApiOperation({ summary: '新增用户' })
  async create(@Body() user: User) {
    return await this.user.create(user);
  }
  // 用户详情
  @Get(':id')
  @ApiOperation({ summary: '用户详情' })
  async findOne(@Param('id') id: string) {
    return await this.user.findById(id);
  }
  // 修改用户
  @Put(':id')
  @ApiOperation({ summary: '修改用户' })
  async update(@Param('id') id: string, @Body() updateBody: User) {
    return await this.user.findOneAndUpdate({ _id: id }, updateBody);
  }
  // 删除用户
  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string) {
    return await this.user.findOneAndRemove({ _id: id });
  }
}
