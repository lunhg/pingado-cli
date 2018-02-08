const cmd = require('../lib/child.js')
const path = require('path');
const fs = require('fs');
const should = require('should')

describe("Pingado Command Line Interface", function(){

    let bin = path.join(__dirname, '..', 'index.js')
    let blog = process.cwd()+'/blog'

    it("should create new application by downloading boilerplate", function(){
	return new Promise(function(resolve, reject){
	    cmd('node '+bin+' create blog').then(function(stdout){
		fs.readdir(path.join(__dirname,'..', 'blog'), function(err, filePaths){
		    if(err) reject(err)
		    filePaths.should.containDeep([ '.gitignore','app','badge.svg','index.js','locales','mocha.opts','package.json','routes','test' ])
		    resolve()
		})
	    })
	})
    })

    it("should create new .env file at blog/ folder", function(){
	return new Promise(function(resolve, reject){
	    fs.readFile(path.join(__dirname, 'pingado.opts'), 'utf8', function(err, opts){
		let opt = opts.split("\n").join(" ")
		let folders = '.gitignore .env app badge.svg index.js locales mocha.opts package.json routes test'.split(' ')
		cmd('node '+bin+' env '+opt, {cwd:blog}).then(function(stdout){
		    fs.readdir(blog, function(err, filePaths){
			if(err) reject(err)
			filePaths.should.containDeep(folders)
			resolve()
		    })
		})
	    })  
	})
    });


    it("should generate model Post", function(){
	return new Promise(function(resolve, reject){
	    return cmd('node '+bin+' generate mongoose model Post', {cwd:blog}).then(function(stdout){
		fs.readdir(blog+'/app/models', function(err, filePaths){
		    if(err) reject(err)
		    filePaths.should.containDeep(['Post'])
		    resolve()
		})
	    })
	})
    })

    it("should generate controller for Post model", function(){
	return new Promise(function(resolve, reject){
	    return cmd('node '+bin+' generate mongoose controller Post', {cwd:blog}).then(function(stdout){
		fs.readdir(blog+'/app/controllers', function(err, filePaths){
		    if(err) reject(err)
		    filePaths.should.containDeep(['Post'])
		    resolve()
		})
	    })
	})
    })

    it("should generate view for Post model", function(){
	return new Promise(function(resolve, reject){
	    return cmd('node '+bin+' generate vue-pug view Post', {cwd:blog}).then(function(stdout){
		console.log(stdout)
		fs.readdir(blog+'/app', function(err, filePaths){
		    if(err) reject(err)
		    console.log(filePaths)
		    filePaths.should.containDeep([
			'views',
			'controllers',
			'models',
			'assets'
		    ])
		})
		fs.readdir(blog+'/app/views', function(err, filePaths){
		    if(err) reject(err)
		    console.log(filePaths)
		    filePaths.should.containDeep([
			'index.pug',
			'layout.pug',
			'error.pug',
			'dashboard.vue',
			'post.vue'
		    ])
		    resolve()
		})
	    })
	})
    })

    it("should install packages", function(){
	return new Promise(function(resolve, reject){
	    return cmd('npm install', {cwd:blog}).then(function(stdout){
		console.log(stdout)
		setTimeout(function(){
		    resolve()
		}, 60000)
	    })
	})
    })
    
    it("should test blog", function(){
	return new Promise(function(resolve, reject){
	    return cmd('npm test', {cwd:blog}).then(function(stdout){
		console.log(stdout)
		setTimeout(function(){
		    resolve()
		}, 60000)
	    })
	})
    })
})
