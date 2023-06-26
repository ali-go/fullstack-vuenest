<template>
	<page-search ref="pageSearchRef" v-if="searchOptions" :search-options="searchOptions"
		@handleSearch="handleSearch"></page-search>
	<page-content ref="pageContentRef" :table-options="tableOptions" :listData="tableData" :tableTotal="tableTotal"
		@changePageInfo="handleSearch">
		<!-- 三次暴露插槽：无限套娃，咱自己的都无语了 -->
		<template v-for="item in itemProps" v-slot:[item]="scope">
			<!-- 此处对按钮设置默认值 -->
			<template v-if="item === 'operator'">
				<slot :name="item" :row="scope.row">
					<!-- 此处默认按钮暂时未加权限控制 -->
					<el-button v-if="handleBtnMap(scope.fieldInfo.operartorBtns, 'info')" @click="handleInfo(scope.row)" type="info"
						icon="InfoFilled" circle />
					<el-button v-if="handleBtnMap(scope.fieldInfo.operartorBtns, 'edit')" @click="handleEdit(scope.row)"
						type="primary" icon="Edit" circle />
					<el-button v-if="handleBtnMap(scope.fieldInfo.operartorBtns, 'delete')" @click="handleDelete(scope.row)"
						type="danger" icon="Delete" circle />
				</slot>
			</template>
			<template v-else>
				<slot :name="item" :row="scope.row" :fieldInfo="scope.fieldInfo">
					{{ scope.fieldInfo.mapOptions ? scope.fieldInfo.mapOptions[scope.row[item]] : scope.row[item] }}
				</slot>
			</template>
		</template>
		<!-- 预设新增按钮 -->
		<template #top-btns v-if="tableOptions.showAdd">
			<slot name="top-btns">
				<el-button type="primary" @click="handleAdd">新增</el-button>
			</slot>
		</template>
	</page-content>
	<!-- 弹框组件 -->
	<page-modal v-if="pageShowModal" v-model.showModal="showModal" v-on="formEvent" :modalOptions="customerModalOptions"
		:modalData="modalData" :modalTitle="modalTitle">
		<template #dialog-btns>
			<slot name="dialog-btns">
				<!-- 重写查看时的按钮 -->
				<el-button v-if="isInfoOperater" type="primary" @click="handleModalClose">关闭</el-button>
			</slot>
		</template>
	</page-modal>
</template>

<script lang="ts">
export default {
	inheritAttrs: false
}
</script>

<script setup lang="ts">
import { onUnmounted, ref, useAttrs } from "vue"

import pageSearch from '../page-search/page-search.vue';
import pageContent from '../page-content/page-content.vue';

import type { IForm } from '../page-form/types';
import type { ITable } from '../page-table/types';
import type { IPageRequestQuery } from './types';

import { getTableItemProps } from '@/hooks/user-page-content';

// const pageModal = () => import('@/components/content/page-modal/page-modal.vue');
import pageModal from "@/components/content/page-modal/page-modal.vue"
import type { IModal } from "../page-modal/types";

const props = withDefaults(defineProps<{
	searchOptions?: IForm,
	tableOptions: ITable,
	modalAddOptions?: IModal,
	modalEditOptions?: IModal,
	modalInfoOptions?: IModal,
	pageShowModal?: boolean
}>(), {
	pageShowModal: true
});

let timer = 0;

// 获取传递的所有props+v-on数据
const attrs = useAttrs();
// console.log('attrs:', attrs)

// 处理ref
const pageSearchRef = ref<InstanceType<typeof pageSearch>>();
const pageContentRef = ref<InstanceType<typeof pageContent>>();

