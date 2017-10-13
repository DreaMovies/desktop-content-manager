const {shell, remote} = require('electron');
const {BrowserWindow} = require('electron').remote; 		// Retrieve remote BrowserWindow
const {Menu, MenuItem} = remote;
const menu = new Menu();
var path = require('path');

const ipcRenderer = require('electron').ipcRenderer;

const fs = require('fs');

//https://github.com/vankasteelj/opensubtitles-api
var OpenSubtitles = require('opensubtitles-api');       //for subtitles
var OS = new OpenSubtitles('Butter');
var request = require('request');                       //to make http requests
var zlib = require('zlib');                             //to read zipped files
var iconv = require('iconv-lite');                      //to recode files
const openload = require('node-openload');              //to upload files to openload 

/**
 * We create an object from electron module. The shell object allows us to open the selected file
 */
var clicked_element;


function getOSFolder(name){
	return ipcRenderer.getPath(name);
}

function readFolder(path, isOS = false) {
	var realPath = "";
	if( isOS ){
		realPath = getOSFolder(path);
	} else {
		realPath = path;
	}

	fs.readdir(realPath, (err, files) => {
		'use strict';
		if (err) throw  err;
		//Dynamically add <ol> tags to the div
		document.getElementById('path-list').innerHTML = ``;

		var split_path = realPath;
		split_path = split_path.split("/");

		var conc_link = "";
		var link_html = `${split_path[split_path.length-2]}<div class="sub header">
							<div class="ui breadcrumb">`;
		var pathLength = split_path.length;

		for (var i = 0; i < pathLength-1; i++) {
			conc_link +=  split_path[i] + "/";
			if( i < pathLength-2 ) {
				link_html += `<a class="section path-link" id="${conc_link}" onclick="readFolder(this.id)">${split_path[i]}</span><span class="divider">/</span>`;
			} else {
				link_html += `<a class="active section path-link" id="${conc_link}" onclick="readFolder(this.id)">${split_path[i]}</span>`;
			}
		}
		link_html += `		</div>
						</div>`; 

		document.getElementById('folder-path').innerHTML = link_html;

		for (let file of files) {
			fs.stat(realPath + file, (err, stats) => {
				/**
				 *When you double click on a folder or file, we need to obtain the realPath and name so that we can use it to take action. The easiest way to obtain the realPath and name for each file and folder, is to store that information in the element itself, as an ID. this is possible since we cannot have two files with the same name in a folder. theID variable below is created by concatenating the realPath with file name and a / at the end. As indicated earlier, we must have the / at the end of the realPath.
				 *
				 */
				let theID = `${realPath}${file}/`;
				if (err) throw err;
				if (stats.isDirectory()) {
					/**
					 * Add an ondblclick event to each item. With folders, call this same function (recursion) to read the contents of the folder. If its a file, call the openFile function to open the file with the default app.
					 *
					 */
					document.getElementById('path-list').innerHTML += `<tr id=${theID} ondblclick="readFolder(this.id)" class="list-item list-folder">
																			<td><i class="folder icon"></i> ${file}</td>
																			<td class="right aligned collapsing"></td>
																		</tr>`;
				} else {
					document.getElementById('path-list').innerHTML += `<tr id=${theID} ondblclick="openFile(this.id)" class="list-item list-file">
																			<td><i class="file outline icon"></i> ${file}</td>
																			<td class="right aligned">${humanFileSize(stats.size, true)}</td>
																		</tr>`;
				}
			});
		}
	});
}
//open the file with the default application
function openFile(path) {
	shell.openItem(path);
}

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
			console.log(clicked_element); 
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
			console.log(clicked_element); 
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