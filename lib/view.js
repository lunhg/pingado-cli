const fs = require('fs')
const path = require('path');
const foreach = require('foreach');

module.exports = function(options){
    let M = new RegExp("Model", "g")
    let m = new RegExp("model", "g")
    let view = fs.readFileSync(options.path+'/app/views/model.vue', 'utf8')
    let index = fs.readFileSync(options.path+'/app/views/index.pug', 'utf8')
    let indexBak = fs.readFileSync(options.path+'/app/views/index.pug.bak', 'utf8')
    
    fs.unlinkSync(options.path+'/app/views/model.vue')
    fs.writeFileSync(options.path+'/app/views/index.pug', indexBak+'\n\n'+index)

    view = view.replace(M, options.name)
    view = view.replace(m, options.name.toLowerCase())
    
    let p = path.join(options.path, 'app/views/', options.name.toLowerCase()+'.vue')
    fs.writeFileSync(p, view)
    
    let json = require(options.path+'/routes/routes.json')
    if(!json["POST"]){
	    json["POST"]= {'/':'index-post'}
    }
    else{
	json["POST"]["/"] = 'index-post'
    }
    fs.writeFileSync(options.path+'/routes/routes.json', JSON.stringify(json, null, 4))
}
