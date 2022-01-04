import React from 'react';
import classnames from 'classnames';
import styles from '../index.less';
const _ = require('lodash');
interface Props {
    curSect: esection;

    showPos: boolean;
    showSys: boolean;
    showReading: boolean;

    callback: ecallback;

}

const PageStruc: React.FC<Props> = ({ curSect, showPos, showSys, showReading, callback }) => {
    if (_.isEmpty(curSect)) return <>NULL</>

    const renderTree = (nodes: epart[] | eSeg[]) => {
        return nodes &&
            !_.isEmpty(nodes) &&
            _.map(nodes, (node: epart | eSeg, idx: number) => {
                let output: any = null;
                if (node.type == 'word') {
                    output = <ruby >{node.surface}<rt>{node.reading}</rt></ruby>;
                } else if (_.isEmpty(node.children || [])) {
                    output = <span style={{ color: 'darkred' }}>{node.surface}</span>;
                }
                return <React.Fragment key={idx}>
                    <span key={idx}
                        onClick={(e) => { callback && callback('partclick', node); e.stopPropagation(); }}
                        className={classnames(
                            styles['passage-' + node.type],
                            (node as echunk).punk && styles['passage-chunk-has-punk'],
                            styles['word-' + (node as eword).curPos],
                        )}>
                        {/* {node.type} */}
                        {output}
                        {
                            // @ts-ignore
                            !_.isEmpty(node.children || []) && renderTree(node.children)}
                    </span>
                    {(node as echunk).punk && (node as echunk).punk}
                </React.Fragment>
            })
    };
    return (
        <div
            className={classnames(
                styles['passage'],
                showSys && styles['mode-show-sys'],
                !showReading && styles['mode-hide-reading'],
                showPos && styles['mode-show-pos'])} >
            {
                _.map(curSect.children, (dialog: edialog, dialogIdx: number) => (
                    <div key={dialogIdx} className={classnames(styles['passage-stage-section-dialog'])}>
                        <div className={classnames(styles['passage-speaker-wrapper'])}>{dialog.speaker}</div>
                        <div className={classnames(styles['passage-segment-wrapper'])}>
                            {renderTree(dialog.children)}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default PageStruc;
