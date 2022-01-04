import { Button } from 'antd';
import React, { useState } from 'react';
const _ = require('lodash');
interface Props {
}
let str = `３０過ぎても童貞だと、 魔法使いになっちまうんだぞ。`;
let str2 = `３０過ぎてN_もD_童貞N_だとD_、P_`;
let str3 = `魔法使いN_になっV_ちまうS_んだS_ぞS_。P_`;

function toTree(data: any[]) {
    let result: any[] = []
    if (!Array.isArray(data)) {
        return result
    }
    data.forEach(item => {
        delete item.depart;
    });
    let map: any = {};
    data.forEach(item => {
        map[item.id] = item;
    });
    data.forEach(item => {
        let parent = map[item.pid];
        if (parent) {
            (parent.depart || (parent.depart = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

function toArr(data: any[]) {
    let t = _.reverse(data);
    let grammar = '';
    let depart: any[] = [];
    let punc: any = undefined;
    _.map(t, (d: any) => {
        if (d.type === 'P') {
            punc = d._input;
            return;
        }
        grammar += d.type + ' ';
        console.log(d);
        depart.push({
            pos: d.type,
            output: d._input
        })
    });

    return _.omitBy({
        punc,
        depart,
        grammar
    }, _.isUndefined);
}
const AutoSplit: React.FC<Props> = () => {


    const [curJson, setCurJson] = useState<any>();

    const strcSeg = () => {

    };
    const setJSon = () => {
        let arr = str3.split('_');
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
                        id: idx,
                        pid: idx - 1
                    })
                }
                else
                    block.push({
                        output: t._input,
                        pos: t.type,
                        id: idx,
                        pid: idx - 1
                    })
            }
        });

        let js = toTree(block);
        // let js = {
        //     ...block[0],

        //     pos: 'S',
        //     depart: _.slice(_.reverse(block), 0, -1)
        // };

        setCurJson(JSON.stringify(js, null, 4));
    };

    const t = () => {
        var aa = "温度计(水温实验室),海流计(水流水向)";
        var reg = /[(][^）]+[\))]/g;

        var str2 = aa.replace(reg, "");
        console.log(str2);
    }
    return (
        <div >
            <p>
                <Button onClick={setJSon}>setJson</Button>
                <Button onClick={t}>setJson</Button>
            </p>
            <p>
                {str2}
            </p>
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
