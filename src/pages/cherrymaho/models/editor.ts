import { Model } from 'dva';
const _ = require('lodash');
//#region  copy clip
const copy: eep | {} = {
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
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "8F83D816-E84C-4F60-9EE5-33063648FE31",
                                    "type": "seg",
                                    "surface": "明るく振る舞う君 迫り来る発車時刻",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "477D065A-EF96-4C2C-9358-35ADDEA831DB",
                                    "type": "seg",
                                    "surface": "えっと…えっと…伝えたいことは",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "A687B98B-E468-4E21-96E7-CA449B2F3F13",
                                    "type": "seg",
                                    "surface": "えっと…えっと…山ほどある",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "8C8F2C6E-8315-4741-A566-E9D4939B8B06",
                                    "type": "seg",
                                    "surface": "口から出るのはくだらない話題ばかりさ",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "CD749E97-1115-469D-A840-032540E862DD",
                                    "type": "seg",
                                    "surface": "君の笑顔も泣き顔も",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "F7890C6C-87BE-4C1F-BCD9-AD9D107AFD74",
                                    "type": "seg",
                                    "surface": "知っていたつもりなのに",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "C4C19193-5196-4AD0-A352-6417250A40AD",
                                    "type": "seg",
                                    "surface": "今ここで「じゃあね」っていう顔を",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "B06B05C8-F927-44E6-B797-806C768C321A",
                                    "type": "seg",
                                    "surface": "どうしても見れないままで…",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "5233427E-3F3E-45B9-B57D-259F362142D0",
                                    "type": "seg",
                                    "surface": "憧れの都会の午後 一人で食べるランチ",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "D7D177B8-D1F9-4615-A190-9FB20D88747E",
                                    "type": "seg",
                                    "surface": "毎日が深夜残業 飛び乗る最終列車",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "D1A8ABE0-1BB7-4DB6-BD86-D65BCCA31DD2",
                                    "type": "seg",
                                    "surface": "えっと…えっと…「心配しないで」",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "F5274395-ADBA-4759-AC1A-7297A6754004",
                                    "type": "seg",
                                    "surface": "えっと…えっと…「大丈夫さ」",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "112AB45A-5474-4FC0-AC88-047BF2471592",
                                    "type": "seg",
                                    "surface": "なぜだろう 君には聞こえていない気がした",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "BF85BD7E-E5CB-44EC-97F6-B6EECB3FBE12",
                                    "type": "seg",
                                    "surface": "会えない日々が来ることを",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "1CA28F8D-4F5C-4BD8-A02C-969EA311E182",
                                    "type": "seg",
                                    "surface": "こわがってばかりいたけど",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "6675202A-9881-45FE-B0FA-CB9475B51C01",
                                    "type": "seg",
                                    "surface": "喜ぶべきか いつの間にか",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "4A4F6C65-A162-4D46-A373-E91AB0390A2A",
                                    "type": "seg",
                                    "surface": "強い自分を手に入れていた",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "00EA9896-9645-4FB4-BBED-1D281D60A148",
                                    "type": "seg",
                                    "surface": "忘れたくても全てが君を連想",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "C0C6352F-555A-4DF7-A317-73C70E593D44",
                                    "type": "seg",
                                    "surface": "かき消す為流す二人のエンドロール",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "3ABB6DAB-0303-4F2A-94F5-F32E158AA671",
                                    "type": "seg",
                                    "surface": "君の経路 僕の回路 君へ帰ろうとしたこの感情",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "2A974741-277E-44A8-822C-EE9CED5D9F93",
                                    "type": "seg",
                                    "surface": "いつも近くで支えてくれた",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "4E23257F-E0DB-47A1-A769-FEF9765FC2A1",
                                    "type": "seg",
                                    "surface": "離れて気付く君の心地よさ",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "EA88F880-3F10-43FC-B5A4-163B60281AAF",
                                    "type": "seg",
                                    "surface": "顔を上げて 見てたSame Day",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "68F31C64-9F30-400F-A06A-56DA318DCCE8",
                                    "type": "seg",
                                    "surface": "列なるチェリーブラッサム",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "F0870B37-CA67-4AF9-9257-88462BC2B94A",
                                    "type": "seg",
                                    "surface": "春が来て 今 僕の住む",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "B7C51CA4-DE64-4233-8FC9-F20A50544733",
                                    "type": "seg",
                                    "surface": "灰色のこの街にも",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "5FE193D2-74E1-44A1-A5E4-4045E8B49F8F",
                                    "type": "seg",
                                    "surface": "目がくらむほど 桜、咲いたよ",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "8BB44717-8A65-4875-8561-D7C989DB6C69",
                                    "type": "seg",
                                    "surface": "涙がこぼれてきた",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "F894BE37-DBBF-4161-8A86-9C4AA7F61783",
                                    "type": "seg",
                                    "surface": "君の笑顔も泣き顔も",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "7FB265A3-5FD6-4BE3-9862-276106F8FBF6",
                                    "type": "seg",
                                    "surface": "誰よりも知っていたのに",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "0FDD0460-76D4-40DF-BA2B-83349998139E",
                                    "type": "seg",
                                    "surface": "遠くの街で 君がどんな顔しているかなんて…",
                                    "isOs": false,
                                    "isBg": false,
                                    "children": []
                                },
                                {
                                    "id": "8102BA65-6575-4720-A07C-49027A3D2173",
                                    "type": "seg",
                                    "surface": "僕はこれっぽっちも知らない",
                                    "isOs": false,
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

//#endregion
//#region  copy rev
const prev = {
    number: 1,
    id: "71212609-9769-4BCD-8DC9-5F9173A98A9B",
    type: 'passage',
    stage: [
        {
            id: "71212609-9769-4BCD-8DC9-5F9173A98A9B",
            name: '上坡',
            type: 'chapter',
            section: [
                {
                    id: "D118F887-3DF7-4B91-89D4-9E9FF7ED879C",
                    name: 'part 1',
                    type: 'section',
                    children: [
                        {
                            speaker: '安',
                            id: "116A3CBB-FF1E-4B7F-8B12-3522DDE5A6FF",
                            type: 'dialog',
                            children: [
                                {
                                    id: "BF5CB773-1F30-4BD6-9AA5-654A1C320A84",
                                    type: 'seg',
                                    surface: '３０歳になるまで、考えてもみなかった。',
                                    isOs: true,
                                    isBg: false,
                                    children: [
                                        {
                                            id: "C774C911-8F14-4714-A445-5A3B054334BB",
                                            type: 'chunk',
                                            surface: '３０歳になるまで、',
                                            grammar: 'S まで',
                                            punk: '、',
                                            children: [
                                                {
                                                    id: "2FC5B110-EBBB-4698-9EF9-FD8774633C70",
                                                    type: 'chunk',
                                                    surface: '３０歳になる',
                                                    grammar: 'Nに なる',
                                                    children: [
                                                        {
                                                            id: "E6C478D3-CB19-4A66-BD11-22B289FA5966",
                                                            type: 'word',
                                                            surface: '３０歳',
                                                            curPos: 'n',
                                                            reading: "さんじゅっさい",
                                                        },
                                                        {
                                                            id: "5038AB08-41DF-4AEB-BAD5-07B6D62F37E8",
                                                            type: 'word',
                                                            surface: 'に',
                                                            curPos: 'z'
                                                        },
                                                        {
                                                            id: "B193794A-F517-42C6-8496-09FE1FD90BDF",
                                                            type: 'word',
                                                            surface: 'なる',
                                                            curPos: 'v',
                                                        }
                                                    ]
                                                }, {
                                                    id: "EC1E9938-F49E-4FE4-8318-A32989D3822D",
                                                    type: 'word',
                                                    surface: 'まで'
                                                }
                                            ]
                                        },
                                        {
                                            id: "91283ACA-C1F5-4FDE-A771-731D215FB351",
                                            type: 'chunk',
                                            surface: '考えてもみなかった。',
                                            punk: '。'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
//#endregion

const defaultState: editorState = {
    curEp: copy,
    curChapIdx: 0,
    curSect: {},
    curNode: {},
    sTreeExpandKeys: [],
    sTreeAuto: false,
};
/**
 * Model的实现
 */
const interceptModel: Model = {
    namespace: 'editor',
    state: defaultState,
    reducers: {
        save(state, action: any) {
            return { ...state, ...action.payload };
        },
        clear() {
            return defaultState;
        },
    },
    effects: {

    },
    subscriptions: {

    },
};

export default interceptModel;
