<template>
	<div class="course-list">
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
import { list, add, edit, remove, getCourses } from "@/network/episode/index"
import { upload } from "@/network/common";
import { ref } from "vue";
import { handlePageDataMaps } from "@/hooks/user-page";

// 接口路径
const pageUrl = 'episodes';
// 查询的配置参数：
const pageOptions = ref(pageContentOptions);
// 分页接口(传给组件处理调用)
const pageListRequestFn = (data: any) => list(data._id ? `${pageUrl}/${data._id}` : pageUrl, data);
const pageAddRequestFn = (data: any) => add(data._id ? `${pageUrl}/${data._id}` : pageUrl, data);
const pageEditRequestFn = (data: any) => edit(data._id ? `${pageUrl}/${data._id}` : pageUrl, data);
const pageDeleteRequestFn = (data: any) => remove(data._id ? `${pageUrl}/${data._id}` : pageUrl, data);
const pageUploadRequestFn = (data: any) => upload(data);

const eventFn = {
	pageListFn: pageListRequestFn,
	pageAddFn: pageAddRequestFn,
	pageEditFn: pageEditRequestFn,
	pageDeleteFn: pageDeleteRequestFn,
	pageUploadFn: pageUploadRequestFn,
}

// 获取下拉数据：
const handleGetCourses = async () => {
	const res = await getCourses('courses/all');
	// console.log('res:', res)
	let payload = {
		optionsMaps: {
			course: res.data
		}
	}
	handlePageDataMaps({ flag: 'form', ...payload }, pageOptions.value.searchOptions);
	handlePageDataMaps({ flag: 'table', ...payload }, pageOptions.value.tableOptions);
	handlePageDataMaps({ flag: 'modal', ...payload }, pageOptions.value.modalAddOptions);
	handlePageDataMaps({ flag: 'modal', ...payload }, pageOptions.value.modalEditOptions);
	handlePageDataMaps({ flag: 'modal', ...payload }, pageOptions.value.modalInfoOptions);
}
handleGetCourses();

</script>

<style lang="less" scoped></style>