import { copyToClip, _uuid } from '@/utils/tools';
import { Button, Drawer } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useRef, useState } from 'react';
import FormNode from './components/FormNode';
import PageStruc from './components/PageStruc';
import Passage from './components/Passage';
import TreeStage from './components/TreeStage';
import TreeStruc from './components/TreeStruc';
import { prefixLine } from './components/utils';
import styles from './index.less';
const _ = require('lodash');
const mapStateToProps = ({ editor }: any) => {
    return editor;
};
interface Props extends ConnectProps, editorState {
}

const txx = [{ "base": "考える", "pos": "動詞,自立,*,*", "pronunciation": "カンガエ", "reading": "カンガエ", "surface": "考え" }, { "base": "て", "pos": "助詞,接続助詞,*,*", "pronunciation": "テ", "reading": "テ", "surface": "て" }, { "base": "も", "pos": "助詞,係助詞,*,*", "pronunciation": "モ", "reading": "モ", "surface": "も" }, { "base": "みる", "pos": "動詞,自立,*,*", "pronunciation": "ミ", "reading": "ミ", "surface": "み" }, { "base": "ない", "pos": "助動詞,*,*,*", "pronunciation": "ナカッ", "reading": "ナカッ", "surface": "なかっ" }, { "base": "た", "pos": "助動詞,*,*,*", "pronunciation": "タ", "reading": "タ", "surface": "た" }, { "base": "平凡", "pos": "名詞,形容動詞語幹,*,*", "pronunciation": "ヘイボン", "reading": "ヘイボン", "surface": "平凡" }, { "base": "だ", "pos": "助動詞,*,*,*", "pronunciation": "ナ", "reading": "ナ", "surface": "な" }, { "base": "俺", "pos": "名詞,代名詞,一般,*", "pronunciation": "オレ", "reading": "オレ", "surface": "俺" }, { "base": "の", "pos": "助詞,連体化,*,*", "pronunciation": "ノ", "reading": "ノ", "surface": "の" }, { "base": "人生", "pos": "名詞,一般,*,*", "pronunciation": "ジンセイ", "reading": "ジンセイ", "surface": "人生" }, { "base": "に", "pos": "助詞,格助詞,一般,*", "pronunciation": "ニ", "reading": "ニ", "surface": "に" }];

