<script setup lang="ts">
import MainPage from '@/pages/main-page'

localStorage.getItem('history') ? void 0 : localStorage.setItem('history', JSON.stringify([]));
</script>

<template>
	<div class="app-wrapper">
		<MainPage />
	</div>
</template>

<style scoped>
.app-wrapper
{
	display: flex;
	width: 100%;
	min-height: 100vh;
	height: 100%;
}
</style>
