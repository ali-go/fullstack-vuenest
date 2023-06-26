<template>
	<div class="customer-header">
		<div class="header-left">
			<div class="left-left">
				<el-icon>
					<PartlyCloudy />
				</el-icon>
				<span class="header-title">coderali 后台管理系统</span>
			</div>
			<div class="left-right">
				<ul class="left-btn">
					<li class="btn-item" v-for="item in leftBtns" :key="item.title">
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<span>{{ item.title }}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="header-right">
			<div class="right-left">
				<ul class="right-btn">
					<li class="btn-item" v-for="item in rightBtns" :key="item.title">
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<span>{{ item.title }}</span>
					</li>
				</ul>
			</div>
			<div class="right-right">
				<img src="~/@/assets/images/avater.jpeg" alt="">
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// 暂时头像用本地，后面用网络请求
// const avater = require("")
const leftBtns = [
	{ title: '首页', icon: 'Monitor' },
	{ title: '设置', icon: 'Tools' },
	{ title: '消息', icon: 'Bell' },
	{ title: '更新', icon: 'Refresh' },
]
const rightBtns = [
	{ title: '首页', icon: 'Monitor' },
	{ title: '设置', icon: 'Tools' },
	{ title: '消息', icon: 'Bell' },
	{ title: '更新', icon: 'Refresh' },
]
</script>

<style lang="less" scoped>
// 图标文本flex样式抽离
.iconTitle {
	display: flex;
	align-items: center;
	padding: 0 10px;
	height: 100%;
	cursor: pointer;
}

.customer-header {
	height: 50px;
	line-height: 50px;
	background-image: var(--customer-header-bg-color);
	display: flex;
	justify-content: space-between;
	color: #fff;

	.header-left {
		height: 100%;
		padding-left: 20px;
		display: flex;

		.left-left {
			display: flex;
			align-items: center;

			.el-icon {
				font-size: 20px;
			}

			.header-title {
				font-size: 16px;
				margin-left: 10px;
				font-weight: 700;
			}

		}

		.left-right {
			.left-btn {
				display: flex;

				.btn-item {
					.iconTitle();

					span {
						margin-left: 2px;
					}

					&:hover {
						background-color: rgb(4, 96, 221);
					}
				}
			}
		}

	}

	.header-right {
		display: flex;
		.right-left {
			.right-btn {
				display: flex;

				.btn-item {
					.iconTitle();

					span {
						margin-left: 2px;
					}

					&:hover {
						background-color: rgb(33, 132, 132);
					}
				}
			}
		}

		.right-right {
			height: 100%;
			margin: 0 20px;
			display: flex;
			align-items: center;

			img {
				width: 30px;
				height: 30px;
				border-radius: 50%;
				cursor: pointer;
			}
		}
	}
}
</style>