import React from 'react';
import classnames from 'classnames';
const _ = require('lodash');
interface Props {
}
let str = `３０過ぎても童貞だと、魔法使いになっちまうんだぞ。`;
let strc = {
    _input: str,
    sys: [
        {
            _input: '３０過ぎても童貞だと',
            标点: '、',
            strc: {
                语法: 'N も N だと',
                sys: [
                    {
                        语法: '动词连用形做名词',
                        output: '３０過ぎて',
                        类型: 'N'
                    },
                    {
                        output: 'も',
                        isFix: true
                    },
                    {
                        output: '童貞',
                        类型: 'N'
                    },
                    {
                        output: 'だと',
                        isFix: true
                    }
                ]
            }
        }, {
            _input: '魔法使いになっちまうんだぞ',
            strc: {
                语法: '句子简体 ぞ',
                sys: [
                    {
                        类型: 'N',
                        语法: 'V てしまう',
                        _input: '魔法使いになっちまう',
                        strc: {
                            语法: 'N に なる',
                            sys: [
                                {
                                    类型: 'N',
                                    output: '魔法使い'
                                },
                                {
                                    类型: '/',
                                    output: 'に',
                                    isFix: true
                                },
                                {
                                    output: 'なっ',
                                    isFix: true
                                }
                            ]
                        }
                    },
                    {
                        output: 'んだ',
                        isFix: true
                    }
                ]
            },
            标点: '。'
        }
    ]
}
let strc2: Segment = {
    _input: str,
    sys: [
        {
            _input: '３０過ぎても童貞だと',
            punc: '、',
            strc: {
                grammar: 'N も N だと',
                sys: [
                    {
                        remark: '动词连用形做名词',
                        output: '３０過ぎて',
                        type: 'N'
                    },
                    {
                        output: 'も',
                        isFix: true
                    },
                    {
                        output: '童貞',
                        type: 'N'
                    },
                    {
                        output: 'だと',
                        isFix: true
                    }
                ]
            }
        }, {
            _input: '魔法使いになっちまうんだぞ',
            strc: {
                grammar: '句子简体 ぞ',
                sys: [
                    {
                        type: 'N',
                        grammar: 'V てしまう',
                        _input: '魔法使いになっちまう',
                        strc: {
                            grammar: 'N に なる',
                            sys: [
                                {
                                    type: 'N',
                                    output: '魔法使い'
                                },
                                {
                                    type: '',
                                    output: 'に',
                                    isFix: true
                                },
                                {
                                    output: 'なっ',
                                    isFix: true
                                }
                            ]
                        }
                    },
                    {
                        output: 'んだ',
                        isFix: true
                    }
                ]
            },
            punc: '。'
        }
    ]
}

let t1: Iblock = {
    punc: '。',
    depart: [
        {
            grammar: '句子简体 ぞ',
            pos: 'S',
            depart: [
                {
                    grammar: '句子简体 んだ',
                    pos: 'S',
                    depart: [
                        {
                            grammar: 'V てしまう',
                            pos: 'S',
                            depart: [
                                {
                                    grammar: 'N に なる',
                                    pos: 'V',
                                    depart: [
                                        {
                                            pos: 'N',
                                            output: '魔法使い'
                                        },
                                        {
                                            pos: '',
                                            output: 'に',
                                            isFix: true
                                        },
                                        {
                                            output: 'なっ',
                                            isFix: true
                                        }
                                    ]
                                },
                                {
                                    output: 'ちまう',
                                    isFix: true
                                }
                            ]
                        },
                        {
                            output: 'んだ',
                            isFix: true
                        }
                    ]
                },
                {
                    output: 'ぞ',
                    isFix: true
                }
            ]
        }
    ]
};
let t2: Iblock = {
    punc: '、',
    depart: [
        {
            grammar: 'N も N だと',
            pos: 'S',
            depart: [
                {
                    remark: '动词连用形做名词',
                    output: '３０過ぎて',
                    pos: 'N'
                },
                {
                    output: 'も',
                    isFix: true
                },
                {
                    output: '童貞',
                    pos: 'N'
                },
                {
                    output: 'だと',
                    isFix: true
                }
            ]
        }
    ]
};

