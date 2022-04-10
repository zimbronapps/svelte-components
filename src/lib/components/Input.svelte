<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { InputMode } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';

	import '$lib/styles.css';
	import { colors, cssConstants } from '$lib/constants';

	const dispatch = createEventDispatcher();

	export let value: string | number = '';

	/* COLORES */
	export let color = colors.primary;
	export let inputTextColor = colors.primary;
	export let colorError = colors.error;

	export let borderRadius = cssConstants.radius;

	/* ICONOS */
	export let leftIcon = '';
	export let leftIconSize = '15px';
	export let leftIconColor = '';
	export let rightIcon = '';
	export let rightIconSize = '15px';
	export let rightIconColor = '';
	export let rightIconInvertColor = false;
	export let leftText = '';
	export let rightText = '';

	/* INPUT SETTINGS */
	export let name = '';
	export let type: InputMode = 'text';
	export let inputmode = '';
	export let maxlength = 0;
	export let placeholder = '';
	export let autocomplete = 'off';
	export let required = false;
	export let error = '';
	export let step = '';
	export let min = '';
	export let max = '';
	export let disabled = false;

	export let regExpFilter = '';
	export let regExpFlag = '';
	export let width = '';
	export let maxWidth = '';

	export let readOnly = false;
	export let numbersOnly = false;
	export let textOnly = false;
	export let inline = false;
	export let style = '';

	/* LABEL */
	export let label = '';
	export let labelPosition: 'border' | 'normal' = 'border';
	export let labelBold = false;
	export let labelColor = '';

	export let noMargin = false;
	export let autofocus = false;

	export let trim = false;

	const keypressDispatch = (e) => dispatch('keypress', e);

	const onKeypressFunc = (e) => {
		keypressDispatch(e);
		return regExpFilter
			? regExpKeyPressFun(e)
			: numbersOnly || type === 'number'
			? numerosKeyPress(e)
			: textOnly
			? textKeyPress(e)
			: null;
	};

	const regExpKeyPressFun = (e) => {
		let regExp = new RegExp(regExpFilter, regExpFlag);
		if (!regExp.test(e.key)) return e.preventDefault();
	};

	const numerosKeyPress = (e) => {
		if (e.key === '.' && value.toString().includes('.')) return e.preventDefault();
		if (!/^[0-9.]+$/.test(e.key)) return e.preventDefault();
	};

	const textKeyPress = (e) => {
		if (!/^[A-Za-z\s]+$/.test(e.key)) return e.preventDefault();
	};

	let ref;
	let changed = false;
	$: {
		if (changed && value === '') {
			dispatch('clear');
		}
	}

	$: {
		if (ref) {
			ref.type = type;
		}
	}

	const focusInput = () => {
		ref.focus();
	};

	const leftIconClick = () => {
		dispatch('leftIconClick');
	};
	const rightIconClick = () => {
		dispatch('rightIconClick');
	};

	const onKeyUpFunc = (e) => {
		if (e.keyCode === 13) {
			dispatch('enterPress', e);
			return;
		}
		if (trim) {
			const typeOfInput = typeof value;
			value = value.toString().trim();
			if (typeOfInput === 'number') {
				value = Number(value);
			}
		}
		changed = true;
		dispatch('change', value);
	};

	onMount(() => {
		if (autofocus) {
			focusInput();
		}
	});
</script>

<div
	class="z-component zinputcontainer noselect"
	class:inlineflex={inline}
	{style}
	style:margin={noMargin ? 0 : `${labelPosition === 'border' ? 15 : 5}px 0 5px 0`}
	style:max-width={maxWidth}
	style:width
	style:--input-ccolor={color}
	style:--color-error={colorError}
	style:--border-radius={borderRadius}
	on:click={focusInput}
>
	{#if label}
		<div
			class="label label-{labelPosition}"
			class:bold={labelBold}
			class:errorfont-color={error}
			style:color={labelColor}
		>
			{label}
		</div>
	{/if}
	<div class="zinput withBorder" class:disabled class:zinputError={error}>
		{#if leftText || leftIcon}
			<div
				class="zicondiv firsticon"
				class:disabled
				style:color={leftIconColor}
				on:click={leftIconClick}
			>
				{#if leftIcon}
					<Icon name={leftIcon} size={leftIconSize} />
				{:else if leftText}
					{leftText}
				{/if}
			</div>
		{/if}

		<input
			bind:value
			bind:this={ref}
			on:keypress={onKeypressFunc}
			on:keyup={onKeyUpFunc}
			{inputmode}
			{placeholder}
			{autocomplete}
			{name}
			maxlength={maxlength || null}
			id="zinput{name}"
			readonly={readOnly}
			min={min || null}
			max={max || null}
			step={step || null}
			disabled={disabled || null}
			{required}
			style:color={inputTextColor}
			class:inputRange={type === 'range'}
		/>
		{#if rightText || rightIcon}
			<div
				class="zicondiv"
				class:rightmarg={rightText}
				class:rightIconInvertColor={rightIconInvertColor && rightIcon}
				class:disabled
				style:color={rightIconColor}
				on:click={rightIconClick}
			>
				{#if rightIcon}
					<Icon name={rightIcon} size={rightIconSize} />
				{:else if rightText}
					{rightText}
				{/if}
			</div>
		{/if}
	</div>
	{#if error}
		<div class="zerror errorfont-color">{error}</div>
	{/if}
</div>

<style>
	.zinputcontainer {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 5px;
		border-radius: var(--border-radius);
		font-size: 14px;
	}
	.inlineflex {
		display: inline-flex;
	}
	.label {
		padding: 0 5px;
		color: var(--input-ccolor);
		border-radius: 5px 5px 0 0;
	}

	.label-border {
		position: absolute;
		left: 15px;
		transform: translateY(-50%);
		background: white;
		border-width: 1px 1px 0 1px;
		border-style: solid;
		border-color: var(--input-ccolor);
	}
	.label-border:before {
		content: '';
		position: absolute;
		left: -1px;
		top: 53%;
		width: 1px;
		height: 50%;
		background-color: white;
	}
	.label-border:after {
		content: '';
		position: absolute;
		right: -1px;
		top: 53%;
		width: 1px;
		height: 50%;
		background-color: white;
	}
	.label-normal {
		left: 5px;
	}
	.zinput {
		height: 40px;
		border-radius: var(--border-radius);
		border-width: 1px;
		border-style: solid;
		border-color: var(--input-ccolor);
		display: flex;
		align-items: center;
		overflow-x: hidden;
		background: white;
	}

	input {
		resize: none;
		padding: 0 10px;
		border: 0;
		font-size: 14px;
		border-radius: var(--border-radius);
		width: 100%;
		height: 80%;
	}
	input:focus {
		outline: none;
	}
	input::placeholder {
		color: #9fa2a5;
	}
	.inputRange {
		padding: 0px;
	}
	.zicondiv {
		height: 100%;
		aspect-ratio: 1;
		color: var(--input-ccolor);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.firsticon {
		aspect-ratio: auto;
		margin-left: 10px;
	}

	.rightmarg {
		margin-right: 10px;
	}

	.rightIconInvertColor {
		background-color: var(--input-ccolor);
		color: white;
	}
	.zerror {
		font-size: 0.64rem;
		align-self: flex-end;
		padding: 0 10px;
	}
	.errorfont-color {
		color: var(--color-error);
	}
	.zinputError {
		border-color: var(--color-error);
	}
	.disabled {
		background: rgb(241, 241, 241);
		color: #ccc;
		border-radius: var(--border-radius);
	}
	input:disabled {
		background: rgb(241, 241, 241);
		color: #ccc;
	}
</style>
