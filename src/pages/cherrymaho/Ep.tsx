import React, { useState } from 'react';
import { Button, Divider } from 'antd';
import { getJson } from '@/services/api';
import classnames from 'classnames';
import styles from './index.less';
const _ = require('lodash');
interface Props {
}
const _colors = [
    ['名詞', 'n'],
    ['動詞', 'v'],
    ['助詞', 'av'],
    ['形容詞', 'a'],
    ['助動詞', 'mv'],
    ['副詞', 'adv'],
    ['記号', 'mark']
]
const Ep: React.FC<Props> = () => {
    const getEp = () => {
        getJson('01-2.json').then((res: any) => {
            setCur(res);
        });
    };
    const [cur, setCur] = useState<tEp | null>(null);
    return (
        <div >
            <div className={styles['ep-button-wrapper']}>
                <Button onClick={getEp} >getEp</Button>

            </div>
            <p>
                {_.map(_colors, (c: string[], idx: number) => <span key={idx} className={styles['colormap-' + c[1]]}>{c[0]}</span>)}
            </p>

            <div>
                {
                    cur && <div className={styles['ep-wrapper']}>
                        <h2 className={styles['ep-number']}> 第 {cur.number} 話</h2>
                        {
                            _.map(_.reverse(cur.cat), (cat: tCat, cidx: number) => (
                                // _.map(cur.cat, (cat: tCat, cidx: number) => (

                                <React.Fragment key={cidx}>
                                    <div >
                                        {/* <p>{cat.name}：</p> */}
                                        <Divider orientation="left" style={cidx ? { marginTop: 50 } : {}}  >{cat.name}</Divider>
                                        <div>
                                            {
                                                _.map(_.reverse(cat.sects), (sets: tSection[], sidxs: number) => (
                                                    // _.map(cat.sects, (sets: tSection[], sidxs: number) => (
                                                    <div key={sidxs} >
                                                        {!!sidxs && <hr />}
                                                        {
                                                            _.map(sets, (set: tSection, sidx: number) =>
                                                            (
                                                                <div key={sidx} style={{ display: 'flex' }}>
                                                                    <div className={styles['ep-speaker']}>{set.speaker}：</div>
                                                                    <div>
                                                                        {_.map(set.segs, (seg: tSegment, ssidx: number) => (
                                                                            <span key={ssidx} className={classnames(styles['ep-segment'], seg.isOs && styles['isOs'], seg.isMemo && styles['isMemo'], seg.isBg && styles['isBg'])}>
                                                                                {  _.map(seg.blocks, (b: tBlock, pos: number) => (
                                                                                    <div key={pos} className={classnames(styles['ep-block'])}>
                                                                                        {
                                                                                            _.map(b.words, (w: any, p: number) => {

                                                                                                return <div key={p} className={classnames(styles['ep-word-box'], w.left && styles['word-mark'])}>
                                                                                                    <div className={classnames(styles['ep-reading'], { [styles['word-center']]: w.reading.length === 1 })}>{w.reading || <>&nbsp;</>}</div>
                                                                                                    <div className={classnames(styles['ep-word'], styles['word-' + w.cls], { [styles['word-center']]: w.surface.length === 1, })}>
                                                                                                        <span>{w.surface}</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                ))}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>

                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}
export default Ep;
