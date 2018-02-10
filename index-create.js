let download = require('download-git-repo');
let path = require('path')
let fs = require('fs')

let config = {
    path: path.join(process.cwd(), process.argv[2]),
    project: 'lunhg/pingado-boilerplate',
    callback: function (err) {
	//backup some files
	let view = fs.readFileSync(config.path+'/app/views/index.pug', 'utf8')
	fs.writeFileSync(config.path+'/app/views/index.pug.bak', view)
	console.log("Done")
    }
}

console.log("Downloading https://www.github.com/"+config.project+" to "+config.path)
download(config.project, config.path, config.callback)


