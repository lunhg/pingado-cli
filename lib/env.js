let path = require('path')
let fs = require('fs');
let foreach = require('foreach');
let Enquirer = require('enquirer');

// lets use some async readFile
exports.readFile = function(f){
    return new Promise(function(resolve, reject){
	fs.readFile(f,'utf8', function(err, data){
	    if(err) reject(err)
	    resolve(data)
	})
    })
}

exports.createEnvFile = function(p, data){
    let options =  process.argv.slice(2)

    return new Promise(function(resolve, reject){
	foreach(options, function(e, i, a){
	    if(i % 2 === 0){
		if(e === '--user' || e === '-u')  data = data.replace('%USER', a[i+1]);
		if(e === '--pwd' || e === '-p')  data = data.replace('%PWD', a[i+1]);
		if(e === '--host' || e === '-h')  data = data.replace('%HOST', a[i+1]);
		if(e === '--port' || e === '-P')  data = data.replace('%PORT', a[i+1]);
		if(e === '--database' || e === '-d')  data = data.replace('%DB', a[i+1]);
	    } 
	})
	fs.writeFile(p, data, function(_err, _data){
	    if(_err) reject(_err)
	    resolve()
	})
    })
}

exports.onOverwrite = function(data){
    return new Promise(function(resolve, reject){
	enquirer.question({
	    name: 'overwrite', 
	    message: env+" already configured Do you want to overwrite? (y/n, defaults y)",
	});
    
	return enquirer.ask('overwrite').then(function(answers){
	    if(answers[0] === 'y'){
		createEnvFile(env, data).then(resolve).catch(reject)
	    }
	    else{
		reject()
	    }
	})
    });
}
