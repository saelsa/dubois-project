<script>
	import { geoAlbersUsa, geoPath, scaleOrdinal, pie, arc } from 'd3';

	import Plate from '../molecules/Plate.svelte';

	import geoJson from '$lib/data/us-states.json';
	import { data } from '$lib/data/challenge10';

	let width = 500;
	let height = 700;

	const margin = { top: 30, right: 20, bottom: 20, left: 20 };

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// US map
	let mapWidth = innerWidth / 4 + 20;
	let mapHeight = 300;

	$: projection = geoAlbersUsa().fitSize([mapWidth, mapHeight], geoJson);
	$: pathGenerator = geoPath(projection);

	$: counties = geoJson.features.map((feature) => {
		return {
			...feature,
			path: pathGenerator(feature)
		};
	});

	const mapColors = scaleOrdinal([
		'#d62245',
		'#afabb3',
		'#e3bdb0',
		'#d0b8a4',
		'#928e79',
		'#ecb860',
		'#655321',
		'#d2b48c',
		'#ffd700',
		'#ffc0cb',
		'#dc143c',
		'#00aa00',
		'#4682b4',
		'#7e6583'
	]);

	// pie chart
	const pieWidth = 200;
	const pieHeight = 200;

	const radius = Math.min(pieWidth, pieHeight) / 2;

	const pieGenerator = pie()
		.sort(null)
		.value((d) => d.percentage);
	const arcPath = arc().innerRadius(0).outerRadius(radius);

	const labelRadius = arcPath.outerRadius()() * 0.92;

	const arcLabel = arc().innerRadius(labelRadius).outerRadius(labelRadius);

	const arcs = pieGenerator(data);

	const pieColors = scaleOrdinal(
		['Teachers', 'Ministers', 'Government service', 'Business', 'Other professions', 'House wives'],
		['#d62245', '#afabb3', '#e3bdb0', '#d0b8a4', '#928e79', '#ecb860']
	);

	// text parts
	const titleEn = [
		'A series of statistical charts, illustra-',
		'ting the condition of the descendants of for-',
		'mer african slaves now resident in the United',
		'States of America.'
	];

	const titleFr = [
		'Une série de cartes et diagrammes statistiques montrant la ',
		'condition présente des descendants des anciens esclaves afri-',
		"cains actuellement établis dans les Etats Unis d'Amérique."
	];

	const explainerEn = [
		'Prepared and executed by',
		'negro students under the',
		'direction of',
		'Atlanta University,',
		'Atlanta, GA.',
		'United States of America.'
	];
	const explainerFr = [
		'Préparées et excutées par',
		'des étudiants nègres sous',
		"la direction de l'université",
		"d'Atlanta.",
		'Etat de Géorgie.',
		"Etats unis d'Amerique."
	];

	const backgroundEn = [
		'The university has 20 professors and instructors and 250 students at present.',
		'It has five buildings, 60 acres of campus, and a library of 11,000 volumes it aims to raise',
		'and civilize the sons of the freedmen by training their more capable membersin the liber-',
		'al arts according to the best standards of the day.',
		'The proper accomplishment of this work demands an endowment fund of $500,000.'
	];

	const backgroundFr = [
		"L'université a actuellement 20 professeurs et instructeurs et 250 étudiants.",
		'Elle est composée de cinc bâtiments, 60 acres (environ 26 hectares) de terrain servant de',
		"cour et de champ de récréation, et d'une bibliothèque contenant 11,000 volumes.",
		"Son but est d'élever et de civiliser les fils des nègres affranchis en donnant aux mieux",
		'doués une éducation dans les arts libéraux en accord avec les idées les plus progres-',
		"sistes de l'époque.",
		"l'accomplissement de cette oevre demande une dotation de $500,000 (2,500,000 francs)."
	];

	let hoveredCountyId = null;
</script>

