// 表单字段类型
type IFormType = 'input' | 'select' | 'datepicker' | 'upload';

// 下拉框的类型
type IOption = {
  label: string;
  value: string | number | null;
};

export interface IFormItem {
  label: string;
  prop: string;
  type: IFormType;
  placeholder?: string;
  options?: IOption[];
  otherOptions?: any;
  disabled?: boolean;
  isHidden?: boolean;
  span?: number; // 自定义布局份数，不传默认以自定义colLayout或者默认colLayout
  listType?: string;
  fileType?: string[];
  fileSize?: number;// 文件大小，一律表示k单位
}

export interface IForm {
  title?: string;
  formItems: IFormItem[];
  labelWidth?: string;
  styleItem?: any;
  colLayout?: any;
}
