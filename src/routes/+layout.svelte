<script>
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
	import 'iconify-icon';
</script>

<div class="body">
	<div>
		<Nav />
	</div>
	<div>
		<slot />
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Ubuntu', sans-serif;
		font-weight: normal;
	}

	.body {
		display: grid;
		grid-template-columns: 75px 1fr;
	}
</style>
