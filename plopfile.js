module.exports = function(plop) {
	plop.setGenerator('core ~ route', {
		description: 'adds route to the core',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'route name? (must match shell route name)'
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
				templateFile: 'plop/core/route/core.js',
				type: 'add'
			},
			{
				path: 'core/routes/{{ name }}/{{ verb }}/v0.spec.js',
				skipIfExists: true,
				templateFile: 'plop/core/route/core.spec.js',
				type: 'add'
			}
		]
	})
}
