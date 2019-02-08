module.exports = function(plop) {
	plop.setGenerator('new name', {
		description: 'Add a new Route to both Core & Shell',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Route name? ( flat routes only at this time )'
			},
			{
				type: 'list',
				name: 'verb',
				message: 'What REST Verb is to be used?',
				choices: ['delete', 'get', 'patch', 'post', 'put']
			},
			{
				type: 'input',
				name: 'verMajor',
				message: 'Initial Major Version to be used? (SemVer standard)'
			},
			{
				type: 'input',
				name: 'verMinor',
				message: 'Initial Minor Version to be used? (SemVer standard)'
			}
		],
		actions: [
			{
				path: 'core/routes/{{ name }}/{{ verb }}/index.js',
				skipIfExists: true,
				templateFile: 'plop/core/route/index.js',
				type: 'add'
			},
			{
				path: 'core/routes/{{ name }}/{{ verb }}/v0.js',
				skipIfExists: true,
				templateFile: 'plop/core/route/v.js',
				type: 'add'
			},
			{
				path: 'core/routes/{{ name }}/{{ verb }}/v0.spec.js',
				skipIfExists: true,
				templateFile: 'plop/core/route/v.spec.js',
				type: 'add'
			},
			{
				path: 'shell/routes/{{ name }}.js',
				skipIfExists: true,
				templateFile: 'plop/shell/route.js',
				type: 'add'
			},
			{
				path: 'shell/routes/{{ name }}.schema.js',
				skipIfExists: true,
				templateFile: 'plop/shell/route.schema.js',
				type: 'add'
			}
		]
	})
}
