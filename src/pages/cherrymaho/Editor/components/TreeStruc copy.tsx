import React, { useState } from 'react';
import { Tree } from 'antd';
import classnames from 'classnames';
import styles from '../index.less';
import { _uuid } from '@/utils/tools';
import { TreeBtn } from './TreeStage';
const _ = require('lodash');
interface Props {
    curSect: esection;

    callback: ecallback;
    expandKeys: string[];
    autoExpand: boolean;
}

const TreeStruc: React.FC<Props> = ({ curSect, callback, expandKeys, autoExpand }) => {

    const nodeCtrl = (type: 'del' | 'insert' | 'up' | 'down' | 'clear', arr: any[], idx: number, node?: any) => {
        if (type === 'del') {
            arr.splice(idx, 1);
        } else if (type === 'insert') {
            let tmp: any = _.pick(node, ['name', 'speaker', 'type']);
            tmp.id = _uuid();
            if (tmp.name)
                tmp.name += idx;
            arr.splice(idx + 1, 0, tmp);
            callback && callback('strucChange', tmp);
        } else if (type === 'up') {
            let tmp = arr[idx - 1];
            arr[idx - 1] = arr[idx];
            arr[idx] = tmp;
        } else if (type === 'down') {
            let tmp = arr[idx + 1];
            arr[idx + 1] = arr[idx];
            arr[idx] = tmp;
        } else if (type === 'clear') {
            if (_.has(arr[idx], 'children')) {
                arr[idx].children = [];
            }
        }

        callback && callback('fresh');
    }
    const onClick = (item: any) => {
        callback && callback('strucChange', item);
    };
    const renderTree = (nodes: edialog[] | eSeg[] | epart[]) => {
        let len = (nodes || []).length;
        return (
            nodes &&
            _.map(nodes, (item: edialog | eSeg | epart, idx: number) => {
                let text: any;
                let isCur = false;


                if (item.type == 'dialog') {
                    text = <span className={classnames(
                        styles['speaker-text'],
                        styles['speaker-has-children']
                    )} >
                        {item.speaker}
                    </span>
                } else {
                    text = <span className={classnames(styles['tree-type-' + item.type])} >
                        {item.type === 'chunk' || (item.type == 'seg' && item.grammar) &&
                            <span className={styles['part-grammar']}>  {item.grammar}</span>}
                        <span className={styles['part-surface']}>  {item.surface}</span>
                    </span>
                }
                let title = <div
                    className={classnames(
                        styles['tree-title'],
                        isCur && styles['tree-active'],

                    )}
                    onClick={() => onClick(item)}
                >
                    {text}
                    <TreeBtn nodes={nodes} idx={idx} nodeCtrl={nodeCtrl} len={len} item={item} hasClear />
                </div>
                let arr: any = [];
                if (item.type !== 'word')
                    arr = item.children;

                return <Tree.TreeNode title={title} key={item.id}  >
                    {!_.isEmpty(arr || [])
                        ? renderTree(arr)
                        : ''}
                </Tree.TreeNode>
            })
        );
    }
    return (
        <div >
            <Tree
                blockNode
                autoExpandParent={autoExpand}
                expandedKeys={expandKeys}
                onExpand={(keys) => callback('stuckExpandKeys', keys)}
                className={styles['struc-tree']}
            >
                {renderTree(curSect.children)}
            </Tree>
        </div>
    )
}
export default TreeStruc;
