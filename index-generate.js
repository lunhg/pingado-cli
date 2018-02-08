let download = require('download-git-repo');
let path = require('path')
let fs = require('fs');
let foreach = require('foreach');

let type = process.argv[2]
let fold = process.argv[3]
let name = process.argv[4]

let p = ""
if(fold === 'model' || fold === 'controller'){
    p = path.join(process.cwd(), 'app/'+fold+'s', name)
}
if(fold === 'view'){
    p = path.join(process.cwd(), 'app')
}

let config = {
    path: p,
    project: 'lunhg/pingado-boilerplate-'+type+'-'+fold,
    callback: function (err) {
	try{
	    let M = new RegExp("Model", "g")
	    let m = new RegExp("model", "g")
	   
	    if(type === 'mongoose'){
		if(fold === 'model'){
		    let model = fs.readFileSync(p+'/model.js', 'utf8')
		    model = model.replace(M, name)
		    model = model.replace(m, name.toLowerCase())
		    model = model.replace(m, name.toLowerCase())
		    model = model.replace(name.toLowerCase()+".js", "model.js")
		    model = model.replace("mongoose."+name, "mongoose.model")
		    model = model.replace("mongoose."+name.toLowerCase(), "mongoose.model")
		    fs.writeFileSync(p+'/model.js', model)
		}
		if(fold === 'controller'){
		    console.log(fold)
		    console.log(name)
		    let ctrl = fs.readFileSync(p+'/Controller.js', 'utf8')
		    ctrl = ctrl.replace(M,name)
		    ctrl = ctrl.replace(m, name.toLowerCase())
		    ctrl = ctrl.replace(name.toLowerCase()+".js", "model.js")
		    fs.writeFileSync(p+'/Controller.js', ctrl)
		}
		console.log(process.argv[2]+" "+process.argv[3]+" "+process.argv[4]+" created")
	    }
	    if(type === 'vue-view'){
		if(fold === 'view'){
		    let view = fs.readFileSync(p+'/views/model.vue', 'utf8')
		    view = view.replace(M, process.argv[4])
		    view = view.replace(m, process.argv[4].toLowerCase())
		    console.log(view)
		    fs.writeFileSync(p+'/'+name+'.vue', view)
		}
	    }
	}
	catch(e){
	    console.log(e)
	}
    }
}

console.log("Downloading https://www.github.com/"+config.project+" to "+config.path)
download(config.project, config.path, config.callback)


