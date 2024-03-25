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

<svg viewBox={`0 0 ${width} ${height}`}>
	<defs>
		<!-- <filter
			id="nnnoise-filter"
			x="0"
			y="0%"
			width="90%"
			height="90%"
			filterUnits="objectBoundingBox"
			primitiveUnits="userSpaceOnUse"
			color-interpolation-filters="linearRGB"
		>
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.05"
				numOctaves="4"
				seed="15"
				stitchTiles="stitch"
				x="0%"
				y="0%"
				width="100%"
				height="100%"
				result="turbulence"
			></feTurbulence>
			<feSpecularLighting
				surfaceScale="5"
				specularConstant="0.7"
				specularExponent="20"
				lighting-color="#ffffff"
				x="0%"
				y="0%"
				width="100%"
				height="100%"
				in="turbulence"
				result="specularLighting"
			>
				<feDistantLight azimuth="3" elevation="8"></feDistantLight>
			</feSpecularLighting>
		</filter> -->
	</defs>

	<g transform={`translate(${margin.left},${margin.top})`}>
		{#each data as d}
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
					class="stroke-black "
				/>
				<!-- <rect
					x="0"
					y={yScale(d.name)}
					width={xScale(d.value)}
					height={yScale.bandwidth()}
					fill="#ffffff"
					filter="url(#nnnoise-filter)"
				/> -->
			</g>
		{/each}
	</g>
</svg>
