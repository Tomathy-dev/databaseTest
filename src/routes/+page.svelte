<script lang="ts">
	import type { PageServerData } from './$types';
	import type { TempTransaction } from '$lib/utils/utils';
	import { invalidateAll } from '$app/navigation';

	export let data: PageServerData;

	let newTransactions: TempTransaction[] = []; // Transactions that have been added
	let indexChanged: number[] = []; // Indexes of transactions that have been changed
	let selectedTransactions: number[] = []; // Indexes of transactions that have been selected
	let allSelected = false; // If all transactions have been selected

	function createTransactionsChanged(): TempTransaction[] {
		let transactionsChanged: TempTransaction[] = [];
		for (let i = 0; i < indexChanged.length; i++) {
			const index = indexChanged[i];
			const transaction = data.transactions.find((t) => t.id === index);
			if (transaction !== undefined) {
				transactionsChanged.push({
					id: transaction.id,
					file: transaction.file,
					matter: transaction.matter,
					date: transaction.date,
					transactionMethod: transaction.transactionMethod,
					description: transaction.description,
					debitValue: transaction.debitValue,
					creditValue: transaction.creditValue
				});
			}
		}
		return transactionsChanged;
	}

	function addTransaction() {
		transactions = [
			{
				id: NaN,
				file: NaN,
				matter: NaN,
				date: '',
				transactionMethod: '',
				description: '',
				debitValue: null,
				creditValue: null,
				bank: ''
			},
			...transactions
		];
	}

	async function saveChanges() {
		const transactionsChanged = createTransactionsChanged();
		const obj = {
			changed: transactionsChanged,
			created: newTransactions
		};
		const response = await fetch('/api/transactions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		});
		invalidateAll();
		return response;
	}

	function selectAll() {
		if (allSelected) {
			selectedTransactions = [];
		} else {
			selectedTransactions = data.transactions.map((t) => t.id);
		}
		allSelected = !allSelected;
	}

	$: ({ transactions } = data);
</script>

<div class="grid grid-rows-[100px_1fr] grid-cols-1 overflow-auto">
	<div class="w-full border-b-[1px] border-slate-500 h-full flex items-center p-8 relative">
		<h1 class="text-6xl font-bold">Ledger</h1>
		<select class="ml-5 mt-2 border rounded-2xl text-slate-200 bg-transparent">
			<option value="CGD" class="text-slate-950">CGD - **** **** **** 3456</option>
			<option value="BPI" class="text-slate-950">BPI - **** **** **** 9876</option>
			<option value="NB" class="text-slate-950">NB - **** **** **** 1029</option>
		</select>
		<button class="btn bg-[#00bcbc] ml-5 min-h-min h-10 mt-2 text-white hover:bg-[#0aa4a4]"
			>+ Add New Ledger</button
		>
		<div class="right-0 w-3/12 bg-slate-600 absolute h-full flex items-center justify-center">
			<h1 class="text-7xl">10.000€</h1>
		</div>
	</div>
	<div class="flex h-full overflow-auto w-full flex-col">
		<div class="mx-9 mt-9 mb-3 flex flex-row gap-1">
			<form action="/search" class="m-0 flex">
				<input
					type="text"
					class="border-2 bg-transparent border-slate-500 rounded-2xl px-2 py-1 focus:ring-[#00bcbc] focus:border-[#00bcbc] transition-all duration-100"
					placeholder="Search file..."
				/>
			</form>
			<button
				class="flex justify-center items-center p-2 hover:cursor-pointer hover:bg-slate-900 rounded-full ml-2 transition-all duration-100"
				on:click={addTransaction}
				on:keypress={addTransaction}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512"
					><path d="M448 224H288V64h-64v160H64v64h160v160h64V288h160z" fill="currentColor" /></svg
				>
			</button>
			<button
				class="flex justify-center items-center p-2 hover:cursor-pointer hover:bg-slate-900 rounded-full ml-2 transition-all duration-100"
				on:click={saveChanges}
				on:keypress={saveChanges}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512"
					><path
						d="M362.7 64h-256C83 64 64 83.2 64 106.7v298.7c0 23.5 19 42.7 42.7 42.7h298.7c23.5 0 42.7-19.2 42.7-42.7v-256L362.7 64zM256 405.3c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64zM320 192H106.7v-85.3H320V192z"
						fill="currentColor"
					/></svg
				>
			</button>
		</div>
		<table class="table table-compact mx-9">
			<thead class="border-2 border-slate-500 sticky top-0">
				<tr>
					<th class="p-2 w-20">
						<input
							type="checkbox"
							class="checkbox checkbox-success w-5 h-5 rounded-md bg-slate-500 border-slate-100 focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0"
							on:click={selectAll}
						/>
					</th>
					<th class="p-2 w-[6%]">File</th>
					<th class="p-2">Matter</th>
					<th class="p-2">Date</th>
					<th class="p-2 w-[8%]">Method</th>
					<th class="p-2 w-[55%]">Description</th>
					<th class="p-2 w-[8%]">Debit (€)</th>
					<th class="p-2 w-[8%]">Credit (€)</th>
				</tr>
			</thead>
			<tbody>
				{#each newTransactions as t}
					<tr class="hover:bg-slate-900/90">
						<td class="text-center">
							<input
								type="checkbox"
								class="checkbox checkbox-success w-5 h-5 rounded-md bg-slate-500 border-slate-200 focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0"
								bind:group={selectedTransactions}
								value={t.id}
							/>
						</td>
						<td>
							<input
								bind:value={t.file}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-center"
							/>
						</td>
						<td>
							<input
								bind:value={t.matter}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-center"
							/>
						</td>
						<td>
							<input
								bind:value={t.date}
								type="date"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td>
							<input
								bind:value={t.transactionMethod}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td>
							<input
								bind:value={t.description}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td class="relative">
							<input
								bind:value={t.debitValue}
								on:input={() => (t.creditValue = null)}
								type="number"
								step="0.01"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-right"
							/>
						</td>
						<td class="relative">
							<input
								bind:value={t.creditValue}
								on:input={() => (t.debitValue = null)}
								type="number"
								step="0.01"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-right"
							/>
						</td>
					</tr>
				{/each}
				{#each transactions as t}
					<tr>
						<td class="text-center">
							<input
								type="checkbox"
								class="checkbox checkbox-success w-5 h-5 rounded-md bg-slate-500 border-slate-200 focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0"
								bind:group={selectedTransactions}
								value={t.id}
							/>
						</td>
						<td>
							<input
								bind:value={t.file}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-center"
							/>
						</td>
						<td>
							<input
								bind:value={t.matter}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-center"
							/>
						</td>
						<td>
							<input
								bind:value={t.date}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								type="date"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td>
							<input
								bind:value={t.transactionMethod}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td>
							<input
								bind:value={t.description}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/>
						</td>
						<td class="z-0">
							<input
								bind:value={t.debitValue}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								on:input={() => (t.creditValue = null)}
								type="number"
								step="0.01"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-right"
							/>
						</td>
						<td class="z-0">
							<input
								bind:value={t.creditValue}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								on:input={() => (t.debitValue = null)}
								type="number"
								step="0.01"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-right"
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<form method="POST">
			<label>
				Search:
				<input type="text" name="q" />
			</label>
		</form>
	</div>
</div>

<style>
	th {
		border: 2px solid rgb(100, 116, 139);
	}
	td {
		font-size: 1rem;
		border: 1px solid rgb(100, 116, 139);
		padding: 0;
	}
	table input[type='text'],
	input[type='date'],
	input[type='number'] {
		width: 100%;
		height: 100%;
		border: none;
		background-color: transparent;
		cursor: pointer;
	}

	table input[type='text'],
	input[type='number'] {
		cursor: text;
	}

	tr:hover td,
	tr:focus-within td {
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
