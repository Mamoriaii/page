import React, { useState } from 'react';
import { _catMap, _defalutCatId, _groupCat, } from '../db';
import styles from './index.less';
import { Input, Button } from 'antd';
import moment from 'moment';
const _ = require('lodash');
interface Props {
}
// {
//     createTime: '2020-11-13',
//     groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8',
//     catId: 'E1E757E4-FF36-4B7E-BA2C-0A042A955ABD',
//     price: 30,
//     desc: '包子',
//     tags: ['24786137-2C29-4DF5-979D-7FEAF54969B6']
// }
const Addmemo: React.FC<Props> = () => {
    const [memo, setMemo] = useState<Tcat | any>({
        catId: _defalutCatId,
        time: moment(),
    });
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    return (
        <div className={styles['add-wrapper']} >
            <div className={styles['header-bar']}>
                <div>{_catMap[memo.catId].name}</div>
                <div>
                    <Input
                        placeholder="0.00"
                        className={styles['price-input']}
                        value={price}
                    />
                </div>
            </div>
            <div className={styles['tags-wrapper']}>
                {
                    _.map(_groupCat, (cats: Tcat[], groupId: string) => {
                        return <div key={groupId}>
                            {_.map(cats, (cat: Tcat, idx: number) => (
                                <span
                                    style={{ margin: 5 }}
                                >
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    })
                }
            </div>

            <div className={styles['desc-wrapper']}>
                <div className={styles['desc-box']}>
                    <div className={styles['date-box']}>
                        <span className={styles['icon']}>X</span>
                        <span >{memo.time.format('MM-DD')}</span>
                        {/* <DatePicker value={memo.time} /> */}
                    </div>
                    <div style={{ marginLeft: 10, marginRight: -10 }}>
                        <span className={styles['icon']}>X</span>
                    </div>
                    <div className={styles['desc-input-box']}>
                        <Input.TextArea
                            value={desc}
                            placeholder="写点啥备注下"
                            className={styles['desc-input']}
                            onChange={e => setDesc(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button type='primary' danger>OK</Button>
                    </div>
                </div>
                <div>
                    <span>zhanghu</span>
                    <span>tags</span>
                    <span>member</span>
                </div>
            </div>
            <div className={styles['add-calc']}>
                calc
            </div>
        </div>
    )
}
export default Addmemo;
