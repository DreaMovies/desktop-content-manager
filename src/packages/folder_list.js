var getOSFolder = function (name){
	return ipcRenderer.getPath(name);
};


var readFolder = function (url_path, isOS = false) {
	console.log(url_path);
	var realPath = "";
	var elements_list = "";

	if( isOS ){
		realPath = app.getPath(url_path);//getOSFolder(url_path);
	} else {
		realPath = url_path;
	}
	realPath = path.resolve(realPath).replace(/\\/g, '/') + '/';

	fs.readdir(realPath, (err, files) => {
		'use strict';
		if (err) throw  err;
		//Dynamically add <ol> tags to the div
		document.getElementById('dynamic-content').innerHTML = '';



		var split_path = realPath;
		if(split_path.split('/').length == 1){
			if(split_path.substr(split_path.length - 1) != '\\'){
				split_path = split_path + '\\';
			}
			split_path = split_path.split('\\');

		} else {
			if(split_path.substr(split_path.length - 1) != '/'){
				split_path = split_path + '/';
			}
			split_path = split_path.split('/');
		}

		var conc_link = "";
		var link_html = split_path[split_path.length-2] + " <div class='sub header'><div class='ui breadcrumb'>";
		var path_length = split_path.length;

		for (var i = 0; i < path_length-1; i++) {
			conc_link +=  split_path[i] + "/";
			if( i < path_length-2 ) {
				link_html += "<a class='section path-link' onclick='folder_list.readFolder(\"" + conc_link + "\")'>" + split_path[i] + "</a><span class='divider'>/</span>";
			} else {
				link_html += "<a class='active section path-link' onclick='folder_list.readFolder(\"" + conc_link + "\")'>" + split_path[i] + "</a>";
			}
		}
		link_html += "</div></div>";



		//create html for table list
		document.getElementById('dynamic-content').innerHTML = ''+
					'<div id="folder-list" class="show-content">' +
					'	<h3 class="ui header">' +
					'		<i class="plug icon"></i>' +
					'		<div class="content" id="folder-path">' + link_html + '</div>' +
					'	</h3>' +
					'	<table class="ui selectable celled striped table" id="listed-files">' +
					'		<thead>' +
					'			<tr>' +
					'				<th class="ten wide">File</th>' +
					'				<th class="two wide">Type</th>' +
					'				<th class="one wide">Season Episode</th>' +
					'				<th class="one wide">Quality</th>' +
					'				<th class="two wide">Size</th>' +
					'			</tr>' +
					'		</thead>' +
					'		<tbody id="path-list"></tbody>' +
					'	</table>' +
					'</div>';

		for (let file of files) {
			fs.stat(realPath + file, (err, stats) => {
				/*
				 * When you double click on a folder or file, we need to obtain the realPath and name so that we can use it to take action. The easiest way to obtain the realPath and name for each file and folder, is to store that information in the element itself, as an ID. this is possible since we cannot have two files with the same name in a folder. fullPath variable below is created by concatenating the realPath with file name and a / at the end. As indicated earlier, we must have the / at the end of the realPath.
				 */

				let fullPath = realPath + file;
				
				var show_info = "";
				var element_details = { type: "", name: "", year: "", quality: "", season: "", episode: "" };

				var element_details = util_tools.fileInfo(file, stats.isDirectory(), fullPath);
				if( element_details.type == "show" ){
					show_info = "S" + element_details.season + " E" + element_details.episode;
				}
				if (err) throw err;
				if (stats.isDirectory()) {
					fullPath += '/';
					elements_list = "<tr ondblclick='folder_list.readFolder(\"" + fullPath + "\")' class='list-item list-folder'>"+
									"		<td alt='" + file + "' title='" + file + "' data-url='" + fullPath + "' data-name='" + file + "'><i class='folder icon'></i> " + ( element_details.name != '' ?  element_details.name : file ) + "<small style='float:right'>" + file + "</small></td>"+
									"		<td class='right aligned'> " + element_details.type + "</td>"+
									"		<td class='right aligned'> " + show_info + "</td>"+
									"		<td class='right aligned'> " + element_details.quality + "</td>"+
									"		<td class='right aligned collapsing'></td>"+
									"	</tr>";
				} else {
					elements_list = "<tr ondblclick='folder_list.openFile(\"" + fullPath + "\")' class='list-item list-file'>"+
									"		<td alt='" + file + "' title='" + file + "' data-url='" + fullPath.substr(0, fullPath.lastIndexOf('/')) + "/' data-name='" + file + "'><i class='file " + util_tools.fileType(fullPath) + " outline icon'></i> " + ( element_details.name != '' ?  element_details.name : file ) + "<small style='float:right'>" + file + "</small></td>"+
									"		<td class='right aligned'> " + element_details.type + "</td>"+
									"		<td class='right aligned'> " + show_info + "</td>"+
									"		<td class='right aligned'> " + element_details.quality + "</td>"+
									"		<td class='right aligned'> " + util_tools.humanFileSize(stats.size, true) + "</td>"+
									"	</tr>";
				}
				document.getElementById('path-list').insertAdjacentHTML('beforeend', elements_list);
			});

		}
	});
};

//open the file with the default application
var openFile = function (url_path) {
	if(util_tools.fileType(url_path) == "video"){
		player.play(url_path);
	} else {
		shell.openItem(url_path);
	}
};


//open the file with the default application
var refreshFolder = function (path) {
	readFolder(path);
};

module.exports = {
	openFile: openFile,
	getOSFolder: getOSFolder,
	readFolder: readFolder,
	refreshFolder: refreshFolder
}