import type { IForm } from '@/components/content/page-form/types';
import type { ITable } from '@/components/content/page-table/types';
import type { IPageOptions } from '@/components/content/page-common-box/types';
import type { IModal } from '@/components/content/page-modal/types';

// 查询模块
const searchOptions: IForm = {
  formItems: [
    {
      prop: 'course',
      label: '所属课程',
      type: 'select',
      options: [],
      placeholder: '请选择',
      otherOptions: { type: 'date' }
    },
    { prop: 'name', label: '课时名称', type: 'input', placeholder: '请输入课程名称' },
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
    { prop: 'course', label: '所属课程', mapOptions: {} },
    { prop: 'name', label: '课时名称' },
    { prop: 'file', label: '文件地址' },
    { prop: 'operator', label: '操作', fixed: 'right', operartorBtns: ['info', 'edit', 'delete'] }
  ],
  title: '课时列表',
  showIndex: true,
  showAdd: true
  // pageSizes: [1, 10, 50, 100]
};

// 弹框模块（新增）：
const modalAddOptions: IModal = {
  pageTitle: '课时',
  modalFormOptions: {
    formItems: [
      {
        prop: 'course',
        label: '所属课程',
        type: 'select',
        placeholder: '请选择',
        options: []
      },
      { prop: 'name', label: '课时名称', type: 'input', placeholder: '请输入' },
      {
        prop: 'file',
        label: '文件',
        type: 'upload',
        listType: 'video',
        fileType: ['mp4', 'mkv', 'avi', 'pdf'],
        fileSize: 200 * 1024 * 1024,
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
  pageTitle: '课时',
  modalFormOptions: {
    formItems: [
      {
        prop: 'course',
        label: '所属课程',
        type: 'select',
        placeholder: '请选择',
        options: []
      },
      { prop: 'name', label: '课时名称', type: 'input', placeholder: '请输入' },
      {
        prop: 'file',
        label: '文件',
        type: 'upload',
        listType: 'video',
        fileType: ['mp4', 'mkv', 'avi'],
        fileSize: 200 * 1024 * 1024,
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
// 查看：
const modalInfoOptions: IModal = {
  pageTitle: '课时',
  modalFormOptions: {
    formItems: [
      {
        prop: 'course',
        label: '所属课程',
        type: 'select',
        options: [],
        placeholder: '请选择',
        disabled: true
      },
      {
        prop: 'name',
        label: '课时名称',
        type: 'input',
        placeholder: '请输入',
        disabled: true
      },
      {
        prop: 'file',
        label: '文件',
        type: 'upload',
        listType: 'video',
        disabled: true,
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
export const pageContentOptions: IPageOptions = {
  searchOptions,
  tableOptions,
  modalAddOptions,
  modalEditOptions,
  modalInfoOptions
};
