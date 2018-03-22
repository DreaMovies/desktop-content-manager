var createTopBar = function() {
	// Always on Top
	document.getElementById("app-pin").addEventListener("click", (e) => {

		var win = BrowserWindow.getFocusedWindow();

		var btn = document.getElementById('app-pin');
		var class_list = btn.getElementsByTagName('i')[0].classList;

		if(class_list.value.includes("open")){
			// "floating" + 1 is higher than all regular windows, but still behind things 
			// like spotlight or the screen saver
			win.setAlwaysOnTop(true, "floating", 1);
			// allows the window to show over a fullscreen window
			win.setVisibleOnAllWorkspaces(true);

			btn.getElementsByTagName('i')[0].className = "lock icon";
		} else {
			// "floating" + 1 is higher than all regular windows, but still behind things 
			// like spotlight or the screen saver
			win.setAlwaysOnTop(false);
			// allows the window to show over a fullscreen window
			win.setVisibleOnAllWorkspaces(false);

			btn.getElementsByTagName('i')[0].className = "lock open icon";
		}
	});
	


	// Minimize task
	document.getElementById("app-minimize").addEventListener("click", (e) => {
		var app_window = BrowserWindow.getFocusedWindow();
		app_window.minimize();
	});
	// Maximize window
	document.getElementById("app-maximize").addEventListener("click", (e) => {
		var app_window = BrowserWindow.getFocusedWindow();
		if( app_window.isMaximized() ){
			app_window.unmaximize();
			document.getElementById("app-maximize").getElementsByTagName('i')[0].className = "window maximize icon";
		} else {
			app_window.maximize();
			document.getElementById("app-maximize").getElementsByTagName('i')[0].className = "window restore icon";
		}
	});
	// Close app
	document.getElementById("app-close").addEventListener("click", (e) => {
		var app_window = BrowserWindow.getFocusedWindow();
		app_window.close();
	});
}

var toggleSidebar = function(){
	console.log("Sidebar Toggle");
	$(".sidebar-menu").toggleClass("one wide four wide sidebar-expanded");
	$(".content-list").toggleClass("twelve wide fifteen wide");

};

module.exports = {
	createTopBar: createTopBar,
	toggleSidebar: toggleSidebar
}