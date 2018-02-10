const fs = require('fs')
const path = require('path');

module.exports = function(options){
    return new Promise(function(resolve, reject){
	let M = new RegExp("Model", "g")
	let m = new RegExp("model", "g")
	let S = new RegExp("let Schema", "g")
	let s = new RegExp("./schema", "g")
	if(options.type === 'mongoose'){
	    if(options.fold === 'model'){
		let model = fs.readFileSync(options.path+'/model.js', 'utf8')
		let schema = fs.readFileSync(options.path+'/schema.js', 'utf8')
		model = model.replace(M, options.name)
		model = model.replace(m, options.name.toLowerCase())
		model = model.replace(m, options.name.toLowerCase())
		model = model.replace(options.name.toLowerCase()+".js", "model.js")
		model = model.replace("mongoose."+options.name, "mongoose.model")
		model = model.replace("mongoose."+options.name.toLowerCase(), "mongoose.model")
		model = model.replace("mongoose."+options.name.toLowerCase(), "mongoose.model")
		model = model.replace(S, "let "+options.name+"Schema")
		model = model.replace(s, options.name.toLowerCase()+"-schema")
		
		fs.writeFileSync(options.path+'/model.js', model)
		fs.writeFileSync(options.path+'/schema.js', schema)
	    }
	    if(options.fold === 'controller'){
		let ctrl = fs.readFileSync(options.path+'/Controller.js', 'utf8')
		ctrl = ctrl.replace(M,options.name)
		ctrl = ctrl.replace(m, options.name.toLowerCase())
		fs.unlinkSync(options.path+'/Controller.js')
		console.log(ctrl)
		fs.writeFileSync(options.path+'/controller.js', ctrl)
	    }
	    
	}
	else if(options.type === 'vue-pug'){
	    if(options.fold === 'view'){
		let view = fs.readFileSync(options.path+'/app/views/model.vue', 'utf8')
		let index = fs.readFileSync(options.path+'/app/views/index.pug', 'utf8')
		let indexBak = fs.readFileSync(options.path+'/app/views/index.pug.bak', 'utf8')
				
		fs.unlinkSync(options.path+'/app/views/model.vue')
		fs.writeFileSync(options.path+'/app/views/index.pug', indexBak+'\n\n'+index)

		view = view.replace(M, options.name)
		view = view.replace(m, options.name.toLowerCase())
		
		let p = path.join(options.path, 'app/views/', options.name.toLowerCase()+'.vue')
		fs.unlinkSync(options.path+'/app/views/model.vue')
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
