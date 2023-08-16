<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
</script>
<!--
<nav
	class="h-full border-r border-surface-100-800-token flex items-center flex-col p-0 {$$props.class}"
>
	<div class="p-2 border-b-2 border-surface-100-800-token">
		<Icon icon="material-symbols:database" class="text-7xl" />
	</div>
	<AppRail background="bg-transparent" width="w-full" active="bg-primary-active-token">
		<AppRailAnchor href="/ledger" selected={$page.url.pathname.split('/')[1] === 'ledger'}>
			<svelte:fragment slot="lead">
				<Icon icon="material-symbols:menu-book" class="text-3xl" />
			</svelte:fragment>
		</AppRailAnchor>
		<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
			<svelte:fragment slot="lead">
				<Icon icon="material-symbols:construction" class="text-3xl" />
			</svelte:fragment>
		</AppRailAnchor>
	</AppRail>
</nav>
-->

<nav class="h-full border-r border-surface-100-800-token grid grid-rows-[auto_1fr] p-0">
	<div id="Navigation" class="px-2 flex flex-col">
		<a id="Dashboard" href="/dashboard" class="item relative mt-2 p-2 rounded-md hover:cursor-pointer {$page.url.pathname.split('/')[1] === 'dashboard' ? 'variant-filled-primary': ''}">
			<Icon icon="material-symbols:space-dashboard-rounded" class="text-3xl" />
		</a>
		<a id="Bank" href="/bank" class="item relative mt-2 p-2 rounded-md hover:cursor-pointer {$page.url.pathname.split('/')[1] === 'bank' ? 'variant-filled-primary': ''}">
			<Icon icon="material-symbols:account-balance-rounded" class="text-3xl" />
		</a>
		<a id="File_List" href="/fileList" class="item relative mt-2 p-2 rounded-md hover:cursor-pointer {$page.url.pathname.split('/')[1] === 'file_list' ? 'variant-filled-primary': ''}">
			<Icon icon="material-symbols:list-alt-outline" class="text-3xl" />
		</a>
	</div>
</nav>
<style>
	.item:hover::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background-color: white;
		opacity: 0.1;
	}
</style>
