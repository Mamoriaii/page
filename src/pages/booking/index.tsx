import React from 'react';
import { Table } from 'antd';
import _Raw from './bookkeeping';
import { transData } from './csv';
const _ = require('lodash');
interface Props {
}
const Booking: React.FC<Props> = () => {
    let _data = _.filter(_Raw, (d: any) => {
        if (!d) return false;
        if (d['时间'].indexOf('2020-10') == -1) return false;
        if (_.trim(d['账本名称']) == 'Ryo差价') return false;
        if (_.trim(d['成员']) == '我') {
            return true;
        }
        return false;
    });

    let data = _.map(_data, (d: any, idx: number) => {
        d.index = idx + 1;
        if (_.indexOf(['早餐', '午餐', '晚餐'], d['账目分类']) > -1) {
            let money = _.toNumber(d['账目金额']);
            if (money < 0) money = -money;
            if (money > 25) {
                d.tags = ['大餐'];
            } else {
                d.tags = ['简餐']
            }
        }

        if (d['资金账户名称'] === 'weChat') d['资金账户名称'] = '微信';
        return d;
    })

    return (
        <div className="whiteBox fullHeight padding flex">
            <div style={{ height: 500, overflow: 'auto' }}>
                {
                    _.map(data, (r: any, i: number) => {
                        return <div key={i}>
                            <p>{r['时间']} </p>
                            <p>{r['账目备注']}</p>
                        </div>
                    })
                }
            </div>
            {/* <Table
                dataSource={data}
                rowKey={(r, i) => i + ''}
                columns={[
                    { title: '序号', dataIndex: 'index' },
                    { title: '时间', dataIndex: '时间' },
                    { title: '账户1', dataIndex: '资金账户名称' },
                    { title: '类型', dataIndex: '收支类型' },
                    { title: '分类', dataIndex: '账目分类' },
                    { title: '金额', dataIndex: '账目金额' },
                    { title: '成员', dataIndex: '成员' },
                    { title: '备注', dataIndex: '账目备注' },
                    {
                        title: 'tags',
                        dataIndex: 'tags',
                        render: (ta, r) => {
                            return _.map(ta, (t: string) => t);
                        }
                    },
                    { title: '账本', dataIndex: '账本名称', },
                ]}

                pagination={{ pageSize: 15 }}
            /> */}
        </div>
    );
}
export default Booking;
