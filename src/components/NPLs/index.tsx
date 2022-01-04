import classNames from 'classnames';
import React from 'react';
import styles from './index.less';
const _ = require('lodash');
interface Props {
    dataSource: nplWord[]
}

const WordSeg: React.FC<Props> = ({
    dataSource
}) => {
    return (
        < >
            {
                dataSource.map((w: any, p: number) => {
                    return <div key={p} className={classNames(styles['lrc-word-box'])}>
                        <div className={classNames(styles['lrc-reading'], { [styles['word-center']]: w.reading?.length === 1 })}>{w.reading || <>&nbsp;</>}</div>
                        <div className={classNames(styles['lrc-word'], styles['word-' + (w.type || w.cls)], { [styles['word-center']]: w.surface?.length === 1 })}>
                            <span>{w.surface}</span>
                        </div>
                    </div>
                })
            }
        </>
    )
}
export default WordSeg;
