<template>
	<div id="app">
		<el-config-provider :locale="locale">
			<router-view></router-view>
		</el-config-provider>
	</div>
</template>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn;
</script>

<style scoped>
#app {
	height: 100vh;
}
</style>