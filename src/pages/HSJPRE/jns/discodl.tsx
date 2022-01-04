import { getJnsPage, uploadLrc } from '@/services/hsj';
import React, { useEffect, useState } from 'react';
import { clearStr } from '../web';
const cheerio = require('cheerio')
const _ = require('lodash');
interface Props {
}

const formatDiscoList = (html: any) => {
    const $ = cheerio.load(html);
    const arr: any[] = []
    $('.works-list__item').each((indx: number, dom: any) => {
        const artist: string = clearStr($(dom).find('.content-description').text());
        const id = $(dom).find('.content-description + a').attr('href').replace('/page?id=discoDetail&artist=15&data=', '');
        const params = { id: 'discoDetail', data: id };
        const name = clearStr($(dom).find('.content-title').text());

        arr.push({
            id,
            params, name
        })
    });

    return arr;
}

const formatDiscoDetail = (html: any) => {
    const $ = cheerio.load(html);
    let ans = {
        name: clearStr($('.artist_disco h3').text()),
        imgs: [],
        type: clearStr($('.release-date__type').text()),
        release: clearStr($('.release-date__date').text()).replace(/(^\s*)|(\s*$)/g, ""),
        list: [],
        ohters: [],
        content: [],
    };

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

    const tmp: any = {
        name: ans.name,
        artist: [],
        group: []
    }

    if (ans.list?.length == ans.imgs?.length && ans?.imgs?.length == ans?.content?.length) {
        return false
        tmp.group = ans.content?.map((item: any, idx: number) => {
            let t: any = {
                version: '',
                cover: '',
                disk: [],
                info: []
            }
            t.version = item.title.replace('収録内容', '');
            if (ans.imgs[idx])
                t.cover = ans.imgs[idx].src;
            if (ans.list[idx])
                t.disk = [
                    ans.list[idx].title.replace(')', '').replace(/.+\(/, '')
                ]

            let key: string = 'info';

            item.desc?.map(str => {
                if (str.indexOf('CD') > -1) {
                    if (!t.CD) t.CD = [];
                    key = 'CD'

                }
                else if (str.indexOf('DVD') > -1) {
                    if (!t.DVD) t.DVD = [];
                    key = 'DVD'
                }
                else if (str) {
                    t[key].push(str.trim())
                }
            })
            if (!t.info?.length)
                delete t['info']
            return t;

        })
    } else {

        if (ans.name[0] == '悪') {
            console.log(ans.name)
            tmp.name = '悪魔な恋'
        }

        return {
            ...ans,
            ...tmp
        }
    }
}

const Map: any = {};
const DiscoDl: React.FC<Props> = () => {
    const [list, setList] = useState<any[]>([])
    useEffect(() => { getDiscoList(); }, []);
    const getDiscoList = () => {
        getJnsPage({
            category: 4, page: 1
        }).then(res => {
            const list = formatDiscoList(res);

            setList(list || [])
            // list?.map(item => getDetail(item))
        })
    }
    const getDetail = (item: any) => {
        if (item)
            getJnsPage(item.params).then(res => {
                const conf = formatDiscoDetail(res);
                if (conf) {
                    Map[conf.name] = conf;
                }
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
            <div onClick={getDiscoList}>  DiscoDl   </div>
            <div onClick={upload}>  map   </div>
            <div>
                {list.map(item => <span style={{ margin: 8, background: 'yellowgreen', padding: 4 }} onClick={() => getDetail(item)}>{item.name}</span>)}
            </div>
        </div>
    )
}
export default DiscoDl;
