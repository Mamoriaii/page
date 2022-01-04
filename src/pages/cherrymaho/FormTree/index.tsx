import { copyToClip, _uuid } from '@/utils/tools';
import { Button, Input, Tree, Form, Modal, Select } from 'antd';
import React, { useRef, useState } from 'react';
import classnames from 'classnames';
const _ = require('lodash');
interface Props {
}

let ref: any[] = [
    {
        _input: `３０過ぎても童貞だと、魔法使いになっちまうんだぞ。`,
        type: 'segment',
        id: 'E7AA3EB0-02AE-45F0-A7E4-69A305A6FBD8',
        children: [
            {
                _input: '３０過ぎても童貞だと',
                grammar: 'N も N だと',
                pos: 'S',
                id: '502F7CD9-9653-4123-86EF-8A49692AEB0B',
                children: [
                    {
                        pos: 'N',
                        _input: '３０過ぎて',
                        id: 'EAE315BA-EE6D-4CFE-B17D-458677828DA5',
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
                        id: '05023EC2-EA99-4510-97F2-35C6AF4919E4',
                        _input: 'も',

                    },
                    {
                        pos: 'N',
                        _input: '童貞',
                        id: '5FE8C5B7-C444-4536-ADF1-D9F238103EC9',
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
                        id: 'A5B2CBF6-C51F-4116-BA07-95E2339E2582',
                        _input: 'だと'
                    }
                ]

            },
            {
                id: '18A47637-7725-4440-A3B4-729489DD4745',
                punc: '、'
            },
            {
                "grammar": "S ぞ",
                "pos": "S",
                "_input": "魔法使いになっちまうんだぞ",
                id: '57A82979-89BF-479D-AFF2-80C1D9C8917B',
                "children": [
                    {
                        "grammar": "S んだ",
                        id: '87A19200-12A6-4270-A0AE-FDC6A5ABBBF5',
                        "pos": "S",
                        "_input": "魔法使いになっちまうんだ",
                        "children": [
                            {
                                id: '770A58E6-6A37-400E-ADD1-9D33180A2B03',
                                "grammar": "V てしまう",
                                "pos": "S",
                                "_input": "魔法使いになっちまう",
                                "children": [
                                    {
                                        id: '0E890D5F-E7F1-48A6-9CD2-98F15D4CAE1D',
                                        "grammar": "N になる",
                                        "pos": "V",
                                        "_input": "魔法使いになっち",
                                        "children": [
                                            {
                                                id: '6077F7FA-7355-4A90-A584-96E367C175AA',
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
                                                id: '9C7ACF53-6C03-40C6-9C8A-722CD07690E7',
                                                "_input": "に"
                                            },
                                            {
                                                id: '8908903B-E2DA-42AF-AAAB-28EAC39A0C0F',
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
                                        id: '674F44DC-B901-448F-B6B7-3741FC16F63D',
                                        "_input": "ちまう"
                                    }
                                ]
                            },
                            {
                                id: '7115B573-9431-488A-9B02-E0A4054141F7',
                                "_input": "んだ"
                            }
                        ]
                    },
                    {
                        id: '0269E86E-4942-4152-A4B1-A6AB9C565347',
                        "_input": "ぞ"
                    }
                ]
            },
            {
                id: 'CAD1B2B6-1E7B-47A5-ABDF-739BF3731CFB',
                punc: '。'
            },
        ]
    },
    {
        _input: '３０歳になるまで、考えてもみなかった。',
        type: 'segment',
        id: _uuid(),
        children: []
    }
];

const FormTree: React.FC<Props> = () => {
    const createTree = (nodes: any[]) => {
        return (
            nodes &&
            nodes.map((item, idx) => {
                let title = <>
                    <Button size="small" onClick={() => addChild(item)}> add </Button>
                    <Button size="small" onClick={() => addChild(item, true)}> edit </Button>
                    <Button size="small" onClick={() => delNode(nodes, idx)}> del </Button>
                    <span>
                        {item.grammar || item.punc || item._input}
                    </span>
                </>

                return <Tree.TreeNode title={title} key={item.id}  >
                    {!_.isEmpty(item.children || [])
                        ? createTree(item.children)
                        : ''}
                </Tree.TreeNode>
            })
        );
    }

    const [expandKeys, setExpandKeys] = useState<any[]>([])

    const addSeg = () => {
        ref.push({
            _input: segValue,
            type: 'segment',
            id: _uuid(),
            children: []
        });
        setFr(!forceRender);
    };

    const delNode = (arr: any[], idx: number) => {
        arr.splice(idx, 1);
        setFr(!forceRender);
    };
    const curRef = useRef();
    const addChild = (item: any, isEdit = false) => {
        curRef.current = item;
        if (!isEdit) {
            // setFr(!forceRender);
            setCurForm({});
        } else {
            setCurForm(item);
        }
        setFormVis(true);
    };

    const renderPre = (node: any[]) => {
        return node &&
            !_.isEmpty(node) &&
            _.map(node, (s: any, idx: number) => {
                let key = s.id;
                if (_.isEmpty(s.children || [])) {
                    if (!_.isEmpty(s.words || [])) {
                        return <span key={key} className={classnames('part-output', s.pos && ('part-' + s.pos), s.isFix && 'part-grammar')}>
                            {
                                _.map(s.words, (w: any, i: number) => (
                                    <ruby>  {w.surface}<rt>{w.reading}</rt></ruby>
                                ))
                            }
                        </span>
                    } else
                        return <span key={key} className={classnames('part-output', s.pos && ('part-' + s.pos))}>
                            <ruby>  {s._input || s.punc}</ruby>
                        </span>;
                } else {
                    return <span
                        key={key}
                        className={classnames(
                            s.type !== 'segment' && !s.punc && 'block-box',
                            s.pos && ('block-' + s.pos),
                        )}
                        title={s.grammar}
                    >
                        {renderPre(s.children)}
                        {
                            s.pos && s.pos === 'S' &&
                            <span className="block-tag">{s.pos}</span>
                        }
                    </span>;
                }
            });
    }
    const [showSys, setShowSys] = useState(false);

    const [segValue, setSegValue] = useState('');

    const [forceRender, setFr] = useState(false);

    const [curForm, setCurForm] = useState<any>({});
    const [formVis, setFormVis] = useState(false)

    const onFinish = (v: any) => {
        if (!v.id) {
            v.children = [];
            v.id = _uuid();
            // @ts-ignore
            curRef.current.children.push(v);

        } else {
            _.map(v, (value: any, key: string) => {
                if (!_.isUndefined(value)) {
                    // @ts-ignore
                    curRef.current[key] = value;
                }
            });
        }

        setFormVis(false);
    }

    return (
        <>
            <div >
                <Input.TextArea value={segValue} onChange={e => setSegValue(e.target.value)} />
                <Button onClick={() => setShowSys(!showSys)}>toggle Cls</Button>
                <Button onClick={() => copyToClip('id:\'' + _uuid() + '\',')}>uuid</Button>
                <Button onClick={addSeg}>addSeg{forceRender ? 'true' : 'false'}</Button>
                <Tree
                    blockNode
                    expandedKeys={expandKeys}
                    onExpand={(keys: any[]) => setExpandKeys(keys)}
                >
                    {
                        createTree(ref)
                    }
                </Tree>
                <hr />
                <div style={{ position: 'relative' }}>
                    <div className={classnames(showSys && 'showBlock')} >
                        {renderPre(ref)}
                    </div>
                </div>

            </div>
            <Modal
                visible={formVis}
                title="hellow"
                footer={false}
                destroyOnClose
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="_input"
                        name="_input"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        initialValue={curForm._input}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="grammer"
                        name="grammer"
                        initialValue={curForm.grammer}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="pos"
                        name="pos"
                        rules={[{ required: true }]}
                        initialValue={curForm.pos || 'N'}
                    >
                        <Select style={{ display: 'block' }}>
                            <Select.Option value="N">N</Select.Option>
                            <Select.Option value="V">V</Select.Option>
                            <Select.Option value="S">S</Select.Option>
                            <Select.Option value="punk">punk</Select.Option>
                            <Select.Option value="segment">segment</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default FormTree;
