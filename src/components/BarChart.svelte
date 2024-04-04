<script>
	import { scaleBand, scaleLinear } from 'd3-scale';

	export let data;
	export let width;
	export let height;

	const margin = { top: 20, right: 20, bottom: 20, left: 140 };
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	$: xDomain = data.map((d) => d.name);
	$: yDomain = data.map((d) => d.value);

	$: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.4);
	$: xScale = scaleLinear()
		.domain([0, Math.max.apply(null, yDomain)])
		.range([0, innerWidth]);
</script>

<svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" width="100%" height="100%">
		<g transform={`translate(${margin.left},${margin.top})`}>
			{#each data as d, i}
			<defs>
				<filter id="{`texture${i}`}" x="0%" y="0%" width="100%" height="100%">
					<feTurbulence baseFrequency="0.01 0.1" result="NOISE" type="fractalNoise" numOctaves="1" seed="{i}"/>
					<feDiffuseLighting in="noise" lighting-color="{d.color}" surfaceScale="5">
						<feDistantLight azimuth="45" elevation="80" />
					</feDiffuseLighting>
				</filter>
			</defs>
				<g class="mb-10">
					<text
						class="font-thin"
						x={-margin.left}
						dy=".32em"
						y={yScale(d.name) + yScale.bandwidth() / 2}
					>
						{d.name}
					</text>
					<rect
						x="0"
						y={yScale(d.name)}
						width={xScale(d.value)}
						height={yScale.bandwidth()}
						fill={d.color}
						class="stroke-black"
						filter={`url(#texture${i})`}

					/>
				</g>
			{/each}
		</g>
	</svg
>
