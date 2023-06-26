type IFixedType = 'left' | 'right';
type IAlignType = 'left' | 'right' | 'center';
type IBtnType = 'info' | 'edit' | 'delete' | any;
// 后续扩展需求再补充
export interface ITableItem {
  prop: string;
  label: string;
  minWidth?: string | number;
  width?: string | number;
  fixed?: IFixedType;
  sortable?: boolean;
  align?: IAlignType;
  operartorBtns?: Array<IBtnType>;
  mapOptions?: Record<string | number, string>;
}

export interface ITable {
  propsList: ITableItem[];
  title?: string;
  showIndex?: boolean;
  showSelection?: boolean;
  pageSizes?: Array<number>;
  showAdd?: boolean;
}

export interface IPageInfo {
  page: number;
  limit: number;
}
