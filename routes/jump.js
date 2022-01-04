
const Router = require('koa-router');
const router = new Router();
const cheerio = require('cheerio')
const fetch = require('node-fetch')
router.prefix('/jump');
const fs = require('fs');
function buf2str(buffer) {
    let encodedString = String.fromCodePoint.apply(null, new Uint8Array(buffer));
    let decodedString = decodeURIComponent(escape(encodedString));//没有这一步中文会乱码
    return decodedString
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
        console.log(filepath);
        return false;
    }
}
function genderAlbumList(html) {

    const $ = cheerio.load(html);

    //#region 处理dom
    let ans = {
        others: [],
        marks: [],
    };

    $('.works-list__item').each((indx, dom) => {
        let title = $(dom).find('.content-title').text().replace(/(^\s*)|(\s*$)/g, "").replace(/[\r\n\t]/g, '').replace(':', '：')
        let id = $(dom).find('.content-description + a').attr('href').replace('/page?id=discoDetail&artist=15&data=', '');
        let descs = $(dom).find('.content-description').text().replace('Release', '').replace(/[\r\n\t ]/g, '')
        // const name = (descs + ' [空] ' + title).replace(/[\\\/]/g, '／')
        const fileName = descs + ' ' + title.replace(/\//g, '╱');
        // ans.marks.push({
        // title,
        // descs,
        // name: name,
        // flag: mkdir(`./files/${name}`)
        // })
        ans.marks.push({ id, title, fileName })
    });
    // ans.others = ans.marks.filter(item => !item.flag).map(item => item.name)
    //#endregion

    return ans;
}

router.get('/single', async function (ctx, next) {
    const url = `https://www.johnnys-net.jp/page?id=disco&artist=15&category=${ctx.query.category || 1}&page=1`;
    // const url = `https://www.johnnys-net.jp/page?id=disco&artist=15&category=4&page=1`
    let html = await fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            console.log('buff')
            return buf2str(buffer);
        })
    ctx.body = {
        code: 0,
        data: (genderAlbumList(html) || {})
    };
});


function genderAlbumInfo(html, file = false) {

    const $ = cheerio.load(html);

    //#region 处理dom
    let ans = {
        name: $('.artist_disco h3').text().replace(/(^\s*)|(\s*$)/g, "").replace(':', '：'),
        imgs: [],
        type: $('.release-date__type').text().replace(/(^\s*)|(\s*$)/g, ""),
        release: $('.release-date__date').text().replace(/(^\s*)|(\s*$)/g, "").replace(' Release', ''),
        list: [],
        ohters: [],
        content: [],
    };
    const __filename = (ans.release + ' ' + ans.name).replace(/\//g, '╱');

    $('.copyright-slider__item').each((indx, dom) => {
        let src = $(dom).find('img').attr('src');
        let pos = $(dom).find('.copyright-slider__title').text().replace(/(^\s*)|(\s*$)/g, "");

        ans.imgs.push({ src, pos })
    });

    $('.link-list__item').each((indx, dom) => {
        let title = $(dom).find('.link-list__title').text().replace(/(^\s*)|(\s*$)/g, "");
        let summary = $(dom).find('.link-list__summary').text().replace(/(^\s*)|(\s*$)/g, "");
        ans.list.push({
            title,
            summary
        })
    });

    const titles = [];
    $('.artist_disco h5').each((indx, dom) => {
        let src = $(dom).text().replace(/(^\s*)|(\s*$)/g, "");
        titles.push(src)
    });

    $('.artist_disco h5 + p').each((indx, dom) => {
        // let src = $(dom).text()
        let src = $(dom).html().replace(/(^\s*)|(\s*$)/g, "").split('<br>');
        ans.content.push({
            title: titles[indx],
            desc: src
        })
    });

    $('.artist_disco div, .artist_disco a, .artist_disco h3, h5 + p,h5').remove();

    ans.ohters = $('.artist_disco').html().split('<br>');

    if (file) {
        const content = JSON.stringify(ans, null, 4);

        fs.writeFile(`./album/${__filename}.json`, content, (err) => {
            if (err) {
                return console.log('err', __filename)
            }
        });
        return true;
    }

    // $('.artist_disco h3').each((indx, dom) => {
    //     let title = $(dom).find('.content-title').text().replace(/(^\s*)|(\s*$)/g, "").replace(/[\r\n\t]/g, '').replace(':', '：')
    //     let descs = $(dom).find('.content-description').text().replace('Release', '').replace(/[\r\n\t ]/g, '')
    //     const name = (descs + ' [空] ' + title).replace(/[\\\/]/g, '／')
    //     ans.marks.push({
    //         title,
    //         descs,
    //         name: name,
    //     })
    // });

    return ans;
}

router.get('/single/dl', async function (ctx, next) {
    // const url = `https://www.johnnys-net.jp/page?id=disco&artist=15&category=1&page=1`;
    const url = `https://www.johnnys-net.jp/page?id=discoDetail&artist=15&data=${ctx.query.data || 2466}`
    let html = await fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            return buf2str(buffer);
        })
    ctx.body = {
        code: 0,
        data: (genderAlbumInfo(html) || {})
    };
});

