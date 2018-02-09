const fs = require('fs')
const path = require('path');

module.exports = function(options){
    return new Promise(function(resolve, reject){
	let M = new RegExp("Model", "g")
	let m = new RegExp("model", "g")
	if(options.type === 'mongoose'){
	    if(options.fold === 'model'){
		let model = fs.readFileSync(options.path+'/model.js', 'utf8')
		model = model.replace(M, options.name)
		model = model.replace(m, options.name.toLowerCase())
		model = model.replace(m, options.name.toLowerCase())
		model = model.replace(options.name.toLowerCase()+".js", "model.js")
		model = model.replace("mongoose."+options.name, "mongoose.model")
		model = model.replace("mongoose."+options.name.toLowerCase(), "mongoose.model")
		fs.unlinkSync(options.path+'/model.js')
		fs.writeFileSync(options.path+'/'+options.name.toLowerCase()+'.js', model)
	    }
	    if(options.fold === 'controller'){
		let ctrl = fs.readFileSync(options.path+'/Controller.js', 'utf8')
		ctrl = ctrl.replace(M,options.name)
		ctrl = ctrl.replace(m, options.name.toLowerCase())
		fs.unlinkSync(options.path+'/Controller.js')
		fs.writeFileSync(options.path+'/'+options.name.toLowerCase()+'.js', ctrl)
	    }
	    
	}
	else if(options.type === 'vue-pug'){
	    if(options.fold === 'view'){
		console.log(options)
		let view = fs.readFileSync(options.path+'/views/model.vue', 'utf8')
		view = view.replace(M, options.name)
		view = view.replace(m, options.name.toLowerCase())
		
		let p = path.join(options.path, 'views/', options.name.toLowerCase()+'.vue')
		fs.unlinkSync(options.path+'/views/model.vue')
		fs.writeFileSync(p, view)
	    }
	}
	else{
	    let err = new Error()
	    err.code = options.type+" "+options.fold
	    err.message = 'Invalid type or fold'
	    reject(err)
	}
	resolve()
    });
}
