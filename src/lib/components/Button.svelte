<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { colors, cssConstants } from '$lib/constants';
	import '$lib/styles.css';
	import type { IconType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/* COLORES */
	export let borderColor = '';
	export let borderRadius = cssConstants.radius;
	export let color = colors.primary50;
	export let textColor: string = colors.primary500;
	/* ICONOS */
	export let leftIcon = '';
	export let leftIconBold = false;
	export let leftIconSize = '18px';
	export let leftIconType: IconType = 'normal';
	export let rightIcon = '';
	export let rightIconBold = false;
	export let rightIconSize = '18px';
	export let rightIconType: IconType = 'normal';
	/* MISC */
	export let disabled = false;
	export let preventDefault = false;
	export let type = 'button';
	export let style = '';

	const click = (e) => {
		if (disabled) return;
		if (preventDefault) {
			e.preventDefault();
		}
		dispatch('click');
	};
</script>

<button
	{type}
	on:click={click}
	class="noselect boton zafiro-component"
	style:--btn-color-custom={color}
	style:--btn-textColor-custom={textColor}
	style:border-radius={borderRadius}
	style:border-color={borderColor}
	{style}
	class:disabled
>
	<div class="btnContent">
		{#if leftIcon}
			<Icon bold={leftIconBold} icon={leftIcon} size={leftIconSize} type={leftIconType} />
		{/if}
		<slot />
		{#if rightIcon}
			<Icon bold={rightIconBold} icon={rightIcon} size={rightIconSize} type={rightIconType} />
		{/if}
	</div>
</button>

<style>
	.boton {
		border: none;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		border-width: 1px;
		border-style: solid;
		background: var(--btn-color-custom);
		border-color: var(--btn-color-custom);
		color: var(--btn-textColor-custom);
		height: 40px;
		padding: 0 18px;
	}

	.boton:hover {
		color: var(--btn-color-custom);
		background: var(--btn-textColor-custom);
	}

	.btnContent {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		white-space: nowrap;
	}

	.boton.disabled {
		background: rgba(45, 45, 51, 0.1);
		color: rgba(45, 45, 51, 0.3);
		border-color: rgba(45, 45, 51, 0.1);
		cursor: none;
	}
</style>
