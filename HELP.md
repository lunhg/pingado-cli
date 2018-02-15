# Examples

_$CWD is the currenty work directory_

## Create a $CWD/blog folder

  This will install properly npm modules at `$CWD/blog` folder
	
    $ pingado create myBlog
		
## Create a $CWD/blog/.env file with properly database configurations

    $ pingado database --host localhost --port 27017 --user admin --pwd pwd');

## Create a $CWD/blog/app/models/<Model> folder

  This will downloads a [mongoose model boilerplate](https://www.github.com/lunhg/pingado-boilerplate-mongoose-model), setup it according with the model name')

    $ pingado generate mongoose model <Model>

# Create a $CWD/blog/app/controllers/<Controller> folder

  [mongoose controller boilerplate ](https://www.github.com/lunhg/pingado-boilerplate-mongoose-controller) with properly express named routes (GET, POST, PUT and DELETE http methods)

    $ pingado generate mongoose controller <Controller>

# Create a $CWD/blog/app/models/<View> folder

  [mongoose view boilerplate](https://www.gith.com/lunhg/pingado-boilerplate-vue-pug-view) with properly pug.js configuration boosted with vue.js
   
    $ pingado generate vue-pug view <View>
