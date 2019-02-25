const {exec} = require('child_process')

exec('nix search -u nodejs-10_x | head -n 2 | tail -n 1', (err, stdout) => {
	if (err) {
		return
	}

	console.log(stdout)
})
