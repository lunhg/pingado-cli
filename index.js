let program = require('commander');
 
program
  .version('0.0.1')
  .command('create [project]', 'Downloads pingado-boilerplate as new project')
  .command('env [--options[k,v]]', 'setup .env file in current directory')
  .command('generate [type] [model|controller|view] [UpercaseName]', 'setup MVC structure with provided database type (defaults to type=mongoose for model and controllers; type=vue-pug for views)')
  .parse(process.argv);
