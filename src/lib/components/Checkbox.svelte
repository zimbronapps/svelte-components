<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { colors } from '$lib/constants';
	import '$lib/styles.css';
	import { createEventDispatcher } from 'svelte';

	export let checked: boolean = false;

	export let color: string = colors.primary;
	export let uncheckedColor: string = colors.primary100;
	export let readOnly: boolean = false;
	export let cursor: string = '';
	export let id: string = '';

	const dispatch = createEventDispatcher();
	const change = () => {
		if (readOnly) return;
		checked = !checked;
		dispatch('change', checked);
	};
</script>

<div data-id={id} on:click={change} style:cursor class="zcheckbox noselect z-component">
	<Icon
		color={checked ? color : uncheckedColor}
		icon={checked ? 'check_box' : 'check_box_outline_blank'}
	/>
	<div class="label">
		<slot />
	</div>
</div>

<style>
	.zcheckbox {
		display: inline-flex;
		gap: 5px;
		align-items: center;
	}
</style>
