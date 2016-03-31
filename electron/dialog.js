var remote = require('remote');
var fs = require('fs');
var app = remote.app;
var Dialog = remote.require('dialog');
var browserWindow = remote.require('browser-window');
var FocusedWindow = browserWindow.getFocusedWindow();
var packagejson = require('./package.json');

function dialogOpenFile() {
    Dialog.showOpenDialog(FocusedWindow, {
        title: 'Open Dialog',
        filters: [
            {name: 'Documents', extensions: ['txt', 'md']},
        ],
        properties: ['openFile']
    }, function (item) {
        if (item) {
            openFile(item[0]);
        }
    });
}

function dialogSaveAs() {
    Dialog.showSaveDialog(FocusedWindow, {
        title: 'Save Dialog',
        filters: [
            {name: 'Markdown file', extensions: ['md']},
            {name: 'Text file', extensions: ['txt']},
        ],
    }, function (item, focusedWindow) {
        if (item) {
            saveAsFile(item);
        }
    });
}

function dialogAbout() {
    Dialog.showMessageBox(FocusedWindow, {
        title: 'About',
        type: 'none',
        buttons: ['OK'],
        detail: packagejson.name + "\n" + packagejson.version + "\n" + packagejson.description
    });
}

function dialogCloseModifyFile() {
    var response = 0;

    // 同期的
    response = Dialog.showMessageBox(FocusedWindow, {
        title: packagejson.name,
        type: 'warning',
        buttons: ['Yes', 'No', 'Cancel'],
        detail: "Wolud you like to save changes?",
    });

    return response;
}