let t3 = {
    _input: '３０過ぎても童貞だと',
    grammar: 'N も N だと',
    dpart: [
        {
            type: 'N',
            output: '３０過ぎて'
        },
        {
            type: 'fix',
            output: 'も',
        },
        {
            type: 'N',
            output: '童貞'
        },
        {
            type: 'fix',
            output: 'だと',
        }
    ]
};

let t4 = {
    _input: '魔法使いになっちまうんだぞ',
    grammar: '句子简体 ぞ',
    dpart: [
        {
            type: 'seg',
            grammar: '句子简体 んだ',
            dpart: [
                {
                    type: 'seg',
                    grammar: 'V てしまう',
                    dpart: [
                        {
                            type: 'v',
                            grammar: 'N に なる',
                            dpart: [
                                {
                                    type: 'n',
                                    output: '魔法使い',
                                },
                                {
                                    type: 'fix',
                                    output: 'になっ',
                                }
                            ],
                        },
                        {
                            type: 'fix',
                            output: 'ちまう',
                        }
                    ],
                },
                {
                    type: 'fix',
                    output: 'んだ',
                }
            ],
        },
        {
            type: 'fix',
            output: 'ぞ',
        }
    ]
};

const Test: React.FC<Props> = () => {
    const Renderoutput = (strc: any, show = false) => {
        let chid = <span>
            {show && <span>{strc.output}</span>}
            <span>
                {_.map(strc.sys, (s: any) => Renderoutput(s))}
            </span>
            {
                strc.strc && <span>
                    {_.map(strc.strc.sys, (s: any) => Renderoutput(s, true))}
                </span>
            }
        </span>;
        return <span>
            {chid}
            <span>{strc['标点']}</span>
        </span>;
    }

    const Renderoutput2 = (strc: any) => {
        let chid = <span >
            {strc.output && <span>{strc.output}</span>}
            {_.map(strc.sys, (s: any) => Renderoutput2(s))}
            {
                strc.strc && <div>
                    {_.map(strc.strc.sys, (s: any) => Renderoutput2(s))}
                </div>
            }
        </span>;
        return <span style={{ background: 'pink', display: 'inline-block', margin: 5 }}>
            {chid}
            {strc.punc && <span>{strc['punc']}</span>}
        </span>;
    }

    const renderT1 = (block: Iblock, cnt = 1) => {

        let chid = null;
        if (!_.isEmpty(block.depart || []))
            chid = _.map(block.depart, (d: Iblock) => renderT1(d, cnt + 1))

        return < >
            {chid && !!chid.length &&
                <span className={classnames(!block.punc && 'block-box',
                    block.pos && ('block-' + block.pos),
                    'block-toggle-' + cnt
                )}>
                    {chid}

                    {
                        block.pos && block.pos === 'S' &&
                        <span className="block-tag">{block.pos}</span>
                    }
                </span>}


            {block.output && <span className={classnames('part-output', block.pos && ('part-' + block.pos), block.isFix && 'part-grammar', 'part-grammar-toggle-' + cnt)}>
                {block.output}
            </span>}
            {block.punc}
        </>;
    }
    return (
        <div className="showBlock" >
            {renderT1(t2)}
            {renderT1(t1)}
            <hr />
            <div className="句子" style={{ display: 'none' }}>
                <div className="标点">
                    <div className="语法点">
                        <div className="成分part">
                            <div className="hide-display"> ３０過ぎて</div>
                            <span className="hhide"> N</span>
                        </div>
                        <div className="语法part"> も </div>
                        <div className="成分part">
                            <div className="hide-display">童貞</div>
                            <span className="hhide"> N</span>
                        </div>
                        <div className="语法part"> だと</div>
                    </div>
                </div>
                <div>、</div>
                <div className="标点">
                    <div className="语法点">
                        <div className="成分part">
                            <div className="语法点">
                                <div className="语法点">
                                    <div className="成分part">
                                        <div className="hide-display"> 魔法使い</div>
                                        <span className="hhide"> N</span>
                                    </div>
                                    <div className="语法part"> になっ</div>
                                </div>
                                <div className="语法part"> ちまうん</div>
                            </div>
                        </div>
                        <div className="语法part"> だぞ</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Test;
