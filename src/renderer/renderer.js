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

var videojs 		= require('video.js');						//video js 
//var videojsChromecast = 
require("videojs-chromecast");
require('videojs-select-subtitle');								// The actual plugin function is exported by this module, but it is also  attached to the `Player.prototype`; so, there is no need to assign it  to a variable. 
var _				= require('underscore');
//https://github.com/vankasteelj/opensubtitles-api
var OpenSubtitles 	= require('opensubtitles-api');       		//for subtitles
//create new instance
var OS 				= new OpenSubtitles('Butter');
//packages
var topbar 		= require('./../packages/topbar.js');
var util_tools	= require('./../packages/util.js');
var folder_list = require('./../packages/folder_list.js');
var subs_search = require('./../packages/subs_search.js');
var player 		= require('./../packages/player.js');



var clicked_element;

document.onreadystatechange =  () => {
	if (document.readyState == "complete") {
		topbar.createTopBar();
	}
};

//https://webtorrent.io/intro
//https://github.com/webtorrent/webtorrent-desktop/blob/master/src/renderer/webtorrent.js