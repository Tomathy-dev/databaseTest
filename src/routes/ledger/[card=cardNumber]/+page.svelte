<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { scale } from 'svelte/transition';

	export let data;
	let selected: Number[] = [];
	let allselected = false;
	const options = ['variant-filled-success', 'variant-filled-warning', 'variant-filled-error'];

	const heading = ['File', 'Matter', 'Date', 'Method', 'Description', 'Debit', 'Credit'];

	function selectAll() {
		if (allselected) {
			selected = [];
			allselected = false;
		} else {
			selected = ledger.map((item) => item.id);
			allselected = true;
		}
	}

	$: ledger = data.ledger;
	$: bank = data.bank;
</script>

<div class="p-5 flex flex-col relative translate-x-0">
	<div class="flex flex-row gap-8 items-center">
		<h1 class="text-6xl font-bold">Ledger</h1>
		<div class="flex flex-row items-center">
			<button type="button" class="btn variant-soft-surface px-3 h-10">
				<Icon icon="material-symbols:swap-horiz" class="text-2xl" />
				<span>Change Ledger</span>
			</button>
		</div>
		<div class="grow flex justify-end">
			<button type="button" class="btn bg-secondary-500 h-10 w-60">+ Add Ledger</button>
		</div>
	</div>
	<div class="mt-6 w-full flex card flex-row px-4">
		<h3 class="h3 text-4xl font-bold py-4">{bank.name} - {$page.params.card}</h3>
		<div class="flex flex-row gap-4 items-center grow justify-end">
			<span class="text-xl">Balance:</span>
			<span class="text-3xl font-bold">{bank.totalValue}€</span>
		</div>
	</div>
	<div
		class="bg-surface-200-700-token px-2 py-2 sticky top-0 grid grid-cols-[1fr_auto] mt-6 rounded-t-md"
	>
		<!-- Permanent Buttons -->
		<div class="flex gap-2">
			<button type="button" class="btn-icon hover:variant-filled-surface">
				<Icon icon="material-symbols:add-circle-outline" class="text-3xl" />
			</button>
			<button type="button" class="btn-icon hover:variant-filled-surface">
				<Icon icon="material-symbols:refresh" class="text-3xl" />
			</button>
			<button type="button" class="btn-icon hover:variant-filled-surface">
				<Icon icon="material-symbols:filter-alt-sharp" class="text-3xl" />
			</button>
		</div>
		<div class="flex gap-2">
			<!-- Selected Buttons and Search Bar -->
			{#if selected.length > 0}
				<button
					type="button"
					class="btn-icon hover:variant-filled-surface"
					transition:scale={{ duration: 200, start: 0 }}
				>
					<Icon icon="material-symbols:border-color" class="text-3xl" />
				</button>
				<button
					type="button"
					class="btn-icon hover:variant-filled-surface"
					transition:scale={{ duration: 200, start: 0 }}
				>
					<Icon icon="material-symbols:delete-outline" class="text-3xl" />
				</button>
			{/if}
			<form action="/search" class="flex w-96 right-0">
				<div class="input-group input-group-divider grid-cols-[3fr_1fr_auto]">
					<input type="text" name="file" class="input rounded-r-none" placeholder="File..." />
					<input type="text" name="matter" class="input rounded-l-none" placeholder="Matter..." />
					<button type="button" class="btn variant-filled-tertiary rounded-l-none text-xl">
						<span><Icon icon="material-symbols:search" /></span>
					</button>
				</div>
			</form>
		</div>
	</div>
	<div class="table-container">
		<table class="table table-interactive rounded-b-lg overflow-x-auto">
			<thead class="table-head">
				<tr>
					<th class="text-center"
						><input
							type="checkbox"
							class="checkbox w-6 h-6"
							on:click={selectAll}
							on:keydown={selectAll}
						/></th
					>
					{#each heading as h}
						<th>{h}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="table-body">
				{#each ledger as l}
					<tr id="variant-filled-success">
						<td class="text-center"
							><input type="checkbox" class="checkbox" bind:group={selected} value={l.id} /></td
						>
						<td>{l.file}</td>
						<td>{l.matter}</td>
						<td>{l.date}</td>
						<td>{l.transactionMethod}</td>
						<td>{l.description}</td>
						<td>
							{#if l.debitValue === null}
								-
							{:else}
								{l.debitValue}
							{/if}
						</td>
						<td>
							{#if l.creditValue === null}
								-
							{:else}
								{l.creditValue}
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
