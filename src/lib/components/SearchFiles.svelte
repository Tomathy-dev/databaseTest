<script lang="ts">
  import Icon from '@iconify/svelte';
  export let cssclass = '';
</script>

<div id="SearchBox" class={cssclass}>
  <form action="/fileList/searchFiles" class="input-group input-group-divider grid grid-cols-[2fr_1fr_auto]">
    <input type="number" name="file" class="input rounded-r-none" placeholder="File...">
    <input type="number" name="matter" class="input rounded-none" placeholder="Matter...">
    <button type="submit" class="btn variant-filled-tertiary rounded-l-none text-xl">
      <span><Icon icon="material-symbols:search" /></span>
    </button>
  </form>
</div>