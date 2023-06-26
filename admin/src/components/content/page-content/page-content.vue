<template>
	<div class="page-content">
		<!-- 顶部的功能按钮 -->
		<slot name="top-btns"></slot>
		<page-table v-bind="tableOptions" v-model:page="pageInfo" :dataCount="tableTotal" :listData="listData">
			<!-- 二次暴露插槽 -->
			<template v-for="item in itemProps" v-slot:[item]="scope">
				<slot :name="item" :row="scope.row" :fieldInfo="scope.fieldInfo">{{ scope.fieldInfo.mapOptions ? scope.fieldInfo.mapOptions[scope.row[item]] : scope.row[item] }}</slot>
			</template>
		</page-table>
	</div>
</template>

<script setup lang="ts">
import pageTable from "@/components/content/page-table/page-table.vue"

import type { IPageInfo, ITable } from '../page-table/types';
import { ref, watch } from "vue";

import { getTableItemProps } from "@/hooks/user-page-content"

const props = defineProps<{
	tableOptions: ITable,
	listData: Array<any>,
	tableTotal: number
}>();

const emit = defineEmits(['changePageInfo'])

// 获取items的键名用于插槽暴露：
const itemProps = getTableItemProps(props.tableOptions.propsList);
// console.log('itemProps', itemProps)

const pageInfo = ref<IPageInfo>({ page: 1, limit: 10 })
// 监听页码参数变化触发父组件查询
watch(pageInfo, () => {
	emit('changePageInfo')
}, { deep: true })

// 后续做排序也触发changePageInfo，自定义一个额外参数

defineExpose({ pageInfo })

</script>

<style lang="less" scoped></style>