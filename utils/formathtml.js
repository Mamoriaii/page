
const fetch = require('node-fetch')
const fs = require('fs');

function Uint8ArrayToString(fileData) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString
}

function buf2str2(buffer) {
    const dd = new Uint8Array(buffer);
    try {
        let encodedString = Uint8ArrayToString(dd);
        let decodedString = decodeURIComponent(escape(encodedString));//没有这一步中文会乱码
        return decodedString
    } catch (error) {
        return false;
    }
}

async function useHtml(path = '/artist-11010.html') {
    return fetch(`http://localhost:3000/tlrc/${path}`).then(res => res.arrayBuffer()).then(buff => buf2str2(buff))
}

const dirCache = {};
function mkdir(filepath) {
    try {
        let dir = filepath;
        if (!fs.existsSync(dir)) {
            dirCache[dir] = true;
            fs.mkdirSync(dir);
            return true;
        }
        return false;
    } catch (error) {
        console.log('err_____', filepath);
        return false;
    }
}

const dlFile = (path, content) => {
    let flag = true
    fs.writeFile(path, content, (err) => {
        if (err) {
            flag = false
            return console.log('errrr____________________err', path)
        }
    });
    return flag
}
module.exports = {
    useHtml,
    mkdir,
    dlFile
}