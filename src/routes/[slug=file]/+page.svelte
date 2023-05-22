<script lang="ts">
	let file = '101';
	let matter = '02';

	function onlyNumbers(node: HTMLInputElement) {
		node.addEventListener('input', () => {
			node.value = node.value.replace(/[^0-9]/g, '');
		});
	}
</script>

<div class="w-full h-1/5 border-b-2 border-slate-500 flex items-center justify-center">
	<h1 class="text text-8xl">File {file}-{matter}</h1>
</div>
<div class="w-full h-4/5 flex flex-col gap-10 p-8">
	<button class="btn btn-outline btn-accent text-2xl">+</button>
</div>
