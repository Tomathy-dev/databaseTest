<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let indexChanged: Number[] = [];

	$: ({ transactions } = data);
</script>

<div class="grid grid-rows-[128px_1fr] grid-cols-1 overflow-auto">
	<div class="w-full border-b-[1px] border-slate-500 h-full flex items-center p-8 relative">
		<h1 class="text-6xl font-bold">Ledger</h1>
		<select class="ml-5 mt-2 border rounded-2xl text-slate-200 bg-transparent">
			<option value="CGD" class="text-slate-950">CGD - **** **** **** 3456</option>
			<option value="BPI" class="text-slate-950">BPI - **** **** **** 9876</option>
			<option value="NB" class="text-slate-950">NB - **** **** **** 1029</option>
		</select>
		<button class="btn btn-accent ml-5 min-h-min h-10 mt-2">+ Add New Ledger</button>
		<div class="right-0 w-3/12 bg-slate-600 absolute h-full flex items-center justify-center">
			<h1 class="text-7xl">10.000€</h1>
		</div>
	</div>
	<div class="flex h-full overflow-auto w-full flex-col">
		<div class="mx-9 mt-9 mb-3 flex flex-row">
			<form action="/search">
				<input
					type="text"
					class="border-2 bg-transparent border-slate-500 rounded-2xl px-2 py-1 focus:ring-2 focus:ring-[#00bcbc] focus:border-transparent transition-all duration-100"
					placeholder="Search file..."
				/>
			</form>
			<img src="/add.svg" alt="Add icon" style="width: 40px" />
		</div>
		<table class="table table-compact mx-9 ">
			<thead class="border-2 border-slate-500 sticky top-0">
				<tr class="z-0">
					<th class="p-2 w-20">File</th>
					<th class="p-2 w-20">Matter</th>
					<th class="p-2 w-28">Date</th>
					<th class="p-2 w-32">Method</th>
					<th class="p-2 w-7/12">Description</th>
					<th>Debit</th>
					<th>Credit</th>
				</tr>
			</thead>
			<tbody>
				{#each transactions as t}
					<tr
						class="hover:outline-2 hover:outline-[#00bcbc] hover:outline transition-colors duration-200"
					>
						<td>
							<input
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								bind:value={t.matterFileId}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td>
							<input
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								bind:value={t.matterMatter}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td>
							<input
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								bind:value={t.date}
								type="date"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td>
							<input
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								bind:value={t.transactionMethod}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td>
							<input
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								bind:value={t.description}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						{#if t.transactionType === 'DEBIT'}
							<td>{t.value}</td>
							<td>--</td>
						{:else}
							<td>--</td>
							<td>{t.value}</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	th {
		border: 2px solid rgb(100, 116, 139);
	}
	td {
		font-size: 1rem;
		border-left: 1px solid rgb(100, 116, 139);
		border-right: 1px solid rgb(100, 116, 139);
		border-bottom: 1px solid rgb(100, 116, 139);
		padding: 0;
	}
	table input {
		width: 100%;
		height: 100%;
		border: none;
		background-color: transparent;
	}
</style>
