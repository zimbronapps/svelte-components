<script lang="ts">
	import { colors } from '$lib/constants';
	import '$lib/styles.css';
	import { createEventDispatcher } from 'svelte';

	export let value: boolean = false;

	export let color: string = colors.primary;
	export let colorOff: string = colors.primary50;

	export let readOnly: boolean = false;
	export let cursor: string = 'pointer';
	export let disableLabelClick: boolean = false;

	const dispatch = createEventDispatcher();
	const change = () => {
		if (readOnly) return;
		value = !value;
		dispatch('change', value);
	};
</script>

<div class="z-component componentContainer noselect">
	<div
		class="zswitch"
		on:click={change}
		style:cursor
		style:background={value ? color : colorOff}
		style:justify-content={value ? 'flex-end' : 'flex-start'}
	>
		<div class="zswitch-mark" style:background-color={value ? colorOff : color} />
	</div>
	<div class="label" on:click={!disableLabelClick && change}>
		<slot />
	</div>
</div>

<style>
	.componentContainer {
		display: inline-flex;
		gap: 5px;
		align-items: center;
	}
	.zswitch {
		width: 30px;
		height: 16px;
		border-radius: 20px;
		display: flex;
		padding: 2px;
		transition: all 0.2s ease-in-out;
	}
	.zswitch-mark {
		height: 100%;
		aspect-ratio: 1;
		border-radius: 50%;
		transition: all 0.2s ease-in-out;
	}
</style>
