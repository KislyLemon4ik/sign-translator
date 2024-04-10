<script setup lang="ts">
import { Translator } from '@/widgets/translator'


</script>

<template>
    <div class="main-page-wrapper">
        <div class="vertical-menu">
            <h1 class="vetrical-menu__title">Sign Translator</h1>
            <button class="vetrical-menu__mode">By letters</button>
            <button class="vetrical-menu__mode">All over the text</button>
            <button class="vetrical-menu__mode">Documents</button>
            <button class="vetrical-menu__mode">History</button>
            <button class="vetrical-menu__mode">Pictures</button>
        </div>
        <Translator />
    </div>
</template>

<style scoped lang="scss">
.main-page-wrapper
{
	padding-top: 32px;
	display: flex;
	justify-content: center;
    gap: 100px;
	flex-grow: 1;
	align-items: flex-start;
    font-family: sans-serif;
	background-color: #121214;
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
    border: none;
    text-align: start;
    cursor: pointer;
}
</style>
