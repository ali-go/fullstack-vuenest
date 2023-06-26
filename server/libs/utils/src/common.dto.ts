import { IsOptional } from 'class-validator';

// 分页接口传参的dto
export class CommonQuery {
  @IsOptional()
  where?: any;
  @IsOptional()
  sort?: string | any;
  @IsOptional()
  limit?: number;
  @IsOptional()
  page?: number;
  @IsOptional()
  populate?: string | any;
}
