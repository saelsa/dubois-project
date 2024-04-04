const data = {
	1860: [{
		year: 1860,
		slaves: 89,
		free: 11
	}],
	1890: [{
		year: 1890,
		tenants: 81,
		peasants: 19
	}]
};

const translations = {
	slaves: { name_en: 'Slaves', name_fr: 'Esclaves' },
	free: { name_en: 'Free laborers', name_fr: 'Ouvriers libres' },
	tenants: {
		name_en: 'Tenants',
		name_fr: 'Métayers'
	},
	peasants: {
		name_en: 'Peasant proprietors',
		name_fr: 'Paysans proprietaires'
	}
};

export { data, translations };
