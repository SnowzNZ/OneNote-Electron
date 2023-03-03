const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

Menu.setApplicationMenu(null);

function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: true,
      partition: "persist:default",
    },
  });

  win.setBackgroundColor("#FFF");

  win.loadURL(
    "https://www.onenote.com/notebooks?wdorigin=%20ondchrd&auth=2&nf=1",
    {
      userAgent: "Chrome",
    }
  );
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", (event, navigationUrl) => {
    event.preventDefault();
    contents.loadURL(navigationUrl);
  });
});
