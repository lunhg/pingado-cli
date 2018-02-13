const fs = require('fs')

module.exports = function(options){
    let M = new RegExp("Model", "g")
    let m = new RegExp("model", "g")
    let ctrl = fs.readFileSync(options.path+'/Controller.js', 'utf8')
    ctrl = ctrl.replace(M,options.name)
    ctrl = ctrl.replace(m, options.name.toLowerCase())
    fs.unlinkSync(options.path+'/Controller.js')
    fs.writeFileSync(options.path+'/controller.js', ctrl)
}
