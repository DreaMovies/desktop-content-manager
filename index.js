
//"zlib": "latest",


const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

var ipcMain = require('electron').ipcMain;

const fs      = require('fs');



const openload = require('node-openload');              //to upload files to openload

var ol = openload({
  api_login: 'a64a34a4c8e16c20',
  api_key: 'umPGoUXZ',
});

//var openload_upload = require('./../plugins/openload_upload.js');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  
  var app_config = {};
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
          width: app_config.width || 1280,
          height: app_config.height || 800,
          minWidth: app_config.minWidth || 800,
          minHeight: app_config.minHeight || 600,
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
  })
}

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