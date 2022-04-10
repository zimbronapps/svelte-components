<script lang="ts">
	import { Button, Checkbox, Dropdown, DropdownItem, Icon, Select, Switch } from '$lib';
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
