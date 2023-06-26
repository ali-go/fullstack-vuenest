<template>
	<div class="page-table">
		<el-table :data="listData" class="table-content" style="width: 100%" border>
			<el-table-column v-if="showIndex" type="index" label="序号" width="60" align="center"/>
			<el-table-column v-for="item in propsList" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align || 'center'">
				<template #default="scope">
					<slot :name="item.prop" :row="scope.row" :fieldInfo="item">{{ item.mapOptions ? item.mapOptions[scope.row[item.prop]] : scope.row[item.prop] }}</slot>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagination" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.limit"
			:page-sizes="pageSizes" small="small" layout="total, sizes, prev, pager, next, jumper" :total="dataCount"
			@size-change="handleSizeChange" @current-change="handleCurrentChange" />
	</div>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from 'vue';
import type { IPageInfo, ITableItem } from './types';

const props = withDefaults(
	defineProps<{
		propsList: ITableItem[],
		title?: string,
		showIndex?: boolean,
		showSelection?: boolean,
		page: IPageInfo,
		dataCount: number,
		listData: Array<any>,
		pageSizes?: Array<number>
	}>(), {
	showIndex: true,
	pageSizes: () => [1, 10, 50, 100]
})
const emit = defineEmits(['update:page'])
// 监听页码参数数据：
const pageInfo = toRef(props.page);
watch(pageInfo, (newVal) => {
	emit('update:page', newVal);
}, {
	deep: true
})

const handleSizeChange = (limit: number) => {
	pageInfo.value.limit = limit
	console.log('pageInfo:', pageInfo)
}
const handleCurrentChange = (page: number) => {
	pageInfo.value.page = page;
	console.log('pageInfo:', pageInfo)
}

</script>

<style lang="less" scoped>
.table-content {
	margin: 20px 0;
}

.pagination {
	justify-content: flex-end;
}
</style>