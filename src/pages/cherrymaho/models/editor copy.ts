import { Model } from 'dva';
const _ = require('lodash');
/**
 * 定义State
 */
interface State {
    curEp: any;
    theTree: any[];
    showSys: boolean;
    curNode: any;
    curCatIdx: number;
    strucExpandKeys: string[];
    strucAuto: boolean;
}
const defaultState: State = {
    strucExpandKeys: [],
    strucAuto: false,
    curEp: {
        "number": "１",
        "cat": [
            {
                id: 'E7AA3EB0-02AE-45F0-A7E4-69A305A6FBD8',
                "name": "坂",
                "sects": [
                    {
                        id: '502F7CD9-9653-4123-86EF-8A49692AEB0B',
                        name: '1',
                        sect: [
                            { "id": "34F291B8-2275-46FC-BB7D-0459F3CE4292", "speaker": "安", "_input": "安", "children": [{ "id": "F3362262-D2F8-4E61-8E42-64CB5DC2E403", "_input": "３０歳になるまで、考えてもみなかった。", "children": [{ "_input": "３０歳になるまで", "type": "S", "id": "7A157272-9979-4720-8BAB-C37A322436A8" }, { "_input": "、", "id": "81CA458E-B0FA-4BDC-8396-E2EE27783596", "type": "P" }, { "_input": "考えてもみなかった", "type": "S", "id": "B7D0C8ED-67FC-4DA9-A3F8-523B597F82C1" }, { "_input": "。", "id": "8B1598B9-4148-4080-9FC5-D29C052FE190", "type": "P" }] }, { "id": "0A820652-DA6B-4EDF-BB4E-EA37FFC24AD7", "_input": "平凡な俺の人生に、いや、俺自身に、こんな魔法がかかるなんて。", "children": [{ "_input": "平凡な俺の人生に", "type": "S", "id": "97FB9502-7DC5-4A38-B343-953B467F03E9" }, { "_input": "、", "id": "BBF2201D-526F-4BB7-9E8A-9E7E707E258E", "type": "P" }, { "_input": "いや", "type": "S", "id": "0E0B6FE7-5D78-4477-9D61-E298F6D531F1" }, { "_input": "、", "id": "34E7BE6F-BE07-4459-A487-4FE454B7C1A3", "type": "P" }, { "_input": "俺自身に", "type": "S", "id": "51407FC1-CA03-463F-B134-A6AD8C201DA3" }, { "_input": "、", "id": "29ADBA6E-E8CB-4F83-B542-9A4564103929", "type": "P" }, { "_input": "こんな魔法がかかるなんて", "type": "S", "id": "6C389216-6F4F-41BA-855A-01F5793A82F0" }, { "_input": "。", "id": "36A788E0-AE35-48AE-9E4E-8B0F28BB9705", "type": "P" }] }, { "id": "72979677-E4C8-4466-8B8C-870FF7C27553", "_input": "ちなみにこっちは、２９歳と３６４日目の俺。", "children": [{ "_input": "ちなみにこっちは", "type": "S", "id": "1BAA574F-72BA-4DCD-9922-72C746F4FA2F" }, { "_input": "、", "id": "B68E0DC5-1CD9-4243-A907-FAE6F64F3105", "type": "P" }, { "_input": "２９歳と３６４日目の俺", "type": "S", "id": "50F18257-9DFE-45BC-817C-B2ED71548734" }, { "_input": "。", "id": "1437C63A-6513-466C-AAF9-535060EBADEE", "type": "P" }] }] }]
                    }
                ]
            },
            {
                id: '770A58E6-6A37-400E-ADD1-9D33180A2B03',
                "name": "オフィス",
                sects: []
            }
        ]
    },
    //#region thetree
    // theTree: [
    //     {
    //         _input: `３０過ぎても童貞だと、魔法使いになっちまうんだぞ。`,
    //         type: 'segment',
    //         id: 'E7AA3EB0-02AE-45F0-A7E4-69A305A6FBD8',
    //         children: [
    //             {
    //                 _input: '３０過ぎても童貞だと',
    //                 grammar: 'N も N だと',
    //                 pos: 'S',
    //                 id: '502F7CD9-9653-4123-86EF-8A49692AEB0B',
    //                 children: [
    //                     {
    //                         pos: 'N',
    //                         _input: '３０過ぎて',
    //                         id: 'EAE315BA-EE6D-4CFE-B17D-458677828DA5',
    //                         words: [
    //                             {
    //                                 "base": "３０",
    //                                 "pos": "名詞,数,*,*",
    //                                 "pronunciation": "サン",
    //                                 "reading": "さんじゅう",
    //                                 "surface": "３０",
    //                                 "cls": "/"
    //                             },
    //                             {
    //                                 "base": "過ぎる",
    //                                 "pos": "動詞,自立,*,*",
    //                                 "pronunciation": "スギ",
    //                                 "reading": "すぎ",
    //                                 "surface": "過ぎ",
    //                                 "cls": "v"
    //                             },
    //                             {
    //                                 "base": "て",
    //                                 "pos": "助詞,接続助詞,*,*",
    //                                 "pronunciation": "テ",
    //                                 "reading": "",
    //                                 "surface": "て",
    //                                 "cls": "av"
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         id: '05023EC2-EA99-4510-97F2-35C6AF4919E4',
    //                         _input: 'も',

    //                     },
    //                     {
    //                         pos: 'N',
    //                         _input: '童貞',
    //                         id: '5FE8C5B7-C444-4536-ADF1-D9F238103EC9',
    //                         words: [
    //                             {
    //                                 "base": "童貞",
    //                                 "pos": "名詞,一般,*,*",
    //                                 "pronunciation": "ドーテイ",
    //                                 "reading": "どうてい",
    //                                 "surface": "童貞",
    //                                 "cls": "n"
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         id: 'A5B2CBF6-C51F-4116-BA07-95E2339E2582',
    //                         _input: 'だと'
    //                     }
    //                 ]

    //             },
    //             {
    //                 id: '18A47637-7725-4440-A3B4-729489DD4745',
    //                 punc: '、'
    //             },
    //             {
    //                 "grammar": "S ぞ",
    //                 "pos": "S",
    //                 "_input": "魔法使いになっちまうんだぞ",
    //                 id: '57A82979-89BF-479D-AFF2-80C1D9C8917B',
    //                 "children": [
    //                     {
    //                         "grammar": "S んだ",
    //                         id: '87A19200-12A6-4270-A0AE-FDC6A5ABBBF5',
    //                         "pos": "S",
    //                         "_input": "魔法使いになっちまうんだ",
    //                         "children": [
    //                             {
    //                                 id: '770A58E6-6A37-400E-ADD1-9D33180A2B03',
    //                                 "grammar": "V てしまう",
    //                                 "pos": "S",
    //                                 "_input": "魔法使いになっちまう",
    //                                 "children": [
    //                                     {
    //                                         id: '0E890D5F-E7F1-48A6-9CD2-98F15D4CAE1D',
    //                                         "grammar": "N になる",
    //                                         "pos": "V",
    //                                         "_input": "魔法使いになっち",
    //                                         "children": [
    //                                             {
    //                                                 id: '6077F7FA-7355-4A90-A584-96E367C175AA',
    //                                                 "output": "魔法使い",
    //                                                 "_input": "魔法使い",
    //                                                 "pos": "N",
    //                                                 words: [
    //                                                     {
    //                                                         "base": "魔法使い",
    //                                                         "pos": "名詞,一般,*,*",
    //                                                         "pronunciation": "マホーツカイ",
    //                                                         "reading": "まほうつかい",
    //                                                         "surface": "魔法使い",
    //                                                         "cls": "n"
    //                                                     },
    //                                                 ]
    //                                             },
    //                                             {
    //                                                 id: '9C7ACF53-6C03-40C6-9C8A-722CD07690E7',
    //                                                 "_input": "に"
    //                                             },
    //                                             {
    //                                                 id: '8908903B-E2DA-42AF-AAAB-28EAC39A0C0F',
    //                                                 "_input": "なっ",
    //                                                 "pos": "V",
    //                                                 words: [
    //                                                     {
    //                                                         "base": "なる",
    //                                                         "pos": "動詞,自立,*,*",
    //                                                         "pronunciation": "ナッ",
    //                                                         "reading": "",
    //                                                         "surface": "なっ",
    //                                                         "cls": "v"
    //                                                     }
    //                                                 ]
    //                                             },
    //                                         ]
    //                                     },
    //                                     {
    //                                         id: '674F44DC-B901-448F-B6B7-3741FC16F63D',
    //                                         "_input": "ちまう"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 id: '7115B573-9431-488A-9B02-E0A4054141F7',
    //                                 "_input": "んだ"
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         id: '0269E86E-4942-4152-A4B1-A6AB9C565347',
    //                         "_input": "ぞ"
    //                     }
    //                 ]
    //             },
    //             {
    //                 id: 'CAD1B2B6-1E7B-47A5-ABDF-739BF3731CFB',
    //                 punc: '。'
    //             },
    //         ]
    //     }
    // ],
    //#endregion

    theTree: [],
    showSys: false,
    curNode: {},
    curCatIdx: 0,
};
/**
 * Model的实现
 */
const interceptModel: Model = {
    namespace: 'xeditor',
    state: defaultState,
    reducers: {
        save(state, action: any) {
            return { ...state, ...action.payload };
        },
        toggleBlockCls(state) {
            return {
                ...state,
                showSys: !state.showSys
            }
        },
        setCurNode(state, { payload }: any) {
            return {
                ...state,
                curNode: payload.curNode
            }
        },
        setCurCatIdx(state, { payload }: any) {
            return {
                ...state,
                curCatIdx: payload.curCatIdx
            }
        },
        setExpandKeys(state, { payload }: any) {
            return {
                ...state,
                strucExpandKeys: payload.strucExpandKeys,
                strucAuto: payload.strucAuto || false
            }
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
