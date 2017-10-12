const {app,BrowserWindow,Menu,MenuItem} = require('electron');
var path = require('path');
const ipcMain = require('electron').ipcMain;

app.on('ready', event => {
	'use strict';
	const win = new BrowserWindow({
					titleBarStyle: 'true',
					width: 1280,
					height: 800,
					minWidth: 800,
					minHeight: 600,
					backgroundColor: '#312450',
					show: true,
					icon: path.join(__dirname, 'public/icons/png/64x64.png')
				});

	win.loadURL(`file://${__dirname}/html/index.html`);
});
/*/create a new menu object and populate it with menu items.
const menu = new Menu();

menu.append(new MenuItem({
	label: 'Search for Subtitles',
	click () { require('electron').shell.openExternal('https://electron.atom.io') }
}));

menu.append(new MenuItem({label: 'New Folder'}));
menu.append(new MenuItem({label: 'New Document'}));
menu.append(new MenuItem({label: 'Open Terminal'}));
menu.append(new MenuItem({label: 'New Properties'}));

app.on('browser-window-created', (event, win) => {
	'use strict';
	//A callback that takes the coordinates of where you clicked and displays the menu there
	win.webContents.on('context-menu', (e, params) => {
		menu.popup(win, params.x, params.y);

	}, false);
});*/