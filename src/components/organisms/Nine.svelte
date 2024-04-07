<script>
	import { extent, stack, scaleLinear, scaleOrdinal, area } from 'd3';
	import Plate from '../molecules/Plate.svelte';

	import data from '$lib/data/challenge9';

	let width = 500;
	let height = 500;

	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const stackGenerator = stack().keys(['slave', 'free']);
	const stackedSeries = stackGenerator(data);

	const xScale = scaleLinear()
		.domain(extent(data, (d) => d.year))
		.range([margin.left + margin.right, innerWidth]);
	const yScale = scaleLinear().domain([0, 100]).range([innerHeight, margin.top]);

	const colorScale = scaleOrdinal().domain(['slave', 'free']).range(['#282723', '#207246']);

	const areaGenerator = area()
		.x((d) => xScale(d.data.year))
		.y0((d) => yScale(d[0]))
		.y1((d) => yScale(d[1]));
</script>

<Plate>
	<div class="flex flex-col">
		<div class="flex flex-col gap-5 text-center items-center mt-5 mb-10">
			<h3 class="text-base font-black mulish">
				Proportion of freemen and slaves among american negroes .
			</h3>
			<p class="text-base font-black mulish">
				Proportion des nègres libres et des esclaves en amérique .
			</p>
			<p class="text-[10px] font-bold mulish mb-6">Done by Atlanta University .</p>
		</div>
		<svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
			{#each stackedSeries as series}
				<path d={areaGenerator(series)} fill={colorScale(series.key)} />
			{/each}

			<!-- label -->
			{#each data as dataPoint}
				<text
					class="text-xs mulish font-black"
					x={xScale(dataPoint.year)}
					dx="-13"
					y={dataPoint.free !== 100 ? yScale(dataPoint.slave) : yScale(89)}
					dy="-5">{dataPoint.free} %</text
				>
			{/each}

			<!-- x axis -->
			<g class="axis x-axis">
				{#each data.map((d) => d.year) as tick}
					<g class="tick tick-{tick}" transform="translate({xScale(tick)},{margin.top})">
						<line
							y1="0"
							y2={innerHeight - margin.bottom}
							x1="0"
							x2="0"
							stroke="#282723"
							stroke-width="0.2"
						/>
						<text class="mulish font-bold text-sm" y="-2" dx="-14"
							>{tick}</text
						>
					</g>
				{/each}
			</g>
			<!-- title -->
			<text class="mulish" x={innerWidth / 2} y={45} dx={-25}>Free - Libre</text>
			<text class="mulish text-xl fill-[#eedecb] " x={innerWidth / 2} y={innerHeight /2} dx={-20}>Slaves</text>
			<text class="mulish text-xl fill-[#eedecb]" x={innerWidth / 2} y={innerHeight /2} dx={-30} dy={20}>Esclaves</text>
        </svg>
	</div>
</Plate>
