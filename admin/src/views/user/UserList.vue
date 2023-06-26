<template>
	<div class="course-list">
		<!-- <page-common-box v-bind="pageOptions" @pageListFn="pageListRequestFn" @pageAddFn="pageAddRequestFn"> -->
		<page-common-box v-bind="pageOptions" v-on="eventFn">
			<!-- 测试：可以自定义覆盖插槽数据 -->
			<!-- <template #name="scope">{{ scope.row['name'] }}</template> -->
			<!-- <template #operator="scope">{{ 111 }}</template> -->
			<!-- <template #top-btns>222</template> -->
			<!-- <template #dialog-btns>333</template> -->
		</page-common-box>
	</div>
</template>

<script setup lang="ts">
import pageCommonBox from "@/components/content/page-common-box/page-common-box.vue"

import { pageContentOptions } from "./page-options"
import { list, add, edit, remove } from "@/network/courses/index"

// 接口路径
const pageUrl = 'users';
// 查询的配置参数：
const pageOptions = pageContentOptions;
// 分页接口(传给组件处理调用)
const pageListRequestFn = (data: any) => list(data._id ? `${pageUrl}/${data._id}` : pageUrl, data);
const pageAddRequestFn = (data: any) => add(data._id ? `${pageUrl}/${data._id}` : pageUrl, data);
const pageEditRequestFn = (data: any) => edit(data._id ? `${pageUrl}/${data._id}` : pageUrl, data);
const pageDeleteRequestFn = (data: any) => remove(data._id ? `${pageUrl}/${data._id}` : pageUrl, data);

const eventFn = {
	pageListFn: pageListRequestFn,
	pageAddFn: pageAddRequestFn,
	pageEditFn: pageEditRequestFn,
	pageDeleteFn: pageDeleteRequestFn,
}
</script>

<style lang="less" scoped></style>