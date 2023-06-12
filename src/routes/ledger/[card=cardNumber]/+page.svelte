<script>
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-row p-5 gap-8 items-center">
	<h1 class="text-6xl font-bold">Ledger</h1>
	<div class="flex flex-row items-center">
		<button type="button" class="btn variant-soft-surface px-3">
			<Icon icon="material-symbols:credit-card-outline" class="text-2xl" />
			<span>Change Ledger</span>
		</button>
	</div>
	<div class="grow flex justify-end">
		<button type="button" class="btn bg-gradient-to-br variant-gradient-primary-tertiary h-10 w-60"
			>+ Add Ledger</button
		>
	</div>
</div>
