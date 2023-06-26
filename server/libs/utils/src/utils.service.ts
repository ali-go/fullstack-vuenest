import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CommonQuery } from './common.dto';

@Injectable()
export class UtilsService {
  // 封装处理各个接口的分页查询处理逻辑
  // 说明：
  // 1.支持page/limit分页参数；
  // 2.支持where条件过滤：根据第三个参数fuzzyQueryFields中是否需要模糊查询采用是否正则化；
  // 3.支持sort排序；
  // 4.支持连表populate；
  // 示例：
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
  /**
   *
   * @param model 模型
   * @param commonQuery 查询的参数，详情结构看例子
   * @param selectFields 需要返回的字段，全部返回传[]
   * @param fuzzyQueryFields 支持模糊查询字段，[]形式传递
   * @returns data+total
   */
  async handleQueryData<T>(
    model: ModelType<T>,
    commonQuery: CommonQuery,
    selectFields: string[] = [],
    fuzzyQueryFields: string[] = [],
  ) {
    let { where, sort, populate, limit = 10, page = 1 } = commonQuery;
    populate = populate || undefined;
    let queryBuilder = model.find().populate(populate);
    // 处理条件过滤：指定了模糊查询则正则处理，否则直接查询
    if (where) {
      where = JSON.parse(where);
      // console.log('where:', where);
      let fuzzyLength = fuzzyQueryFields.length;
      for (let k in where) {
        if (!where[k]) continue;
        if (fuzzyLength <= 0) {
          queryBuilder.where(k, where[k]);
        } else {
          fuzzyQueryFields.includes(k)
            ? queryBuilder.where(k, new RegExp(where[k]))
            : queryBuilder.where(k, where[k]);
        }
      }
    }
    if (sort) {
      queryBuilder = queryBuilder.sort(JSON.parse(sort));
    }
    const [data, total] = await Promise.all([
      queryBuilder
        .skip((page - 1) * limit)
        .limit(limit)
        .select(selectFields.join(' '))
        .exec(),
      model.countDocuments(queryBuilder.getFilter()),
    ]);
    return {
      data,
      total,
    };
  }
}
