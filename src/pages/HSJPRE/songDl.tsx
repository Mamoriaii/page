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
    const [curSongMap, setSongMap] = useState({});
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

    const formatCd = (arr: any[], ref: any) => {
        (arr || []).map(s => {
            let name = s;
            let item = { name: s };
            if (typeof s !== 'string') {
                name = s.name;
                item = s;
            }
            if (name.indexOf("オリジナル･カラオケ") > -1) {
                name = name.replace("(オリジナル･カラオケ)", '');
                item.name = name
                item.hasIntr = true;
            }
            if (ref[name]) {
                ref[name] = { ...ref[name], ...item }
            } else {
                ref[name] = item
            }
        })
        return ref;
    }

    const getPage = (idx: number, name: string, folder: 'conSingles' | 'conAlbums') => {
        serCurIdx(ListMap[folder[3] == 'S' ? 'single' : 'album'][idx]?.id)
        getRawJson(name, folder).then(res => {
            let SongMap: any = {};
            res.group.map((item: any) => {
                formatCd(item.CD || [], SongMap);
                formatCd(item.CD2 || [], SongMap);
                formatCd(item.CD3 || [], SongMap);
                return item
            })
            setCurPage(res);
            setSongMap(SongMap);
        })
    }

    const renderSong = (item: any) => {

        return <>
            <span style={{ color: item?.hasIntr ? 'darkred' : '#333' }}> {item.name}{item?.Bonus && '【Bonus】'}</span>
            <div style={{ fontSize: 12, color: '#999', paddingLeft: 10 }}>
                <div><span style={{ background: "pink" }}>{item?.group ? ' / ' + item?.group : ''}{item?.Singer ? ' / ' + item?.Singer : ''}</span></div>
                <div> {item.info}</div>
            </div>
        </>
    }
    return (
        <Row style={{ height: 800, overflow: 'hidden' }} align="stretch">
            <Col flex={'200px'} style={{ overflowY: 'auto', height: '100%' }}>
                <div>
                    {album?.map((str, idx) => <div style={{ padding: 8 }} key={str} onClick={() => getPage(idx, str, 'conAlbums')}>{idx} {str}</div>)}
                </div>
                <div>
                    {single?.reverse().map((str, idx) => <div style={{ padding: 8 }} key={str} onClick={() => getPage(idx, str, 'conSingles')}>{idx} {str}</div>)}
                </div>
            </Col>
            <Col flex={'200px'} style={{ overflowY: 'auto', height: '100%' }}>

                <div>
                    {_.map(curSongMap, (desc, name) => <div key={name} >
                        {renderSong(desc)}
                    </div>)}
                </div>
            </Col>
            <Col flex="1" style={{ overflowY: 'auto', height: '100%' }}>
                {
                    curPage && <>
                        curPage
                    </>}
            </Col>
        </Row>
    )
}
export default Disco;
