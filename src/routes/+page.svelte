<script lang="ts">
	let file = '7017-02';
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
		<table class="table table-fixed table-compact mx-9">
			<thead class="border-2 border-slate-500 sticky top-[-2px]">
				<th class="w-24">File</th>
				<th class="w-28">Date</th>
				<th class="w-32">Method</th>
				<th class="w-7/12">Description</th>
				<th>Debit</th>
				<th>Credit</th>
			</thead>
			<tbody>
				{#each Array.from(Array(100).keys()) as i}
					<tr>
						<td
							><input
								bind:value={file}
								type="text"
								class="px-2 focus:ring-2 focus:ring-[#00bcbc]"
							/></td
						>
						<td>16/05/2023</td>
						<td>TRF</td>
						<td>Pagamento dos juros da Autoridade Tributária {i + 1}</td>
						<td>0.00€</td>
						<td>1'000.00€</td>
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
