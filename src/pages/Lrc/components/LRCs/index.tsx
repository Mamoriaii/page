import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
const _ = require('lodash');
interface Props {
    note: tNote
}

const LRC: React.FC<Props> = ({ note }) => {
    return (
        <div >
            {
                _.map(note.lines, (line: any, idx: number) => line ? (
                    <div key={idx} className={classnames(styles['lrc-line'])}>
                        {  _.map(line.breaks, (b: any, pos: number) => (
                            <div key={pos} className={classnames(styles['lrc-break'])}>
                                {
                                    _.map(b.words, (w: any, p: number) => {

                                        return <div key={p} className={classnames(styles['lrc-word-box'])}>
                                            <div className={classnames(styles['lrc-reading'], { [styles['word-center']]: w.reading.length === 1 })}>{w.reading || <>&nbsp;</>}</div>
                                            <div className={classnames(styles['lrc-word'], styles['word-' + w.cls], { [styles['word-center']]: w.surface.length === 1 })}>
                                                <span>{w.surface}</span>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        ))}
                    </div>
                ) : <p></p>)
            }
        </div>
    )
}
export default LRC;
