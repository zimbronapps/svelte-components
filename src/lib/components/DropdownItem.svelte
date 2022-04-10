<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import '$lib/styles.css';
	import { colors } from '$lib/constants';

	export let icon = '';
	export let image = '';
	export let iconColor = '';
	export let cursor = 'pointer';
	export let gap = '10px';
	export let selected = false;
	export let colorText: string = colors.font;
	export let colorTextHover: string = colors.primary;
	export let colorBackground = '#ffffff';
	export let colorBackgroundHover: string = colors.primary50;
	export let style = '';

	export let disabled = false;

	const dispatch = createEventDispatcher();

	const click = () => {
		if (disabled) return;
		dispatch('click');
	};
</script>

<div
	class="z-component btnsubmenu"
	{style}
	style:gap
	style:cursor={disabled ? 'not-allowed' : cursor}
	style:--colorText={colorText}
	style:--colorTextHover={colorTextHover}
	style:--colorBackground={colorBackground}
	style:--colorBackgroundHover={colorBackgroundHover}
	class:selected
	class:disabled
	on:click={click}
>
	{#if icon}
		<Icon name={icon} color={iconColor} />
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
	.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
