import type { IForm } from '@/components/content/page-form/types';
import type { ITable } from '@/components/content/page-table/types';
import type { IPageOptions } from '@/components/content/page-common-box/types';
import type { IModal } from '@/components/content/page-modal/types';

// 查询模块
const searchOptions: IForm = {
  formItems: [
    { prop: 'username', label: '用户', type: 'input', placeholder: '请输入用户名称' },
    {
      prop: 'createTime',
      label: '创建时间',
      type: 'datepicker',
      placeholder: '请选择',
      otherOptions: { type: 'date' }
    }
  ],
  labelWidth: '120'
};

// 表格模块
const tableOptions: ITable = {
  propsList: [
    { prop: 'username', label: '用户' },
    { prop: 'operator', label: '操作', fixed: 'right', operartorBtns: ['info', 'edit', 'delete'] }
  ],
  title: '用户列表',
  showIndex: true,
  showAdd: true
  // pageSizes: [1, 10, 50, 100]
};

// 弹框模块（新增）：
const modalAddOptions: IModal = {
  pageTitle: '用户',
  modalFormOptions: {
    formItems: [{ prop: 'username', label: '用户', type: 'input', placeholder: '请输入用户名称' }],
    labelWidth: '120px',
    colLayout: {
      span: 12
    }
  },
  width: '60%'
};
// 修改：
const modalEditOptions: IModal = {
  pageTitle: '用户',
  modalFormOptions: {
    formItems: [
      {
        prop: 'username',
        label: '用户',
        type: 'input',
        placeholder: '请输入用户名称',
        disabled: true
      }
    ],
    labelWidth: '120px',
    colLayout: {
      span: 12
    }
  },
  width: '60%'
};
// 查看：
const modalInfoOptions: IModal = {
  pageTitle: '用户',
  modalFormOptions: {
    formItems: [
      {
        prop: 'username',
        label: '用户',
        type: 'input',
        placeholder: '请输入用户名称',
        disabled: true
      }
    ],
    labelWidth: '120px',
    colLayout: {
      span: 12
    }
  },
  width: '60%'
};
export const pageContentOptions: IPageOptions = {
  searchOptions,
  tableOptions,
  modalAddOptions,
  modalEditOptions,
  modalInfoOptions
};
