<script setup lang="ts">
import { Translation } from '@/widgets/translator'
import { VITE_BACKEND_SERVER_URL } from '@/shared/api'

const historyData: Translation[][] = JSON.parse(localStorage.getItem('history')!);
</script>

<template>
	<div class="history-page-wrapper">
		<div class="history-card" v-for="(word, index) in historyData" :key="index">
			<div class="history-card__text-to-translate">
				<div class="history-card__text-to-translate--time">
					{{ word[0].l.name }}
				</div>
				<span v-for="(char, index) in word" :key="index">
					<span v-if="index > 0" >
						{{ char.l.name }}
					</span>
				</span>
			</div>
			<div class="history-card__translation">
				<span v-for="(char, index) in word" :key="index">
					<span v-if="index > 0">
						<img v-if="char.u.name !== ' '"
							class="history-card__translation--symbol"
							:src="VITE_BACKEND_SERVER_URL + `/get_image?image_name=${char.u.name}.png`" alt="sign" />
						<span v-else>{{ char.u.name }}</span>
					</span>
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.history-page-wrapper
{
	width: 90%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 50px;
}

.history-card
{
	padding: 25px;
	display: flex;
	flex-direction: column;
	gap: 50px;

	background-color: #252427;
	border-radius: 23px;

	min-width: 250px;
	min-height: 250px;

	max-width: 500px;
	max-height: 500px;

	overflow: auto;

	&__text-to-translate {
		font-size: 32px;
		color: #FFFFFF;

		&--time {
			text-align: end;
			font-size: 20px;
			color: #ffffff9e;
		}
	}

	&__translation {
		&--symbol {
			height: 100px;
			width: 100px;
			object-fit: fill;
		}
	}
}
</style>