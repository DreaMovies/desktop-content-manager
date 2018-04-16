
//"zlib": "latest",
const electron 		= require('electron');
const shell	   		= require('electron');
// Module to control application life.
const app 			= electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path 			= require('path');
const url 			= require('url');


var ipcMain 		= require('electron').ipcMain;

const fs      		= require('fs');

//const autoUpdater = require('electron-updater');
var app_config 		= {};


const openload 		= require('node-openload');              //to upload files to openload

var ol = openload({
	api_login: 'a64a34a4c8e16c20',
	api_key: 'umPGoUXZ',
});

//var openload_upload = require('./../plugins/openload_upload.js');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
	
	fs.readFile('./src/settings.json', 'utf8', function (err, json) {
			if (!err) {
				app_config = JSON.parse(json);
			}
	});

	// Create the browser window.
	mainWindow = new BrowserWindow({
					titleBarStyle: 'hidden', 
					frame: false, 
					show: true,
					resizable: false,
					movable: false,
					width: 325,
					height: 400,
					minWidth: 325,
					minHeight: 400,
					backgroundColor: app_config.backgroundColor || "#232e4e",
					icon: path.join(__dirname, '/src/public/icons/png/64x64.png')
				});

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '/src/views/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	mainWindow.webContents.on('new-window', function(e, url) {
		e.preventDefault();
	});

	//get new size to save on file
	mainWindow.on('resize', function(e) {
		var window_size = mainWindow.getSize();

		app_config.window.width  = window_size[0],
		app_config.window.height = window_size[1],
		fs.writeFile('./src/settings.json', JSON.stringify(app_config), 'utf8', function(err) {
			err
		});
	});

    /*
//prevent external navigations inside app
	const _openInExternal = function(link) {
		let protocol = url.parse(link).protocol;
		if (protocol === 'http:' || protocol === 'https:') {
			electron.openExternal(link);
			return true;
		} else {
			return false;
		}
    }
	webview.addEventListener('will-navigate', function(event) {
		if (_openInExternal(e.url)) {
			webview.stop();
		}
	});*/

}


app.on('web-contents-created', function(event, contents) {
	if (contents.getType() == 'webview') {
		contents.on('will-navigate', function(event, url) {
			event.preventDefault();
			shell.openExternal(url);
		});
	}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



ipcMain.on('file_upload', function(event, path) {
	ol.upload({
		file: path,
		folder: "4349015"
	}).then(info => {
			console.log(info);
			event.sender.send('upload_status', info);
		}
	);   // Prints upload info
});


//resize window after loading Animation
ipcMain.on('end_loading', function(event) {

console.log(app_config.width);


	mainWindow.setSize(app_config.width || 1280, app_config.height || 800, true);
	mainWindow.setMinimumSize(app_config.minWidth || 800, app_config.minHeight || 600);
	mainWindow.setResizable(true);
	mainWindow.setMovable(true);
	mainWindow.center();

});





/**
 * Autoupdater on update available
 *
autoUpdater.on('update-available', info => { // eslint-disable-line no-unused-vars
	log.info('Updater: Update available, info follows');
	log.info(info);
	updateInfo = info;
	win.loadURL(`file://${__dirname}/../renderhtml/releasenotes.html`);
	dialog.showMessageBox({
		type: 'info',
		buttons: [],
		title: 'New update available.',
		message: 'Press OK to download the update, and the application will download the update and then tell you when its done.'
	});
});

/**
 * Autoupdater on downloaded
 *
autoUpdater.on('update-downloaded', (event, info) => { // eslint-disable-line no-unused-vars
	const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Media Mate Update Downloaded',
		message: `New Media Mate version!`,
		detail: 'A new version has been downloaded. Restart the application to apply the updates.'
	};
	log.info('Updater: Update downloaded, info follows');
	log.info(event);
	log.info(info);
	dialog.showMessageBox(dialogOpts, response => {
		if (response === 0) {
			autoUpdater.quitAndInstall();
		}
	});
});

/**
 * Autoupdater if error
 *
autoUpdater.on('error', error => {
	dialog.showMessageBox({
		type: 'info',
		buttons: [],
		title: 'Update error!',
		message: `Sorry, we've had an error. Please open an issue on github if this continues to be a problem!`
	});
	if (!isDev) {
		Raven.captureException(error);
	}
});

/**
 * Emitted on autoupdate progress.

autoUpdater.on('download-progress', percent => {
	log.info(`Update ${percent.percent}% downloaded`);
	win.setProgressBar(percent.percent);
}); */