<script>
	import { onMount } from 'svelte';

	import Plate from '../components/Plate.svelte';
	import * as d3 from 'd3';
	import BarChart from '../components/BarChart.svelte';

	let width = 800;
	let height = 1000;

	let parsedData;
	onMount(async () => {
		const text = await d3.text('/challenge_07_data.csv');
		parsedData = d3.csvParseRows(text, (d, i) => {
			return {
				name: d[0],
				value: +d[1]
			};
		});
	});

	$: data =
		parsedData &&
		parsedData.map((d) => ({
			...d,
			color: d.name === 'Negroes, U.S.A.' ? 'rgb(220, 20, 60)' : 'rgb(0, 128, 0)'
		}));
</script>

<Plate>
	<div class="plate flex flex-col">
		<div class="flex flex-col gap-5 text-center items-center p-10">
			<h3 class="text-2xl font-thin">
				Illiteracy of the American Negroes compared with that of other nations.
			</h3>
			<div class="w-1/5 h-[1px] bg-slate-400"></div>
			<p class="text-base font-thin">
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
