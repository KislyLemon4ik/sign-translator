import type { RouteRecordRaw } from 'vue-router'
import { createWebHistory, createRouter } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		name: 'HomePage',
		path: '/',
		component: () => import('@/pages/translation-by-letters-page')
	},
	{
		name: 'TranslationAllOverTheTextPage',
		path: '/all-over-the-text',
		component: () => import('@/pages/translation-all-over-the-text-page')
	},
	{
		name: 'TranslateFilePage',
		path: '/file',
		component: () => import('@/pages/translate-file-page')
	},
	{
		name: 'HistoryPage',
		path: '/history',
		component: () => import('@/pages/history-page')
	},
	{
		name: 'TranslateVideoPage',
		path: '/video',
		component: () => import('@/pages/translate-video-page')
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export { router }