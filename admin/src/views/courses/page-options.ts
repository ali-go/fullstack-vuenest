import type { IForm } from '@/components/content/page-form/types';
import type { ITable } from '@/components/content/page-table/types';
import type { IPageOptions } from '@/components/content/page-common-box/types';
import type { IModal } from '@/components/content/page-modal/types';

// 查询模块
const searchOptions: IForm = {
  formItems: [
    { prop: 'name', label: '课程名称', type: 'input', placeholder: '请输入课程名称' },
    { prop: 'cover', label: '封面图', type: 'input', placeholder: '请输入封面图' },
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
    { prop: 'name', label: '课程名称' },
    { prop: 'cover', label: '封面图' },
    { prop: 'operator', label: '操作', fixed: 'right', operartorBtns: ['info', 'edit', 'delete'] }
  ],
  title: '课程列表',
  showIndex: true,
  showAdd: true
  // pageSizes: [1, 10, 50, 100]
};

// 弹框模块（新增）：
const modalAddOptions: IModal = {
  pageTitle: '课程',
  modalFormOptions: {
    formItems: [
      { prop: 'name', label: '课程名称', type: 'input', placeholder: '请输入课程名称' },
      {
        prop: 'cover',
        label: '封面图',
        type: 'upload',
        listType: 'picture-img',
        fileType: ['jpg', 'png', 'jpeg'],
        fileSize: 500 * 1024,
        span: 24
      }
    ],
    labelWidth: '120px',
    colLayout: {
      span: 12
    }
  },
  width: '60%'
};
// 修改：
const modalEditOptions: IModal = {
  pageTitle: '课程',
  modalFormOptions: {
    formItems: [
      { prop: 'name', label: '课程名称', type: 'input', placeholder: '请输入课程名称' },
      {
        prop: 'cover',
        label: '封面图',
        type: 'upload',
        listType: 'picture-img',
        fileType: ['jpg', 'png', 'jpeg'],
        fileSize: 500 * 1024,
        span: 24,
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
  pageTitle: '课程',
  modalFormOptions: {
    formItems: [
      {
        prop: 'name',
        label: '课程名称',
        type: 'input',
        placeholder: '请输入课程名称',
        disabled: true
      },
      {
        prop: 'cover',
        label: '封面图',
        type: 'upload',
        listType: 'picture-img',
        // fileType: ['jpg', 'png', 'jpeg'],
        // fileSize: 500 * 1024,
        span: 24,
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
