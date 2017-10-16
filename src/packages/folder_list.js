module.exports = {

	getOSFolder: function (name){
		return ipcRenderer.getPath(name);
	},

	readFolder: function (path, isOS = false) {
		console.log(path);
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
			var link_html = split_path[split_path.length-2] + " <div class='sub header'><div class='ui breadcrumb'>";
			var path_length = split_path.length;

			for (var i = 0; i < path_length-1; i++) {
				conc_link +=  split_path[i] + "/";
				if( i < path_length-2 ) {
					link_html += "<a class='section path-link' onclick='folder_list.readFolder(\"" + conc_link + "\")'>" + split_path[i] + "</span><span class='divider'>/</span>";
				} else {
					link_html += "<a class='active section path-link' onclick='folder_list.readFolder(\"" + conc_link + "\")'>" + split_path[i] + "</span>";
				}
			}
			link_html += "</div></div>"; 

			document.getElementById('folder-path').innerHTML = link_html;

			for (let file of files) {
				fs.stat(realPath + file, (err, stats) => {
					/**
					 *When you double click on a folder or file, we need to obtain the realPath and name so that we can use it to take action. The easiest way to obtain the realPath and name for each file and folder, is to store that information in the element itself, as an ID. this is possible since we cannot have two files with the same name in a folder. fullPath variable below is created by concatenating the realPath with file name and a / at the end. As indicated earlier, we must have the / at the end of the realPath.
					 *
					 */
					let fullPath = realPath + file;
					if (err) throw err;
					if (stats.isDirectory()) {
						/**
						 * Add an ondblclick event to each item. With folders, call this same function (recursion) to read the contents of the folder. If its a file, call the openFile function to open the file with the default app.
						 *
						 */
						fullPath += '/'; 
						document.getElementById('path-list').innerHTML += "<tr ondblclick='folder_list.readFolder(\"" + fullPath + "\")' class='list-item list-folder'>"+
																		"		<td data-url='" + fullPath + "' data-name='" + file + "'><i class='folder icon'></i> " + file + "</td>"+
																		"		<td class='right aligned collapsing'></td>"+
																		"	</tr>";
					} else {
						document.getElementById('path-list').innerHTML += "<tr ondblclick='folder_list.openFile(\"" + fullPath + "\")' class='list-item list-file'>"+
																		"		<td data-url='" + fullPath.substr(0, fullPath.lastIndexOf('/')) + "/' data-name='" + file + "'><i class='file " + util_tools.fileType(fullPath) + " outline icon'></i> " + file + "</td>"+
																		"		<td class='right aligned'> " + util_tools.humanFileSize(stats.size, true) + "</td>"+
																		"	</tr>";
					}
				});
			}
		});
	},

	//open the file with the default application
	openFile: function (path) {
		shell.openItem(path);
	}
}