// 处理查询：
const tableData = ref([]);
const tableTotal = ref(0);
const handleSearch = async () => {
	const searchForm = pageSearchRef.value?.searchForm;
	// console.log('searchForm', searchForm)
	// 特殊处理：使用where包裹
	const where: any = {}
	for (const k in searchForm) {
		where[k] = searchForm[k]
	}
	const pageInfo = pageContentRef.value?.pageInfo;
	// 判断父组件是否有传接口函数(固定名称：onPageSearchFn)，有则此处统一调用，否则自定义处理
	const fn = attrs['onPageListFn'] as (k: IPageRequestQuery) => any
	if (fn) {
		const { data, total } = await fn({ where: JSON.stringify(where), ...pageInfo });
		tableData.value = data;
		tableTotal.value = total;
	}
}

// 处理按钮映射
const handleBtnMap = (fieldArr: Array<string> = [], field: string) => {
	return fieldArr.includes(field)
}

// 获取items的键名用于插槽暴露：
const itemProps = getTableItemProps(props.tableOptions.propsList);


// 自定义处理弹框配置
let customerModalOptions = props.modalAddOptions || props.modalEditOptions || props.modalInfoOptions;
// 处理弹框问题
const showModal = ref(false);
defineExpose({ showModal }); //支持外部自定义控制

// 弹框数据
const modalData = ref({});
const modalTitle = ref("");
// 新增
const handleAdd = () => {
	console.log('props.modalAddOptions', props.modalAddOptions)
	if (props.modalAddOptions) {
		customerModalOptions = props.modalAddOptions;
	}
	modalData.value = {};
	modalTitle.value = `新增${props.modalAddOptions?.pageTitle}`;
	showModal.value = true;
}
// 编辑
const handleEdit = (row: Object) => {
	if (props.modalEditOptions) {
		customerModalOptions = props.modalEditOptions;
	}
	modalData.value = { ...row };
	modalTitle.value = `编辑${props.modalEditOptions?.pageTitle}`;
	showModal.value = true;
}
// 查看
const isInfoOperater = ref(false); // 判断是否是查看模块，则重写弹框按钮
const handleInfo = (row: Object) => {
	if (props.modalInfoOptions) {
		customerModalOptions = props.modalInfoOptions;
	}
	modalData.value = { ...row };
	modalTitle.value = `查看${props.modalInfoOptions?.pageTitle}`;
	isInfoOperater.value = true;
	showModal.value = true;
}
// 弹框关闭：
const handleModalClose = () => {
	showModal.value = false;
	// 此处只能加定时器去避免未完全关闭时按钮回复默认值
	timer = setTimeout(() => {
		isInfoOperater.value = false;
	}, 200);
}
// 弹框确定：新增和编辑
const handleModalConfirm = async (modalForm: any) => {
	let len = Object.keys(modalData.value).length;
	let fnType = len > 0 ? 'onPageEditFn' : 'onPageAddFn';
	await commonHandle(fnType, modalForm.value);
	handleModalClose();
	handleSearch();
}
// 删除
const handleDelete = async (modalForm: any) => {
	try {
		await ElMessageBox.confirm('是否确定删除?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		})
	} catch (error) {
		console.log(error)
		return;
	}
	await commonHandle('onPageDeleteFn', modalForm);
	handleModalClose();
	handleSearch();
}
// 相同处理函数
const commonHandle = async (fnType: string, data: any) => {
	const fn = attrs[fnType] as (k: any) => any;
	if (fn) {
		try {
			const res = await fn(data);
			ElMessage({
				message: '操作成功',
				type: 'success',
			})
			return res;
		} catch (error) {
			console.log('error:', error)
		}
	}
}

// 处理文件上传
const handleUploading = async ({ file }: any, fn: (url: string) => {}) => {
	const formData = new FormData();
	formData.append('file', file.raw)
	const res = await commonHandle('onPageUploadFn', formData);
	fn(res.url);
	// console.log('res:', res)
	// 考虑到避免过多层级嵌套，此处就不再继续对外部暴露自定义操作了，后续有额外需求再补充

}
// 所有v-on事件：
const formEvent = {
	handleModalClose: handleModalClose,
	handleModalConfirm: handleModalConfirm,
	handleUploading: handleUploading
}
onUnmounted(() => {
	String(timer) && clearTimeout(timer);
})
</script>

<style lang="scss" scoped></style>