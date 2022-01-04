import { getDisco, getRawJson } from '@/services/hsj';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { SongMap } from './discodb';
import { useLrcNpl } from './useLrcNpl';
const _ = require('lodash');
interface Props {
}


const ListMap: any = {
    album: [],
    single: [],
    Songs: [],
    Map: {}
}

let t = ["Romeo & Juliet", '｢ありがとう｣ ～世界のどこにいても～', 'スクランブル さよならセンセーション', 'Lucky-Unlucky', '真夜中のシャドーボーイ～SENSE or LOVE Remix～', 'トレンディーラブ #REIWA', 'Try & error', 'INFINITY', 'ガンバレッツゴー！', 'サム＆ピンキー', 'ゆーと叩いてみた。', 'RUN de Boo！', 'Eternal', 'SUPERMAN', 'TO THE TOP', 'トビラの向こう', '心･技･体', '太陽にLOVE MOTION！', 'H.our Time', 'I/O', 'OLÉ！', '題名の無い物語', 'Virtual Butterfly', 'スンダDance', 'YOU ＆ I', 'CALL & PRAY']
const Disco: React.FC<Props> = () => {
    const [album, setAlbum] = useState<any[]>([])
    const [single, setSingle] = useState<any[]>([])
    const [curSongMap, setSongMap] = useState({});
    const [curSong, setCurSong] = useState<jnssongInfo>(SongMap["Ultra Music Power"]);

    const { onInitData, startNpl, loading, showAns } = useLrcNpl();

    useEffect(() => {
        getDisco().then(res => {
            ListMap.album = res.album || [];
            ListMap.single = res.single || [];
            ListMap.Songs = res.songs || [];


            setAlbum(res.album)
            setSingle(res.single)
            console.log(t.filter(name => res.songs?.indexOf(name + '.json') > -1))
            // getFileList(["filetmp/record"]).then((res) => {
            //     const [Songs] = res || [];
            //     ListMap.Songs = Songs;
            //     // setSongs(res.songs);
            // })
            // res.album?.map((str, idx) => getPage(idx, str, 'conAlbums'))
            // res.single?.map((str, idx) => getPage(idx, str, 'conSingles'))
        })

    }, [])

    const formatCd = (arr: any[], ref: any) => {
        (arr || []).map(s => {
            let name = s;
            let item: any = { name: s };
            if (typeof s !== 'string') {
                name = s.name;
                item = s;
            }
            if (name.indexOf("オリジナル") > -1) {
                name = name.replace("(オリジナル･カラオケ)", '').replace('（オリジナル・カラオケ）', '').replace('(オリジナル・カラオケ)', '');
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

        getRawJson(name, folder).then(res => {
            let SongMap: any = {};
            res.group?.map((item: any) => {
                formatCd(item.CD || [], SongMap);
                formatCd(item.CD2 || [], SongMap);
                formatCd(item.CD3 || [], SongMap);
                return item
            })


            ListMap.Map = { ...ListMap.Map, ...SongMap }


            setSongMap(SongMap);
        })
    }
    const getLrc = (name: string) => {

        getRawJson(name + '.json', 'allLrc/record').then(res => {
            setCurSong(res)
        })
    }
    const renderSong = (item: any) => {
        const flag = ListMap.Songs.indexOf(item.name + '.json') > -1;
        return <span style={{ color: flag ? '#333' : 'red' }} onClick={() => getLrc(item.name)}>{item.name}</span>

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
                    {single?.map((str, idx) => <div style={{ padding: 8 }} key={str} onClick={() => getPage(idx, str, 'conSingles')}>{idx} {str}</div>)}
                </div>

                <div>
                    {album?.map((str, idx) => <div style={{ padding: 8 }} key={str} onClick={() => getPage(idx, str, 'conAlbums')}>{idx} {str}</div>)}
                </div>
            </Col>
            <Col flex={'200px'} style={{ overflowY: 'auto', height: '100%' }}>
                <div>
                    <div onClick={showAns}>showAns</div>
                    <div onClick={startNpl}>startNpl</div>
                </div>

                <div>
                    {t?.map((str, idx) => {
                        const flag = ListMap.Songs.indexOf(str + '.json') > -1;
                        return <div style={{ padding: 8, color: flag ? '#333' : 'red' }} key={str} onClick={() => {
                            getLrc(str)
                        }} >{idx} {str}</div>;
                    })}
                </div>

                <div>
                    {_.map(curSongMap, (desc: any, name: any) => <div key={name} >
                        {renderSong(desc)}
                    </div>)}
                </div>
            </Col>
            <Col flex="1" style={{ overflowY: 'auto', height: '100%' }}>
                <div >
                    <div>{curSong?.name}</div>
                    <div>{curSong?.artist}</div>
                    <div>  {curSong?.info}  </div>
                    <div>  {curSong?.producer?.map(item => <span style={{ marginRight: 8 }}>{item.label}:  {item.value?.join(',')}</span>)}  </div>
                    <div className='ant-input' onClick={() => onInitData(curSong)}>
                        {
                            curSong?.lrc?.map((str, idx) =>
                                <div key={idx} >
                                    {str || <span style={{ color: "#ccc" }}>----</span>}
                                </div>)
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}
export default Disco;
