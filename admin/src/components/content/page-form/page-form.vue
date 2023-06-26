<template>
	<div>
		<el-form :model="formData" label-width="120px" class="page-form">
			<el-row>
				<template v-for="item in formItems">
					<el-col v-bind="item.span ? { span: item.span } : colLayout">
						<el-form-item :label="item.label" v-if="!item.isHidden">
							<template v-if="item.type === 'input'">
								<el-input v-model.trim="formData[item.prop]" :placeholder="item.placeholder"
									v-bind="item.otherOptions || {}" :disabled="item.disabled" />
							</template>
							<template v-if="item.type === 'select'">
								<el-select v-model.trim="formData[item.prop]" :placeholder="item.placeholder"
									v-bind="item.otherOptions || {}" :disabled="item.disabled" style="width:100%">
									<el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value" />
								</el-select>
							</template>
							<template v-if="item.type === 'datepicker'">
								<el-date-picker v-model.trim="formData[item.prop]" v-bind="item.otherOptions || {}"
									:placeholder="item.placeholder" :disabled="item.disabled" style="width:100%"
									value-format="YYYY-MM-DD" />
							</template>
							<template v-if="item.type === 'upload'">
								<el-upload class="avatar-uploader" action=" " :show-file-list="false" :on-success="handleSuccess"
									:on-change="(file: any, files: any) => uploadChange(file, files, item)" :auto-upload="false"
									:disabled="item.disabled">
									<template v-if="item.listType === 'picture-img'">
										<div class="upload-img upload-box">
											<img v-if="formData[item.prop]" :src="formData[item.prop]" class="avatar" />
											<el-icon v-else class="avatar-uploader-icon">
												<Plus />
											</el-icon>
										</div>
									</template>
									<template v-if="item.listType === 'video'">
										<div class="upload-video upload-box">
											<video v-if="formData[item.prop]" :src="formData[item.prop]" controls="controls"></video>
											<el-icon v-else class="avatar-uploader-icon">
												<Plus />
											</el-icon>
										</div>
									</template>
								</el-upload>
							</template>
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>
		<slot name="form-footer"></slot>
	</div>
</template>

<script setup lang="ts">
import { reactive, type PropType, watch, ref } from 'vue';

import type { IFormItem } from './types';
const emit = defineEmits(['update:modelValue', 'uploadChange'])
const props = defineProps({
	modelValue: {
		type: Object,
		required: true
	},
	formItems: {
		type: Array as PropType<IFormItem[]>,
		default: []
	},
	labelWidth: {
		type: String,
		default: '100px'
	},
	colLayout: {
		type: Object,
		default: () => ({
			xl: 6,
			lg: 8,
			md: 12,
			sm: 24,
			xs: 24
		})
	}
})

const formData: Record<string, any> = ref({});
watch(() => props.modelValue, (newVal) => {
	formData.value = newVal;
}, { immediate: true })
watch(formData, (newVal) => {
	emit('update:modelValue', newVal)
}, { deep: true })

// 处理文件地址的回调
const handleFileUrl = (form: any, fieldInfo: IFormItem) => {
	return function (url: string) {
		form.value[fieldInfo.prop] = url
	}
}
// 文件改变（由于设置了auto-upload为false，无法触发before-upload的钩子，故使用on-change钩子）
const uploadChange = (file: any, fileLists: any, fieldInfo: IFormItem) => {
	// 考虑到扩展性，传参采用对象形式
	emit('uploadChange', { file, fileLists, fieldInfo, form: formData }, handleFileUrl(formData, fieldInfo));
}

const handleSuccess = () => { }
</script>

<style lang="less" scoped>
.page-form {
	padding: 20px;

	.upload-box {
		display: flex;
		border: 1px dashed #dcdfe6;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		padding: 20px;

		&:hover {
			border-color: #409eff;
		}

		.el-icon.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			// height: 178px;
			text-align: center;
		}

		video,
		img {
			width: 178px;
		}
	}
}
</style>