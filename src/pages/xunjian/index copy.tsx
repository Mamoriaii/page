import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { connect } from 'dva';
const _ = require('lodash');
const mapStateToProps = ({ }) => {
    return {};
};
interface Props extends ConnectProps {
}

const datas = [
    {
        key: 8,
        hydropowerStation: '二滩3',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+0%'
    },
    {
        key: 1,
        hydropowerStation: '二滩',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+10%'
    },
    {
        key: 2,
        hydropowerStation: '二滩',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+0%'
    },

    {
        key: 4,
        hydropowerStation: '二滩2',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+0%'
    },
    {
        key: 5,
        hydropowerStation: '二滩2',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+10%'
    },
    {
        key: 6,
        hydropowerStation: '二滩3',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+0%'
    },
    {
        key: 7,
        hydropowerStation: '二滩3',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+10%'
    },

    {
        key: 0,
        hydropowerStation: '二滩',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+0%'
    },
    {
        key: 9,
        hydropowerStation: '二滩4',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+10%'
    },
    {
        key: 10,
        hydropowerStation: '二滩4',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+0%'
    },

    {
        key: 11,
        hydropowerStation: '二滩4',
        forecastPeriod: '2020-08-10 08:12:00',
        forecastPeakDischarge: '11',
        correspondingTime: '2020-08-10 08:12:00',
        varyAmount: '+20',
        relativeError: '+10%'
    },

]
const colss = [
    {
        title: '水电站',
        dataIndex: 'hydropowerStation',
        key: 'hydropowerStation',
        align: 'center',
        width: '100px',
        fixed: 'left',
    },
    {
        title: '实测或预报时间',
        dataIndex: 'forecastPeriod',
        key: 'forecastPeriod',
        align: 'center',
        width: '200px'
    },
    {
        title: '洪峰流量',
        dataIndex: 'forecastPeakDischarge',
        key: 'forecastPeakDischarge',
        align: 'center',
    },

    {
        title: '发生时间',
        dataIndex: 'correspondingTime',
        key: 'correspondingTime',
        align: 'center',
        width: '200px',
    },
    {
        title: '相差量',
        dataIndex: 'varyAmount',
        key: 'varyAmount',
        align: 'center',
    },
    {
        title: '相对误差',
        dataIndex: 'relativeError',
        key: 'relativeError',
        align: 'center',
    }
]
const Xunjian: React.FC<Props> = () => {
    const [cols, setColumns] = useState<any>([]);
    const [data, setData] = useState<any>([]);

    const getData = () => {
        datas.sort((a, b) => {//由于datas是一个包含对象的数组，所以我通过回调手动指定根据hydropowerStation来进行排序
            if (a.hydropowerStation > b.hydropowerStation) return 1
            if (a.hydropowerStation < b.hydropowerStation) return -1
            return 0
        })
        //查重 记录 删除 多余的  hydropowerStation
        let objCF: any = {} // 根据 hydropowerStation 来进行合并，获取合并信息
        datas.map((item: any) => {//把 hydropowerStation 做为key,合并数量作为value值
            if (objCF[item.hydropowerStation]) { //当前属性存在就+1,不存在就创建一个
                objCF[item.hydropowerStation] += 1
                delete item.hydropowerStation //根据hydropowerStation合并，所以只需要留下一个就行，如果不删除你回得到一个很炫酷的表格
            } else {
                objCF[item.hydropowerStation] = 1
            }
        })
        //执行动态合并
        colss.map((item: any) => {
            if (item.dataIndex === 'hydropowerStation') {//我这里只需要合并hydropowerStation列，所以判断一下
                item.render = (text: any, cor: any, ind: any) => {
                    //cor 代表当前行数据，判断一下当前行是否存在hydropowerStation属性（因为我在前面把多余的hydropowerStation属性给删除了，所以说不含hydropowerStation属性的行，都是需要被合并的）
                    if (cor?.hydropowerStation) {
                        return {
                            children: text,
                            props: {
                                rowSpan: objCF[text] //通过text(当前列的值也就是hydropowerStation，所对应的值),获取objCF中所对应的合并数量值
                            }
                        }
                    } else {
                        return {
                            children: text,
                            props: {
                                rowSpan: 0
                            }
                        }
                    }
                }
            }
        })
        //table 表格所对应的行列属性值，(我这用的react-hooks创建的变量)
        setColumns(colss)
        setData(datas)
    };
    return (
        <div >
            <Button onClick={getData}>dd</Button>
            <Table
                columns={cols}
                dataSource={data}
            />
        </div>
    );
};
export default connect(mapStateToProps)(Xunjian);
