<script>
	import Nav from '$lib/components/Nav.svelte';

	// Your selected Skeleton theme:
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { AppShell, Drawer, Modal } from '@skeletonlabs/skeleton';
	import SearchFiles from '$lib/components/SearchFiles.svelte';
</script>

<Modal />
<Drawer />

<AppShell>
	<svelte:fragment slot="header">
		<div class="grid grid-cols-[auto_350px] p-2 shadow-md">
			<div class="flex items-center">
				<span class="title text-3xl">EDGE DATABASE</span>
			</div>
			<SearchFiles/>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Nav />
	</svelte:fragment>
	<slot />
</AppShell>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

	:global(body, html) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', sans-serif;
		font-weight: normal;
		height: 100vh;
	}

	:global(::-webkit-scrollbar) {
		width: 10	px;
	}

	:global(::-webkit-scrollbar-track) {
		background: none;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: rgba(153, 153, 153, 0.474);
		border-radius: 9999px;
	}

	:global(input::-webkit-outer-spin-button, input::-webkit-inner-spin-button) {
		-webkit-appearance: none;
		margin: 0;
	}

	:global(input[type='number']) {
		appearance: textfield;
		-moz-appearance: textfield;
	}

.title{
	font-family: 'Readex Pro', sans-serif;
	font-weight: 500;
}
</style>
