<template>
	<div class="recurse-menu">
		<template v-for="(item, index) in menus" :key="item.id">
			<el-sub-menu v-if="item.children && item.children.length > 0" :index="item.id">
				<template #title>
					<el-icon>
						<location />
					</el-icon>
					<span>{{ item.title }}</span>
				</template>
				<recurse-menu :menus="item.children"></recurse-menu>
			</el-sub-menu>
			<el-menu-item v-else :index="item.path" style="--text-color: #fff">
				<el-icon>
					<Menu />
				</el-icon>
				<span>{{ item.title }}</span>
			</el-menu-item>
		</template>
	</div>
</template>

<script setup lang="ts" name="recurse-menu">
const prop = defineProps<{ menus: any[] }>()
</script>

<style lang="less" scoped>
.el-sub-menu {
	:deep(.el-sub-menu__title) {
		color: #fff;

		&:hover {
			background-color: var(--menu-bg-color);
			opacity: 0.8;
		}
	}
}

.el-menu-item {
	color: #fff;
	background-color: var(--menu-bg-color);

	&.is-active {
		color: yellow;
	}

	&:hover {
		background-color: var(--menu-bg-color);
		opacity: 0.8;
	}
}
</style>