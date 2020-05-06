module.exports = {
	exportTrailingSlash: true,
	assetPrefix: process.env.CDN_URL || '',
	env: {
		CDN_URL: process.env.CDN_URL || '',
		API_URL: process.env.API_URL || '',
		API_KEY: process.env.API_KEY || ''
	},
	webpack: (config) => {
		config.resolve.alias['styled-components'] = require.resolve(
			'styled-components'
		)
		config.resolve.alias['react'] = require.resolve('react')
		return config
	}
}
