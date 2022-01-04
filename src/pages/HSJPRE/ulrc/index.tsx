import { getUlrcList, uploadLrc } from '@/services/hsj';
import React, { useEffect } from 'react';
import { clearStr } from '../web';
const cheerio = require('cheerio')
const _ = require('lodash');
interface Props {
}

const formatLrc = (html: string, desc: string[] = []) => {
    const $ = cheerio.load(html);
    //#region 处理dom
    $('.newLyricTitle__main span').remove()
    let ans: any = {
        name: clearStr($('.newLyricTitle__main').text()).replace('「', '').replace('」', ''),
        artist: clearStr($('.newLyricWork__name a').text().replaceAll('(Hey!Say!JUMP)', '')).split('・'),
        producer: [],
        desc,
        lrc: [],
    }
    $('.hiragana .rt').remove();
    const arr = $('.hiragana').html()?.replaceAll('<span class="ruby"><span class="rb">', '')?.replaceAll('</span>', '').split('<br>');
    ans.lrc = arr.map((item: any) => {
        return clearStr(item)
    });

    $('.newLyricWork .newLyricWork__title').each((indx, dom) => {
        ans.producer.push({ label: clearStr($(dom).text()) })
    });
    $('.newLyricWork .newLyricWork__body').each((indx, dom) => {
        const test = clearStr($(dom).text()).split(',').map(item => item.trim())
        ans.producer[indx].value = test
    });
    if (!ans.desc?.length)
        delete ans['desc']
    return ans;
}

const formatList = (html: string) => {
    const $ = cheerio.load(html);
    const arr: any[] = []
    $('.searchResult__title a').each((indx, dom) => {
        const href = $(dom).attr('href');
        const name = clearStr($(dom).text());
        arr.push({
            href, name
        })
    });

    // $('.searchResult .searchResult__title a').each((indx, dom) => {
    //     const href = $(dom).attr('href');
    //     const name = clearStr($(dom).text());
    //     arr.push({
    //         href, name
    //     })
    // });
    return arr;
}
const arts = [
    "山田涼介", "知念侑李", "八乙女光", "中島裕翔", "薮宏太", "髙木雄也", "伊野尾慧", "有岡大貴"
]
const ss = [
    "ゆーと叩いてみた。",
    "殺せんせーションズ",
    "RUN de Boo",
    "Eternal",
    "TO THE TOP",
    "トビラの向こう",
    "心技体",
    "太陽にLOVE MOTION",
    "IO",
    "Hour Time",
    "題名の無い物語",
    "Virtual Butterfly",
    "スンダDance",
    "YOU & I",
    "スクランブル",
    "さよならセンセーション"
]
const Map: any = {};
const songArr: any[] = [];

const Ulrc: React.FC<Props> = () => {
    useEffect(() => {
    }, [])

    const getPage = (idx: number) => {
        // let url = '/artist/lyric/21277?sort=release_date_asc';
        // let url = '/search?sort=popular_sort%3Aasc&artist_name=' + arts[idx]
        let url = `/search?sort=popular_sort%3Aasc&artist_name=${ss[idx]}&title=&beginning=&body=&lyricist=&composer=&sub_title=&tag=&form_open=1&show_artists=1`
        // if (idx > 1) url = url + '&page=' + idx;
        getUlrcList(url).then(res => {
            const list = formatList(res);
            console.log(list);
            list.map(item => {
                if (Map[item.name]) {
                    songArr.push(item.name)
                }
                getUlrcList(item.href).then(res => {
                    const desc = [];
                    const idx = item.name.indexOf("(");
                    if (idx > -1) {
                        const tmp = item.name.split('(')?.pop()?.replace(')', '').trim();
                        if (tmp)
                            desc.push(tmp)
                    }
                    const lrc = formatLrc(res, desc);
                    Map[item.name] = lrc;
                })

            })
        })
    }
    const getLrc = () => {
        getUlrcList().then(res => {
            const ans = formatLrc(res);
            console.log(ans)
        })
    }
    const upload = () => {
        // uploadLrc(Object.values(Dmap)).then(res => {
        uploadLrc(Object.values(Map)).then(res => {
            console.log('---------')
            console.log('---------')
            console.log('')
            console.log(res)
            console.log('')
            console.log('---------')
            console.log('---------')
        })
    }
    return (
        <div >
            <div>
                {ss.map((name, idx) => <div onClick={() => getPage(idx)} style={{ padding: '5px 10px', color: idx % 2 ? "red" : 'green' }}>{name}</div>)}
            </div>
            <div onClick={upload}>upload</div>
            <div onClick={() => console.log(Map, songArr)}> show</div>

            {_.range(5)?.map((item: any, idx: number) => <p key={idx} onClick={() => getPage(idx + 1)}>{idx}</p>)}
        </div>
    )
}
export default Ulrc;
