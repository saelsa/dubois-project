<script>
	import * as d3 from 'd3';

	import Plate from '../components/Plate.svelte';

	import { data, translations } from '$lib/data/challenge8';

	let width = 500;
	let height = 600;

	const margin = { top: 20, right: 10, bottom: 20, left: 10 };

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// define the stacks based on the data and keys to be used
	const stack1860 = d3.stack().order(d3.stackOrderDescending).keys(['slaves', 'free']);
	const stack1890 = d3.stack().order(d3.stackOrderDescending).keys(['tenants', 'peasants']);

	const stackedSeries1860 = stack1860(data[1860]);
	const stackedSeries1890 = stack1890(data[1890]);

	const yScale1860 = d3.scaleLinear().domain([0, 100]).range([275, 25]);
	const yScale1890 = d3.scaleLinear().domain([0, 100]).range([380, 0]);

	const colorScale = d3
		.scaleOrdinal()
		.domain(['slaves', 'free', 'tenants', 'peasants'])
		.range(['#282723', '#207246', '#207246', '#d21542']);

</script>

<Plate>
	<div class="flex flex-col">
		<div class="flex flex-col gap-5 text-center items-center mt-5 mb-10">
			<h3 class="text-base place-self-end font-black mulish">
				The rise of the negroes from slavery to freedom in one generation.
			</h3>
			<p class="text-base font-black place-self-end mulish">
				Progrès graduel des nègres de l'esclavage à la liberté en une génération.
			</p>
			<p class="text-sm font-bold mulish">Done by Atlanta University.</p>
		</div>
		{#if data}
			<div class="w-full h-full overflow-x-auto">
				<div class="flex justify-center overflow-x-auto m-auto min-w-[500px] max-w-[800px] p-2">
					<svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
						<g transform={`translate(${margin.left},${margin.top})`}>
							<!-- TEXT -->
							<g>
								<text
									class="font-thin mulish text-[8px]"
									y="0px"
									textLength="285px"
									lengthAdjust="spacing"
								>
									In 1890 nearly one fifth of them owned their own homes and farms.
								</text>
								<text
									class="font-thin mulish text-[8px]"
									y="15px"
									textLength="285px"
									lengthAdjust="spacing"
								>
									This advance was accomplished entirely without state aid, and in the
								</text>
								<text class="font-thin mulish text-[8px]" y="30px">
									face of proscriptive laws.
								</text>

								<text
									class="font-thin mulish text-[8px]"
									y="60px"
									textLength="285px"
									lengthAdjust="spacing"
								>
									En 1890 environ un cinquième étaient propriétaires de leurs hab-
								</text>
								<text
									class="font-thin mulish text-[8px]"
									y="75px"
									textLength="285px"
									lengthAdjust="spacing"
								>
									itations et de leurs fermes. Ce Progrès s'est accompli sans
								</text>
								<text
									class="font-thin mulish text-[8px]"
									y="90px"
									textLength="285px"
									lengthAdjust="spacing"
								>
									secours aucun de l'état et en présence de lois défavorables.
								</text>

								<text class="font-thin mulish text-[8px]" x="40px" y="150px">
									In 1860 nearly 90% of the blacks were slaves.
								</text>
								<text class="font-thin mulish text-[8px]" x="40px" y="175px">
									En 1860 environ 90% des nègres étaient esclaves.
								</text>
							</g>

							<!-- BAR 1860 -->
							<svg x="50" y={height * 0.4}>
								<defs>
									{#each stackedSeries1860 as series, i}
										<filter
											id={`verticalTexture${series.key}`}
											x="0%"
											y="0%"
											width="100%"
											height="100%"
										>
											<feTurbulence
												baseFrequency="0.2 0.01"
												result="NOISE"
												type="fractalNoise"
												numOctaves={i + 1}
												seed={Math.random()}
											/>
											<feDiffuseLighting
												in="noise"
												lighting-color={colorScale(series.key)}
												surfaceScale="5"
											>
												<feDistantLight azimuth="45" elevation="80" />
											</feDiffuseLighting>
										</filter>
									{/each}
								</defs>

								<g transform={`translate(${margin.left},${margin.top})`}>
									<text class="font-bold mulish text-[15px]" fill="black" x="50" y="20">1860</text>

									<!-- slaves -->
									<rect
										x="0"
										y={yScale1860(stackedSeries1860[0][0][1])}
										width="150"
										height={yScale1860(stackedSeries1860[0][0][0]) -
											yScale1860(stackedSeries1860[0][0][1])}
										stroke="black"
										stroke-width="0.5"
										filter={`url(#verticalTexture${stackedSeries1860[0].key})`}
									/>
									<text
										class="mulish font-black text-[20px]"
										x={0}
										y={yScale1860(stackedSeries1860[1][0][1])}
										dx="50"
										dy="120"
										fill="#d21542"
									>
										{data[1860][0].slaves} %
									</text>
									<text
										class="mulish text-[13px] font-black"
										x={0}
										y={yScale1860(stackedSeries1860[1][0][1])}
										dx="45"
										dy="137"
										fill="#d21542"
									>
										{translations[stackedSeries1860[0].key].name_en}
									</text>
									<text
										class="mulish text-[13px] font-black"
										x={0}
										y={yScale1860(stackedSeries1860[1][0][1])}
										dx="40"
										dy="150"
										fill="#d21542"
									>
										{translations[stackedSeries1860[0].key].name_fr}
									</text>

									<!-- free -->
									<rect
										x="0"
										y={yScale1860(stackedSeries1860[1][0][1])}
										width="150"
										height={yScale1860(stackedSeries1860[1][0][0]) -
											yScale1860(stackedSeries1860[1][0][1])}
										stroke="black"
										stroke-width="0.5"
										filter={`url(#verticalTexture${stackedSeries1860[1].key})`}
									/>
									<text
										class="mulish font-black text-[20px]"
										x={0}
										y={yScale1860(stackedSeries1860[1][0][1])}
										dx="0"
										dy="20"
									>
										{data[1860][0].free} %
									</text>
									<text
										class="mulish text-[10px] font-black"
										x={0}
										y={yScale1860(stackedSeries1860[1][0][1])}
										dx="50"
										dy="10"
									>
										{translations[stackedSeries1860[1].key].name_en}
									</text>
									<text
										class="mulish text-[10px] font-black"
										x={0}
										y={yScale1860(stackedSeries1860[1][0][1])}
										dx="50"
										dy="20"
									>
										{translations[stackedSeries1860[1].key].name_fr}
									</text>
								</g>
							</svg>

							<!-- BAR 1890 -->
							<svg x="310" y={-70}>
								<defs>
									{#each stackedSeries1890 as series, i}
										<filter
											id={`verticalTexture${series.key}`}
											x="0%"
											y="0%"
											width="100%"
											height="100%"
										>
											<feTurbulence
												baseFrequency="0.2 0.01"
												result="NOISE"
												type="fractalNoise"
												numOctaves={i + 1}
												seed={Math.random()}
											/>
											<feDiffuseLighting
												in="noise"
												lighting-color={colorScale(series.key)}
												surfaceScale="5"
											>
												<feDistantLight azimuth="45" elevation="80" />
											</feDiffuseLighting>
										</filter>
									{/each}
								</defs>

								<g transform={`translate(${margin.left},${margin.top + 50})`}>
									<!-- year -->
									<text class="font-black mulish text-[15px]" fill="black" x="50" y="-5">1890</text>

									<!-- tenants -->
									<rect
										x="0"
										y={yScale1890(stackedSeries1890[0][0][1])}
										width="150"
										height={yScale1890(stackedSeries1890[0][0][0]) -
											yScale1890(stackedSeries1890[0][0][1])}
										stroke="black"
										stroke-width="0.5"
										filter={`url(#verticalTexture${stackedSeries1890[0].key})`}
									/>

									<text
										class="mulish font-black"
										x={0}
										y={yScale1890(stackedSeries1890[0][0][1])}
										dx="60"
										dy="120"
									>
										{data[1890][0].tenants} %
									</text>
									<text
										class="mulish text-sm font-black"
										x={0}
										y={yScale1890(stackedSeries1890[0][0][1])}
										dx="43"
										dy="135"
									>
										{translations[stackedSeries1890[0].key].name_en}
									</text>
									<text
										class="mulish text-sm font-black"
										x={0}
										y={yScale1890(stackedSeries1890[0][0][1])}
										dx="40"
										dy="147"
									>
										{translations[stackedSeries1890[0].key].name_fr}
									</text>

									<!-- peasants -->
									<rect
										x="0"
										y={yScale1890(stackedSeries1890[1][0][1])}
										width="150"
										height={yScale1890(stackedSeries1890[1][0][0]) -
											yScale1890(stackedSeries1890[1][0][1])}
										stroke="black"
										stroke-width="0.5"
										filter={`url(#verticalTexture${stackedSeries1890[1].key})`}
									/>
									<text
										class="mulish font-black"
										x={0}
										y={yScale1890(stackedSeries1890[1][0][1])}
										dx="60"
										dy="20"
									>
										{data[1890][0].peasants} %
									</text>
									<text
										class="mulish text-[10px] font-black"
										x={0}
										y={yScale1890(stackedSeries1890[1][0][1])}
										dx="13"
										dy="30"
									>
										{translations[stackedSeries1890[1].key].name_en}
									</text>
									<text
										class="mulish text-[9px] font-black"
										x={0}
										y={yScale1890(stackedSeries1890[1][0][1])}
										dx="13"
										dy="40"
									>
										{translations[stackedSeries1890[1].key].name_fr}
									</text>
								</g>
							</svg>

							<!-- STACKED BAR CHART CONNECTORS -->
							<path
								d="M 210 285 L 320 70"
								fill="transparent"
								stroke="black"
								stroke-width=".5"
								stroke-opacity="0.4"
								stroke-dasharray="15,10"
							/>
							<path
								d="M 210 285 L 320 170"
								fill="transparent"
								stroke="black"
								stroke-width=".5"
								stroke-opacity="0.4"
								stroke-dasharray="15,10"
							/>
							<path
								d="M 210 300 L 320 230"
								fill="transparent"
								stroke="black"
								stroke-width=".5"
								stroke-opacity="0.4"
								stroke-dasharray="15,10"
							/>
							<path
								d="M 210 300 L 320 300"
								fill="transparent"
								stroke="black"
								stroke-width=".5"
								stroke-opacity="0.4"
								stroke-dasharray="15,10"
							/>
							<path
								d="M 210 312 L 325 380"
								fill="transparent"
								stroke="black"
								stroke-width=".5"
								stroke-opacity="0.4"
								stroke-dasharray="17,10"
							/>
						</g>
					</svg>
				</div>
			</div>
		{/if}
	</div>
</Plate>
