<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Input from '$lib/components/Input.svelte';
	import { colors, cssConstants } from '$lib/constants';
	import { clickOutside } from '$lib/directives';
	import { searchFound } from '$lib/functions/searchFound';
	import '$lib/styles.css';
	import type { SelectOption } from '$lib/types';
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let value: (string | number)[] = [];
	export let options: SelectOption[];

	export let placeHolder = '';
	export let placeHolderColor = colors.primary;
	export let label = '';

	export let allowSearch = false;

	export let icon = '';
	export let iconColor = '';

	export let image = '';
	export let maxHeight = '';
	export let borderColor = 'transparent';
	export let borderRadius = cssConstants.radius;
	export let boxShadow = '';
	export let showDefaultIconInOptions = false;
	export let disableAutoPosition = false;
	export let width = '250px';
	export let error = '';
	export let errorColor = colors.error;
	export let defaultTextColor = colors.font;

	export let hoverBackgroundColor = colors.primary50;
	export let hoverTextColor = colors.primary;
	export let checkboxColor = colors.primary;

	export let buscarText = 'Buscar...';
	export let seleccionarTodoNadaText = 'Seleccionar Todo/Nada';

	export let optionComponent = null;

	export let zIndex = 1;

	let filter = '';
	let checkedAll = false;
	let defaultLabel = placeHolder;
	let isOpen = false;

	let stickyleft = true;
	let stickyright = false;
	let stickyBottom = true;
	let stickyTop = false;

	let filteredlist = [];
	let startList = [];

	let lastCount = 0;

	export const showHide = (e?) => {
		isOpen = !isOpen;

		if (isOpen) {
			dispatch('openMenu');
			updateCheckedAll();
		} else {
			dispatch('closeMenu');
		}

		if (!e) return;

		if (!filteredlist.length) return;

		if (!disableAutoPosition) {
			if (window.innerHeight > 300 && window.innerHeight - e.y < 300) {
				stickyTop = true;
				stickyBottom = false;
			} else {
				stickyTop = false;
				stickyBottom = true;
			}
		}

		if (e.x && e.x > 400) {
			stickyleft = false;
			stickyright = true;
		}
	};

	const updateCheckedAll = () => {
		checkedAll = value.length === filterNoLabels(startList).length;
	};

	afterUpdate(() => {
		if (lastCount === value.length) return;
		lastCount = value.length;
		placeHolder = value.length ? selectedTexts() : '';
	});

	const setValue = (item) => {
		if (item.isLabel) return;

		let index = value.indexOf(item.value);
		if (index >= 0) {
			value.splice(index, 1);
			value = value;
		} else {
			value = [...value, item.value];
		}
		updateCheckedAll();

		dispatch('change', value);
	};

	const selectedTexts = () => {
		return value
			.map((item) => {
				let selected = startList.find((i) => i.value === item);
				return selected ? selected.label : '';
			})
			.join(', ');
	};

	const checkAll = (e) => {
		if (e.detail) {
			value = filterNoLabels(filteredlist).map(({ value }) => value);
		} else {
			placeHolder = '';
			value = [];
		}
	};

	const filterNoLabels = (lista: SelectOption[]) => {
		return lista.filter((item) => !item.isLabel);
	};

	const initList = () => {
		filteredlist = [...startList];
	};

	onMount(() => {
		startList = [...options];

		if (!maxHeight && startList.length > 20) {
			maxHeight = '50vh';
		}

		initList();
	});

	const filterItems = () => {
		if (!filter) {
			initList();
			return;
		}
		filteredlist = startList.filter(
			(item) => searchFound(filter, item.label) || (item.filter && searchFound(filter, item.filter))
		);
	};

	$: {
		filterItems(), filter;
	}

	const onclickoutside = () => {
		if (!isOpen) return;
		showHide();
	};
</script>

<div
	class="z-component zselectcontainer noselect"
	style:width
	style:max-width={width}
	style:--hoverBackgroundColor={hoverBackgroundColor}
	style:--hoverTextColor={hoverTextColor}
	style:--color-error={errorColor}
	use:clickOutside={onclickoutside}
	style:color={defaultTextColor}
