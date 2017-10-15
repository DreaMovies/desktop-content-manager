const {shell, remote} = require('electron');
const {BrowserWindow} = require('electron').remote; 		// Retrieve remote BrowserWindow
const {Menu, MenuItem} = remote;
const menu = new Menu();
var path = require('path');

const fs = require('fs');

//https://github.com/vankasteelj/opensubtitles-api
var OpenSubtitles = require('opensubtitles-api');       //for subtitles
var OS = new OpenSubtitles('Butter');


var request = require('request');                       //to make http requests
var zlib = require('zlib');                             //to read zipped files
var iconv = require('iconv-lite');                      //to recode files

var ipcRenderer = require('electron').ipcRenderer;




var folder_list = require('./../packages/folder_list.js');
var subs_search = require('./../packages/subs_search.js');

//packages

/**
 * We create an object from electron module. The shell object allows us to open the selected file
 */
var clicked_element;

function humanFileSize(bytes, si) {
	var thresh = si ? 1000 : 1024;
	if(Math.abs(bytes) < thresh) {
		return bytes + ' B';
	}
	var units = si
		? ['kB','MB','GB','TB','PB','EB','ZB','YB']
		: ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
	var u = -1;
	do {
		bytes /= thresh;
		++u;
	} while(Math.abs(bytes) >= thresh && u < units.length - 1);
	return bytes.toFixed(1)+' '+units[u];
}

function createNotification(title, body){
	let myNotification = new Notification(title, {
		body: body,
		icon: path.join(__dirname, './../public/icons/png/64x64.png')
	})

	myNotification.onclick = () => {
		console.log('Notification clicked')
	}
}



function createContextMenu(){

	menu.append(new MenuItem({
		label: 'Create Info in DreaMovies', 
		click(menuItem, browserWindow, event) {
			console.log(clicked_element); 
		}
	}));
	menu.append(new MenuItem({
		label: 'Get Subtitles', 
		click(menuItem, browserWindow, event) {
			subs_search.getSubtitle( clicked_element.getAttribute("data-name"), clicked_element.getAttribute("data-url"));
		}
	}));
	menu.append(new MenuItem({type: 'separator'}));
	menu.append(new MenuItem({
		label: 'Download', 
		click(menuItem, browserWindow, event) {
			console.log(clicked_element); 
		}
	}));
	menu.append(new MenuItem({
		label: 'Upload', 
		click(menuItem, browserWindow, event) {
			ipcRenderer.send('file_upload', clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name"));
			ipcRenderer.on('upload_status', (event, arg) => {
				console.log(arg); // prints "pong"
			});
			//openload_upload.fileUpload(  clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name") );
		}
	}));
	menu.append(new MenuItem({type: 'separator'}));
	menu.append(new MenuItem({
		label: 'Delete', 
		click(menuItem, browserWindow, event) {
			console.log(clicked_element); 
		}
	}));

	window.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		clicked_element = e.target;
		menu.popup(remote.getCurrentWindow());
	}, false);
}


function init() {
	// Minimize task
	document.getElementById("app-minimize").addEventListener("click", (e) => {
		var window = BrowserWindow.getFocusedWindow();
		window.minimize();
	});

	// Maximize window
	document.getElementById("app-maximize").addEventListener("click", (e) => {
		var window = BrowserWindow.getFocusedWindow();
		if(window.isMaximized()){
			window.unmaximize();
			document.getElementById("app-maximize").getElementsByTagName('i')[0].className = "window maximize icon";
		}else{
			window.maximize();
			document.getElementById("app-maximize").getElementsByTagName('i')[0].className = "window restore icon";
		}
	});
	// Close app
	document.getElementById("app-close").addEventListener("click", (e) => {
		var window = BrowserWindow.getFocusedWindow();
		window.close();
	});
};

document.onreadystatechange =  () => {
	if (document.readyState == "complete") {
		init();
	}
};

//https://webtorrent.io/intro
//https://github.com/webtorrent/webtorrent-desktop/blob/master/src/renderer/webtorrent.js