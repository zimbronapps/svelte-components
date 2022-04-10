<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { clickOutside } from '$lib/directives';
	import { fly } from 'svelte/transition';
	import '$lib/styles.css';
	import { colors } from '$lib/constants';

	export let icon = 'expand_more';

	export let isOpen = false;
	export let notClosableOnItemClick: boolean = false;
	export let shadowColor = 'rgba(0, 0, 0, 0.1)';

	export let defaultIconSize = '25px';
	export let defaultIconTextSize = '16px';
	export let defaultIconColor = colors.primary;
	export let defaultIconTextColor = colors.primary50;

	/**
	 * Altura máxima del contenedor de elementos, si no agregas no habrá un alto máximo.
	 * @example
	 * "100px", "5rem", "40vh"
	 */
	export let maxHeight = '';

	/**
	 * Separación de los elementos del menú del botón
	 * @example
	 * "10px", "1rem", "1vw"
	 */
	export let offset = '5px';

	export let position:
		| 'top'
		| 'right'
		| 'right-top'
		| 'bottom'
		| 'left'
		| 'left-top'
		| 'bottom-left'
		| 'top-left' = 'bottom';
	export let minWidth = '100px';
	export let maxWidth = '400px';

	export let toggle = () => {
		isOpen = !isOpen;
	};

	let style;
	$: {
		switch (position) {
			case 'top':
				style = `left:0;bottom:100%;margin-bottom:${offset};`;
				break;
			case 'bottom':
				style = `left:0;top:100%;margin-top:${offset};`;
				break;
			case 'right':
				style = `top:0;left:100%;margin-left:${offset};`;
				break;
			case 'right-top':
				style = `bottom:0;left:100%;margin-left:${offset};`;
				break;
			case 'left':
				style = `top:0;right:100%;margin-right:${offset};`;
				break;
			case 'left-top':
				style = `bottom:0;right:100%;margin-right:${offset};`;
				break;
			case 'top-left':
				style = `right:0;bottom:100%;margin-bottom:${offset};`;
				break;
			case 'bottom-left':
				style = `right:0;top:100%;margin-top:${offset};`;
				break;
		}
	}

	const clickOutsideHandle = () => {
		if (!isOpen) return;
		toggle();
	};
</script>

<div class="menucontainer noselect z-component" use:clickOutside={clickOutsideHandle}>
	<slot name="button">
		<div
			class="icondiv"
			style:width={defaultIconSize}
			style:--defaultIconColor={defaultIconColor}
			style:--defaultIconTextColor={defaultIconTextColor}
			on:click={toggle}
		>
			<Icon {icon} size={defaultIconTextSize} color={defaultIconTextColor} />
		</div>
	</slot>

	{#if isOpen}
		<div
			class="menu-items"
			style:min-width={minWidth}
			style:max-width={maxWidth}
			style:max-height={maxHeight}
			style:--shadowColor={shadowColor}
			on:click={notClosableOnItemClick ? null : toggle}
			in:fly
			{style}
		>
			<slot />
		</div>
	{/if}
</div>

<style>
	.menucontainer {
		cursor: pointer;
		position: relative;
		display: flex;
		width: fit-content;
		height: fit-content;
	}

	.icondiv {
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: var(--defaultIconColor);
		color: var(--defaultIconTextColor);
	}

	.menu-items {
		z-index: 100;
		position: absolute;
		background-color: #fff;
		border-radius: 8px;
		padding: 0;
		min-height: 30px;
		box-shadow: 0px 3px 15px var(--shadowColor);
		overflow: auto;
	}
</style>
