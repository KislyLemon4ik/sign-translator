<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { Translator } from '@/widgets/translator'
import { VITE_BACKEND_SERVER_URL } from '@/shared/api'

const letters = ref();

axios.get(VITE_BACKEND_SERVER_URL + '/get_all_image')
	.then((res) => {
		letters.value = res.data;
	});


</script>

<template>
	<div class="translate-by-letters-wrapper">
		<div style="display: flex;" >
			<Translator />
		</div>
		<div class="alphabet" v-if="letters" >
			<h1 class="alphabet__title">Alphabet:</h1>
			<div class="alphabet__letters">
				<span v-for="(char, key) of letters" :key="key">
					<span class="alphabet__letters--wrapper"v-for="(symbol, key) in char" :key="key">
						<span class="translator-bottom__translation--char">{{ key }}</span>
						<img class="translator-bottom__translation--symbol"
							:src="VITE_BACKEND_SERVER_URL + `/get_image?image_name=${symbol}.png`" alt="sign" />
					</span>
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.translate-by-letters-wrapper
{
	display: flex;
	flex-direction: column;
	gap: 35px;
}

.alphabet
{
	width: 90%;
	display: flex;
	flex-direction: column;
	gap: 10px;

	&__title {
		color: #F3F3F3;
	}

	&__letters {
		display: flex;
		flex-direction: row;
		gap: 5px;
		flex-wrap: wrap;

		color: #F3F3F3;
	}
}

.alphabet__letters--wrapper
{
	position: relative;
	font-size: 22px;
}

.translator-bottom__translation--char
{
	position: absolute;
	color: black;
}
</style>