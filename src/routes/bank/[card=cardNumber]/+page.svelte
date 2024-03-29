<script lang="ts">
	import { beforeNavigate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { fade, scale } from 'svelte/transition';

	export let data;
	let selected: Number[] = [];
	let allselected = false;
	let color_picker = false;
	let addingTransaction = false;
	let exchange = 'Debit';

	const heading = ['File-Matter', 'Date', 'Method', 'Description', 'Debit', 'Credit'];

	function colorPicker() {
		color_picker = !color_picker;
	}

	function selectAll() {
		if (allselected) {
			selected = [];
			allselected = false;
		} else {
			selected = ledger.map((item: any) => item.id);
			allselected = true;
		}
	}

	beforeNavigate(() => sendData());

	function changeColor(color: string) {
		selected.forEach((id: Number) => {
			const obj = data.ledger.find((item: any) => item.id === id);
			if (obj) {
				obj.color = color;
				data = data;
			}
		});
	}

	async function sendData() {
		const response = await fetch('../transaction', {
			method: 'PUT',
			body: JSON.stringify(ledger, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	}

	async function deleteData() {
		const response = await fetch('../transaction', {
			method: 'DELETE',
			body: JSON.stringify(selected),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		selected = [];
		invalidateAll();
	}

	function showBigInt(value: bigint) {
		if (value < BigInt(0)) {
			value = value * BigInt(-1);
			const s = handleDecimals(value);
			let left = s.substring(0, s.length - 2);
			let right = s.substring(s.length - 2);
			left = left.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return left + '.' + right + '€';
		} else {
			const s = handleDecimals(value);
			let left = s.substring(0, s.length - 2);
			let right = s.substring(s.length - 2);
			left = left.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			return left + '.' + right + '€';
		}
	}

	function handleDecimals(value: bigint){
		if(value < BigInt(10)){
			return '00' + value.toString();
		} else if(value < BigInt(100) && value >= BigInt(10)){
			return '0' + value.toString();
		} else {
			return value.toString();
		}
	}

	$: ledger = data.ledger;
	$: bank = data.bank;
</script>

<!-- Modal for adding transactions-->
{#if addingTransaction}
	<div
		class="w-screen h-screen absolute left-0 flex justify-center items-center"
		transition:fade={{ duration: 100 }}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="w-full h-full left-0 absolute z-[998] bg-black/60"
			on:click={() => (addingTransaction = false)}
		/>
		<div class="relative card p-4 z-[999] w-[80%]">
			<button
				type="button"
				class="btn-icon variant-filled absolute right-0 top-0 translate-x-[50%] translate-y-[-50%]"
				on:click={() => (addingTransaction = false)}
				on:keypress
			>
				<Icon icon="material-symbols:close-rounded" class="text-3xl" />
			</button>
			<h3 class="h3 text-2xl font-bold pb-8">{bank.name} - {$page.params.card}</h3>
			<form method="POST" action="?/addTransaction">
				<div class="grid grid-cols-3 grid-rows-3 gap-2">
					<div class="flex flex-col gap-2">
						<label for="file">File</label>
						<input type="text" name="file" id="file" placeholder="1001-01" class="input" />
					</div>
					<div class="flex flex-col gap-2">
						<label for="date">Date</label>
						<input type="date" name="date" id="date" class="input" />
					</div>
					<div class="flex flex-col gap-2">
						<label for="method">Method</label>
						<input type="text" name="method" id="method" class="input" />
					</div>
					<div class="col-span-2 flex flex-col gap-2">
						<label for="description">Description</label>
						<input type="text" name="description" id="description" class="input" />
					</div>
					<div class="flex flex-col gap-2">
						<label for="credit">Value (€)</label>
						<input type="number" name="value" id="value" class="input" step=".01" min="0"/>
					</div>
					<div class="row-start-3 col-start-3 flex flex-row gap-2">
						<span
							class="w-[50%] h-[50%] chip {exchange === 'Debit'
								? 'variant-filled-primary'
								: 'variant-ringed-primary'}"
							on:click={() => {
								exchange = 'Debit';
							}}
							on:keypress
						>
							<span class="text-md">Debit</span>
						</span>
						<span
							class="w-[50%] h-[50%] chip {exchange === 'Credit'
								? 'variant-filled-primary'
								: 'variant-ringed-primary'}"
							on:click={() => {
								exchange = 'Credit';
							}}
							on:keypress
						>
							<span class="text-md">Credit</span>
						</span>
					</div>
					<input type="hidden" name="exchange" bind:value={exchange} />
					<input type="hidden" name="bank" value={bank.name} />
					<div class="col-start-2 flex flex-row p-4 gap-4 items-center justify-center">
						<button type="submit" class="btn bg-primary-500">+ Add Transaction</button>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}

<!--Screen-->
<div class="p-5 flex flex-col relative translate-x-0">

	<!--Header-->
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

	<!--SubHeader-->
	<div class="mt-6 w-full flex card flex-row px-4">
		<h3 class="h3 text-4xl font-bold py-4">{bank.name} - {$page.params.card}</h3>
		<div class="flex flex-row gap-4 items-center grow justify-end">
			<span class="text-xl">Balance:</span>
			<span class="text-3xl font-bold">{showBigInt(bank.totalValue)}</span>
		</div>
	</div>

	<!--Start of table-->
	<!--Sticky part of table-->
	<div
		class="bg-surface-200-700-token px-2 py-2 sticky top-0 grid grid-cols-[1fr_2fr_1fr] mt-6 rounded-t-md mb-[-5px]"
	>

		<!-- Permanent Buttons -->
		<div class="flex gap-2">
			<button
			type="button"
			class="btn-icon hover:variant-filled-surface"
			on:click={() => (addingTransaction = true)}
			>
			<Icon icon="material-symbols:add-circle-outline" class="text-3xl" />
			</button>
			<button type="button" class="btn-icon hover:variant-filled-surface" on:click={sendData}>
				<Icon icon="material-symbols:save" class="text-3xl" />
			</button>
			<button type="button" class="btn-icon hover:variant-filled-surface" aria-label="Filter Transactions">
				<Icon icon="material-symbols:filter-alt-sharp" class="text-3xl" />
			</button>
		</div>
		

		<div class="flex gap-2 justify-center items-center">
			<!--Search Bar-->
			<form action="/search" class="flex w-100 right-0">
				<div class="input-group input-group-divider grid-cols-[1fr_3fr_auto]">
					<select name="filter" id="filter" class="select">
						<option value="file">File</option>
						<option value="date">Date</option>
						<option value="method">Method</option>
						<option value="description">Description</option>
						<option value="value">Value</option>
					</select>
					<input type="text" name="file" class="input rounded-r-none" placeholder="File..." />
					<button type="button" class="btn variant-filled-tertiary rounded-l-none text-xl">
						<span><Icon icon="material-symbols:search" /></span>
					</button>
				</div>
			</form>
		</div>

		<!-- Selected Buttons and Search Bar -->
		<div class="flex gap-2 justify-end relative">
			{#if selected.length > 0}
			<!--Deselect-->
				<button
					type="button"
					class="btn-icon hover:variant-filled-surface relative"
					transition:scale={{ duration: 200, start: 0 }}
					on:click={() => {selected = []; allselected = false}}
				>
					<Icon icon="material-symbols:remove-selection" class="text-3xl" />
				</button>

				<!--Color Transactions-->
				<div class="absolute left-0">
					<button
						type="button"
						class="btn-icon hover:variant-filled-surface relative"
						transition:scale={{ duration: 200, start: 0 }}
						on:click={colorPicker}
					>
						<Icon icon="material-symbols:border-color" class="text-3xl" />
					</button>
					{#if color_picker}
						<span
							class="absolute w-5 h-5 bg-surface-900 rotate-45 left-[50%] translate-x-[-50%] bottom-[-50%]"
							transition:scale={{ duration: 200, start: 0 }}
						/>
						<div
							class="absolute left-[50%] top-[120%] bg-surface-900 rounded-[4px] p-4 translate-x-[-50%] flex flex-row gap-4"
							transition:scale={{ duration: 200, start: 0 }}
						>
							<button on:click={() => changeColor('primary')}>
								<svg
									width="30"
									height="30"
									xmlns="http://www.w3.org/2000/svg"
									class="cursor-pointer"
								>
									<circle cx="15" cy="15" r="15" fill="#008585" />
									<!-- primary -->
								</svg>
							</button>
							<button on:click={() => changeColor('secondary')}>
								<svg
									width="30"
									height="30"
									xmlns="http://www.w3.org/2000/svg"
									class="cursor-pointer"
								>
									<circle cx="15" cy="15" r="15" fill="#4f46e5" />
									<!-- secondary -->
								</svg>
							</button>
							<button on:click={() => changeColor('tertiary')}>
								<svg
									width="30"
									height="30"
									xmlns="http://www.w3.org/2000/svg"
									class="cursor-pointer"
								>
									<circle cx="15" cy="15" r="15" fill="#0ea5e9" />
									<!-- tertiary -->
								</svg>
							</button>
							<button on:click={() => changeColor('success')}>
								<svg
									width="30"
									height="30"
									xmlns="http://www.w3.org/2000/svg"
									class="cursor-pointer"
								>
									<circle cx="15" cy="15" r="15" fill="#21c700" />
									<!-- success -->
								</svg>
							</button>
							<button on:click={() => changeColor('warning')}>
								<svg
									width="30"
									height="30"
									xmlns="http://www.w3.org/2000/svg"
									class="cursor-pointer"
								>
									<circle cx="15" cy="15" r="15" fill="#eab308" />
									<!-- warning -->
								</svg>
							</button>
							<button on:click={() => changeColor('error')}>
								<svg
									width="30"
									height="30"
									xmlns="http://www.w3.org/2000/svg"
									class="cursor-pointer"
								>
									<circle cx="15" cy="15" r="15" fill="#d41976" />
									<!-- error -->
								</svg>
							</button>
							<button on:click={() => changeColor('noColor')}>
								<Icon icon="material-symbols:block" class="text-[30px] cursor-pointer" />
								<!-- noColor -->
							</button>
						</div>
					{/if}
				</div>

				<!--Delete-->
				<button
					type="button"
					class="btn-icon hover:variant-filled-error"
					transition:scale={{ duration: 200, start: 0 }}
					on:click={deleteData}
					on:keypress
				>
					<Icon icon="material-symbols:delete-outline" class="text-3xl" />
				</button>
			{/if}

		</div>

		

	</div>

	<!-- Transaction Table -->
	<div class="table-container">
		<table class="table table-hover rounded-b-lg overflow-x-auto table-auto">
			<thead class="table-head">
				<tr>
					<th class="text-center"
						><input
							type="checkbox"
							class="checkbox w-6 h-6 bg-surface-50-900-token"
							on:click={selectAll}
							on:keydown={selectAll}
							bind:checked={allselected}
						/></th
					>
					{#each heading as h}
						<th>{h}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="table-body">
				{#each ledger as l}
					<tr id={l.color} class="hover:cursor-pointer">
						<td class="text-center"
							><input type="checkbox" class="checkbox" bind:group={selected} value={l.id} /></td
						>
						<td>{l.file} - {l.matter}</td>
						<td
							>{l.date.getDate() >= 10
								? l.date.getDate()
								: '0' + l.date.getDate()}.{l.date.getMonth() + 1 >= 10
								? l.date.getMonth() + 1
								: '0' + (l.date.getMonth() + 1)}.{l.date.getFullYear()}</td
						>
						<td>{l.transactionMethod}</td>
						<td>{l.description}</td>
						<td>
							{#if l.value > 0n}
								-
							{:else}
								{showBigInt(l.value)}
							{/if}
						</td>
						<td>
							{#if l.value < 0n}
								-
							{:else}
								{showBigInt(l.value)}
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	#primary {
		background-color: rgb(var(--color-primary-500) / 0.5) !important;
	}

	#secondary {
		background-color: rgb(var(--color-secondary-500) / 0.5) !important;
	}

	#tertiary {
		background-color: rgb(var(--color-tertiary-500) / 0.5) !important;
	}

	#success {
		background-color: rgb(var(--color-success-500) / 0.5) !important;
	}

	#warning {
		background-color: rgb(var(--color-warning-500) / 0.5) !important;
	}

	#error {
		background-color: rgb(var(--color-error-500) / 0.5) !important;
	}
</style>
