<script>
	import Nav from '$lib/components/Nav.svelte';
	import Icon from '@iconify/svelte';
	// Your selected Skeleton theme:
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { AppShell, Modal } from '@skeletonlabs/skeleton';
</script>

<Modal />

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<Nav class="w-[90px]" />
	</svelte:fragment>
	<slot />
</AppShell>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

	:global(body, html) {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
		font-weight: normal;
		height: 100vh;
	}

	:global(::-webkit-scrollbar) {
		width: 7px;
	}

	:global(::-webkit-scrollbar-track) {
		background: none;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: rgba(153, 153, 153, 0.474);
		border-radius: 9999px;
	}
</style>
