import { Comment } from '@lib/db/models/comment.module';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: ReturnModelType<typeof Comment>,
  ) {}

  @ApiOperation({ summary: '评论列表' })
  @Get()
  async index(@Query('query') query) {
    const params = JSON.parse(query);
    console.log('query1:', query);
    return await this.commentModel.find().populate('user').where(params.where).sort('-_id');
  }

  @ApiOperation({ summary: '新增评论' })
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    const res = await this.commentModel.create(dto);
    return res;
  }
}
