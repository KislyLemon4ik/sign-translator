<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { debounce } from '@/shared/lib'
import { VITE_BACKEND_SERVER_URL } from '@/shared/api'
import { Translation } from '../model'

const translation = ref<Translation[]>([]);

const isAllowedInput = ref(true);

function handleInput(e: any) {
	const text = e.target.innerHTML;

	if (text) {
		message.info('Translation started');
		isAllowedInput.value = false;
		axios.post(VITE_BACKEND_SERVER_URL + '/items', { text: text })
			.then((res) => {
				message.success('Translated');
				translation.value = res.data;

				isAllowedInput.value = true;

				// Save to local storage data
				const history = JSON.parse(localStorage.getItem('history')!);
				history.push(res.data);
				localStorage.setItem('history', JSON.stringify(history));
			})
			.catch((err) => {
				message.error('Failed');
				isAllowedInput.value = true;
				console.error(err);
			});
	} else {
		translation.value = [];
	}
}

const processInput = debounce(handleInput, 2500);

function notImplemented() {
	alert('not implemented');
}

</script>

<template>
	<div class="translator-wrapper">
		<div class="translator-header">
			<div class="translator-header__native-language" @click="notImplemented">
				<button class="translator-header__native-language--select">English</button>
			</div>
			<button class="translator-header__arrows" @click="notImplemented">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"> 
					<path fill-rule="evenodd" d="M11.8.603a.5.5 0 0 0-.8.4v2H1a1 1 0 1 0 0 2h10v2a.5.5 0 0 0 .8.4l3.997-3a.5.5 0 0 0 0-.8l-3.997-3ZM5 13.003v2a.5.5 0 0 1-.8.4l-3.997-3a.5.5 0 0 1 0-.8l3.997-3a.5.5 0 0 1 .8.4v2h10a1 1 0 0 1 0 2H5Z" clip-rule="evenodd"></path>
				</svg>
			</button>
			<div class="translator-header__foreign-language" @click="notImplemented">
				<button class="translator-header__foreign-language--select">Sign language</button>
			</div>
		</div>
		<div class="translator-bottom">
			<div class="translator-bottom__native-language">
				<div :contenteditable="isAllowedInput" tabindex="0" class="translator-bottom__native-language--input" @input="processInput">

				</div>
			</div>
			<div class="translator-bottom__translation">
				<div class="translator-bottom__translation--output">
					<span v-for="(char, index) in translation" :key="index">
						<span v-if="index > 0">
							<img v-if="char.u.name !== ' '"
								class="translator-bottom__translation--symbol"
								:src="VITE_BACKEND_SERVER_URL + `/get_image?image_name=${char.u.name}.png`" alt="sign" />
							<span v-else>{{ char.u.name }}</span>
						</span>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>


<style scoped lang="scss">
$border-radius: 23px;

.translator-wrapper
{
	display: flex;
	flex-direction: column;
	background-color: #252427;
	border-radius: $border-radius;
}

$font-size: 20px;
$font-color: #D3D3C9;
$language-hover: #2E2D2F;
.translator-header
{
	display: grid;
	grid-template: 56px / 1fr 0.1fr 1fr;
	align-items: center;
	justify-items: center;
	user-select: none;

	&__arrows {
		cursor: pointer;

		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;

		border: none;
		background-color: unset;

		&:hover {
			background-color: #313134d0;
			border-radius: 50%;
		}
	}

	&__native-language {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-top-left-radius: $border-radius;
		cursor: pointer;

		&:hover {
			background-color: $language-hover;
		}

		&--select {
			background-color: unset;
			border: none;

			font-size: $font-size;
			color: $font-color;
		}
	}

	&__foreign-language {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-top-right-radius: $border-radius;
		cursor: pointer;

		&:hover {
			background-color: $language-hover;
		}

		&--select {
			background-color: unset;
			border: none;

			font-size: $font-size;
			color: $font-color;
		}
	}
}

$input-field-height: 237px;
$input-field-width: 574px;
$input-size: 24px;
$input-color: #FFFFFF;
$scroll-bar-color: #686868 #424242;
.translator-bottom
{
	display: flex;
	flex-direction: row;

	&__native-language {
		padding: 23px 67px 71px 23px;
		border-top: 1px solid #39393D;
		width: $input-field-width;
		height: $input-field-height;

		&--input {
			padding-right: 5px;
			outline: none;
			font-size: $input-size;
			font-family: inherit;
			color: $input-color;

			height: 100%;
			width: 100%;
			overflow-y: auto;
			scrollbar-color: $scroll-bar-color;
		}
	}

	&__translation {
		padding: 23px 67px 71px 23px;
		width: $input-field-width;
		height: $input-field-height;
		background-color: #39393D;
		border-radius: 0 0 $border-radius 0;

		&--output {
			padding-right: 5px;
			outline: none;
			font-size: $input-size;
			font-family: inherit;
			color: $input-color;

			height: 100%;
			width: 100%;
			overflow-y: auto;
			scrollbar-color: $scroll-bar-color;
		}

		&--symbol {
			height: 100px;
			width: 100px;
			object-fit: fill;
		}
	}
}
</style>
