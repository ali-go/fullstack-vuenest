import type { ITableItem } from '@/components/content/page-table/types';

// 获取表格配置item的prop，用于插槽的二次暴露：
export function getTableItemProps(tableItems: ITableItem[]) {
  const itemProps = tableItems.map((item) => item.prop);
  return itemProps;
}
