import React, { useEffect, useRef, useState } from 'react';
const _ = require('lodash');
import { Form, InternalFieldList as FieldList, FormItem, FormEffectHooks } from '@formily/antd';
import { Input, Select, Radio as FRadio, Switch } from '@formily/antd-components'
import { Radio, Input as Ainput, Button, Row, Col } from 'antd'
import { _uuid } from '@/utils/tools';
import { NLP } from '@/services/api';
import { prefixLine } from './utils';

const { onFormChange$, onFormInit$ } = FormEffectHooks

interface SubProps {
    onSubmit: (v: any) => any;
    onChange: (v: any) => any;
    initValue: any;
}
let _type = 'word chunk seg dialog section chapter passage /'.split(' ');
let _poss = 'n v a adv /';

const splitPunc = (str: string) => {
    str = str.replace(/[ \n]+/g, '');
    let arr: any = [];
    let tmp = '';
    let reg = /[ぁ-んァ-ヶ\u4e00-\u9fa5\uFB00-\uFB4F\uff10-\uff19\uff21-\uff39]+/;
    // let reg2 = /[ぁ-んァ-ヶ\u4e00-\u9fa5\uFB00-\uFB4F\uff10-\uff19\uff21-\uff39]+/;
    _.map(str, (char: any) => {
        if (char) {
            if (reg.test(char)) {
                tmp += char;
            } else {
                if (tmp) {
                    arr.push({
                        surface: tmp,
                        type: 'chunk',
                        id: _uuid(),
                        punk: char
                    });
                } else {
                    let len = arr.length;
                    let last = len > 0 ? arr[len - 1].surface : false;
                    if (last && reg.test(last)) {
                        arr.push({
                            surface: char,
                            type: 'chunk',
                            id: _uuid(),
                        })
                    } else if (len > 0) {
                        arr[len - 1].surface += char;
                    }
                }


                tmp = '';
            }
        }
    });

    if (tmp) {
        arr.push({
            surface: tmp,
            type: 'chunk',
            id: _uuid(),
        })
    }
    return arr;
}

const splitSeg = (str: string) => {
    str = str.replace(/[ \n]+/g, '');
    let arr: any = [];
    let tmp = '';
    _.map(str, (char: any) => {
        if (char) {
            if (!/[。？]+/.test(char)) {
                tmp += char;
            } else {
                if (tmp) {
                    arr.push({
                        id: _uuid(),
                        surface: tmp + char,
                    })
                } else {
                    let len = arr.length;
                    if (len > 0)
                        arr[len - 1].surface += char;
                }
                tmp = '';
            }
        }
    });
    arr = _.map(arr, (seg: any) => {
        seg.id = _uuid();
        seg.type = "seg";
        seg.isOs = false;
        seg.isBg = false;
        seg.children = splitPunc(seg.surface);
        return seg;
    });
    return arr;
};

const splitSpk = (prev: string) => {
    prev = prev.replace(/[ \n]+/g, '');
    let spkArr = prev.split('：');
    let spk = spkArr[0];
    let str = spkArr.slice(1).join('');
    let node = {
        id: _uuid(),
        speaker: _.indexOf('安黒六藤浦柘湊群'.split(''), spk) > -1 ? spk : '群',
        children: splitSeg(str),
        type: 'dialog',
    }
    return node;
}



