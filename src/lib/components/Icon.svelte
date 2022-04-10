<script lang="ts">
	import '$lib/styles.css';
	import type { IconType } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let type: IconType = 'normal';
	export let size = '';
	export let color = '';
	export let cursor = '';
	export let bold = false;

	const dispatch = createEventDispatcher();

	const click = () => {
		dispatch('click');
	};
</script>

<span
	class="z-component noselect icon material-icons type-{type}"
	style:cursor
	style:color
	style:font-weight={bold ? 'bold' : 'normal'}
	style:--icon-size={size}
	on:click={click}
>
	{name}
</span>

<style>
	@import url(https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp);

	.icon {
		width: var(--icon-size);
		height: var(--icon-size);
		font-size: var(--icon-size);
		overflow: hidden;
	}

	.type-normal {
		font-family: 'Material Icons';
	}
	.type-outlined {
		font-family: 'Material Icons Outlined';
	}
	.type-two-tone {
		font-family: 'Material Icons Two Tone';
	}
	.type-round {
		font-family: 'Material Icons Round';
	}
	.type-sharp {
		font-family: 'Material Icons Sharp';
	}
</style>
