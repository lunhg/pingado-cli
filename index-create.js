let download = require('download-git-repo');
let path = require('path')

let config = {
    path: path.join(process.cwd(), process.argv[2]),
    project: 'lunhg/pingado-boilerplate',
    callback: function (err) {
	console.log("Done")
    }
}

console.log("Downloading https://www.github.com/"+config.project+" to "+config.path)
download(config.project, config.path, config.callback)
