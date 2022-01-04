import { getGrammer, getJson, NLP } from '@/services/api';
import { copyToClip } from '@/utils/tools';
import { Button, Input, Radio } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useRef, useState } from 'react';
import LRC from '../Lrc/components/LRCs';
import { _hiragana, _kataMap } from '../Lrc/intex';
const _ = require('lodash');
interface Props {
}
const strc = (item: any) => {
    if (!item.surface.trim())
        return null

    let cx = item.pos.replaceAll(',*', '').split(',');
    switch (cx[0]) {
        case '名詞':
            if (item.surface === '...' || item.surface === '～') {
                item.cls = '/';
                item.reading = '';
                item.left = true;
                break;
            }
            if (cx[1] === '接尾') {
                item.left = true;
            }
            if (cx[2] == '人名') {
                item.cls = '/';
                break;
            }
            if (cx[1] === '代名詞' || cx[1] === '数') {
                item.cls = '/';
                break;
            }
            item.cls = 'n'; break;
        case '動詞':
            item.cls = 'v'; break;
        case '助詞':
            item.cls = 'av'; break;
        case '形容詞':
            item.cls = 'a'; break;
        case '助動詞':
            item.cls = 'mv'; break;
        case '副詞':
            item.cls = 'adv'; break;
        case '記号':
            item.left = true;
        default:
            item.cls = '/';
    }

    if (item.reading === item.surface || item.reading == '?') item.reading = '';
    if (item.reading) {
        item.reading = _.map(item.reading, (i: string) => _kataMap[i] || i).join('');
        if (item.reading === item.surface) item.reading = '';
    }
    return item;
}
const CherryMaho: React.FC<Props> = () => {
    const [curJson, setCurJson] = useState<any>(null);
    const [curSpeaker, setCurSpeaker] = useState('安');
    const [curLrc, setCurLrc] = useState<tNote>({ lines: [] });
    const [cur, setCur] = useState<any>(null);
    const _ans = useRef();
    const getEp = () => {
        getJson('01-1.json').then((res: any) => {
            setCurLrc(res.cat[0].parags[0]);
        });
    };

    const [curLine, setCurLine] = useState('');
    const [isOs, setIsOs] = useState(false);

    const beforeNpl = () => {
        let lines = _.split(curLine, '。');
        let ans: any = [];
        _.map(lines, (x: any) => {
            if (!x) return;
            let lastChar = _.last(x);
            let afterFix = (_.has(_kataMap, lastChar) || _.has(_hiragana, lastChar)) ? '。' : '';
            let tmp = _.split(x + afterFix, ' ');
            if (!_.isEqual(tmp, [''])) {
                ans.push({
                    isOs: isOs,
                    _prev: tmp
                });
            }
        });

        _ans.current = ans;
        setCur(ans);
    };

    const prefixLine = (tokens: any) => {
        let tmp: any[] = [];
        _.map(tokens, (t: any) => {
            let tm = strc(t);
            if (tm)
                tmp.push(tm);
        });

        return tmp;
    };

    const handleBreaks = () => {
        let _t: any = _ans.current;
        _.map(cur, (line: any, lIdx: number) => {
            _.map(line._prev, (str: any, bIdx: number) => {
                NLP({ text: str, mode: 0 }).then(res => {
                    let words = prefixLine(res.tokens);
                    if (words.length) {
                        if (!_t[lIdx].blocks) _t[lIdx].blocks = [];
                        _t[lIdx].blocks[bIdx] = {
                            words
                        }
                    }
                });
            });
        });
    };
    const showRef = (withSpeaker: boolean = false) => {
        _.map(_ans.current, (t: any) => {
            if (t._prev)
                delete t._prev
        });

        withSpeaker ?
            copyToClip(JSON.stringify({
                speaker: curSpeaker,
                segs: _ans.current
            }))
            :
            copyToClip(JSON.stringify(_ans.current));
    };

    const getGra = () => {
        if (curLine) {
            getGrammer({ id: curLine }).then(res => {
                setCurJson(JSON.stringify(res.data, null, 4));
            })

        }
    }
    return (
        <div >
            <Button onClick={() => getGra()}>getGrammer</Button>
            <Button onClick={() => getEp()}>getEp1</Button>
            <Button onClick={() => beforeNpl()}> step1 beforeNpl</Button>
            <Button onClick={() => handleBreaks()}>handleBreaks</Button>
            <Button onClick={() => showRef()}>copy segs</Button>
            <Button onClick={() => showRef(true)}>copy segs with speaker</Button>
            <Checkbox checked={isOs} onChange={e => setIsOs(e.target.checked)} >{isOs ? 'isOs' : 'null'}</Checkbox>
            <Radio.Group value={curSpeaker} onChange={e => setCurSpeaker(e.target.value)}>
                <Radio value='安'>安</Radio>
                <Radio value='黒'>黒</Radio>
                <Radio value='六'>六</Radio>
                <Radio value='藤'>藤</Radio>
                <Radio value='浦'>浦</Radio>
                <Radio value='群'>群</Radio>
            </Radio.Group>
            <Input.TextArea value={curLine} onChange={e => setCurLine(e.target.value)} />

            <p>
                {JSON.stringify(cur)}
            </p>
            <p>
                {
                    curJson
                }
            </p>
            <LRC note={curLrc as tNote} />
        </div>
    )
}
export default CherryMaho;
