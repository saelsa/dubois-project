<script>
	import Plate from '../molecules/Plate.svelte';
	import BarChart from '../molecules/BarChart.svelte';

	import rawData from "$lib/data/challenge7"

	let width = 800;
	let height = 1000;

	$: data =
		rawData &&
		rawData.map((d) => ({
			...d,
			color: d.name === 'Negroes, U.S.A.' ? 'rgb(220, 20, 60)' : '#0d7a4a'
		}));
</script>

<Plate>
	<div class="plate flex flex-col">
		<div class="flex flex-col gap-5 text-center items-center p-10">
			<h3 class="text-2xl font-thin">
				Illiteracy of the American Negroes compared with that of other nations.
			</h3>
			<div class="w-1/5 h-[1px] bg-slate-400"></div><p class="text-base font-thin">
				Proportion d' illettrés parmi les Nègres Americains comparée à celle des autres nations.
			</p>
			<div class="w-1/5 h-[1px] bg-slate-400"></div>
			<p class="text-sm font-thin">Done by Atlanta University.</p>
		</div>
		{#if data}
			<div class="w-full h-full overflow-x-auto">
				<div
					class="flex justify-center overflow-x-auto m-auto min-w-[500px] max-w-[800px] sm:p-5 md:p-10"
				>
					<BarChart {data} {width} {height} />
				</div>
			</div>
		{/if}
	</div>
</Plate>
