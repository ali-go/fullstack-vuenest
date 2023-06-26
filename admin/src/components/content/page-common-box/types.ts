import type { IForm } from '@/components/content/page-form/types';
import type { ITable } from '@/components/content/page-table/types';
import type { IModal } from '../page-modal/types';

// 查询和表格的接口类型
export interface IPageOptions {
  searchOptions?: IForm;
  tableOptions: ITable;
  modalAddOptions?: IModal;
  modalEditOptions?: IModal;
  modalInfoOptions?: IModal;
  pageShowModal?: boolean; // 控制是否加载组件
}

// 分页接口参数的类型：
// 例子：
// query = {
//   page: 1,
//   limit: 10,
//   where: {
//     username: 'admin',
// 		age: {
// 			$gte:12,
// 			$lte:22
// 		},
// 		email: '.com'
//   },
// 	sort: {
// 		num: -1
// 	}
// };
export interface IPageRequestQuery {
  where?: Object;
  sort?: string | any;
  limit?: number;
  page?: number;
  populate?: string | any;
}
