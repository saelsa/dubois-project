<script>
    export let height
    
</script>


							<!-- BAR 1860 -->
							<svg x="50" y={height * 0.4}>
								<g transform={`translate(${margin.left},${margin.top})`}>
									<text class="font-bold mulish text-[15px]" fill="black" x="50" y="20">1860</text>
									{#each stackedSeries1860 as series, i}
										{#each series as d}
											<defs>
												<filter id={`verticalTexture${i}`} x="0%" y="0%" width="100%" height="100%">
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
											</defs>
											<rect
												x="0"
												y={yScale1860(d[1])}
												width="150"
												height={yScale1860(d[0]) - yScale1860(d[1])}
												stroke="black"
												stroke-width="0.5"
												filter={`url(#verticalTexture${i})`}
											/>
											<text class="mulish" x={150 / 2} y={yScale1860(d[1])} dx="-5" dy="1.2em">
												{series.key}
											</text>
										{/each}
									{/each}
								</g>
							</svg>