<template>
	<page-form v-bind="searchOptions" v-model="searchForm">
		<template #form-footer>
			<div class="handle-btns">
				<el-button icon="Refresh" @click="searchResetClick">重置</el-button>
				<el-button type="primary" icon="Search" @click="queryBtnClick">查询</el-button>
			</div>
		</template>
	</page-form>
</template>

<script setup lang="ts">

import type { IForm } from "../page-form/types"
import { getSearchForm } from "@/hooks/user-page-search";
import pageForm from "../page-form/page-form.vue";
import { onMounted } from 'vue'

const props = defineProps<{
	searchOptions: IForm
}>()
const emit = defineEmits(['handleSearch']);

// 获取表单字段
// console.log('searchOptions:', props.searchOptions)
const formItems = props.searchOptions.formItems || [];
const [originSearchForm, searchForm] = getSearchForm(formItems); // originSearchForm为不响应数据

onMounted(() => {
	queryBtnClick()
})

defineExpose({ searchForm })
// 查询
const queryBtnClick = () => {
	// console.log('searchForm:', searchForm)
	emit('handleSearch');
}

// 重置
const searchResetClick = () => {
	for (const k in searchForm.value) {
		searchForm.value[k] = ''
	}
	queryBtnClick();
}

</script>

<style lang="less" scoped>
.handle-btns {
	text-align: right;
}
</style>