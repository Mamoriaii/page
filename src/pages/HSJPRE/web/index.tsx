import { getTlrcList, uploadLrcs } from '@/services/hsj';
import React, { useEffect, useState } from 'react';
const cheerio = require('cheerio')
const _ = require('lodash');
interface Props {
}



const mockList = [
    {
        "name": "Fab! -Music speaks.",
        "href": "/album-45400.html"
    },
    {
        "name": "Give Me Love",
        "href": "/album-41622.html"
    },
    {
        "name": "White Love",
        "href": "/album-38726.html"
    },
    {
        "name": "ありがとう ～世界のどこにいても～",
        "href": "/album-37720.html"
    },
    {
        "name": "Ride With Me",
        "href": "/album-34790.html"
    },
    {
        "name": "Super Delicate",
        "href": "/album-26332.html"
    },
    {
        "name": "OVER THE TOP",
        "href": "/album-25385.html"
    },
    {
        "name": "Your Song",
        "href": "/album-25118.html"
    },
    {
        "name": "Lucky-Unlucky / Oh! my darling",
        "href": "/album-22372.html"
    },
    {
        "name": "瞳のスクリ一ン",
        "href": "/album-21520.html"
    },
    {
        "name": "愛だけがすべて -What do you want?-",
        "href": "/album-21052.html"
    },
    {
        "name": "AinoArika/愛すればもっとハッピーライフ",
        "href": "/album-20862.html"
    },
    {
        "name": "マエヲムケ",
        "href": "/album-14555.html"
    },
    {
        "name": "I am / Muah Muah",
        "href": "/album-6160.html"
    }
];

const mockSongs = [
    {
        "name": "闇の先へ僕らは歩き出す",
        "href": "/lyrics-226360.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "Last forever",
        "href": "/lyrics-226359.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "ナイモノネダリ",
        "href": "/lyrics-226358.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "御伽と知る世界",
        "href": "/lyrics-226357.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "Kiss Your Lips",
        "href": "/lyrics-226355.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "Puppet",
        "href": "/lyrics-226353.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "MANTRA",
        "href": "/lyrics-226351.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "Last Mermaid...",
        "href": "/lyrics-226349.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "Lair",
        "href": "/lyrics-226347.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "Snow White",
        "href": "/lyrics-226345.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "Jazzy Cut",
        "href": "/lyrics-226343.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "千夜一夜",
        "href": "/lyrics-226342.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "狼青年",
        "href": "/lyrics-226341.html",
        "album": "Fab! -Music speaks."
    },
    {
        "name": "Fab-ism",
        "href": "/lyrics-226340.html",
        "album": "Fab! -Music speaks."
    }
];
// getLrcList
function formatList(html: any) {

    const $ = cheerio.load(html);
    //#region 处理dom
    let ans: any = [];

    $('.artistAlbumList tbody tr a').each((indx, dom) => {
        let href = $(dom).attr("href");
        let name = $(dom).text().replace(/[\r\n\t ]/g, '').trim();
        ans.push({ name, href })
    });
    return ans;
}

export function clearStr(str: string) {
    return str.replace(/[\r\n\t]/g, '').trim();
}

function formatLrc(html: any) {

    const $ = cheerio.load(html);
    //#region 处理dom
    let ans: any = {
        name: clearStr($('.text-center .nameTit').text()),
        artist: clearStr($('.text-center .artistnameTit').text()),
        producer: [],
        lrc: []
    }
    $('.text-center .producer li').each((indx, dom) => {
        const [label, value] = clearStr($(dom).text()).split('：')
        if (value)
            ans.producer.push({ label, value })
    });
    const h = $('.text-center .lytext').html();
    h.split('<br>').map(item => {
        ans.lrc.push(clearStr(item))
    })

    // ans.lrc.splice(0, 3)


    return ans;
}

function formatSongList(html: any) {

    const $ = cheerio.load(html);
    //#region 处理dom
    let ans: any = [];
    $('.album tbody tr a').each((indx, dom) => {
        let href = $(dom).attr("href");
        let name = $(dom).text().replace('\n', '').trim();
        ans.push({ name, href })
    });

    return ans;
}

const clearFolderName = (str: string) => {
    return str.replace(/\//g, '╱').replace(/\./g, '').replace(/\?/g, '？');
}

const Map: any = {}
const Web: React.FC<Props> = () => {
    const [list, setList] = useState(mockList)
    const [songList, setSongs] = useState(mockSongs)
    useEffect(() => {
        // getTlrcList().then(str => {
        //     const list = formatList(str);
        //     console.log(list)
        //     setList(list || [])
        // })


    }, []);

    const getSongs = (path: string, name: string) => {
        return getTlrcList(path).then(str => {
            const ans = formatSongList(str);
            return (ans.map((item: any) => ({ ...item, album: name })))
        })

    }
    const getLrc = (path: string, name: string) => {
        return getTlrcList(path).then(str => {
            const ans = formatLrc(str);
            return ans;
        })
    }

    const getMap = () => {
        list.map(item => {
            Map[item.name] = {
                name: item.name,
                songList: {}
            }
            getSongs(item.href, item.name).then(s => {
                s.map(t => {
                    getLrc(t.href, t.name).then(lrc => {
                        Map[item.name].songList[t.name] = lrc;
                    })
                })
            })
        })
    }
    const show = () => {
        const arr = Object.values(Map);
        arr.map(item => {
            item.fileName = clearFolderName(item.name)
            item.songList = Object.values(item.songList)
        });
        uploadLrcs(arr);
    }
    return (
        <div >
            <div>
                <div onClick={getMap}>gender</div>
                <div onClick={show}>show</div>
                {/* {list?.map((item: any, idx: number) => <div key={idx} onClick={() => getSongs(item?.href, item.name)}>{item?.name}</div>)} */}
            </div>
            <div style={{ background: 'pink' }}>
                {/* {songList?.map((item: any, idx: number) => <div key={idx} onClick={() => getLrc(item?.href, item.name)}>{item?.name}</div>)} */}
            </div>
        </div>
    )
}
export default Web;
