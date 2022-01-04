
const Router = require('koa-router');
const router = new Router();
router.prefix('/jp');
const fs = require('fs');
const { mkdir, dlFile } = require('../utils/formathtml');

router.get('/getAllList', async function (ctx, next) {
    const album = fs.readdirSync('./assets/conAlbums');
    const single = fs.readdirSync('./assets/conSingles');
    const songs = fs.readdirSync('./assets/allLrc/record');
    ctx.body = {
        album,
        single,
        songs
    }
});

router.post('/getRawJson', async function (ctx, next) {
    const { folder, name } = ctx.request.body;
    const data = fs.readFileSync(`./assets/${folder || 'songs'}/${name}`).toString()
    ctx.body = data;
});


const formatSingle = (res) => {
    res.group = res.group.map(item => {
        let arr = item.version.split('(');
        if (item.version.indexOf('（') > -1) {
            arr = item.version.split('（');
        }
        item.version = arr[0];
        if (arr.length > 1) {

            if (arr.lengh > 2) {
                item.disk = [arr[1].replace(')', '').replace('）', ''), arr[2].replace(')', '').replace('）', '')]
            } else {
                item.disk = [arr[1].replace(')', '').replace('）', '')]
            }
        }
        return item
    })

    return JSON.stringify(res, null, 4);
}

router.get('/format1', async function (ctx, next) {
    const folder = ctx.query.folder || 'album';
    const list = fs.readdirSync('./' + folder);
    if (list)
        list.map(name => {
            const data = fs.readFileSync(`./ConAlbum/${name}`).toString()
            const content = formatSingle(JSON.parse(data));
            if (content)
                fs.writeFile(`./conAlbums/${name}`, content, (err) => {
                    if (err) {
                        flag = false
                        return console.log('err', name)
                    }
                });
        })
    ctx.body = { list };
});

router.post('/upload', async function (ctx, next) {
    const list = ctx.request.body;
    const Map = { dir: [], song: [] }
    list.map(item => {
        const neName = item.filename || (item.name.replace('?', "？").replace(/！/g, "!").replace('/', '╱') + '.json')
        const flag = dlFile('./assets/filetmp/' + neName, JSON.stringify(item, null, 4))
        if (!flag) {
            Map.song.push(item.name)
        }
    })
    ctx.body = Map;
});

router.post('/moveFiles', async function (ctx, next) {
    const list = ctx.request.body;
    const errSong = [];
    list.map(ls => {
        ls.map(item => {
            mkdir(item.folder);
            fs.rename(item.sourceFile, item.destPath, function (err) {
                if (err) {
                    errSong.push(item.destPath);
                    throw err
                };
                fs.stat(item.destPath, function (err, stats) {
                    if (err) throw err;
                    console.log('stats: ' + JSON.stringify(stats));
                });
            });
        })
    })
    ctx.body = { errSong };
});


router.post('/getFileList', async function (ctx, next) {
    const list = ctx.request.body;
    const files = [];
    list.map(path => {
        const album = fs.readdirSync('./assets/' + path);
        files.push(album);
    })
    ctx.body = files;
});

module.exports = router;
