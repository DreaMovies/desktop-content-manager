const {shell, remote} 	= require('electron');
const {BrowserWindow, Menu, MenuItem} 	= require('electron').remote; 		// Retrieve remote BrowserWindow
//const {} 	= remote;
var path 				= require('path');
var ipcRenderer 		= require('electron').ipcRenderer;
const menu 				= new Menu();

const fs 			= require('fs');
var request 		= require('request');                       //to make http requests
//var zlib 			= require('zlib');                          //to read zipped files
var iconv 			= require('iconv-lite');                    //to recode files
var jQuery			= require("jquery");
var $ 				= jQuery;

var srt2vtt 		= require('srt-to-vtt');

const subtitles 	= [];

var videojs 		= require('video.js');						//video js 
//var videojsChromecast = 
//require("videojs-chromecast");
require('videojs-select-subtitle');								// The actual plugin function is exported by this module, but it is also  attached to the `Player.prototype`; so, there is no need to assign it  to a variable. 
var _				= require('underscore');
//https://github.com/vankasteelj/opensubtitles-api
var OpenSubtitles 	= require('opensubtitles-api');       		//for subtitles
//create new instance
var OS 				= new OpenSubtitles('Butter');
//NEBD - Type 2: Persistent datastore with manual loading
var Datastore = require('nedb');
var db = {};


function getInitialSettings(){
	fs.readFile('./src/settings.json', 'utf8', function (err, json) {
		if (!err) {
			app_config = JSON.parse(json);
		} else {
			app_config = {
				"version": "1.0.0",
				"localStart": "C:/Users/Miguel/Downloads/",
				"localCache": "",
				"title": "DreaMovies Content Management",
				"window": {
					"width": 1280,
					"height": 800,
					"minWidth": 800,
					"minHeight": 600,
					"backgroundColor": "#232e4e"
				},
				"languageList": ["pt", "en", "es"],
				"language": "pt"
			};
		}
		folder_list.readFolder( app_config.localStart );
		return app_config;
	});
}


//packages
var local_DB	= require('./../packages/db.js');
var topbar 		= require('./../packages/topbar.js');
var util_tools	= require('./../packages/util.js');
var folder_list = require('./../packages/folder_list.js');
var subs_search = require('./../packages/subs_search.js');
var player 		= require('./../packages/player.js');

var dreamovie = {};
dreamovie.controler = require('./../packages/dreamovies/controler.js');
dreamovie.view 		= require('./../packages/dreamovies/view.js');

//start loading
util_tools.createLoading();

local_DB.loadDB("list_folder");

var clicked_element;


var app_config = getInitialSettings();


document.onreadystatechange =  () => {
	if (document.readyState == "complete") {
		topbar.createTopBar();
	}
};

//https://webtorrent.io/intro
//https://github.com/webtorrent/webtorrent-desktop/blob/master/src/renderer/webtorrent.js