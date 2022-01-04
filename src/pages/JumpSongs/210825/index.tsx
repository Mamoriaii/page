

import { Col, Row, Spin } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from '../index.less';

const lrcJSON = require('./data/群青ランナウェイ.json');
const AllWords = require('../data/words.json');
const _ = require('lodash');
interface Props {
}

const Page: React.FC<Props> = () => {
    const [loading, setLoading] = useState(false);
    const [curLrc, setCurLrc] = useState<any>();
    const [wordMap, setWordMap] = useState<any>({});
    useEffect(() => {
        const map: any = {};
        lrcJSON.lrc.map((item: any) => {
            item.words.map((w: any) => {
                if (AllWords[w.base] && AllWords[w.base][w.surface] && !AllWords[w.base].hide)
                    map[w.surface] = AllWords[w.base][w.surface];
            })
        })
        setWordMap(_.groupBy(_.values(map), (v: any) => v.conf.curPos));
        setCurLrc(lrcJSON)
    }, []);

    const step = Math.ceil(curLrc?.lrc?.length / 3);

    return (
        <div >
            <div style={{ fontSize: 24, fontWeight: 'bold', textAlign: "center", padding: 16 }}>{curLrc?.name}</div>
            <Spin spinning={false}>
                <Row justify="space-between">
                    <Col >
                        {curLrc?.lrc?.map((item: any, idx: number) => {
                            if (idx > step) return;
                            return <div key={idx} style={{ marginTop: 32 }}>
                                {
                                    _.map(item.words, (w: any, p: number) => {
                                        return <div key={p} className={classNames(styles['ep-word-box'], w.left && styles['word-mark'])}>
                                            <div className={classNames(styles['ep-reading'], { [styles['word-center']]: w.reading?.length === 1 })}>{w.reading || <>&nbsp;</>}</div>
                                            <div className={classNames(styles['ep-word'], styles['word-' + w.curPos], { [styles['word-center']]: w.surface?.length === 1, })}>
                                                <span>{w.surface}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        })}
                    </Col>

                    <Col >
                        {curLrc?.lrc?.map((item: any, idx: number) => {
                            if (idx <= step) return;
                            if (idx > step * 2) return;
                            return <div key={idx} style={{ marginTop: 32 }}>
                                {
                                    _.map(item.words, (w: any, p: number) => {
                                        return <div key={p} className={classNames(styles['ep-word-box'], w.left && styles['word-mark'])}>
                                            <div className={classNames(styles['ep-reading'], { [styles['word-center']]: w.reading?.length === 1 })}>{w.reading || <>&nbsp;</>}</div>
                                            <div className={classNames(styles['ep-word'], styles['word-' + w.curPos], { [styles['word-center']]: w.surface?.length === 1, })}>
                                                <span>{w.surface}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        })}
                    </Col>
                    <Col >
                        {curLrc?.lrc?.map((item: any, idx: number) => {
                            if (idx <= step * 2) return;
                            return <div key={idx} style={{ marginTop: 32 }}>
                                {
                                    _.map(item.words, (w: any, p: number) => {
                                        return <div key={p} className={classNames(styles['ep-word-box'], w.left && styles['word-mark'])}>
                                            <div className={classNames(styles['ep-reading'], { [styles['word-center']]: w.reading?.length === 1 })}>{w.reading || <>&nbsp;</>}</div>
                                            <div className={classNames(styles['ep-word'], styles['word-' + w.curPos], { [styles['word-center']]: w.surface?.length === 1, })}>
                                                <span>{w.surface}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        })}
                    </Col>
                </Row>
            </Spin>

            <Row wrap style={{ display: 'none' }}>
                {
                    _.map(wordMap, (map: any, group: any) => {

                        return <Col key={group} span={24} >
                            <div style={{ marginTop: 20 }} className={styles['colormap-' + group]}>{group}</div>
                            <Row wrap gutter={[16, 32]} className={styles['colormapbg-' + group]}>
                                {
                                    _.map(map, (item: any, w: any) => {
                                        const { conf } = item || {}
                                        if (item.hide) return null;
                                        return <Col key={w} span={4} onClick={() => { map[w].hide = true; setLoading(!loading) }}>
                                            <div className={classNames(styles['ep-word-box'], conf?.left && styles['word-mark'])}>
                                                <div className={classNames(styles['ep-reading'], { [styles['word-center']]: conf?.reading?.length === 1 })}>{conf?.reading || <>&nbsp;</>}</div>
                                                <div className={classNames(styles['ep-word'], { [styles['word-center']]: conf?.surface?.length === 1, })}>
                                                    <span>{conf?.surface}</span>
                                                </div>
                                            </div>
                                            <div> 【 {conf?.base} 】 {conf?.pos}</div>
                                        </Col>
                                    })
                                }
                            </Row>
                        </Col>
                    })
                }
            </Row>
        </div>
    )
}
export default Page;
