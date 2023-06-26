import type { IForm } from "@/components/content/page-form/types";
import type { IModal } from "@/components/content/page-modal/types";
import type { ITable } from "@/components/content/page-table/types";

type IFlag = 'form' | 'table' | 'modal';
interface IMapField {
  flag: IFlag; //  标识是表单还是表格还是弹框
  optionField?: Array<string>; // 标识枚举的value和label字段(第一个元素为value第二个元素label)
  optionsMaps: Record<string, Array<any>>; // 映射关系，字段：枚举数组
}
/**
 * 处理页面异步获取的下拉框数据（更新到查询、表格。弹框等模块字段中）
 * @param payload 包含标识、下拉数组键值对字段名称、需要替换的字段及数组数据
 * @param data 页面响应式的查询、表格。弹框等模块配置对象
 * @returns 无返回值，会直接改变data响应式配置对象本身
 */
export function handlePageDataMaps(payload: IMapField, data: IModal | ITable | IForm | undefined) {
  const { flag, optionsMaps, optionField = ['value', 'label'] } = payload;
  if (!data) return;
  if (flag === 'form' || flag === 'modal') {
		// 由于form和model的底层配置都是基于IForm接口，只不过modal模块多了一层modalFormOptions，故判断
    let mapData = flag === 'form' ? (data as IForm) : (data as IModal).modalFormOptions;
    mapData.formItems.forEach((item) => {
      if (optionsMaps[item.prop]) {
        let maps: any = [];
				// 如果数组默认键值对是value:label，则直接赋值即可
        if (optionField[0] === 'value' && optionField[1] === 'label') {
          maps = optionsMaps[item.prop];
        } else {
					// 否则处理成value:label
          maps = optionsMaps[item.prop].map((op) => {
            return {
              value: op[optionField[0]],
              label: op[optionField[1]]
            };
          });
        }
        item.options = maps;
      }
    });
  }
  if (flag === 'table') {
		// 表格情况：需要保存的是对象映射而不是数组
    (data as ITable).propsList.forEach((item) => {
      if (optionsMaps[item.prop]) {
        let maps: Record<string | number, any> = {};
        optionsMaps[item.prop].map((op) => {
          maps[op[optionField[0]]] = op[optionField[1]];
        });
        item.mapOptions = maps;
      }
    });
  }
}
