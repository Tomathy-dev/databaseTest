<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { tableMapperValues, Table } from '@skeletonlabs/skeleton';

	export let data;

	const heading = [
		{ text: 'File', input: 'number', placeholder: 'File...' },
		{ text: 'Matter', input: 'number', placeholder: '1,2' },
		{ text: 'Date', input: 'date' },
		{ text: 'Method', input: 'text', placeholder: 'MB, TRF, ...' },
		{
			text: 'Description',
			input: 'text',
			placeholder: 'Pagamentos à entidade ...'
		},
		{ text: 'Debit', input: 'number', placeholder: '1000' },
		{ text: 'Credit', input: 'number', placeholder: '1000' }
	];

	$: ledger = data.ledger;
	$: bank = data.bank;
	$: table = {
		head: ['File', 'Matter', 'Date', 'Method', 'Description', 'Debit', 'Credit'],
		body: tableMapperValues(ledger, [
			'file',
			'matter',
			'date',
			'transactionMethod',
			'description',
			'debitValue',
			'creditValue'
		])
	};
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
		<!-- <form
			method="POST"
			class="grid grid-cols-[75px_50px_150px_100px_1fr_140px_140px_auto] gap-x-2 py-2"
		>
			{#each heading as h}
				<label for={h.text} class="label">
					<span>{h.text}:</span>
					{#if h.text !== 'Debit' && h.text !== 'Credit'}
						<input
							type={h.input}
							class="input"
							title={h.text}
							placeholder={h.placeholder}
							required
						/>
					{:else}
						<div class="input-group input-group-divider grid-cols-[1fr_auto]">
							<input
								type={h.input}
								class="input"
								title={h.text}
								placeholder={h.placeholder}
								required
							/>
							<div class="input-group-shim">
								<Icon icon="material-symbols:euro" class="text-lg" />
							</div>
						</div>
					{/if}
				</label>
			{/each}
			<button
				class="btn-icon btn-icon-sm variant-filled self-end mb-1"
				type="submit"
				title="Add Transaction"
			>
				<Icon icon="material-symbols:add" class="text-2xl" /></button
			>
		</form> -->
	</div>
	<Table source={table} class="mt-4 mb-4" />
	<div class="table-container">
		<table class="table rounded-b-lg">
			<thead class="table-head">
				<tr>
					{#each heading as h}
						<th>{h.text}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="table-body">
				{#each ledger as l}
					<tr>
						<td>{l.file}</td>
						<td>{l.matter}</td>
						<td>{l.date}</td>
						<td>{l.transactionMethod}</td>
						<td>{l.description}</td>
						<td>{l.debitValue}</td>
						<td>{l.creditValue}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