>
	{#if label}
		<div class="zlabel">
			<span>{label}</span>
		</div>
	{/if}
	<div
		class="select noselect"
		class:zselectError={error}
		style:border-color={borderColor}
		style:border-radius={borderRadius}
		style:box-shadow={boxShadow}
		on:click|stopPropagation={showHide}
	>
		<div class="labelcontainer">
			{#if icon}
				<Icon name={icon} color={iconColor} />
			{:else if image}
				<img class="imgselect" src={image} alt={placeHolder} />
			{/if}
			<span class="label" style:color={placeHolderColor}>
				{#if placeHolder}
					{placeHolder}
				{:else if !placeHolder && defaultLabel}
					{defaultLabel}
				{:else}
					{placeHolder}
				{/if}
			</span>
		</div>
		<Icon size="20px" name="arrow_drop_down" />
	</div>
	{#if isOpen}
		{#if allowSearch}
			<div class="searchdiv">
				<Input
					bind:value={filter}
					type="search"
					color={borderColor}
					placeholder={buscarText}
					{borderRadius}
					noMargin
					autofocus
				/>
			</div>
		{/if}

		<div
			in:fly
			class="listaitems"
			class:stickyleft
			class:stickyright
			class:stickyTop
			class:stickyBottom
			style="padding:{maxHeight ? 5 : 0}px;z-index:{zIndex + 1};"
		>
			<div class="selecthelper">
				<Checkbox
					color={checkboxColor}
					cursor="pointer"
					bind:checked={checkedAll}
					on:change={checkAll}
				>
					{seleccionarTodoNadaText}
				</Checkbox>
			</div>
			<div class:maxheight={maxHeight} style="max-height: {maxHeight};">
				{#each filteredlist as item}
					<div
						class="optionDiv"
						class:isLabel={item.isLabel}
						class:optionDivNoCustom={!optionComponent && !item.isLabel}
						class:optionDivSelected={!optionComponent &&
							value.includes(item.value) &&
							!item.isLabel}
						on:click|stopPropagation={() => setValue(item)}
						data-value={item.value || item}
					>
						<div class="optionCheckArea">
							{#if !item.isLabel}
								<Checkbox color={checkboxColor} readOnly checked={value.includes(item.value)} />
							{/if}
						</div>
						{#if !optionComponent && (item.icon || item.image || (showDefaultIconInOptions && icon))}
							<div class="iconDiv">
								{#if item.icon || (showDefaultIconInOptions && icon)}
									<Icon
										name={item.icon || (showDefaultIconInOptions ? icon : '')}
										color={item.iconColor}
									/>
								{/if}
								{#if item.image}
									<img class="imgselect" src={item.image} alt={item.label} />
								{/if}
							</div>
						{/if}

						{#if optionComponent}
							<svelte:component
								this={optionComponent}
								selected={!item.isLabel && value.includes(item.value)}
								{item}
							/>
						{:else}
							<span style:color={item.textColor}>
								{item.label}
							</span>
						{/if}
					</div>
				{/each}
			</div>
			<slot name="afterlist" />
		</div>
	{/if}
	{#if error && !isOpen}
		<div class="zerror">{error}</div>
	{/if}
</div>

<style>
	.zselectcontainer {
		display: flex;
		flex-direction: column;
		gap: 5px;
		position: relative;
	}

	.zlabel {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 5px;
		padding: 0 5px;
		font-weight: bold;
	}

	.imgselect {
		width: 16px;
		height: 16px;
	}
	.select {
		position: relative;
		background: white;
		height: 40px;
		padding: 0 20px;
		max-width: 100%;
		display: flex;
		gap: 10px;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		white-space: nowrap;
		border-width: 1px;
		border-style: solid;
	}
	.select:hover,
	.optionDivSelected,
	.optionDivSelected *,
	.optionDivNoCustom:hover {
		background: var(--hoverBackgroundColor);
		color: var(--hoverTextColor);
	}

	.optionCheckArea {
		display: flex;
		align-items: center;
	}
	.select .label {
		font-weight: bold;
		max-inline-size: 100%;
		overflow: hidden;
	}
	.labelcontainer {
		max-width: calc(100% - 25px);
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}

	.searchdiv {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 50px;
	}
	.listaitems {
		position: absolute;
		width: 100%;
		background: white;
		border-radius: 12px;
		overflow: hidden;
		margin: 5px 0px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.stickyleft {
		left: 0;
	}
	.stickyright {
		right: 0;
	}

	.stickyTop {
		bottom: 100%;
	}
	.stickyBottom {
		top: 100%;
	}

	.maxheight {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.optionDiv {
		width: 100%;
		cursor: pointer;
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
	}

	.optionDivNoCustom {
		display: flex;
		gap: 10px;
		align-items: center;
		padding: 12px 15px;
	}

	.optionDiv span {
		overflow: hidden;
	}
	.iconDiv {
		width: 14px;
		height: 14px;
	}

	.optionDivSelected {
		font-weight: bold;
	}

	.selecthelper {
		display: flex;
		gap: 10px;
		align-items: center;
		padding: 10px 15px;
	}
	.zerror {
		font-size: 0.64rem;
		color: var(--errorColor);
	}
	.zselectError {
		border: 1px solid var(--errorColor);
	}
	.isLabel {
		font-weight: bold;
		padding: 5px 10px;
		cursor: default;
	}
</style>
