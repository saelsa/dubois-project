<script>
	import Seven from './Seven.svelte';
	import Eight from './Eight.svelte';
	import Nine from './Nine.svelte';

	import Section from '../molecules/Section.svelte';
</script>

<Section id="green">
	<div class="flex flex-1 relative p-4">
		<div class="absolute top-0 left-0 w-1/3 h-[1px] bg-[#008000] -translate-x-4"></div>
		<div class="absolute top-0 left-0 h-2/3 w-[1px] bg-[#008000] -translate-y-4"></div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"><Seven /><Eight /><Nine /></div>
	</div>
</Section>
