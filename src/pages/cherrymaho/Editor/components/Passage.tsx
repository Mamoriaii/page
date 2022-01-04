import React from 'react';
import classnames from 'classnames';
import styles from '../index.less';
const _ = require('lodash');
interface Props {
    curEp: eep;

    showPos: boolean;
    showSys: boolean;
    showReading: boolean;

}

const Passage: React.FC<Props> = ({ curEp, showPos, showSys, showReading }) => {
    if (_.isEmpty(curEp)) return <>NULL</>

    const renderTree = (nodes: epart[] | eSeg[]) => {
        return nodes &&
            !_.isEmpty(nodes) &&
            _.map(nodes, (node: epart | eSeg, idx: number) => {
                let output: any = null;
                if (node.type == 'word') {
                    output = <ruby >{node.surface}<rt>{node.reading}</rt></ruby>;
                }
                return <React.Fragment key={idx}>
                    <span key={idx}
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
            <p>第{curEp.number}话</p>
            {
                _.map(curEp.stage, (stage: estage, stageIdx: number) => (
                    <div key={stageIdx} className={classnames(styles['passage-stage'])}>
                        <p>{stage.name || `stage ${stageIdx}`}</p>

                        {
                            _.map(stage.section, (section: esection, sectionIdx: number) => (
                                <div key={sectionIdx} className={classnames(styles['passage-stage-section'])}>
                                    <p>{section.name || `section ${sectionIdx}`}</p>

                                    {
                                        _.map(section.children, (dialog: edialog, dialogIdx: number) => (
                                            <div key={dialogIdx} className={classnames(styles['passage-stage-section-dialog'])}>
                                                <div className={classnames(styles['passage-speaker-wrapper'])}>{dialog.speaker}</div>
                                                <div className={classnames(styles['passage-segment-wrapper'])}>
                                                    {renderTree(dialog.children)}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}
export default Passage;
