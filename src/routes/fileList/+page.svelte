<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let data;

	$: files = data.files;
</script>

<div class="p-5 flex flex-col relative translate-x-0">
	<div class="flex flex-row gap-8 items-center">
		<h1 class="text-6xl font-bold">Files List</h1>
	</div>
	{#each files as file}
		<div class="flex flex-col">
			<span class="text-primary-400-500-token text-2xl">{file.id}</span>
			<span class="text-lg">{file.name}</span>
		</div>
	{/each}
</div>
