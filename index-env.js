let path = require('path')
let fs = require('fs');
let foreach = require('foreach');
var Enquirer = require('enquirer');

let env = path.join(process.cwd(), ".env")
let _env_ = path.join(path.join(__dirname, 'env.template'))

// lets use some async readFile
let readFile = function(f){
    return new Promise(function(resolve, reject){
	fs.readFile(f,'utf8', function(err, data){
	    if(err) reject(err)
	    resolve(data)
	})
    })
}
;

let createEnvFile = function(p, data){
    let options =  process.argv.slice(3)
    return new Promise(function(resolve, reject){
	console.log(options);
	foreach(options, function(e, i, a){
	    if(i % 2 === 0){
		if(e === '--user' || e === '-u')  data = data.replace('%USER', a[i+1]);
		if(e === '--pwd' || e === '-p')  data = data.replace('%PWD', a[i+1]);
		if(e === '--host' || e === '-h')  data = data.replace('%HOST', a[i+1]);
		if(e === '--port' || e === '-P')  data = data.replace('%PORT', a[i+1]);
		if(e === '--database' || e === '-d')  data = data.replace('%DB', a[i+1]);
	    } 
	})
	console.log(data)
	
	fs.writeFile(p, data, function(_err, _data){
	    if(_err) reject(_err)
	    resolve()
	})
    })
}

let onOverwrite = function(data){
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

readFile(env).then(onOverwrite).catch(function(err){
    return readFile(_env_)
}).then(function(data){
    return createEnvFile(env, data).then(function(){
	console.log("DONE");
    })
})
