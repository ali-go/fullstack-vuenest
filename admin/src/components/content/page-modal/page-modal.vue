<template>
	<div>
		<el-dialog v-model="dialogVisible" :title="modalTitle" :width="modalOptions.width || '50%'"
			:before-close="handleClose">
			<slot name="modal-content">
				<page-form v-bind="modalOptions.modalFormOptions" v-model="modalForm" v-on="formEvent"> </page-form>
			</slot>
			<template #footer>
				<span class="dialog-footer">
					<slot name="dialog-btns">
						<el-button @click="handleClose">取消</el-button>
						<el-button type="primary" @click="handleConfirm">确定</el-button>
					</slot>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { watch, ref, type PropType, onUnmounted } from 'vue';

import pageForm from "@/components/content/page-form/page-form.vue"

import { getSearchForm } from '@/hooks/user-page-search';
import type { IFormItem, IModal } from './types';

const props = defineProps({
	modelValue: Boolean,
	modalOptions: {
		type: Object as PropType<IModal>,
		default: () => { }
	},
	modalData: {
		type: Object,
		required: true
	},
	modalTitle: String
})
const emit = defineEmits(['handleModalClose', 'handleModalConfirm', "update:showModal", "handleUploading"])
let timer = 0;

// 注意：弹框的关闭由外部控制
const dialogVisible = ref(false);
watch(() => props.modelValue, (newVal: boolean) => {
	dialogVisible.value = props.modelValue;
	emit('update:showModal', newVal);
})
watch(dialogVisible, (newVal: boolean) => {
	emit('update:showModal', newVal);
	if (!newVal) {
		// 此处只能加定时器去避免未完全关闭时数据清空
		timer = setTimeout(() => {
			modalForm.value = { ...originSearchForm };
			String(timer) && clearTimeout(timer);
		}, 200);
	}
})
watch(() => props.modalData, (newVal: Object) => {
	Object.assign(modalForm.value, props.modalData)
})

// 获取表单字段
const modalForm = ref({});
let originSearchForm = {};
watch(() => props.modalOptions, (newVal: IModal) => {
	const formItems = newVal.modalFormOptions?.formItems || [];
	const [originData, formData] = getSearchForm(formItems, props.modalData); // originSearchForm为不响应数据
	originSearchForm = originData;
	modalForm.value = formData.value;
})

// 取消
const handleClose = () => {
	emit('handleModalClose');
}
// 确定
const handleConfirm = () => {
	emit('handleModalConfirm', modalForm);
}

// 上传-----------------
// 文件改变:
const handleUploadChange = ({ file, fileLists, fieldInfo, form }: any, fn: (url: string) => {}) => {
	// console.log('currentFile: any, uploadFiles: any, item: IFormItem', currentFile, uploadFiles, fieldItem)
	if (file.status !== "ready") return; // 只处理上传前的文件改变
	let suffName = file.name.substring(file.name.lastIndexOf('.') + 1)
	if (fieldInfo.fileType.length > 0) {
		if (!fieldInfo.fileType.includes(suffName)) {
			ElMessage.warning(`上传文件只能是${fieldInfo.fileType.join("、")}类型的`);
			return false;
		}
	}
	if (fieldInfo.fileSize) {
		if (file.size > fieldInfo.fileSize) {
			ElMessage.warning(`文件大小不能超过${fieldInfo.fileSize}kb`);
			return false;
		}
	}
	// return true;
	emit('handleUploading', { file }, fn);
}

// 所有v-on事件：
const formEvent = {
	uploadChange: handleUploadChange
}
onUnmounted(() => {
	String(timer) && clearTimeout(timer);
})
</script>

<style lang="scss" scoped></style>