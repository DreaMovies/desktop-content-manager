//https://github.com/vankasteelj/opensubtitles-api

//to read and write files in the system
var fs = require('fs');

//path to the tests folder
var listFolder = './teste/';


fs.readdirSync(listFolder).forEach(folder => {

    console.log(folder);

});