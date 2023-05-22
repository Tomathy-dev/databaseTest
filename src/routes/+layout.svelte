<script>
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
	import 'iconify-icon';
</script>

<div class="body">
	<Nav />
	<slot />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

	:global(body, html) {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
		font-weight: normal;
		height: 100vh;
	}

	.body {
		display: grid;
		grid-template-columns: 75px 1fr;
		height: 100%;
		overflow: hidden;
	}
</style>
