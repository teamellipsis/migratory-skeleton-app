const path = require('path');

module.exports = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		let resolveAliasConfig = config.resolve.alias;
		resolveAliasConfig['Daemon'] = path.join(__dirname, 'platform', 'decorators', 'Daemon.js');

		config.plugins.push(
			new webpack.ProvidePlugin({
				Daemon: ['Daemon', 'default'],
			}),
		);
		return config;
	}
}
