const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
	framework: '@storybook/svelte',

	staticDirs: ['../static'],
	svelteOptions: {
		preprocess: import('../svelte.config.js').preprocess
	},
	typescript: {
		check: false,
		checkOptions: {}
	},
	webpackFinal: async (config) => {
		const svelteLoader = config.module.rules.find(
			(r) => r.loader && r.loader.includes('svelte-loader')
		);
		svelteLoader.options.preprocess = require('svelte-preprocess')();
		config.module.rules.push({
			test: [/\.stories\.js$/, /index\.js$/],
			use: [require.resolve('@storybook/source-loader')],
			include: [path.resolve(__dirname, '../src')],
			enforce: 'pre'
		});
		config.resolve.alias = {
			...config.resolve.alias,
			src: path.resolve(__dirname, '../src'),
			$lib: path.resolve(__dirname, '../src/lib'),
			$app: path.resolve(__dirname, '../.storybook/app/')
		};
		return config;
	}
};
