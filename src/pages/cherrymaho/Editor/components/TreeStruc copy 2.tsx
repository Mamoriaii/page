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
    const renderTree = (nodes: edialog[] | eSeg[] | epart[], parent: any) => {
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
                        {(item.type === 'chunk' || (item.type == 'seg' && item.grammar)) &&
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
                // @ts-ignore
                return <Tree.TreeNode title={title} key={item.id} dataRefIdx={idx} parentRef={parent}>
                    {!_.isEmpty(arr || [])
                        ? renderTree(arr, item)
                        : ''}
                </Tree.TreeNode>
            })
        );
    }

    const onDrop = (info: any) => {
        // console.log(info);
        const to = info.node;
        const from = info.dragNode;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        let fromNode = from.parentRef.children[from.dataRefIdx];
        let toNode = to.parentRef.children[to.dataRefIdx];

        // console.log(from.parentRef.children[from.dataRefIdx]);


        if (!info.dropToGap) {
            // Drop on the content
            console.log('Drop on the content');
            if (toNode.type == 'word') {
                console.log('word!!');
                return;
            }
            if (to.id !== from.parentRef.id) {
                if (!toNode.children) toNode.children = [];
                toNode.children.splice(0, 0, fromNode);
                from.parentRef.children.splice(from.dataRefIdx, 1);
            }
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            console.log('Has children expanded On the bottom gap');

            console.log('--')
        } else {

            if (dropPosition === -1) {
                console.log('dropPosition -1');

                console.log('--')
            } else {
                console.log('else?');
                if (to.parentRef.id === from.parentRef.id) {
                    console.log(from.dataRefIdx, to.dataRefIdx);
                    if (from.dataRefIdx < to.dataRefIdx) {
                        to.parentRef.children[from.dataRefIdx] = toNode;
                        to.parentRef.children[to.dataRefIdx] = fromNode;
                    } else {
                        let tmp = to.parentRef.children[to.dataRefIdx + 1];
                        to.parentRef.children[to.dataRefIdx + 1] = fromNode;
                        to.parentRef.children[from.dataRefIdx] = tmp;
                    }
                } else {
                    to.parentRef.children.splice(to.dataRefIdx + 1, 0, fromNode);
                    from.parentRef.children.splice(from.dataRefIdx, 1);
                }
                console.log('--')
            }
        }

        callback && callback('fresh');
    };
    return (
        <div >
            <Tree
                blockNode
                autoExpandParent={autoExpand}
                expandedKeys={expandKeys}
                onExpand={(keys) => callback('stuckExpandKeys', keys)}
                className={styles['struc-tree']}
                draggable
                onDrop={onDrop}
            >
                {renderTree(curSect.children, curSect)}
            </Tree>
        </div>
    )
}
export default TreeStruc;
