import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// 自定义user用户的装饰器
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
