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