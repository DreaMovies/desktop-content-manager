var getOSFolder = function (name){
	return ipcRenderer.getPath(name);
};

var readFolder = function (path, isOS = false) {
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
		document.getElementById('dynamic-content').innerHTML = '';

		var split_path = realPath;
		split_path = split_path.split("/");

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

		var elements_list = "";

		var show_info = "";
		var element_details = {quality: "", type: ""};
		
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
					elements_list += "<tr ondblclick='folder_list.readFolder(\"" + fullPath + "\")' class='list-item list-folder'>"+
									"		<td data-url='" + fullPath + "' data-name='" + file + "'><i class='folder icon'></i> " + file + "</td>"+
									"		<td class='right aligned collapsing'></td>"+
									"	</tr>";
				} else {
					/*var element_details = util_tools.FileInfo(file);
					if( element_details.typeFile == "show" ){
						show_info = "S" + element_details.season + " E" + element_details.episode;
					}*/
					elements_list += "<tr ondblclick='folder_list.openFile(\"" + fullPath + "\")' class='list-item list-file'>"+
									"		<td data-url='" + fullPath.substr(0, fullPath.lastIndexOf('/')) + "/' data-name='" + file + "'><i class='file " + util_tools.fileType(fullPath) + " outline icon'></i> " + file + "</td>"+
									"		<td class='right aligned'> " + element_details.type + "</td>"+
									"		<td class='right aligned'> " + show_info + "</td>"+
									"		<td class='right aligned'> " + element_details.quality + "</td>"+
									"		<td class='right aligned'> " + util_tools.humanFileSize(stats.size, true) + "</td>"+
									"	</tr>";
				}
			});
		}

		document.getElementById('dynamic-content').innerHTML = `<div id="folder-list" class="show-content">
						<h3 class="ui header">
							<i class="plug icon"></i>
							<div class="content" id="folder-path">${link_html}</div>
						</h3>
						<table class="ui selectable celled striped table" id="listed-files">
							<thead>
								<tr>
									<th class="eight wide">File</th>
									<th class="two wide">Type</th>
									<th class="two wide">Season/Episode</th>
									<th class="two wide">Quality</th>
									<th class="two wide">Size</th>
								</tr>
							</thead>
							<tbody id="path-list">
								${elements_list}
							</tbody>
						</table>
					</div>`;
	});
};

//open the file with the default application
var openFile = function (path) {
	shell.openItem(path);
};

module.exports = {
	openFile: openFile,
	getOSFolder: getOSFolder,
	readFolder: readFolder
}