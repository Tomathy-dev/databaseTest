<script>
	import { fly, fade } from 'svelte/transition';
	let visible = false;
	let w = 0;

	const activate = () => {
		visible = true;
	};
</script>

<div class="wrapper">
	<div class="information">
		<div class="name">1001 - 02</div>
		<div class="money_amount">000'000€</div>
		<div class="searchabar">Search...</div>
	</div>
	<button on:click={activate} class="btn btn-circle"
		><iconify-icon icon="ri:add-fill" width="45px" /></button
	>
	<table>
		<thead>
			<th>Id</th>
			<th>Date</th>
			<th>Method</th>
			<th>Description</th>
			<th>Caixa Geral de Depósitos</th>
			<th>Novo Banco</th>
			<th>BPI</th>
		</thead>
	</table>
</div>
{#if visible}
	<div class="overflow-hidden w-full h-full absolute top-0 left-0">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="modalme" on:click={() => (visible = false)} transition:fade={{ duration: 200 }}>
			<button on:click={() => (visible = false)} style="position: absolute;">Close</button>
		</div>
		<div
			class="form"
			bind:clientWidth={w}
			style="width: 40%;"
			transition:fly={{ x: w, duration: 400, opacity: 1 }}
		/>
	</div>
{/if}

<style>
	.wrapper {
		width: 100%;
		height: 100%;
	}

	.information {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 20%;
		border-bottom: 1px solid grey;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		border-bottom: 1px solid grey;
		border-top: 1px solid grey;
		height: 35px;
	}

	.modalme {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		overflow: hidden;
	}

	.form {
		position: absolute;
		right: 0;
		top: 0;
		background-color: white;
		height: 100%;
	}
</style>
