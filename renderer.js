const { ipcRenderer } = require('electron');
const qrcode = require('qrcode');

var canvas = document.getElementById('canvas');
var correspMobileClientLink = '';

ipcRenderer.on('refer', (e, msg) => {
    correspMobileClientLink = msg;
    var linkSpan = document.getElementById('link-span');
    linkSpan.innerText = correspMobileClientLink;
    qrcode.toCanvas(canvas, correspMobileClientLink, (error)=>{
        if (error) {
            var qrerror = document.getElementById('qrerror');
            qrerror.className = "text-break alert alert-danger py-1";
            qrerror.style = "font-size: small; text-align: center";
            qrerror.innerText = "二维码绘制出错，重启app试试";
        }
    })
})

var copylinkdiv = document.getElementById('copy-link-div');
copylinkdiv.addEventListener('click', () => {
    navigator.clipboard.writeText(correspMobileClientLink);
})