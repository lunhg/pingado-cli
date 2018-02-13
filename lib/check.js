const model = require('./model');
const controller = require('./controller');
const view = require('./view')

module.exports = function(options){
    return new Promise(function(resolve, reject){
	if(options.type === 'mongoose'){
	    if(options.fold === 'model'){
		model(options)
	    }
	    if(options.fold === 'controller'){
		controller(options)
	    }
	    
	}
	else if(options.type === 'vue-pug'){
	    if(options.fold === 'view'){
		view(options)
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
