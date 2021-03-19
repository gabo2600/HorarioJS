const { app, BrowserWindow } = require('electron')
const path = require('path');
const server = require("./app.js");

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setMenu(null);
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
    let links = document.getElementsByTagName('a')
    let a,i = 0;
    while (links[i]){
        a = links[i]
        //If <a target="_external">, so open using shell.
        if(a.getAttribute('target') == '_external'){
            a.addEventListener('click',(ev => {
                ev.preventDefault();
                let url = a.href;
                shell.openExternal(url);
                a.setAttribute('href', '#');
                return false;
            }))
        }
        console.log(a,a.getAttribute('external'))
        i++;
    }

  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
