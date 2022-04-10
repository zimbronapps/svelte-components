<script lang="ts">
	import { colors } from '$lib/constants';

	export let color = colors.primary;
	export let size = '80px';
	export let dotsPerLine = 4;
	export let totalLines = 4;
	let total = Array(dotsPerLine * totalLines);
</script>

<div
	class="loader z-component"
	style:--dotsPerLine={dotsPerLine}
	style:width={size}
	style:--color={color}
	style:aspect-ratio={dotsPerLine / totalLines}
>
	{#each total as _, i}
		<div style:animation-delay={`${Math.random() * -2}s`} />
	{/each}
</div>

<style>
	.loader {
		margin: auto;
		display: grid;
		grid-template-columns: repeat(var(--dotsPerLine), 1fr);
		gap: 10%;
	}
	.loader div {
		width: 100%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color);
		animation: lds-grid 1.3s linear infinite;
	}

	@keyframes lds-grid {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.2;
		}
	}
</style>
