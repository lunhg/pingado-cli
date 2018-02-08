const buffspawn = require('buffered-spawn');
global.Promise = require('bluebird');

Promise.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: true
})

process.on('uncaughtException', (err) => {
    console.log(err)
    process.exit()
});

module.exports = function(cmd, opt, fn) {
    return new Promise(function(resolve, reject){
	let commands = cmd.split(" ")
	let command = commands[0]
	let _args_ = commands.slice(1);
	
	console.log("pingado: "+command+' '+_args_.join(" "))
	let options =  opt || {cwd:process.cwd()}
	return buffspawn(command, _args_, options, function(err, stdout, stderr) {
	    if (err) reject(err)
	    if (stderr) reject(stderr)
	    resolve(stdout)
	})
    })
}
