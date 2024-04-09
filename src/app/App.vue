<script setup lang="ts">
import { MainPage } from '@/pages/main-page'

</script>

<template>
	<div class="app-wrapper">
		<div class="main-page-wrapper">
			<MainPage />
		</div>
	</div>
</template>

<style scoped>
.app-wrapper
{
	display: flex;
	width: 100%;
	height: 100vh;
	background-color: #121214;
}

.main-page-wrapper
{
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-grow: 1;
}
</style>
