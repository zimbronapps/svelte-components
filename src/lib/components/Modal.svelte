<script lang="ts">
	import { browser } from '$app/env';
	import Icon from '$lib/components/Icon.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import '$lib/styles.css';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { circOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let maxWidth: string = '600px';
	export let loading = false;
	export let hideCloseIcon = false;
	export let noDesign = false;
	export let notClosable = false;
	export let transparent = false;

	const closeModal = (e) => {
		e.stopPropagation();
		if (notClosable) return;
		dispatch('close');
	};

	const cancelclick = (e) => {
		e.stopPropagation();
	};

	function disableScroll() {
		if (browser) {
			let bodySelector = document.querySelector('body');
			bodySelector.classList.add('preventScroll');
		}
	}

	function enableScroll() {
		if (browser) {
			let bodySelector = document.querySelector('body');
			bodySelector.classList.remove('preventScroll');
		}
	}

	onMount(disableScroll);

	onDestroy(enableScroll);
</script>

<div class="modalContainer z-component" class:transparent on:click={closeModal} />
<div class="zmodabs" on:click={closeModal}>
	<div
		class="modalContent"
		style:--maxWidth={maxWidth}
		in:fly={{ y: -200, duration: 400, easing: circOut }}
		out:fly={{ y: -200, duration: 400, easing: circOut }}
	>
		{#if !hideCloseIcon && !notClosable}
			<div class="iconclose noselect cursor-pointer" on:click={closeModal}>
				<Icon icon="close" size="20px" bold />
			</div>
		{/if}
		<div class:contenedorBlanco={!noDesign} on:click={cancelclick}>
			{#if loading}
				<slot name="loading"><Loading /></slot>
			{:else}
				<slot />
			{/if}
		</div>
	</div>
</div>

<style>
	.modalContainer {
		background-color: rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		z-index: 999999;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden auto;
	}
	.transparent {
		background-color: transparent;
	}
	.zmodabs {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100vw;
		min-height: 100vh;
		z-index: 999999;
		display: flex;
		align-items: center;
		/* padding: clamp(20px, 1vh, 50px) 0; */
		overflow-y: auto;
	}
	.modalContent {
		z-index: 999999;
		position: relative;
		top: 0;
		max-width: var(--maxWidth);
		width: clamp(280px, 90vw, var(--maxWidth));
		margin: auto auto;
	}

	.iconclose {
		position: absolute;
		top: 0px;
		right: 0px;
		background-color: white;
		border-radius: 50%;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		transform: translateX(25%) translateY(-0%);
		color: #e53935;
		transition: all 0.3s ease;
	}
	.iconclose:hover {
		color: white;
		background-color: #e53935;
		transform: translateX(25%) translateY(-0%) rotateZ(180deg);
	}

	.contenedorBlanco {
		border-radius: 16px;
		background-color: white;
		box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
		padding: clamp(15px, 5vw, 30px);
		padding-top: 35px;
		margin: 20px 0;
		margin-bottom: 100px;
	}
</style>
