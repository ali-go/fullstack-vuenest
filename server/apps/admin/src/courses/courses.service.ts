import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin.service';

// 当然可以在controller文件中直接注入admin的服务，此处用自身服务做过渡
@Injectable()
export class CoursesService {
  constructor(private readonly adminService: AdminService) {}
}
