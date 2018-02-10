const path = require('path')
const Env = require('./lib/env')

let env = path.join(process.cwd(), ".env")
let _env_ = path.join(path.join(__dirname, 'env.template'))

Env.readFile(env).then(Env.onOverwrite).catch(function(err){
    return Env.readFile(_env_)
}).then(function(data){
    return Env.createEnvFile(env, data).then(function(){
	console.log("DONE");
    })
}).catch(function(err){
    console.log(err)
})
