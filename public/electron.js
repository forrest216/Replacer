const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const isMac = process.platform === 'darwin';

let mainWindow;
let logWindow;
let hiddenWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 750,
        webPreferences: { nodeIntegration: true }
    });

    logWindow = new BrowserWindow({
        width: 750,
        height: 1000,
        parent: mainWindow,
        show: false,
        webPreferences: { nodeIntegration: true }
    });

    mainWindow.loadURL(process.env.DEV ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    logWindow.loadURL(process.env.DEV ? 'http://localhost:3000/log' : `file://${path.join(__dirname, '../build/index.html')}`);

    mainWindow.on('closed', () => mainWindow = null);
    logWindow.on('close', (e) => {
        e.preventDefault();
        logWindow.hide();
    });

    // Mac Menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Menu.setApplicationMenu(mainMenu);
}

const mainMenuTemplate = [
    {
        label: app.name,
        submenu: [
            {label: 'About'},
            {label: 'Quit', accelerator: 'Command+Q', click: () =>  app.quit()},
        ]
    }
]

app.allowRendererProcessReuse = true;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('show-log', (e, args) => {
    logWindow.show();
    logWindow.webContents.send('log-data', args)
});
ipcMain.on('hide-log', (e, arg) => {
    logWindow.hide();
});

// ---------- event listeners ----------

// temporary variable to store data while background
// process is ready to start processing
let cache;

// This event listener will listen for request
// from visible renderer process
ipcMain.on('start_background', (event, args) => {
    const backgroundFileUrl = url.format({
        pathname: path.join(__dirname, `../src/services/backgroundService.html`),
        protocol: 'file:',
        slashes: true,
    });
    hiddenWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    hiddenWindow.loadURL(backgroundFileUrl);

    hiddenWindow.webContents.openDevTools();

    hiddenWindow.on('closed', () => {
        hiddenWindow = null;
    });

    cache = args;
});

// This event listener will listen for data being sent back
// from the background renderer process
ipcMain.on('MESSAGE_FROM_BACKGROUND', (event, args) => {
    mainWindow.webContents.send('MESSAGE_FROM_BACKGROUND_VIA_MAIN', args.message);
});

ipcMain.on('BACKGROUND_READY', (event, args) => {
    event.reply('START_PROCESSING', {
        data: cache,
    });
});