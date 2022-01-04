import { getDisco, getRawJson } from '@/services/hsj';
import { getAlbumList, getList } from '@/services/jump';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
const _ = require('lodash');
interface Props {
}


const ListMap: any = {
    album: [],
    single: []
}
const Disco: React.FC<Props> = () => {
    const [curId, serCurIdx] = useState(0)
    const [album, setAlbum] = useState<any[]>([])
    const [single, setSingle] = useState<any[]>([])
    const [curPage, setCurPage] = useState<{ [key: string]: any }>();
    useEffect(() => {
        getAlbumList().then(res => {
            const arr = (res.data.marks || []).reverse();
            ListMap.album = arr;
        })
        getList().then(res => {
            const arr = (res.data.marks || []).reverse();
            ListMap.single = arr;
        })
        getDisco().then(res => {
            setAlbum(res.album)
            setSingle(res.single)
        })

    }, [])

    const getPage = (idx: number, name: string, folder: 'conSingle' | 'conAlbum') => {
        serCurIdx(ListMap[folder[3] == 'S' ? 'single' : 'album'][idx]?.id)
        getRawJson(name, folder).then(res => {
            res.group = res.group.map(item => {
                let arr = item?.version?.split('(');
                if (item.version.indexOf('（') > -1) {
                    arr = item?.version?.split('（');
                }
                item.version = arr[0];
                if (arr.length > 1) {

                    if (arr.lengh > 2) {
                        item.disk = [arr[1]?.replace(')', '').replace('）', ''), arr[2].replace(')', '').replace('）', '')]
                    } else {
                        item.disk = [arr[1].replace(')', '').replace('）', '')]

                    }
                }
                return item
            })
            setCurPage(res);
        })
    }

    const renderSong = (item: any) => {
        if (typeof item == 'string') return item;

        return <>
            <span style={{ color: item?.Bonus ? 'red' : '#333' }}> {item.name}</span><span style={{ background: "pink" }}>{item?.group ? ' / ' + item?.group : ''}{item?.Singer ? ' / ' + item?.Singer : ''}</span>
            <div style={{ fontSize: 12, color: '#999', paddingLeft: 10 }}>{item.info}</div>
        </>
    }
    return (
        <Row style={{ height: 800, overflow: 'hidden' }} align="stretch">
            <Col flex={'200px'} style={{ overflowY: 'auto', height: '100%' }}>
                <div>
                    {album?.map((str, idx) => <div style={{ padding: 8 }} key={str} onClick={() => getPage(idx, str, 'conAlbum')}>{idx} {str}</div>)}
                </div>
                <div>
                    {single?.map((str, idx) => <div style={{ padding: 8 }} key={str} onClick={() => getPage(idx, str, 'conSingle')}>{idx} {str}</div>)}
                </div>
            </Col>
            <Col flex="400px" style={{ height: '100%', width: 0, overflow: 'hidden' }}>
                {curId && <iframe style={{ height: '100%', overflow: 'hidden', width: "100%" }} src={`https://www.johnnys-net.jp/page?id=discoDetail&artist=15&data=${curId}`} />}
            </Col>
            <Col flex="1" style={{ overflowY: 'auto', height: '100%' }}>
                {
                    curPage && <>
                        <div>【 {curPage?.release} 】 【 {curPage?.type} 】 <span style={{ fontWeight: "bold" }}>{curPage?.name}</span></div>
                        {curPage?.info?.map((str, idx) => <div key={idx}>{str}</div>)}
                        <Row>
                            {curPage?.group.map((item, idx) => <Col key={idx} span={8}>
                                <div><img style={{ width: 240 }} src={`https://www.johnnys-net.jp${item.cover}`} /></div>
                                <div>{item.coverInfo}</div>
                                <div>{item.version}</div>
                                <div>【 {item.disk} 】</div>
                                <div style={{ fontWeight: 'bold', color: "red" }}> {item.pamphlet} </div>
                                <div style={{ fontWeight: 'bold', color: "darkred" }}> {item.tokuten} </div>
                                {item?.info?.map((str, i) => <div key={i}> {str}</div>)}

                                {!!item?.CD?.length && <div style={{ fontWeight: "bold" }}>CD</div>}
                                {item?.CD?.map((str, i) => <div key={i}>{i + 1} {renderSong(str)}</div>)}

                                {!!item?.CD2?.length && <div style={{ fontWeight: "bold" }}>CD2</div>}
                                {item?.CD2?.map((str, i) => <div key={i}>{i + 1} {renderSong(str)}</div>)}

                                {!!item?.CD3?.length && <div style={{ fontWeight: "bold" }}>CD2</div>}
                                {item?.CD3?.map((str, i) => <div key={i}>{i + 1} {renderSong(str)}</div>)}

                                {!!item?.DVD?.length && <div style={{ fontWeight: "bold" }}>DVD</div>}
                                {item?.DVD?.map((str, i) => {
                                    if (typeof str == 'string')
                                        return <div key={i}>{i + 1} {str} </div>
                                    return <div key={i}>{i + 1} {str.name}<div style={{ fontSize: 12, color: "#999", paddingLeft: 12 }}> 【{str?.type?.join('】【')} 】</div></div>
                                })}

                            </Col>)}
                        </Row>
                        {curPage?.desc?.map((str, i) => <div key={i}> {str}</div>)}
                    </>}
            </Col>
        </Row>
    )
}
export default Disco;
