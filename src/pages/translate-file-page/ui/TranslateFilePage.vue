<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { UploadProps, message } from 'ant-design-vue'
import { FileType } from 'ant-design-vue/es/upload/interface'
import { InboxOutlined } from '@ant-design/icons-vue'
import { Translation } from '@/widgets/translator'
import { VITE_BACKEND_SERVER_URL } from '@/shared/api'

const translation = ref<Translation[]>();

function handleUploadedFile(file: FileType) {
	message.info('Translation started');

	const formData = new FormData();
	formData.append('file', file);

	const url = VITE_BACKEND_SERVER_URL + '/upload';

	axios.post(url, formData)
		.then((res) => {
			message.success('Translated');

			translation.value = res.data;

			// Save to local storage data
			const history = JSON.parse(localStorage.getItem('history')!);
			history.push(res.data);
			localStorage.setItem('history', JSON.stringify(history));
		})
		.catch((err) => {
			message.error('Failed');
			console.error(err);
		});
}

const handleFileLoading: UploadProps['beforeUpload'] = file => {
	handleUploadedFile(file);

	return false;
};
</script>

<template>
	<div class="translate-file-wrapper" >
		<div class="upload-wrapper">
			<a-upload-dragger class="upload-dragger"
				accept=".txt" :showUploadList="false" :beforeUpload="handleFileLoading">
	
					<p class="ant-upload-drag-icon">
						<inbox-outlined></inbox-outlined>
					</p>
					<p class="upload-info">Click or drag file to this area to upload</p>
					<p class="upload-info">
						Supports txt and docx
					</p>

			</a-upload-dragger>
		</div>
		<div class="translation">
			<div v-for="(word, index) in translation" :key="index">
				<div v-if="index > 0" class="history-card">
					<div v-if="index > 0" class="history-card__text-to-translate">
						<span>
							<span>
								{{ word.l.name }}
							</span>
						</span>
					</div>
					<div class="history-card__translation">
						<span v-if="index > 0">
							<span>
								<img v-if="word.u.name !== ' '"
									class="history-card__translation--symbol"
									:src="VITE_BACKEND_SERVER_URL + `/get_image?image_name=${word.u.name}.png`" alt="sign" />
								<span v-else>{{ word.u.name }}</span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.translate-file-wrapper
{
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 250px;
}

.upload-wrapper
{
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 300px;
}

.upload-info
{
	font-size: 16px;
	color: #FFFFFF;
}

.upload-dragger
{
	width: 800px;
	height: 300px;

	& :deep(.ant-upload-btn) {
		padding-top: 80px;
	}
}

.translation
{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
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