const cmd = require('../lib/child.js')
const path = require('path');
const fs = require('fs');
const should = require('should')
const foreach = require('foreach');

describe("Pingado Command Line Interface", function(){

    let bin = path.join(__dirname, '..', 'index.js')
    let blog = process.cwd()+'/blog'

    it("should create new application by downloading boilerplate", function(){
	return new Promise(function(resolve, reject){
	    cmd('node '+bin+' create blog').then(function(stdout){
		console.log(stdout)
	    }).then(resolve).catch(reject)
	})
    })

    it("should test if blog/ structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(path.join(__dirname,'..', 'blog'), function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([ '.gitignore','app','badge.svg','index.js','locales','mocha.opts','package.json','routes','test' ])
		resolve()
	    })
	})
    })

    it("should create new .env file at blog/ folder", function(){
	return new Promise(function(resolve, reject){
	    let opt = fs.readFileSync(path.join(__dirname,'pingado.opts'), 'utf8')
	    cmd('node '+bin+' env '+opt.split("\n").join(" "), {cwd:blog}).then(function(stdout){
		console.log(stdout)
	    }).then(resolve).catch(reject)
		});
    });

    it("should test if .env structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readFile(blog+'/.env', function(err, data){
		if(err) reject(err)
		let _data_ = [
		    "PINGADO_PORT=3000",
		    "PINGADO_DATABASE='mongodb://admin:blog@localhost:27017/blog'",
		    "PINGADO_LOGGER=':remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent'",
		    "PINGADO_VIEWS='%ROOT/app/views'",
		    "PINGADO_ENGINE='pug'",
		    "PINGADO_PUBLIC='%ROOT/app/assets'",
		    "PINGADO_IMAGES='%ROOT/app/assets/images'",
		    "PINGADO_FONTS='%ROOT/app/assets/fonts'",
		    "PINGADO_STYLES='%ROOT/app/assets/css'",
		    "PINGADO_SCRIPTS='%ROOT/app/assets/js'",
		    "PINGADO_COVERAGE='%ROOT/coverage/lcov-report'",
		    "PINGADO_REPORT='%ROOT/mochawesome-report'",
		    "PINGADO_DOCUMENTATION='%ROOT/app/assets/doc/'",
		    "PINGADO_LOCALES='en pt-br'",
		    "PINGADO_LOCALES_DIR='%ROOT/locales'", 
		    "BLUEBIRD_LONG_STACK_TRACES=1", 
		    "BLUEBIRD_WARNINGS=1",
		]
		foreach(data.toString().split("\n"), function(e,i,a){
		    e.should.be.equal(_data_[i])
		})
		resolve()
	    })
	})
    })

    it("should install packages", function(){
	return new Promise(function(resolve, reject){
	    return cmd('npm install', {cwd:blog}).then(function(stdout){
		console.log(stdout)
	    }).then(resolve).catch(reject)
		})
    })

    

    it("should test if blog/ structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(path.join(__dirname,'..', 'blog'), function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([ '.gitignore', '.env', 'app','badge.svg','index.js','locales','mocha.opts','package.json','routes','test' ])
		resolve()
	    })
	})
    })

    it("should test if routes/ structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/routes', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'main.js'
		])
		resolve()
	    })
	})
    })

    it("should test if app/ structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/app', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'views',
		    'controllers'
		])
		resolve()
	    })
	})
    })

    
    it("should test if app/controllers structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/app/controllers', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'index.js'
		])
		resolve()
	    })
	})
    })

    it("should test if app/views structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/app/views', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'layout.pug',
		    'index.pug',
		    'error.pug'
		])
		resolve()
	    })
	})
    })

    it("should test if app/views/layout.pug structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readFile(blog+'/app/views/layout.pug', function(err, data){
		if(err) reject(err)
		let _data_ = [
		    "doctype html",
		    "head",
		    "  block title",
		    "  block styles",
		    "",
		    "body",
		    "  block body",
		    "  block scripts",
		]
		foreach(data.toString().split("\n"), function(e,i,a){
		    e.should.be.equal(_data_[i])
		})
		resolve()
	    })
	})
    })

    it("should test if app/views/index.pug structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readFile(blog+'/app/views/index.pug', function(err, data){
		if(err) reject(err)
		let _data_ = [
		    "extends layout",
		    "",
		    "block title",
		    "  title= title",
		    "  meta(name='_csrf' value=\"\"+_csrf)",
		    "  meta(name=\"viewport\" content=\"width=device-width, initial-scale=1.0\")",
		    "",
		    "block body",
		    "  div#app"
		]
		foreach(data.toString().split("\n"), function(e,i,a){
		    e.should.be.equal(_data_[i])
		})
		resolve()
	    })
	})
    })

    it("should generate model Post", function(){
	return new Promise(function(resolve, reject){
	    return cmd('node '+bin+' generate mongoose model Post', {cwd:blog}).then(function(stdout){
		console.log(stdout)
	    }).then(resolve).catch(reject)
		})
    })
    

    it("should test if app/ structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/app', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'views',
		    'controllers',
		    'models'
		])
		resolve()
	    })
	})
    })

    it("should test if app/models structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/app/models', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'Post'
		])
		resolve()
	    })
	})
    })

    it("should test if app/models/Post structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/app/models/Post', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'model.js',
		    'schema.js'
		])
		resolve()
	    })
	})
    })

    it("should generate view for Post", function(){
	return new Promise(function(resolve, reject){
	    return cmd('node '+bin+' generate vue-pug view Post', {cwd:blog}).then(function(stdout){
		console.log(stdout)
	    }).then(resolve).catch(reject)
	})
    })
    
    it("should test if app/ structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/app', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'views',
		    'controllers',
		    'models',
		    'assets'
		])
		resolve()
	    })
	})
    })

    it("should test if app/views structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/app/views', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'layout.pug',
		    'index.pug',
		    'error.pug',
		    'dashboard.vue',
		    'layout.vue'
		])
		resolve()
	    })
	})
    })

    it("should test if app/views/index.pug structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readFile(blog+'/app/views/index.pug', function(err, data){
		if(err) reject(err)
		let _data_ = [
		    "extends layout",
		    "",
		    "block title",
		    "  title= title",
		    "  meta(name='_csrf' value=\"\"+_csrf)",
		    "  meta(name=\"viewport\" content=\"width=device-width, initial-scale=1.0\")",
		    "",
		    "block body",
		    "  div#app",
		    "",
		    "block styles",
		    "  != css(\"vuetify.min\", {\"data-turbo-link\": true})",
		    "  != css(\"roboto\", {\"data-turbo-link\": true})",
		    "  != css(\'index\', {\"data-turbo-link\": true})",
		    "  ",
		    "block scripts",
		    "  != js(\"jquery\", {\"data-turbo-link\": true})",
		    "  != js(\"uuid4\", {\"data-turbo-link\": true})",
		    "  != js(\"vue\", {\"data-turbo-link\": true})",
		    "  != js(\"vue-resource.min\", {\"data-turbo-link\": true})",
		    "  != js(\"vue-router\", {\"data-turbo-link\": true})",
		    "  != js(\"vuetify\", {\"data-turbo-link\": true})",
		    "  != js(\"index\", {\"data-turbo-link\": true})"
		]
		foreach(data.toString().split("\n"), function(e,i,a){
		    e.should.be.equal(_data_[i])
		})
		resolve()
	    })
	})
    })

    

    it("should test if routes/ structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readdir(blog+'/routes', function(err, filePaths){
		if(err) reject(err)
		filePaths.should.containDeep([
		    'main.js',
		    'vue.js',
		    'routes.json'
		])
		resolve()
	    })
	})
    })

    it("should test if routes/routes.json structure is ok", function(){
	return new Promise(function(resolve, reject){
	    fs.readFile(blog+'/routes/routes.json', function(err, data){
		if(err) reject(err)
		let _data_ = [
		    '{',
		    '    "GET": {',
		    '        "/": "index"',
		    '    },', 
		    '    "POST": {',
		    '        "/": "index-post"',
		    '    }',
		    '}'
		]
		foreach(data.toString().split("\n"), function(e,i,a){
		    e.should.be.equal(_data_[i])
		})
		resolve()
	    })
	})
    })

    it("should test blog", function(){
	return new Promise(function(resolve, reject){
	    return cmd('npm test', {cwd:blog}).then(function(stdout){
		console.log(stdout)
	    }).then(resolve).catch(reject)
	})
    })

    after(function(){
    	cmd('rm -r blog/', {cwd: process.cwd()}).then(function(stdout){ 
        console.log(stdout)
    	})
    })
})
