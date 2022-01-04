import { Button } from 'antd';
import React, { useState } from 'react';
const _ = require('lodash');
import classnames from 'classnames';
import { configConsumerProps } from 'antd/es/config-provider';
import { copyToClip } from '@/utils/tools';
interface Props {
}
let seg = `３０過ぎても童貞だと、魔法使いになっちまうんだぞ。`;
let struc = {
    _input: `３０過ぎても童貞だと、魔法使いになっちまうんだぞ。`,
    type: 'outer',

    children: [
        {
            _input: '３０過ぎても童貞だと',
            grammar: 'N も N だと',
            pos: 'S',
            children: [
                {
                    pos: 'N',
                    _input: '３０過ぎて',
                    words: [
                        {
                            "base": "３０",
                            "pos": "名詞,数,*,*",
                            "pronunciation": "サン",
                            "reading": "さんじゅう",
                            "surface": "３０",
                            "cls": "/"
                        },
                        {
                            "base": "過ぎる",
                            "pos": "動詞,自立,*,*",
                            "pronunciation": "スギ",
                            "reading": "すぎ",
                            "surface": "過ぎ",
                            "cls": "v"
                        },
                        {
                            "base": "て",
                            "pos": "助詞,接続助詞,*,*",
                            "pronunciation": "テ",
                            "reading": "",
                            "surface": "て",
                            "cls": "av"
                        },
                    ]
                },
                {
                    _input: 'も',

                },
                {
                    pos: 'N',
                    _input: '童貞',
                    words: [
                        {
                            "base": "童貞",
                            "pos": "名詞,一般,*,*",
                            "pronunciation": "ドーテイ",
                            "reading": "どうてい",
                            "surface": "童貞",
                            "cls": "n"
                        },
                    ]
                },
                {
                    _input: 'だと'
                }
            ]

        },
        {
            punc: '、'
        },
        {
            "grammar": "S ぞ",
            "pos": "S",
            "_input": "ぞ",
            "children": [
                {
                    "grammar": "S んだ",
                    "pos": "S",
                    "_input": "んだ",
                    "children": [
                        {
                            "grammar": "V てしまう",
                            "pos": "S",
                            "_input": "ちまう",
                            "children": [
                                {
                                    "grammar": "N になる",
                                    "pos": "V",
                                    "_input": "になっ",
                                    "children": [
                                        {
                                            "output": "魔法使い",
                                            "_input": "魔法使い",
                                            "pos": "N",
                                            words: [
                                                {
                                                    "base": "魔法使い",
                                                    "pos": "名詞,一般,*,*",
                                                    "pronunciation": "マホーツカイ",
                                                    "reading": "まほうつかい",
                                                    "surface": "魔法使い",
                                                    "cls": "n"
                                                },
                                            ]
                                        },
                                        {
                                            "_input": "に"
                                        },
                                        {
                                            "_input": "なっ",
                                            "pos": "V",
                                            words: [
                                                {
                                                    "base": "なる",
                                                    "pos": "動詞,自立,*,*",
                                                    "pronunciation": "ナッ",
                                                    "reading": "",
                                                    "surface": "なっ",
                                                    "cls": "v"
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    "_input": "ちまう"
                                }
                            ]
                        },
                        {
                            "_input": "んだ"
                        }
                    ]
                },
                {
                    "_input": "ぞ"
                }
            ]
        },
        {
            punc: '。'
        },
    ]

}

let segw = `３０歳になるまで、考えてもみなかった。平凡な俺の人生に、いや、俺自身に、こんな魔法がかかるなんて。
安：ちなみにこっちは、２９歳と３６４日目の俺。`;

let regs = `(1 N も N だと、)1(2(3S だ )3ぞ。)2`

const AutoSplit: React.FC<Props> = () => {
    const renderPre = (node: any[]) => {
        return node &&
            !_.isEmpty(node) &&
            _.map(node, (s: any, idx: number) => {
                if (_.isEmpty(s.children || [])) {
                    if (!_.isEmpty(s.words || [])) {
                        return <span className={classnames('part-output', s.pos && ('part-' + s.pos), s.isFix && 'part-grammar')}>
                            {
                                _.map(s.words, (w: any, i: number) => (
                                    <ruby>  {w.surface}<rt>{w.reading}</rt></ruby>
                                ))
                            }
                        </span>
                    } else
                        return <span className={classnames('part-output', s.pos && ('part-' + s.pos))}>
                            <ruby>  {s._input || s.punc}</ruby>
                        </span>;
                } else {
                    return <>
                        <span
                            className={classnames(
                                s.type !== 'outer' && !s.punc && 'block-box',
                                s.pos && ('block-' + s.pos),
                            )}
                            title={s.grammar}
                        >
                            {renderPre(s.children)}
                            {
                                s.pos && s.pos === 'S' &&
                                <span className="block-tag">{s.pos}</span>
                            }
                        </span>
                    </>;
                }
            });
    }

    const testReg = (str: string) => {
        let arr = str.split('_');
        let arr2: any = [];
        _.map(arr, (t: any, idx: number) => {
            if (!t) return;
            let type = _.last(t);
            arr2.push({
                type,
                _input: t.slice(0, -1)
            });
        });
        arr2 = _.reverse(arr2);

        let block: any = [];
        _.map(arr2, (t: any, idx: number) => {
            if (t.type === 'P') {
                block.push({
                    punc: t._input,
                    id: 0
                })
            } else {
                let prev = arr2[idx + 1];
                if (prev) {
                    let prevFix: any = '';
                    if (prev.type && t.type !== 'D') {
                        if (prev.type !== 'D')
                            prevFix = prev.type;
                    }
                    block.push({
                        grammar: prevFix + ' ' + t._input,
                        pos: t.type,
                        _input: t._input
                        // id: idx,
                        // pid: idx - 1
                    })
                }
                else
                    block.push({
                        output: t._input,
                        _input: t._input,
                        pos: t.type,
                        // id: idx,
                        // pid: idx - 1
                    })
            }
        });

        let node = block[0];
        let cur = node;
        _.map(block, (b: any, idx: number) => {
            if (idx === 0) return;
            cur.children = [b, {
                _input: block[idx - 1]._input
            }];
            cur = cur.children[0]

        });

        setCurJson(JSON.stringify(node, null, 4));
        copyToClip(JSON.stringify(node, null, 4));
    };

    const [curJson, setCurJson] = useState<any>();

    const [showSys, setShowSys] = useState(false);
    const getAllkeys = (data: any, ref: any) => {
        ref.arr = [...ref.arr, ..._.keys(data)];
        if (!_.isEmpty(data.children || [])) {
            _.map(data.children, (d: any) => getAllkeys(d, ref));
        }
    };
    return (
        <div className={classnames(showSys && 'showBlock')} >

            <p>{seg}</p>
            <p>{renderPre([struc])}</p>

            <Button onClick={() => testReg(`魔法使いN_になっV_ちまうS_んだS_ぞS_`)}>reg</Button>
            <Button onClick={() => setShowSys(!showSys)}>toggle Cls</Button>
            <Button onClick={() => {
                let tmp: any = { arr: [] };
                getAllkeys(struc, tmp);

                console.log(_.uniq(tmp.arr));
            }}>get allKeys</Button>

            <pre>
                <code>
                    {
                        curJson
                    }
                </code>
            </pre>
        </div>
    )
}
export default AutoSplit;
