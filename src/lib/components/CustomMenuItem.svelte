<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import '$lib/styles.css';
	import { colors } from '$lib/constants';

	export let icon: string = '';
	export let image: string = '';
	export let iconColor: string = '';
	export let cursor: string = '';
	export let gap = '10px';
	export let selected: boolean = false;
	export let colorText: string = '';
	export let colorTextHover: string = colors.primary;
	export let colorBackground: string = '#ffffff';
	export let colorBackgroundHover: string = colors.primary50;
	export let style: string = '';

	const dispatch = createEventDispatcher();

	const click = () => {
		dispatch('click');
	};
</script>

<div
	class="btnsubmenu z-component"
	style:gap
	style:cursor
	class:selected
	style:--colorText={colorText}
	style:--colorTextHover={colorTextHover}
	style:--colorBackground={colorBackground}
	style:--colorBackgroundHover={colorBackgroundHover}
	{style}
	on:click={click}
>
	{#if icon}
		<Icon {icon} color={iconColor} />
	{:else if image}
		<img src={image} alt="icon" />
	{/if}
	<slot />
</div>

<style>
	.btnsubmenu {
		display: flex;
		align-items: center;
		height: 36px;
		padding: 0 20px;
		white-space: nowrap;
		color: var(--colorText);
		background-color: var(--colorBackground);
	}
	.btnsubmenu:hover,
	.selected {
		color: var(--colorTextHover);
		background-color: var(--colorBackgroundHover);
	}
	img {
		max-width: 20px;
		max-height: 20px;
		object-fit: cover;
	}
	.selected {
		font-weight: bold;
	}
</style>
