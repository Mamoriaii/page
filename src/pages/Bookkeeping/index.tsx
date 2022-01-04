import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { copyToClip, _uuid } from '@/utils/tools';
import { _catMap, _groupMap, _TagMap, dataMock, _groupCat } from './db';
const _ = require('lodash');
interface Props {
}

const Bookkeeping: React.FC<Props> = () => {
    const [uuid, setuid] = useState('');
    useEffect(() => {
        if (uuid) copyToClip(uuid);
    }, [uuid]);
    return (
        <div >
            <div>
                <Button onClick={e => setuid(_uuid())}>get id</Button>
            : <span >{uuid}</span>
            </div>

            <Table
                pagination={false}
                // @ts-ignore
                rowKey={(r: any, idx: number) => idx + ''}
                columns={[
                    { title: '时间', dataIndex: 'createTime' },
                    { title: '备注', dataIndex: 'desc' },
                    { title: '收支', dataIndex: 'price' },
                    { title: '大类', dataIndex: 'groupId', render: (id: string) => _groupMap[id].name },
                    { title: '小类', dataIndex: 'catId', render: (id: string) => _catMap[id].name },
                    {
                        title: 'tags',
                        dataIndex: 'tags',
                        render: (tags: any[]) => {
                            return _.map(tags, (tid: any, idx: number) => <span key={idx} style={{ margin: 5 }}>{_TagMap[tid].name}</span>)
                        }
                    }
                ]}
                dataSource={dataMock}
            />



            {
                false && <>
                    {
                        _.map(_groupCat, (cats: any[], groupId: string) => {
                            return <div key={groupId}>
                                <p > {_groupMap[groupId].name}</p>
                                <p>
                                    {
                                        _.map(cats, (c: any, idx: number) => (
                                            <span key={idx} style={{ margin: 5 }}>{c.name}</span>
                                        ))
                                    }
                                </p>
                            </div>
                        })
                    }
                    {
                        <p>
                            {
                                _.map(_TagMap, (tag: any, id: string) => (
                                    <span key={id} style={{ margin: 5 }}>{tag.name}</span>
                                ))
                            }
                        </p>
                    }
                </>
            }

            {/* { false && <>

                <div>group table</div>
                <Table
                    dataSource={_Grouptable}
                    columns={[{
                        title: 'group id',
                        dataIndex: 'id'
                    }, {
                        title: 'name',
                        dataIndex: 'name'
                    },]}
                    pagination={false}
                />

                <div>cat table</div>
                <Table
                    dataSource={_Cattabble}
                    columns={[{
                        title: 'cat id',
                        dataIndex: 'id'
                    }, {
                        title: 'name',
                        dataIndex: 'name'
                    }, {
                        title: '所属group',
                        dataIndex: 'groupId'
                    },]}
                    pagination={false}
                />
                <div>Tag table</div>
                <Table
                    dataSource={_Tagtable}
                    columns={[{
                        title: 'Tag id',
                        dataIndex: 'id'
                    }, {
                        title: 'name',
                        dataIndex: 'name'
                    },]}
                    pagination={false}
                />
            </>} */}
        </div>
    )
}
export default Bookkeeping;
