var createTopBar = function() {
	// Minimize task
	document.getElementById("app-minimize").addEventListener("click", (e) => {
		var window = BrowserWindow.getFocusedWindow();
		window.minimize();
	});
	// Maximize window
	document.getElementById("app-maximize").addEventListener("click", (e) => {
		var window = BrowserWindow.getFocusedWindow();
		if( window.isMaximized() ){
			window.unmaximize();
			document.getElementById("app-maximize").getElementsByTagName('i')[0].className = "window maximize icon";
		} else {
			window.maximize();
			document.getElementById("app-maximize").getElementsByTagName('i')[0].className = "window restore icon";
		}
	});
	// Close app
	document.getElementById("app-close").addEventListener("click", (e) => {
		var window = BrowserWindow.getFocusedWindow();
		window.close();
	});
}

var toggleSidebar = function(){

};

module.exports = {
	createTopBar: createTopBar,
	toggleSidebar: toggleSidebar
}