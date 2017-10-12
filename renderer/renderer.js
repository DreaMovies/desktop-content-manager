const {shell} = require('electron');

const ipcRenderer = require('electron').ipcRenderer;

const fs = require('fs');
/**
 * We create an object from electron module. The shell object allows us to open the selected file
 */



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
		console.log(realPath);
		split_path = split_path.split("/");
		console.log(split_path.length);
		var conc_link = "";
		var link_html = "";
		var pathLength = split_path.length;
		for (var i = 0; i < pathLength-1; i++) {
			console.log(split_path[i]);
			conc_link +=  split_path[i] + "/";
			link_html += `<span id="${conc_link}" onclick="readFolder(this.id)" class="path-link">${split_path[i]}</span>/`;
		}

		document.getElementById('folder-path').innerHTML = link_html;

		for (let file of files) {
			fs.stat(realPath + file, (err, stats) => {
				/**
				 *When you double click on a folder or file, we need to obtain the realPath and name so that we can use it to take action. The easiest way to obtain the realPath and name for each file and folder, is to store that information in the element itself, as an ID. this is possible since we cannot have two files with the same name in a folder. theID variable below is created by concatenating the realPath with file name and a / at the end. As indicated earlier, we must have the / at the end of the realPath.
				 *
				 */
				let theID = `${realPath}${file}/`;
				if (err) throw err;
					console.log(stats);
				if (stats.isDirectory()) {
					/**
					 * Add an ondblclick event to each item. With folders, call this same function (recursion) to read the contents of the folder. If its a file, call the openFile function to open the file with the default app.
					 *
					 */
					document.getElementById('path-list').innerHTML += `<tr id=${theID} ondblclick="readFolder(this.id)" class="list-item list-folder"><td class="collapsing"><i class="folder icon"></i> ${file}</td>
							<td class="right aligned collapsing"></td>
						</tr>`;
				} else {
					document.getElementById('path-list').innerHTML += `<tr id=${theID} ondblclick="openFile(this.id)" class="list-item list-file"><td><i class="file outline icon"></i> ${file}</td>
							<td class="right aligned">` + humanFileSize(stats.size, true) + `</td>
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