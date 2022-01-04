import React, { useState } from 'react';
import { Button, Pagination, Table } from 'antd';
import { Collapse } from 'antd';

const { Panel } = Collapse;
import { connect } from 'dva';
const _ = require('lodash');
const mapStateToProps = ({ }) => {
    return {};
};
interface Props extends ConnectProps {
}
const colss: any = [
    // {
    //     title: '序号',
    //     dataIndex: 'hydropowerStation',
    //     key: 'hydropowerStation',
    //     align: 'center',
    //     width: '100px',
    //     fixed: 'left',
    // },
    {
        title: '环境',
        dataIndex: 'environment',
        key: 'environment',
        align: 'center',
        width: '200px'
    },
    {
        title: '是否异常',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
    },

    {
        title: 'Node',
        dataIndex: 'node',
        key: 'node',
        align: 'center',
        width: '200px',
    },
    {
        title: 'Pod',
        dataIndex: 'pod',
        key: 'pod',
        align: 'center',
    },
    {
        title: 'Etcd',
        dataIndex: 'etcd',
        key: 'etcd',
        align: 'center',
    },
    {
        title: '操作',
        dataIndex: 'x',
        key: 'x',
        align: 'center',
        render: (t: any, r: any) => {
            return <Button type="link">详情</Button>
        }
    }
]

let data = [
    {
        "id": 88,
        "environment": "prod",
        "status": "正常",
        "node": "正常",
        "pod": "正常",
        "etcd": "正常",
        "mysql": "正常",
        "nfs": "正常",
        "harbor": "正常",
        "elastic": "正常"
    },
    {
        "id": 89,
        "environment": "uat",
        "status": "正常",
        "node": "正常",
        "pod": "正常",
        "etcd": null,
        "mysql": null,
        "nfs": null,
        "harbor": null,
        "elastic": null
    },
    {
        "id": 90,
        "environment": "test",
        "status": "正常",
        "node": "正常",
        "pod": "正常",
        "etcd": "正常",
        "mysql": "正常",
        "nfs": "正常",
        "harbor": "正常",
        "elastic": "异常"
    }
];
const Cap: React.FC<Props> = () => {

    return (
        <div >
            <Collapse defaultActiveKey={['1']} >
                <Panel header="2021-02-03 09:00:00" key="1">
                    <Table
                        columns={colss}
                        dataSource={data}
                        pagination={false}
                    />
                </Panel>
                <Panel header="2021-02-02 09:00:00" key="2">
                    <p>{'text'}</p>
                </Panel>
                <Panel header="2021-02-01 09:00:00" key="3">
                    <p>{'text'}</p>
                </Panel>
            </Collapse>

            <Pagination total={100} pageSize={10} style={{ marginTop: 20 }} />
        </div>
    );
};
export default connect(mapStateToProps)(Cap);