router.get('/single/down', async function (ctx, next) {
    // const url = `https://www.johnnys-net.jp/page?id=disco&artist=15&category=1&page=1`;
    const url = `https://www.johnnys-net.jp/page?id=discoDetail&artist=15&data=${ctx.query.data || 2466}`
    let html = await fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            return buf2str(buffer);
        })
    ctx.body = {
        code: 0,
        data: (genderAlbumInfo(html, true) || {})
    };
});


router.get('/file', async function (ctx, next) {
    const type = ctx.query.type || 'folder';
    const name = ctx.query.name;
    if (type == 'folder') {
        ctx.body = {
            code: 0,
            data: mkdir(`./lrcs/` + name)
        };
    } else {
        const folder = ctx.query.folder;
        let flag = true;
        fs.writeFile(`./lrcs/` + folder + '/' + name + '.txt', name, (err) => {
            if (err) {
                flag = false
                return console.log('err', `./lrcs/` + folder + '/' + name + '.txt')
            }
        });
        ctx.body = {
            code: 0,
            data: flag
        };
    }

});


router.post('/file', async function (ctx, next) {
    const { folder: tmp, songs } = ctx.request.body || {}
    let folder = tmp;
    if (folder) {
        folder = tmp.replace('?', '？').replace('&amp;', '$').replace(/\./g, '');
        mkdir(`./lrcs/` + folder)
    }
    let flag = true;
    if (songs) {
        const ans = [];
        const files = fs.readdirSync('./tmp');
        songs.map(d => {
            const t = d.replace('?', '？').replace('&amp;', '$').replace(/\./g, '');
            const name = t + '.json';
            fs.writeFile(`./lrcs/` + folder + '/' + t + '.txt', t, (err) => {
                if (err) {
                    flag = false
                    return console.log('err', `./lrcs/` + folder + '/' + t + '.txt')
                }
            });
            if (files.indexOf(name) > -1) {
                var sourceFile = './tmp/' + name;
                var destPath = `./lrcs/` + folder + '/' + name;
                fs.rename(sourceFile, destPath, function (err) {
                    if (err) throw err;
                    fs.stat(destPath, function (err, stats) {
                        if (err) throw err;
                        console.log('stats: ' + JSON.stringify(stats));
                    });
                });
            } else {
                ans.push(t);
            }
        })
    }
    ctx.body = {
        code: 0,
        data: flag
    };

});

router.get('/json', async function (ctx, next) {
    const data = fs.readFileSync(`./${ctx.query.type || 'songs'}/${ctx.query.name || '2007.11.14 Ultra Music Power'}.json`).toString()
    ctx.body = data;
});


// getLrcList
function getLrcList(html, file = false) {

    const $ = cheerio.load(html);

    //#region 处理dom
    let ans = {
        list: []
    };

    $('.aptplisttitle a').each((indx, dom) => {
        let name = $(dom).text().replace(/(^\s*)|(\s*$)/g, "");
        let href = $(dom).attr('href');
        ans.list.push({
            href,
            name
        })
    });


    return ans;
}


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

router.get('/getLrcList', async function (ctx, next) {
    const files = fs.readdirSync('./tmp');
    const prev = files;

    const url = `https://www.lyrical-nonsense.com/lyrics/hey-say-jump/`
    let html = await fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            return buf2str2(buffer);
        })
    const list = getLrcList(html).list.filter(item => prev.indexOf(item.name + '.json') == -1);

    if (list.length) {
        list.map(item => fetch(`http://localhost:3000/jump/getLrc?url=${item.href}`))
    }
    ctx.body = {
        code: 0,
        data: list
    }
});


function handleLrc(html, file = false) {
    const $ = cheerio.load(html);

    //#region 处理dom
    let time = '';
    let ans = {
        name: '',
        info: [],
        lrc: [],
    };

    ans.name = $('.titletop .titletext').text().replace('?', '？').replace('&amp;', '$').replace(' 歌詞', '').replace('歌詞', '')


    $('.olyrictext p').each((indx, dom) => {
        let lrc = $(dom).text().replace(/(^\s*)|(\s*$)/g, "");
        const arr = lrc.split('\n')
        ans.lrc = [
            ...ans.lrc,
            ...arr,
            ''
        ]
    });
    $('.lyricdetails li').each((indx, dom) => {
        let lrc = $(dom).find('dt').text();
        let t = $(dom).find('dd').text().replace(/ {2,}/g, '').replace(/\n/g, '');
        if (lrc.indexOf('発売日') != -1) {
            time = t;
        }
        ans.info.push({ label: lrc, value: t });
    });

    let __filename = (ans.name).replace(/\//g, '╱');
    if (__filename) {
        const content = JSON.stringify(ans, null, 4);
        fs.writeFile(`./tmp/${__filename}.json`, content, (err) => {
            if (err) {
                console.log('err: %c ' + __filename, 'background:yellowgreen;font-size:14px;color:#fff;')
            }
        });
    }

    return ans;
}



router.get('/getLrc', async function (ctx, next) {
    const url = ctx.query.url || `https://www.lyrical-nonsense.com/lyrics/hey-say-jump/502-2/`

    let html = await fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            return buf2str2(buffer);
        })

    ctx.body = {
        code: 0,
        data: handleLrc(html)
    }
});

router.get('/getAllList', async function (ctx, next) {
    const album = fs.readdirSync('./album');
    const single = fs.readdirSync('./songs');
    ctx.body = {
        album,
        single
    }
});
module.exports = router;
