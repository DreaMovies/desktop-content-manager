var extension_map = {
	'archive': ['zip', 'rar', 'gz', '7z'],
	'text': ['txt', 'md', '', 'srt', 'vtt', 'json'],
	'image': ['jpg', 'jpge', 'png', 'gif', 'bmp'],
	'pdf': ['pdf'],
	'code': ['html', 'css', 'js'],
	'word': ['doc', 'docx'],
	'powerpoint': ['ppt', 'pptx'],
	'video': ['mkv', 'avi', 'rmvb', 'mp4', 'flv', 'wmv', 'mpeg'],
	'audio': ['mp3', 'ogg', 'm4a', 'flac', 'wav', 'wma', 'webm', '3gp', 'aac']
};

var cached = {};

var fileType = function(filepath) {
	var result; /* = {
		name: path.basename(filepath),
		path: filepath,
	};*/

	try {
		var stat = fs.statSync(filepath);
		if (stat.isDirectory()) {
			return ""; //result.type = 'folder';
		} else {
			var ext = path.extname(filepath).substr(1);
			result = cached[ext];
			if (!result) {
				for (var key in extension_map) {
					if (_.include(extension_map[key], ext)) {
						cached[ext] = result = key;
						break;
					}
				}

				if (!result)
					result = 'blank';
			}
		}
	} catch (e) {
		console.error(e);
	}
	return result;
};

var humanFileSize = function(bytes, si) {
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
};

var createNotification = function(title, body){
	let myNotification = new Notification(title, {
		body: body,
		icon: path.join(__dirname, './../public/icons/png/64x64.png')
	})

	myNotification.onclick = () => {
		console.log('Notification clicked')
	}
};

	/**
	 * We create an object from electron module. The shell object allows us to open the selected file
	 */
var createContextMenu = function(){
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
	menu.append(new MenuItem({
		label: 'Get Subtitles and Create Folder', 
		click(menuItem, browserWindow, event) {
			subs_search.getSubtitleAdvanced( clicked_element.getAttribute("data-name"), clicked_element.getAttribute("data-url"));
		}
	}));
	menu.append(new MenuItem({
		label: 'Play this video', 
		click(menuItem, browserWindow, event) {
			console.log(clicked_element); 
			player.play(clicked_element.getAttribute("data-url") + clicked_element.getAttribute("data-name"));
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
};

var showDynamicContent = function(elementID){
	//document.getElementsByClassName("show-content")[0].classList = "";
	//document.getElementById(elementID).classList = "show-content";
}

var createLoading = function(){
	document.getElementById('dynamic-content').innerHTML = '<div class="boxLoading"></div>';
}

var fileInfo = function(fileName, isDir, path) {
	//a more complex example to see later //TODO 
	//https://regex101.com/r/mR6oD4/1/codegen?language=javascript
	var regex_name_year = /^(.+?)[.( \t]*(?:(19\d{2}|20(?:0\d|1[0-9])).*|(?:(?=bluray|\d+p|brrip|webrip|HDTV)..*)?[.](mkv|avi|mpe?g|mp4)$)/i;
	var regex_season_ep = /[sS]?0*(\d+)?[Ee]0*(\d+)/g;
	var m = "";
	var details = {
		type: "",
		name: "",
		year: "",
		quality: "",
		season: "",
		episode: "",
	};
	var ext = util_tools.fileType(path);

	if ((show_number = regex_season_ep.exec(fileName)) !== null && ( ext == "video" || isDir ) ) {
		details.type = "show";
		details.season =  show_number[1];
		details.episode = show_number[2];
	} else if( isDir ){
		details.type = "folder";
	} else if ( m = regex_name_year.exec(fileName)[3] !== null && ext == "video" ) {
		details.type = "movie";
	} else {
		details.type = "other";
	}
	
	if( fileName.includes("1080p") ){
		details.quality =  "1080p";
	} else if( fileName.includes("720p") ){
		details.quality =  "720p";
	} else if( fileName.includes("480p") ){
		details.quality =  "480p";
	} else if( fileName.includes("HDTV") ){
		details.quality =  "HDTV";
	}

	if ( m = regex_name_year.exec(fileName) ) {
		details.name = m[1].replace(/(^|[. ]+)(\S)/g, function(all, pre, c) { return ((pre) ? ' ' : '') + c.toUpperCase(); });
		details.year = m[2];
	}

	return details;
};


var app_loading = function(){
	console.log(app_config);
	document.getElementById('loading_app').innerHTML = '<h1 class="loading-title">DreaMovies App</h1><div class="boxLoading"></div><div class="app-version">App: 1.0.1RC</div>';

	//Get current app window for resize
	setTimeout(function(app_window){
		document.getElementById('loading_app').classList = "app-hide";
		ipcRenderer.send('end_loading');
		document.getElementById('full_app').classList = "app-show";
	}, 3000);
}

module.exports = {
	showDynamicContent: showDynamicContent,
	fileType: fileType,
	humanFileSize: humanFileSize,
	createNotification: createNotification,
	createContextMenu: createContextMenu,
	createLoading: createLoading,
	fileInfo: fileInfo,

	app_loading: app_loading,
}