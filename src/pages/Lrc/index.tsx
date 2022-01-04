import { NLP } from '@/services/api';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { _kataMap } from './intex';
import LRC from './components/LRCs';
import { npl01, str01 } from './components/LRCs/cherrymaho/ep01';
import { Button } from 'antd';
import Npls from './components/LRCs/Npls';
const _ = require('lodash');
const t = {
    "input": "小さな駅のホーム 桜の見えるベンチ",
    "mode": 0,
    "tokens": [
        [
            {
                "base": "小さな",
                "pos": "連体詞,*,*,*",
                "pronunciation": "チーサナ",
                "reading": "チイサナ",
                "surface": "小さな"
            },
            {
                "base": "駅",
                "pos": "名詞,一般,*,*",
                "pronunciation": "エキ",
                "reading": "エキ",
                "surface": "駅"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "ノ",
                "surface": "の"
            },
            {
                "base": "ホーム",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ホーム",
                "reading": "ホーム",
                "surface": "ホーム"
            },
            {
                "base": "*",
                "pos": "記号,空白,*,*",
                "pronunciation": "?",
                "reading": "?",
                "surface": " "
            },
            {
                "base": "桜",
                "pos": "名詞,一般,*,*",
                "pronunciation": "サクラ",
                "reading": "サクラ",
                "surface": "桜"
            },
            {
                "base": "の",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ノ",
                "reading": "ノ",
                "surface": "の"
            },
            {
                "base": "見える",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ミエル",
                "reading": "ミエル",
                "surface": "見える"
            },
            {
                "base": "ベンチ",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ベンチ",
                "reading": "ベンチ",
                "surface": "ベンチ"
            }
        ],
        [
            {
                "base": "明るい",
                "pos": "形容詞,自立,*,*",
                "pronunciation": "アカルク",
                "reading": "アカルク",
                "surface": "明るく"
            },
            {
                "base": "振る舞う",
                "pos": "動詞,自立,*,*",
                "pronunciation": "フルマウ",
                "reading": "フルマウ",
                "surface": "振る舞う"
            },
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "キミ",
                "surface": "君"
            },
            {
                "base": "*",
                "pos": "記号,空白,*,*",
                "pronunciation": "?",
                "reading": "?",
                "surface": " "
            },
            {
                "base": "迫る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "セマリ",
                "reading": "セマリ",
                "surface": "迫り"
            },
            {
                "base": "来る",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "クル",
                "reading": "クル",
                "surface": "来る"
            },
            {
                "base": "発車",
                "pos": "名詞,サ変接続,*,*",
                "pronunciation": "ハッシャ",
                "reading": "ハッシャ",
                "surface": "発車"
            },
            {
                "base": "時刻",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ジコク",
                "reading": "ジコク",
                "surface": "時刻"
            }
        ]],
};

const strc = (item: any) => {
    if (!item.surface.trim())
        return null

    let cx = item.pos.replaceAll(',*', '').split(',');
    switch (cx[0]) {
        case '名詞':
            item.cls = 'n'; break;
        case '動詞':
            item.cls = 'v'; break;
        case '助詞':
            item.cls = 'av'; break;
        case '形容詞':
            item.cls = 'a'; break;
        default:
            item.cls = '/';
    }

    if (item.reading === item.surface) item.reading = '';
    if (item.reading) {
        item.reading = _.map(item.reading, (i: string) => _kataMap[i] || i).join('');
        if (item.reading === item.surface) item.reading = '';
    }

    return item;
}
// let ans: any = t.tokens[0].map(t => strc(t));
let lines: any[] = [];
export default () => {
    useEffect(() => {
        // let arr = _.split(str01, /\n/);
        // for (let pos: number = 0; pos < arr.length; pos++) {
        //     let line = arr[pos];
        //     if (line) {
        //         NLP({ text: line, mode: 0 }).then(res => lines[pos] = res);
        //     } else
        //         lines[pos] = null;
        // };
        strLines();
    }, []);
    const strLines = () => {
        let t = _.map(npl01.lines, (line: any) => {
            if (!line) return line;
            let tokens = _.map(line.tokens, (t: any) => strc(t));
            return {
                input: line.input,
                tokens
            }
        });

        setCurNote({ lines: t });
    }
    const [curNote, setCurNote] = useState<tNote>({ lines: [] });
    return (
        <div >
            <Button onClick={() => { console.log(lines); setCurNote({ lines: lines }) }}>mmm</Button>
            <Npls note={curNote} />
            {/* <h1 className={styles.a}>Page index</h1> */}

            {
                // _.map(lrc, (line: any, pos: number) => <div key={pos}>
                //   {
                //     _.map(line, (item: any, idx: number) => {
                //       if (item) {
                //         return (
                //           <div key={idx} className={styles['word-wrapper']}>
                //             <div className={classnames(styles['word-reading'], { [styles['word-center']]: item.reading.length === 1 })}>
                //               {item.reading}
                //             </div>
                //             <div className={classnames(styles['word'], styles['word-' + item.cls], { [styles['word-center']]: item.surface.length === 1 })}>
                //               {item.surface}
                //             </div>
                //           </div>
                //         )
                //       }
                //       return null
                //     })
                //   }
                // </div>)
            }
        </div>
    );
}
