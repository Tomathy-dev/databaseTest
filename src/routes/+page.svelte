<script lang="ts">
	import type { PageServerData } from './$types';
	import IoMdAdd from 'svelte-icons/io/IoMdAdd.svelte';
	import IoIosSave from 'svelte-icons/io/IoIosSave.svelte';

	export let data: PageServerData;

	/**
	 * Transaction type for creating object to be sent to server for update
	 */
	type TempTransaction = {
		id: number | null;
		file: number | null;
		matter: number | null;
		date: string;
		transactionMethod: string;
		description: string;
		debitValue: number | null;
		creditValue: number | null;
	};

	let newTransactions: TempTransaction[] = []; // Transactions that have been added
	let indexChanged: number[] = []; // Indexes of transactions that have been changed

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

	function onlyNumbers(event: Event) {
		if (event !== undefined && event.target !== null) {
			if (event.target instanceof HTMLInputElement) {
				event.target.value = event.target.value.replace(/[^0-9.]/g, '');
			}
		}
	}

	function addTransaction() {
		newTransactions = [
			{
				id: null,
				file: null,
				matter: null,
				date: '',
				transactionMethod: '',
				description: '',
				debitValue: null,
				creditValue: null
			},
			...newTransactions
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
		return response;
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
		<div class="mx-9 mt-9 mb-3 flex flex-row">
			<form action="/search">
				<input
					type="text"
					class="border-2 h-10 bg-transparent border-slate-500 rounded-2xl px-2 py-1 focus:ring-2 focus:ring-[#00bcbc] focus:border-transparent transition-all duration-100"
					placeholder="Search file..."
				/>
			</form>
			<div class="flex flex-row items-center">
				<div
					class="w-10 h-10 hover:cursor-pointer hover:bg-slate-900 rounded-full ml-2 transition-all duration-100"
					on:click={addTransaction}
					on:keypress={addTransaction}
				>
					<IoMdAdd />
				</div>
				<div
					class="w-10 h-10 hover:cursor-pointer hover:bg-slate-900 rounded-full ml-2 transition-all duration-100 p-1"
					on:click={saveChanges}
					on:keypress={saveChanges}
				>
					<IoIosSave />
				</div>
			</div>
		</div>
		<table class="table table-compact mx-9 ">
			<thead class="border-2 border-slate-500 sticky top-0">
				<tr class="z-0">
					<th class="p-2 w-[6%]">File</th>
					<th class="p-2">Matter</th>
					<th class="p-2">Date</th>
					<th class="p-2 w-[8%]">Method</th>
					<th class="p-2 w-[60%]">Description</th>
					<th class="p-2 w-[8%]">Debit</th>
					<th class="p-2 w-[8%]">Credit</th>
				</tr>
			</thead>
			<tbody>
				{#each newTransactions as t}
					<tr class="hover:bg-slate-900/90">
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
								on:input={onlyNumbers}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-right"
							/>
							{#if t.debitValue !== null}
								<span class="absolute left-[5px] top-1/2 translate-y-[-50%]">€</span>
							{/if}
						</td>
						<td class="relative">
							<input
								bind:value={t.creditValue}
								on:input={() => (t.debitValue = null)}
								on:input={onlyNumbers}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-right"
							/>
							{#if t.creditValue !== null}
								<span class="absolute left-[5px] top-1/2 translate-y-[-50%]">€</span>
							{/if}
						</td>
					</tr>
				{/each}
				{#each transactions as t}
					<tr>
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
						<td class="relative">
							<input
								bind:value={t.debitValue}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								on:input={() => (t.creditValue = null)}
								on:input={onlyNumbers}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-right"
							/>
							{#if t.debitValue !== null}
								<span class="absolute left-[5px] top-1/2 translate-y-[-50%]">€</span>
							{/if}
						</td>
						<td class="relative">
							<input
								bind:value={t.creditValue}
								on:change|once={() => {
									if (!indexChanged.includes(t.id)) indexChanged.push(t.id);
								}}
								on:input={() => (t.debitValue = null)}
								on:input={onlyNumbers}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc] text-right"
							/>
							{#if t.creditValue !== null}
								<span class="absolute left-[5px] top-1/2 translate-y-[-50%]">€</span>
							{/if}
						</td>
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
		border: 1px solid rgb(100, 116, 139);
		padding: 0;
	}
	table input {
		width: 100%;
		height: 100%;
		border: none;
		background-color: transparent;
		cursor: pointer;
	}

	table input:focus {
		cursor: text;
	}

	tr:hover td,
	tr:focus-within td {
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
