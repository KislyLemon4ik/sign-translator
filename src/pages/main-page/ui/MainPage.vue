<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
	<div class="main-page-wrapper">
		<div class="vertical-menu-wrapper">
			<div class="vertical-menu">
				<h1 class="vetrical-menu__title">Sign Translator</h1>
				<router-link to="/" :class="['vetrical-menu__mode', { 'active' : route.name == 'HomePage' }]">By letters</router-link>
				<!-- <router-link to="/all-over-the-text" :class="['vetrical-menu__mode', { 'active' : route.name == 'TranslationAllOverTheTextPage' }]">All over the text</router-link> -->
				<router-link to="/file" :class="['vetrical-menu__mode', { 'active' : route.name == 'TranslateFilePage' }]">Documents</router-link>
				<router-link to="/history" :class="['vetrical-menu__mode', { 'active' : route.name == 'HistoryPage' }]">History</router-link>
				<!-- <router-link to="/video" :class="['vetrical-menu__mode', { 'active' : route.name == 'TranslateVideoPage' }]">Video</router-link> -->
			</div>
		</div>
		<router-view />
	</div>
</template>

<style scoped lang="scss">
.main-page-wrapper
{
	padding-top: 32px;
	display: flex;
	flex-grow: 1;
	gap: 100px;
	align-items: flex-start;
	font-family: sans-serif;
	background-color: #121214;
	width: 100%
}

.vertical-menu-wrapper
{
	display: flex;
	flex-basis: 340px;
	flex-shrink: 0;
	justify-content: center;
}

.vertical-menu {
	display: grid;
	grid-template-rows: 60px repeat(5, 40px);
}

.vetrical-menu__title {
	font-family: inherit;
	color: #F3F3F3;
	font-size: 25px;
}

.vetrical-menu__mode {
	font-family: inherit;
	color: #F3F3F3;
	font-size: 20px;
	background-color: unset;
	text-decoration: none;
	text-align: start;
	align-self: center;
	cursor: pointer;
	padding: 5px;

	&.active {
		background-color: #393939;
		border-radius: 5px;
	}
}
</style>
