let path = require('path')
let fs = require('fs');
let foreach = require('foreach');

exports.create = function(p, data){
    return new Promise(function(resolve, reject){
	let options =  process.argv.slice(2)
	console.log(options)
	
	foreach(options, function(e, i, a){
	    if(i % 2 === 0){
		foreach(data, function(val, line, text){
		    if(e === '--user' || e === '-u') text[line] = text[line].replace('%USER', a[i+1]);
		    if(e === '--pwd' || e === '-p') text[line] = text[line].replace('%PWD', a[i+1]);
		    if(e === '--host' || e === '-h') text[line] = text[line].replace('%HOST', a[i+1]);
		    if(e === '--port' || e === '-P') text[line] = text[line].replace('%PORT', a[i+1]);
		    if(e === '--db' || e === '-d') text[line] = text[line].replace('%DB', a[i+1]);
		})
	    } 
	})
	fs.writeFile(p, data.join("\n"), function(_err){
	    if(_err){
		reject(_err)
	    }
	    else{
		resolve()
	    }
	})
    })
}