const WordForm: React.FC<SubProps> = ({ onSubmit, onChange, initValue }) => {
    return <>
        <Form
            initialValues={initValue}
            onSubmit={onSubmit}
            effects={() => {
                onFormChange$().subscribe(value => {
                    onChange(value);
                })
            }}
        >
            <Row gutter={16}>
                <Col span={6}>
                    <FormItem type="string" name="type" title="type" component={FRadio.Group} dataSource={['chunk', 'word']} display={true} />
                </Col>
                <Col span={10}>
                    <FormItem type="string" name="curPos" title="cls" component={FRadio.Group} dataSource={_poss.split(' ')} />
                </Col>
                <Col span={4}>
                    <FormItem type="string" name="isPre" title="isPre" component={Switch} />
                </Col>
                <Col span={4}>
                    <FormItem type="string" name="isAfter" title="isAfter" component={Switch} />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <FormItem type="string" name="base" title="base" component={Input} />
                </Col>
                <Col span={6}>
                    <FormItem type="string" name="surface" title="surface" component={Input} />
                </Col>
                <Col span={6}>
                    <FormItem type="string" name="reading" title="reading" component={Input} />
                </Col>
                <Col span={6}>
                    <FormItem type="string" name="pos" title="词性" component={Input} />
                </Col>
            </Row>

        </Form>
    </>
}
const ChunkForm: React.FC<SubProps> = ({ onSubmit, onChange, initValue }) => {
    const [inputValue, setInputValue] = useState('');
    return <>
        <Form
            initialValues={initValue}
            onSubmit={onSubmit}
            effects={() => {
                onFormChange$().subscribe(value => {
                    onChange(value);
                })
            }}
        >
            <Row gutter={16}>

                <Col span={6}>
                    <FormItem type="string" name="type" title="type" component={FRadio.Group} dataSource={['chunk', 'word']} display={true} />

                </Col>

                <Col span={18} style={{ textAlign: 'right' }}>
                    <Button
                        onClick={() => {
                            let str = initValue.surface;

                            str && NLP({ text: str, mode: 0 }).then(res => {
                                let words = prefixLine(res.tokens);
                                if (words.length === 1) {
                                    let tmp = words[0];
                                    tmp.id = initValue.id;
                                    tmp.type = 'word';
                                    onSubmit(tmp);
                                }
                            });
                        }}
                    >
                        trans word
                    </Button>
                </Col>
            </Row>


            <FormItem type="string" name="surface" title="surface" component={Input} />
            <FormItem type="string" name="grammar" title="grammar" component={Input} />
            <Row gutter={16}>
                <Col span={8}>
                    <FormItem type="string" name="pos" title="成分性质" component={Input} />
                </Col>
                <Col span={8}>
                    <FormItem type="string" name="punk" title="标点" component={Input} />
                </Col>
                <Col span={8}>
                    <FormItem type="string" name="ge" title="格" component={Input} />
                </Col>
            </Row>
            <div style={{ border: '1px solid black', borderRadius: 4, padding: 5, overflow: 'hidden' }}>
                <FieldList
                    name="children"
                >
                    {({ state, mutators }) => {
                        const onAddWords = () => {
                            let str = inputValue.replace(/[ \n]+/g, '');
                            let obj = JSON.parse(str);
                            if (_.isArray(obj)) {
                                _.map(obj, (o: any) => {
                                    o.id = _uuid();
                                    o.type = 'word';
                                    // o.pos = _.upperCase(o.cls);
                                    mutators.push(o);
                                });
                            } else {
                                obj.id = _uuid();
                                // obj.pos = _.upperCase(obj.cls);
                                obj.type = 'word';
                                mutators.push(obj);
                            }
                        }

                        const onAddChunk = () => {
                            mutators.push({ id: _uuid(), type: 'chunk' });
                        }

                        const onNpl = () => {
                            let str = inputValue || initValue.surface;

                            str && NLP({ text: str, mode: 0 }).then(res => {
                                let words = prefixLine(res.tokens);
                                _.map(words, (o: any) => {
                                    o.id = _uuid();
                                    o.type = 'word';
                                    mutators.push(o);
                                });

                            });
                        }

                        const onPunk = () => {
                            let str = inputValue || initValue.surface;
                            let arr = splitPunc(str);
                            _.map(arr, (seg: any) => {
                                mutators.push(seg);
                            });
                        }
                        return (
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flex: 1 }}>
                                        <Ainput value={inputValue} onChange={e => setInputValue(e.target.value)} />
                                    </div>
                                    <div>
                                        <Button onClick={onNpl} style={{ marginRight: 10 }}>npl word</Button>
                                        <Button onClick={onAddWords} style={{ marginRight: 10 }}>add word</Button>
                                        <Button onClick={onAddChunk} style={{ marginRight: 10 }}>add chunk</Button>
                                        <Button onClick={onPunk} style={{ marginRight: 10 }}>punk chunk</Button>
                                    </div>
                                </div>
                                <div style={{ maxHeight: 500, overflowY: 'auto', overflowX: 'hidden', paddingTop: 10, marginRight: -20 }}>
                                    {state.value.map((item: any, index: number) => {
                                        const onInsertAfter = (index: number) => mutators.insert(index + 1, { id: _uuid() })
                                        const onRemove = (index: number) => mutators.remove(index)
                                        const onMoveUp = (index: number) => mutators.moveUp(index)
                                        const onMoveDown = (index: number) => mutators.moveDown(index)
                                        return (
                                            <React.Fragment key={index}>
                                                {!!index && <hr />}
                                                <Row gutter={16} >
                                                    <Col span={14}>
                                                        <FormItem label="surface" name={`children.${index}.surface`} component={Input} placeholder="surface" />
                                                    </Col>
                                                    <Col span={6}>
                                                        <FormItem type="string" name={`children.${index}.curPos`} title="cls" component={FRadio.Group} dataSource={_poss.split(' ')} />
                                                    </Col>
                                                    <Col span={4} >
                                                        <Button onClick={onInsertAfter.bind(null, index)} shape="circle">+</Button>
                                                        <Button onClick={onRemove.bind(null, index)} shape="circle">-</Button>
                                                        <Button onClick={onMoveUp.bind(null, index)} shape="circle">↑</Button>
                                                        <Button onClick={onMoveDown.bind(null, index)} shape="circle">↓</Button>
                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    }}
                </FieldList>

            </div>
        </Form>
    </>
}
const SegForm: React.FC<SubProps> = ({ onSubmit, onChange, initValue }) => {
    const [inputValue, setInputValue] = useState('');
    return <>
        <Form
            initialValues={initValue}
            onSubmit={onSubmit}
            effects={() => {
                onFormChange$().subscribe(value => {
                    onChange(value);
                })
            }}
        >
            <FormItem type="string" name="surface" title="surface" component={Input} />
            <FormItem type="string" name="grammar" title="grammar" component={Input} />
            <Row gutter={16}>
                <Col span={4} >
                    <FormItem type="string" name="isOs" title="isOs" component={Switch} />
                </Col>
                <Col span={4} >
                    <FormItem type="string" name="isBg" title="isBg" component={Switch} />
                </Col>
            </Row>


            <div style={{ border: '1px solid black', borderRadius: 4, padding: 5, overflow: 'hidden' }}>
                <FieldList
                    name="children"
                >
                    {({ state, mutators }) => {
                        const onAddWords = () => {
                            let str = inputValue.replace(/[ \n]+/g, '');
                            let obj = JSON.parse(str);
                            if (_.isArray(obj)) {
                                _.map(obj, (o: any) => {
                                    o.id = _uuid();
                                    o.type = 'word';
                                    // o.pos = _.upperCase(o.cls);
                                    mutators.push(o);
                                });
                            } else {
                                obj.id = _uuid();
                                // obj.pos = _.upperCase(obj.cls);
                                obj.type = 'word';
                                mutators.push(obj);
                            }
                        }

                        const onAddChunk = () => {
                            if (/ /.test(inputValue)) {
                                let obj = inputValue.split(' ');
                                _.map(obj, (str: any) => {
                                    if (str) {
                                        let o = {
                                            id: _uuid(),
                                            type: 'chunk',
                                            surface: str
                                        }
                                        mutators.push(o);
                                    }
                                });
                            } else {
                                let o = {
                                    id: _uuid(),
                                    type: 'chunk',
                                    surface: inputValue
                                }
                                mutators.push(o);
                            }
                        }

                        const onPunk = () => {
                            let str = inputValue || initValue.surface;
                            let arr = splitPunc(str);
                            _.map(arr, (seg: any) => {
                                mutators.push(seg);
                            });
                        }
                        return (
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flex: 1 }}>
                                        <Ainput value={inputValue} onChange={e => setInputValue(e.target.value)} />
                                    </div>
                                    <div>
                                        <Button onClick={onAddWords} style={{ marginRight: 10 }}>add word</Button>
                                        <Button onClick={onAddChunk} style={{ marginRight: 10 }}>add chunk</Button>
                                        <Button onClick={onPunk} style={{ marginRight: 10 }}>punk chunk</Button>
                                    </div>
                                </div>
                                <div style={{ maxHeight: 500, overflowY: 'auto', overflowX: 'hidden', paddingTop: 10, marginRight: -20 }}>
                                    {state.value.map((item: any, index: number) => {
                                        const onInsertAfter = (index: number) => mutators.insert(index + 1, { id: _uuid() })
                                        const onRemove = (index: number) => mutators.remove(index)
                                        const onMoveUp = (index: number) => mutators.moveUp(index)
                                        const onMoveDown = (index: number) => mutators.moveDown(index)
                                        const onTrans = () => {
                                            let str = item.surface;

                                            str && NLP({ text: str, mode: 0 }).then(res => {
                                                let words = prefixLine(res.tokens);
                                                if (words.length === 1) {
                                                    let tmp = words[0];
                                                    tmp.id = item.id;
                                                    tmp.type = 'word';
                                                    mutators.insert(index + 1, tmp);
                                                    mutators.remove(index);
                                                }
                                            });
                                        }
                                        return (
                                            <React.Fragment key={index}>
                                                {!!index && <hr />}
                                                <Row gutter={16} >
                                                    <Col span={16}>
                                                        <FormItem label="surface" name={`children.${index}.surface`} component={Input} placeholder="surface" />
                                                    </Col>
                                                    <Col span={4}>
                                                        <FormItem label="type" name={`children.${index}.type`} component={FRadio.Group}
                                                            dataSource={['chunk', 'word']} placeholder="type" />
                                                    </Col>
                                                    <Col span={4} >
                                                        <Button onClick={onInsertAfter.bind(null, index)} shape="circle">+</Button>
                                                        <Button onClick={onRemove.bind(null, index)} shape="circle">-</Button>
                                                        <Button onClick={onMoveUp.bind(null, index)} shape="circle">↑</Button>
                                                        <Button onClick={onMoveDown.bind(null, index)} shape="circle">↓</Button>
                                                        {item.type == 'chunk' && <Button onClick={onTrans} shape="circle"> tr </Button>}
                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    }}
                </FieldList>

            </div>
        </Form>
    </>
}
const DialogForm: React.FC<SubProps> = ({ onSubmit, onChange, initValue }) => {
    const [inputValue, setInputValue] = useState('');
    return <>
        <Form
            onSubmit={onSubmit}
            effects={() => {
                onFormChange$().subscribe(value => {
                    onChange(value);
                })
            }}
        >
            <FormItem type="string" name="speaker" title="speaker" component={Input} initialValue={initValue.speaker} />
            <div style={{ border: '1px solid black', borderRadius: 4, padding: 5, overflow: 'hidden' }}>
                <FieldList
                    name="children"
                    initialValue={initValue.children}
                >
                    {({ state, mutators }) => {
                        const onAddChunk = () => {
                            let arr = splitSeg(inputValue);
                            _.map(arr, (seg: any) => {
                                mutators.push(seg);
                            });
                        }
                        return (
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flex: 1 }}>
                                        <Ainput value={inputValue} onChange={e => setInputValue(e.target.value)} />
                                    </div>
                                    <div>
                                        <Button onClick={onAddChunk} style={{ marginRight: 10 }}>add Seg</Button>
                                    </div>
                                </div>
                                <div style={{ maxHeight: 500, overflowY: 'auto', overflowX: 'hidden', paddingTop: 10, marginRight: -20 }}>
                                    {state.value.map((item: any, index: number) => {
                                        const onInsertAfter = (index: number) => mutators.insert(index + 1, { id: _uuid() })
                                        const onRemove = (index: number) => mutators.remove(index)
                                        const onMoveUp = (index: number) => mutators.moveUp(index)
                                        const onMoveDown = (index: number) => mutators.moveDown(index)
                                        return (
                                            <React.Fragment key={index}>
                                                {!!index && <hr />}
                                                <Row gutter={16} >
                                                    <Col span={14}>
                                                        <FormItem label="surface" name={`children.${index}.surface`} component={Input} placeholder="surface" />
                                                    </Col>
                                                    <Col span={3}>
                                                        <FormItem type="string" name={`children.${index}.isOs`} title="isOs" component={Switch} />
                                                    </Col>
                                                    <Col span={3}>
                                                        <FormItem type="string" name={`children.${index}.isBg`} title="isBg" component={Switch} />
                                                    </Col>
                                                    <Col span={4} >
                                                        <Button onClick={onInsertAfter.bind(null, index)} shape="circle">+</Button>
                                                        <Button onClick={onRemove.bind(null, index)} shape="circle">-</Button>
                                                        <Button onClick={onMoveUp.bind(null, index)} shape="circle">↑</Button>
                                                        <Button onClick={onMoveDown.bind(null, index)} shape="circle">↓</Button>

                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    }}
                </FieldList>

            </div>
        </Form>
    </>
}

const SectionForm: React.FC<SubProps> = ({ onSubmit, onChange, initValue }) => {
    const [inputValue, setInputValue] = useState('');
    return <>
        <Form
            onSubmit={onSubmit}
            effects={() => {
                onFormChange$().subscribe(value => {
                    onChange(value);
                })
            }}
        >
            <FormItem type="string" name="name" title="name" component={Input} initialValue={initValue.name} />
            <div style={{ border: '1px solid black', borderRadius: 4, padding: 5, overflow: 'hidden' }}>
                <FieldList
                    name="children"
                    initialValue={initValue.children}
                >
                    {({ state, mutators }) => {
                        const onAddDialog = () => {
                            console.log('add dialog')

                            let prev = inputValue.replace(/[ ]+/g, '');
                            if (!prev) return;
                            let spkArr = prev.split(/\n/);
                            _.map(spkArr, (line: string) => {
                                if (line) {
                                    let node = splitSpk(line);
                                    mutators.push(node);
                                }
                            });
                        }

                        const onAddChunk = () => {
                            mutators.push({ id: _uuid(), type: 'chunk' });
                        }
                        return (
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flex: 1 }}>
                                        <Ainput.TextArea value={inputValue} onChange={e => setInputValue(e.target.value)} />
                                    </div>
                                    <div>
                                        <Button onClick={onAddDialog} style={{ marginRight: 10 }}>add dialog</Button>
                                        <Button onClick={onAddChunk} style={{ marginRight: 10 }}>add </Button>
                                    </div>
                                </div>
                                <div style={{ maxHeight: 500, overflowY: 'auto', overflowX: 'hidden', paddingTop: 10, marginRight: -20 }}>
                                    {state.value.map((item: any, index: number) => {
                                        const onInsertAfter = (index: number) => mutators.insert(index + 1, { id: _uuid(), type: item.type })
                                        const onRemove = (index: number) => mutators.remove(index)
                                        const onMoveUp = (index: number) => mutators.moveUp(index)
                                        const onMoveDown = (index: number) => mutators.moveDown(index)
                                        return (
                                            <React.Fragment key={index}>
                                                {!!index && <hr />}
                                                <Row >
                                                    <Col span={21}>
                                                        <FormItem label="speaker" name={`children.${index}.speaker`} component={Input} placeholder="speaker" />
                                                    </Col>
                                                    <Col span={2} >
                                                        <p style={{ width: 50, paddingLeft: 10 }}>
                                                            <Button onClick={onInsertAfter.bind(null, index)} shape="circle">+</Button>
                                                            <Button onClick={onRemove.bind(null, index)} shape="circle">-</Button>
                                                            <Button onClick={onMoveUp.bind(null, index)} shape="circle">↑</Button>
                                                            <Button onClick={onMoveDown.bind(null, index)} shape="circle">↓</Button>
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>

                            </div>
                        )
                    }}
                </FieldList>

            </div>
        </Form>
    </>
}

const ChapterForm: React.FC<SubProps> = ({ onSubmit, onChange, initValue }) => {
    return <>
        <Form
            initialValues={initValue}
            onSubmit={onSubmit}
            effects={() => {
                onFormChange$().subscribe(value => {
                    onChange(value);
                })
            }}
        >
            <FormItem type="string" name="name" title="name" component={Input} />
        </Form>
    </>
}


interface Props {
    curNode: any;
    callback: ecallback;
    _ctrl: any;
    autoSave: boolean;
}

const FormNode: React.FC<Props> = ({ curNode, callback, _ctrl, autoSave }) => {
    const [curType, setCurType] = useState((curNode || {}).type || 'chunk');
    const [_key, setKey] = useState(_uuid());
    useEffect(() => {
        setCurType(
            (curNode || {}).type || 'chunk'
        )
    }, [(curNode || {}).type]);

    useEffect(() => {
        setKey(_uuid());
    }, [_ctrl]);
    const formValue = useRef({});
    const beforeSubmit = (v: any) => {
        console.log('submit？');
        _.map(v, (value: any, key: string) => {
            curNode[key] = value;
        });

        callback && callback('fresh');
    }
    const onChange = (v: any) => {
        formValue.current = v;
    }

    return (
        <div key={_key} >
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginRight: 10 }}>type: </span>
                <Radio.Group value={curType} onChange={e => setCurType(e.target.value)}>
                    {
                        _.map(_type, (key: string, idx: number) => <Radio key={idx} value={key}>{key}</Radio>)
                    }
                </Radio.Group>

                <Button onClick={() => beforeSubmit((formValue.current as any).values)}>submit</Button>
            </div>
            {curType === 'word' && <WordForm onSubmit={beforeSubmit} onChange={onChange} initValue={curNode} />}
            {curType === 'chunk' && <ChunkForm onSubmit={beforeSubmit} onChange={onChange} initValue={curNode} />}
            {curType === 'seg' && <SegForm onSubmit={beforeSubmit} onChange={onChange} initValue={curNode} />}

            {curType === 'dialog' && <DialogForm onSubmit={beforeSubmit} onChange={onChange} initValue={curNode} />}
            {curType === 'section' && <SectionForm onSubmit={beforeSubmit} onChange={onChange} initValue={curNode} />}

            {curType === 'chapter' && <ChapterForm onSubmit={beforeSubmit} onChange={onChange} initValue={curNode} />}
        </div>
    )
}
export default FormNode;
