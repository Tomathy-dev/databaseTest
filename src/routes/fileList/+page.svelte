<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let data;

	$: files = data.files;
</script>

<div class="p-5 flex flex-col relative translate-x-0">
	<div class="flex flex-row gap-8 items-center pb-4">
		<h1 class="text-6xl font-bold">Files List</h1>
		<form action="/fileList" class="input-group w-96 input-group-divider grid-cols-[auto_1fr_auto]">
			<select name="filter" id="filter" class="select">
				<option value="file">File</option>
				<option value="name">Name</option>
				<option value="date">Date</option>
				<option value="department">Department</option>
				<option value="inCharge">In Charge</option>
			</select>
			<input type="text" class="input">
			<button type="submit" class="variant-filled-primary"><Icon icon="material-symbols:search" /></button>
		</form>
	</div>
	<div class="file-wrapper">
		{#each files as file}
			{#each file.matters as matter, i}
				<a href="/fileList/{matter.fileId}/{matter.matter}" class="flex flex-col hover:bg-surface-700 rounded-md p-2 relative">
					<span class="text-primary-400-500-token text-4xl font-extrabold pb-2">{file.id}-{matter.matter}</span><span>{matter.openDate}</span>
					<span class="text-sm">{file.name} - {matter.department} - {matter.inCharge}</span>
					<span class="text-2xl absolute right-[0.5rem] top-[50%] translate-y-[-50%] font-bold">{matter.balance}€</span>
				</a>
			{/each}
		{/each}
	</div>
</div>

<style>
	.file-wrapper a:nth-child(odd) {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.file-wrapper a:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

</style>