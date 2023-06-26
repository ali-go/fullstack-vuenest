<template>
	<div class="main">
		<el-container>
			<el-header>
				<customer-header></customer-header>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu class="el-menu-vertical-demo" router :default-active="$route.path">
						<recurse-menu :menus="menus"></recurse-menu>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script setup lang="ts">
import recurseMenu from '@/components/common/recurse-menu/recurse-menu.vue'
import customerHeader from "@/components/content/customer-header/customer-header.vue"

const menus = [
	{
		title: '内容管理',
		id: '1',
		children: [
			{ title: '课程管理', path: '/course/list', id: '1-1', },
			{ title: '课时管理', path: '/episode/list', id: '1-2' }
		]
	},
	{
		title: '账户管理',
		id: "2",
		children: [{ title: '用户管理', path: '/user/list', id: '2-1' }]
	},
	{
		title: '运营管理',
		id: "3",
		children: [{ title: '运营管理', path: '/yunying/list', id: '3-1' }]
	}
]
</script>

<style scoped lang="less">
.main {
	height: 100%;

	.el-container {
		height: 100%;
		.el-header{
			padding: 0;
			height: auto;
		}
		.el-aside {
			display: flex;
			flex-direction: column;

			.el-menu {
				flex: 1;
				border-right: none;
				background-color: var(--menu-bg-color);
			}
		}
	}
}
</style>
