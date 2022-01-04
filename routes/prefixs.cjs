
const Router = require('koa-router');
const router = new Router();
const cheerio = require('cheerio')
const fetch = require('node-fetch')
router.prefix('/pre');

function buf2str(buffer) {
    let encodedString = String.fromCodePoint.apply(null, new Uint8Array(buffer));
    let decodedString = decodeURIComponent(escape(encodedString));//没有这一步中文会乱码
    return decodedString
}

function handleHtml(html) {
    const $ = cheerio.load(html);

    //#region 处理dom
    const ans = {
        marks: [],
        toggles: [],
        refs: [],
    };
    ans.grammer = $('.box12-in .box1').text().replace(/[\r\n\t ]/g, '').split('/');

    $('div[class^=mark]').each((indx, dom) => {
        let title = $(dom).find('span').text();
        let descs = $(dom).text().replace(/[\r\n\t ]/g, '').replace(title, '').split('或');
        ans.marks.push({
            title: $(dom).find('span').text(),
            descs
        })
    });

    let tmp = undefined;
    $('.toggle1').children().each((idx, node) => {
        if ($(node).is('dt')) {
            if (tmp) {
                ans.toggles.push(tmp);
                tmp = {};
            } else {
                tmp = {};
            }
            tmp.title = $(node).text();
        } else {
            let data = '';
            if (tmp.title == '例句') {
                data = $(node).text().split(/[\r\n\t]/).map((t, idx) => t.replace(/ /g, '')).filter(t => !!t).map(t => {
                    return t.replace(/[①-⑳]/, '').split('/');
                });
            } else if (tmp.title == '解析') {
                $(node).children('br').each((idx, t) => { $(t).replaceWith("#") });
                let arr = $(node).text().split(/[\r\n#]/).map((t, idx) => t.replace(/[ \t]/g, '')).filter(t => !!t);
                let len = arr.length / 2;

                data = [];
                for (let i = 0; i < len; i++) {
                    data.push([
                        arr[i].replace(/^.{1}）/, ''), arr[len + i].replace(/^.{1}）/, '')
                    ])
                }
            } else {
                data = $(node).text().replace(/[\r\n\t ]/g, '');
            }

            tmp.data = data;
        }
    });
    ans.toggles.push(tmp);

    tmp = undefined;

    $('ul.list9').children().each((idx, li) => {
        if (!tmp) {
            tmp = {};
        }
        tmp.title = $(li).text().split('：')[0];
        tmp.links = [];
        $(li).children('a').each((i, a) => {
            tmp.links.push({
                text: $(a).text().replace(/[\r\n ]/g, ''),
                href: $(a).attr('href'),
            })
        })
        ans.refs.push(tmp);
        tmp = undefined;
    });
    //#endregion

    return ans;
}

router.post('/getGrammar', function (ctx, next) {
    let html = ctx.request.body.html;
    let ans = handleHtml(html);
    ctx.body = {
        code: 0,
        data: ans
    };
    next();
})

router.get('/yfk', async function (ctx, next) {
    const url = `https://grammar.izaodao.com/grammar.php?action=view&id=${ctx.query.id || 2}&level=&cha=`;
    let html = await fetch(url)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            return buf2str(buffer);
        })
    ctx.body = {
        code: 0,
        data: (handleHtml(html) || {})
    };
});

module.exports = router;
