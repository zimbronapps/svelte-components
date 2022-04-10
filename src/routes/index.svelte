<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import CustomMenu from '$lib/components/CustomMenu.svelte';
	import CustomMenuItem from '$lib/components/CustomMenuItem.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let show = false;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="contenedor">
	<Button on:click={() => (show = true)}>Show Hide</Button>

	<CustomMenu>
		<CustomMenuItem>Algo</CustomMenuItem>
	</CustomMenu>
</div>

{#if show}
	<Modal on:close={() => (show = false)}>Algo aqui</Modal>
{/if}

<style>
	.contenedor {
		margin: 0 auto;
		width: 600px;
		background-color: #f1f1f1;
		padding: 20px;
	}
</style>
