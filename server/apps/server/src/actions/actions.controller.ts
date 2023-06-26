import { Action } from '@lib/db/models/action.module';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '@lib/db/models/user.module';

@ApiTags('行为状态')
@Controller('actions')
export class ActionsController {
  constructor(
    @InjectModel(Action)
    private readonly actionModel: ReturnModelType<typeof Action>,
  ) {}

  @ApiOperation({ summary: '获取行为状态' })
  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  async getStatus(@Query() dto, @CurrentUser() user: DocumentType<User>) {
    dto.user = user._id;
    // console.log('dto:', dto);
    const count = await this.actionModel.countDocuments(dto);
    return {
      status: count > 0,
    };
  }

  @ApiOperation({ summary: '切换行为状态' })
  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  async toggle(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    const res = await this.getStatus(dto, user);
    if (res.status) {
      await this.actionModel.deleteMany(dto);
    } else {
      await this.actionModel.create(dto);
    }
    return await this.getStatus(dto, user);
  }
}