const json = {
    "number": 1,
    "id": "71212609-9769-4BCD-8DC9-5F9173A98A9B",
    "type": "passage",
    "stage": [
        {
            "id": "71212609-9769-4BCD-8DC9-5F9173A98A9B",
            "name": "桜、咲いたよ",
            "type": "chapter",
            "section": [
                {
                    "id": "D118F887-3DF7-4B91-89D4-9E9FF7ED879C",
                    "name": "part 1",
                    "type": "section",
                    "children": [
                        {
                            "speaker": "Hey! Say! JUMP",
                            "id": "116A3CBB-FF1E-4B7F-8B12-3522DDE5A6FF",
                            "type": "dialog",
                            "children": [
                                {
                                    "id": "2E75CAFB-952A-4CB6-AAAC-CAF3DE1BE87B",
                                    "type": "seg",
                                    "surface": "小さな駅のホーム 桜の見えるベンチ",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "8F83D816-E84C-4F60-9EE5-33063648FE31",
                                    "type": "seg",
                                    "surface": "明るく振る舞う君 迫り来る発車時刻",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "477D065A-EF96-4C2C-9358-35ADDEA831DB",
                                    "type": "seg",
                                    "surface": "えっと…えっと…伝えたいことは",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "A687B98B-E468-4E21-96E7-CA449B2F3F13",
                                    "type": "seg",
                                    "surface": "えっと…えっと…山ほどある",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "8C8F2C6E-8315-4741-A566-E9D4939B8B06",
                                    "type": "seg",
                                    "surface": "口から出るのはくだらない話題ばかりさ",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "CD749E97-1115-469D-A840-032540E862DD",
                                    "type": "seg",
                                    "surface": "君の笑顔も泣き顔も",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "F7890C6C-87BE-4C1F-BCD9-AD9D107AFD74",
                                    "type": "seg",
                                    "surface": "知っていたつもりなのに",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "C4C19193-5196-4AD0-A352-6417250A40AD",
                                    "type": "seg",
                                    "surface": "今ここで「じゃあね」っていう顔を",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "B06B05C8-F927-44E6-B797-806C768C321A",
                                    "type": "seg",
                                    "surface": "どうしても見れないままで…",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "5233427E-3F3E-45B9-B57D-259F362142D0",
                                    "type": "seg",
                                    "surface": "憧れの都会の午後 一人で食べるランチ",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "D7D177B8-D1F9-4615-A190-9FB20D88747E",
                                    "type": "seg",
                                    "surface": "毎日が深夜残業 飛び乗る最終列車",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "D1A8ABE0-1BB7-4DB6-BD86-D65BCCA31DD2",
                                    "type": "seg",
                                    "surface": "えっと…えっと…「心配しないで」",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "F5274395-ADBA-4759-AC1A-7297A6754004",
                                    "type": "seg",
                                    "surface": "えっと…えっと…「大丈夫さ」",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "112AB45A-5474-4FC0-AC88-047BF2471592",
                                    "type": "seg",
                                    "surface": "なぜだろう 君には聞こえていない気がした",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "BF85BD7E-E5CB-44EC-97F6-B6EECB3FBE12",
                                    "type": "seg",
                                    "surface": "会えない日々が来ることを",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "1CA28F8D-4F5C-4BD8-A02C-969EA311E182",
                                    "type": "seg",
                                    "surface": "こわがってばかりいたけど",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "6675202A-9881-45FE-B0FA-CB9475B51C01",
                                    "type": "seg",
                                    "surface": "喜ぶべきか いつの間にか",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "4A4F6C65-A162-4D46-A373-E91AB0390A2A",
                                    "type": "seg",
                                    "surface": "強い自分を手に入れていた",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "00EA9896-9645-4FB4-BBED-1D281D60A148",
                                    "type": "seg",
                                    "surface": "忘れたくても全てが君を連想",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "C0C6352F-555A-4DF7-A317-73C70E593D44",
                                    "type": "seg",
                                    "surface": "かき消す為流す二人のエンドロール",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "3ABB6DAB-0303-4F2A-94F5-F32E158AA671",
                                    "type": "seg",
                                    "surface": "君の経路 僕の回路 君へ帰ろうとしたこの感情",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "2A974741-277E-44A8-822C-EE9CED5D9F93",
                                    "type": "seg",
                                    "surface": "いつも近くで支えてくれた",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "4E23257F-E0DB-47A1-A769-FEF9765FC2A1",
                                    "type": "seg",
                                    "surface": "離れて気付く君の心地よさ",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "EA88F880-3F10-43FC-B5A4-163B60281AAF",
                                    "type": "seg",
                                    "surface": "顔を上げて 見てたSame Day",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "68F31C64-9F30-400F-A06A-56DA318DCCE8",
                                    "type": "seg",
                                    "surface": "列なるチェリーブラッサム",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "F0870B37-CA67-4AF9-9257-88462BC2B94A",
                                    "type": "seg",
                                    "surface": "春が来て 今 僕の住む",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "B7C51CA4-DE64-4233-8FC9-F20A50544733",
                                    "type": "seg",
                                    "surface": "灰色のこの街にも",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "5FE193D2-74E1-44A1-A5E4-4045E8B49F8F",
                                    "type": "seg",
                                    "surface": "目がくらむほど 桜、咲いたよ",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "8BB44717-8A65-4875-8561-D7C989DB6C69",
                                    "type": "seg",
                                    "surface": "涙がこぼれてきた",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "F894BE37-DBBF-4161-8A86-9C4AA7F61783",
                                    "type": "seg",
                                    "surface": "君の笑顔も泣き顔も",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "7FB265A3-5FD6-4BE3-9862-276106F8FBF6",
                                    "type": "seg",
                                    "surface": "誰よりも知っていたのに",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "0FDD0460-76D4-40DF-BA2B-83349998139E",
                                    "type": "seg",
                                    "surface": "遠くの街で 君がどんな顔しているかなんて…",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "8102BA65-6575-4720-A07C-49027A3D2173",
                                    "type": "seg",
                                    "surface": "僕はこれっぽっちも知らない",
                                    "isOs": true,
                                    "isBg": false,
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
const lrc = `小さな駅のホーム 桜の見えるベンチ
小车站的月台上 能看见樱花的长椅
明るく振る舞う君 迫り来る発車時刻
故作开朗的你 就要到来的列车
えっと…えっと…伝えたいことは
「那个…那个…」想要告诉你的话
えっと…えっと…山ほどある
「那个…那个…」像山一样多
口から出るのはくだらない話題ばかりさ
但说出口的全是无聊的话题
君の笑顔も泣き顔も
你笑的样子哭的样子
知っていたつもりなのに
我明明都知道
今ここで「じゃあね」っていう顔を
但此刻说「再见」的样子
どうしても見れないままで…
为什么我怎么都看不见
憧れの都会の午後 一人で食べるランチ
憧憬的城市的下午 一个人吃着午餐
毎日が深夜残業 飛び乗る最終列車
每天加班到深夜 飞奔着追赶末班车
えっと…えっと…「心配しないで」
那个…那个…「别担心我」
えっと…えっと…「大丈夫さ」
那个…那个…「我没事的」
なぜだろう 君には聞こえていない気がした
为什么 总觉得这些你都听不到
会えない日々が来ることを
不能见面的日子到来了
こわがってばかりいたけど
虽然那么害怕
喜ぶべきか いつの間にか
应该高兴吗？什么时候开始
強い自分を手に入れていた
我变得坚强了起来
忘れたくても全てが君を連想
虽然想忘记但是一切都会联想到你
かき消す為流す二人のエンドロール
消失的流动的 我们结束了
君の経路 僕の回路 君へ帰ろうとしたこの感情
你的路我的路 想要在你身边的这份感情
いつも近くで支えてくれた
总是在身旁支持着我的你
離れて気付く君の心地よさ
分开了才知道你有多好
顔を上げて 見てたSame Day
抬起头 看见和那天一样的
列なるチェリーブラッサム
繁茂的樱花
春が来て 今 僕の住む
春天又来了 现在我住的
灰色のこの街にも
这条灰色的街道
目がくらむほど 桜、咲いたよ
令人目不暇接的樱花也绽放了
涙がこぼれてきた
眼泪滑落
君の笑顔も泣き顔も
你笑的样子哭的样子
誰よりも知っていたのに
我明明比谁都清楚
遠くの街で 君がどんな顔しているかなんて…
但遥远的你 现在是怎样的表情
僕はこれっぽっちも知らない
就连这个我都不知道`.split('\n').filter((seg: string, idx) => !(idx % 2)).map(seg => ({
    "id": _uuid(),
    "type": "seg",
    "surface": seg,
    "isOs": true,
    "isBg": false,
    "children": []
}))
const Editor: React.FC<Props> = ({
    dispatch,
    curEp,
    curSect, sTreeExpandKeys, sTreeAuto,
    curNode,
}) => {

    const test = () => {
        let str = '考えてもみなかった平凡な俺の人生に';
        // NLP({ text: str, mode: 0 }).then(res => {
        let words = prefixLine(txx);
        // copyToClip(JSON.stringify(res.tokens));
        // let words = prefixLine(res.tokens);
        console.log(words);
        // });
    }
    useEffect(() => {
        //@ts-ignore
        if (curEp && curEp.id) {
            dispatchFac('save', {
                //@ts-ignore
                curSect: curEp.stage[0].section[0],
                //@ts-ignore
                curNode: curEp.stage[0].section[0].children[0],
            });
        }
        //@ts-ignore
    }, [(curEp || {}).id]);

    const dispatchFac = (url: string, payload?: any) => {
        return dispatch && dispatch({
            type: "editor/" + url,
            payload
        })
    }

    const [fr, setFr] = useState(false);

    //#region 整个Ep
    const showRef = useRef({
        showPos: false,
        showReading: false,
        showSys: false
    });
    const toggelClsCtrl = (key: 'showPos' | 'showReading' | 'showSys') => {
        showRef.current[key] = !showRef.current[key];
        setFr(!fr);
    }
    //#endregion


    const Callback: ecallback = (type, data) => {

        if (type === 'fresh') setFr(!fr);
        else if (type === 'stageChange') {
            dispatchFac('save', {
                curSect: data,
                curNode: data,
            });
            setFormVis(true);
            setFr(!fr);
        } else if (type === 'strucChange') {
            dispatchFac('save', {
                curNode: data
            });
            setFormVis(true);
            setFr(!fr);
        } else if (type === 'stuckExpandKeys') {
            dispatchFac('save', {
                sTreeExpandKeys: data,
                sTreeAuto: false
            })
        } else if (type == 'strucMerge') {
            dispatchFac('save', {
                sTreeExpandKeys: [...sTreeExpandKeys, data.id],
                sTreeAuto: true,
                curNode: data
            })
        } else if (type === 'partclick') {
            dispatchFac('save', {
                sTreeExpandKeys: [data.id],
                sTreeAuto: true,
                curNode: data,
            })
            setFr(!fr);
        }
    }

    const [FormVis, setFormVis] = useState(false);

    return (
        <div className={styles['editor-layout']}>
            <div>
                <Button onClick={() => toggelClsCtrl('showPos')}>词性</Button>
                <Button onClick={() => toggelClsCtrl('showReading')}>读音</Button>
                <Button onClick={() => toggelClsCtrl('showSys')}>结构</Button>
                <Button onClick={() => copyToClip('id:"' + _uuid() + '",')}>new uuid</Button>
                <Button onClick={() => setFormVis(!FormVis)}>toggel</Button>
                <Button onClick={() => copyToClip(JSON.stringify(curEp, null, 4))}>copy</Button>
                <Button onClick={test}>npl test</Button>
            </div>
            <div style={{ display: 'flex', height: 200 }} >
                <div style={{ flex: 3, overflowY: 'auto' }}>
                    <TreeStage curEp={curEp as eep} callback={Callback} />

                </div>
                <div style={{ flex: 5, overflowY: 'auto' }}>
                    <TreeStruc curSect={curSect as esection} callback={Callback} expandKeys={sTreeExpandKeys} autoExpand={sTreeAuto} />
                </div>
                <div style={{ flex: 3, }}>
                    <PageStruc curSect={curSect as esection} {...showRef.current} callback={Callback} />
                </div>
            </div>
            <div>
                <Passage curEp={curEp as eep} {...showRef.current} />
            </div>

            <Drawer
                title="Basic Drawer"
                placement="bottom"
                closable={false}
                visible={FormVis}
                height={'60vh'}
                mask={false}
            >
                <FormNode curNode={curNode} callback={Callback} _ctrl={fr} autoSave={FormVis} />
            </Drawer>
        </div>
    );
};
export default connect(mapStateToProps)(Editor);