<Plate>
	<div class="flex flex-col">
		<svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
			{#each titleEn as text, i}
				<text
					x={margin.left}
					y={margin.top + i * 20}
					dx={i === 0 ? 20 : 0}
					class="text-lg font-black mulish"
					textLength={i < 3 ? innerWidth : '200px'}
				>
					{text}
				</text>
			{/each}
			{#each titleFr as text, i}
				<text
					x={margin.left}
					y={110 + i * 15}
					dx={i === 0 ? 20 : 0}
					class="text-xs mulish"
					fill="#c09c8a"
					textLength={innerWidth}
				>
					{text}
				</text>
			{/each}
			{#each explainerEn as text, i}
				<text
					x={margin.left + innerWidth / 6}
					y={170 + i * 15}
					class="text-[10px] mulish"
					text-anchor="middle"
				>
					{text}
				</text>
			{/each}

			<!-- MAP -->
			<svg x={innerWidth / 3 + 40} y="40" width={mapWidth} height={mapHeight}>
				{#each counties as { id, path }}
					<path
						class="map"
						d={path}
						fill={id === '13' ? '#000' : mapColors(id)}
						stroke="black"
						stroke-width="0.5"
						on:mouseenter={() => (hoveredCountyId = id)}
						class:active={hoveredCountyId === id}
					/>
				{/each}

				<text x={mapWidth / 2} y={200} class="text-[7px] mulish" text-anchor="middle">
					Centre of negro population.
				</text>
				<text x={mapWidth / 2} y={210} class="text-[7px] mulish" text-anchor="middle">
					Atlanta University.
				</text>
				<svg y="190" width="10" height="20">
					<rect fill="#302d29" width="100%" height="100%" />
					<svg x="0" y="0" viewBox="0 0 100 100" height="10">
						<circle cx="50" cy="50" r="30" fill="white" />
					</svg>
					<svg height="10" y="10" viewBox="0 0 51 48">
						<path fill="white" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
					</svg>
				</svg>
			</svg>

			{#each explainerFr as text, i}
				<text
					x={innerWidth - innerWidth / 6 + margin.right}
					y={170 + i * 15}
					class="text-[10px] mulish"
					text-anchor="middle"
					fill="#c09c8a"
				>
					{text}
				</text>
			{/each}

			<text x={innerWidth / 2 + margin.left} y="280" text-anchor="middle" class="mulish text-[9px]">
				The University was founded in 1867. It has instructed 6000 negro students.
			</text>

			<text
				x={innerWidth / 2 + margin.left}
				y="290"
				text-anchor="middle"
				class="mulish text-[9px]"
				fill="#c09c8a"
			>
				L'Université a été fondée en 1867. Elle a donnée l'instruction á 6000 étudiants nègres.
			</text>

			<text x={innerWidth / 2 + margin.left} y="300" text-anchor="middle" class="mulish text-[9px]">
				It has graduated 330 negroes among whom are:
			</text>
			<text
				x={innerWidth / 2 + margin.left}
				y="310"
				text-anchor="middle"
				class="mulish text-[9px]"
				fill="#c09c8a"
			>
				Elle a délivre des diplomes a 330 nègres dont:
			</text>

			<!-- Pie Chart -->
			<svg
				x={margin.left}
				y="330"
				width={innerWidth}
				height={pieHeight}
				viewBox="{-pieWidth / 2}, {-pieHeight / 2}, {pieWidth}, {pieHeight}"
				style:max-width="100%"
				style:height="auto"
			>
				<!-- pie -->
				<g transform="rotate(-90)">
					{#each arcs as slice}
						<path
							d={arcPath(slice)}
							fill={pieColors(slice.data.occupation)}
							stroke="black"
							stroke-width="0.5"
						/>

						<!-- Add each label. -->
						<text
							class="mulish font-black text-[9px]"
							transform="translate({arcLabel.centroid(slice)}) rotate(90)"
							text-anchor="middle"
						>
							{slice.data.percentage}%
						</text>
					{/each}
				</g>
				<!-- legend -->
				<g transform="translate(-215, -90)">
					{#each data as item, i}
						<circle cx="0" cy={10 + i * 20} r="8" fill={pieColors(item.occupation)} stroke="black" stroke-width="0.5" />
						<text class="mulish text-[9px]" x="15" y={13 + i * 20}>{item.occupation}</text>
					{/each}
				</g>
                <g transform="translate(220, -90)">
					{#each data as item, i}
						<circle cx="0" cy={10 + i * 20} r="8" fill={pieColors(item.occupation)} stroke="black" stroke-width="0.5" />
						<text class="mulish text-[9px]" text-anchor="end" x="-15" y={13 + i * 20}>{item.occupation}</text>
					{/each}
				</g>
			</svg>
			<g>
				{#each backgroundEn as textPart, i}
					<text class="mulish text-[9px]" x="20" y={550 + i * 10}>{textPart}</text>
				{/each}
				{#each backgroundFr as textPart, i}
					<text class="mulish text-[9px]" x="20" y={620 + i * 10}>{textPart}</text>
				{/each}
			</g>
		</svg>
	</div>
</Plate>

<style>
	.map {
		opacity: 0.8;
	}

	.map.active {
		opacity: 1;
	}
</style>
