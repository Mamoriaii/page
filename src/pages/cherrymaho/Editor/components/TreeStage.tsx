import React, { useState } from 'react';
import { Button, Tree, Popconfirm } from 'antd';
import classnames from 'classnames';
import styles from '../index.less';
import { _uuid } from '@/utils/tools';
const _ = require('lodash');
interface Props {
    curEp: eep;
    callback: ecallback;
    addonAfter?: React.ReactNode;
}
export const TreeBtn: React.FC<any> = ({
    nodeCtrl, idx, item, nodes, len, hasClear = false, addonAfter
}) => {
    return <span className={styles['tree-op-wrapper']}>
        <Button size="small" shape='circle' onClick={e => { e.stopPropagation(); nodeCtrl('insert', nodes, idx, item); }}  > + </Button>
        <Button size="small" shape='circle' onClick={e => { e.stopPropagation(); nodeCtrl('up', nodes, idx, item); }} disabled={idx == 0}> ↑ </Button>
        <Button size="small" shape='circle' onClick={e => { e.stopPropagation(); nodeCtrl('down', nodes, idx, item); }} disabled={len == idx + 1}  > ↓ </Button>
        <Popconfirm placement="topLeft" title={'delete'} onConfirm={() => nodeCtrl('del', nodes, idx)} okText="Yes" cancelText="No">
            <Button size="small" shape='circle' onClick={e => e.stopPropagation()} > - </Button>
        </Popconfirm>
        {hasClear && <Popconfirm placement="topLeft" title={'clear'} onConfirm={() => nodeCtrl('clear', nodes, idx)} okText="Yes" cancelText="No">
            <Button size="small" shape='circle' onClick={e => e.stopPropagation()} > C </Button>
        </Popconfirm>}
        {addonAfter}
    </span>
};
const TreeStage: React.FC<Props> = ({ curEp, callback }) => {

    const [expandKeys, setExpandKeys] = useState<any[]>([]);

    const nodeCtrl = (type: 'del' | 'insert' | 'up' | 'down', arr: any[], idx: number, node?: any) => {
        if (type === 'del') {
            arr.splice(idx, 1);
        } else if (type === 'insert') {
            let tmp: any = _.pick(node, ['name', 'speaker', 'type']);
            tmp.id = _uuid();
            if (tmp.name)
                tmp.name += idx;
            arr.splice(idx + 1, 0, tmp);
            callback && callback('stageChange', tmp);
        } else if (type === 'up') {
            let tmp = arr[idx - 1];
            arr[idx - 1] = arr[idx];
            arr[idx] = tmp;
        } else if (type === 'down') {
            let tmp = arr[idx + 1];
            arr[idx + 1] = arr[idx];
            arr[idx] = tmp;
        }

        callback && callback('fresh');
    }
    const onClick = (item: any) => {
        callback && callback('stageChange', item);
    };
    const renderTree = (nodes: estage[] | esection[]) => {
        let len = (nodes || []).length;
        return (
            nodes &&
            _.map(nodes, (item: estage | esection | edialog, idx: number) => {
                let text = item.type === 'dialog' ? item.speaker : item.name;
                let isCur = false;
                let hasSeg = item.type === 'dialog' && !_.isEmpty(item.children || []);
                let title = <div
                    className={classnames(
                        styles['tree-title'],
                        isCur && styles['tree-active']
                    )}
                    onClick={() => onClick(item)}
                >
                    <span className={classnames(hasSeg && styles['speaker-has-children'], item.type === 'dialog' && styles['speaker-text'])} >{text}</span>
                    <TreeBtn nodes={nodes} idx={idx} nodeCtrl={nodeCtrl} len={len} item={item} />
                </div>
                let arr: any[] = [];
                if (item.type === 'chapter') arr = item.section;
                else if (item.type === 'section') arr = item.children;

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
                expandedKeys={expandKeys}
                onExpand={(keys) => setExpandKeys(keys)}
            >
                {renderTree(curEp.stage)}
            </Tree>
        </div>
    )
}
export default TreeStage;
