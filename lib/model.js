const fs = require('fs')

module.exports = function(options){
    let M = new RegExp("Model", "g")
    let m = new RegExp("model", "g")
    let S = new RegExp("let Schema", "g")
    let s = new RegExp("./schema", "g")
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
