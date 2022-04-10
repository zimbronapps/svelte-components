<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Select from '$lib/components/Select.svelte';
	import Switch from '$lib/components/Switch.svelte';
	import type { SelectOption } from '$lib/types';

	let options: SelectOption[] = [
		{
			value: '1',
			label: 'Option 1'
		},
		{
			value: '2',
			label: 'Option 2'
		},
		{
			value: '3',
			label: 'Option 3'
		}
	];
</script>

<div class="contenedor">
	<Dropdown>
		<DropdownItem>Item</DropdownItem>
		<DropdownItem>Item</DropdownItem>
	</Dropdown>

	<Dropdown>
		<Button slot="button">Menú</Button>
		<DropdownItem disabled>Item</DropdownItem>
		<DropdownItem>Item</DropdownItem>
	</Dropdown>
	<Icon name="face" />
	<Select {options} allowSearch />
	<Checkbox>Algo</Checkbox>
	<Button leftIcon="face">Hola</Button>
	<Switch>Axctivar</Switch>
</div>

<style>
	.contenedor {
		margin: 50px auto;
		width: 500px;
		background-color: lightsteelblue;
		padding: 20px;
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		color: blue;
	}
</style>
