import WordSeg from '@/components/NPLs';
import { getRawJson, uploadLrc } from '@/services/hsj';
import { Col, Collapse, Row } from 'antd';
import React, { useEffect, useState } from 'react';
const _ = require('lodash');
interface Props {
}


let _SongMap = {
    smap: {},
    songName: [
        "ゆーと叩いてみた。",
        "Fantasist(Instrumental)",
        "殺せんせーションズ(Hey! Say! JUMP ver.)",
        "Invitation(Instrumental)",
        "RUN de Boo！",
        "Eternal",
        "TO THE TOP",
        "トビラの向こう",
        "心･技･体",
        "太陽にLOVE MOTION！",
        "I/O",
        "H.our Time",
        "題名の無い物語",
        "Virtual Butterfly",
        "スンダDance",
        "YOU & I",
        "スクランブル",
        "さよならセンセーション"
    ]
}

const formatFileName = (name: string, mode: 'NtoF' | 'FtoN' = 'NtoF') => {
    return name.replaceAll("?", "？").replaceAll("！", "!").replaceAll('/', '╱');
}


const formatLrc = (info: jsongInfo) => {
    const lrcs: jlrc[] = info.lrc.map(item => {
        let sf = '';
        const idxs: any[] = [];
        const words = item?.words.map((w, pos) => {
            let ttmp = sf + w.surface;
            if (item.surface.indexOf(ttmp) != 0) {
                const char = item.surface.charAt(sf.length);
                sf = sf + char + w.surface;
                idxs.push({
                    pos,
                    value: { surface: char }
                })
            } else sf = ttmp;
            const tmp = _.pick(w, ['surface', 'reading', 'base']);
            if (w.base != '*' && w.curPos) tmp.type = w.curPos;
            if (w.base == '*') delete tmp['base']
            return tmp
        })
        if (idxs?.length) {
            idxs.reverse();
            idxs.map(item => {
                words.splice(item.pos, 0, item.value)
            })
        }

        sf = words.reduce((ans, w) => {
            return ans += w.surface;
        }, '')
        if (sf != item.surface) {
            item.isDiff = true;
            console.log(sf)
        }

        item.words = words;
        return item;
    })
    info.lrc = lrcs;
    return info
}


const itemStyle: React.CSSProperties = { padding: '4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const Discos: React.FC<Props> = () => {

    const [discoType, setDiscoType] = useState('song')
    const [curDisco, setcurDisco] = useState<jdisco>({
        "type": "single",
        "name": "Ultra Music Power",
        "filename": "2007.11.14 Ultra Music Power.json",
        "release": "2007.11.14",
        "goods": [
            {
                "version": "初回限定盤",
                "diskType": [
                    "CD+DVD"
                ],
                "cover": [
                    {
                        "url": "/material/AMIfv95PZWA5mGK88CCUPfc0dirDL6uuGZvITBirTK-iyWMP8J40uW_jr8c5nmq40z5Ygm-hPIeqA40ZujzQkGS5QGNPNO5b-9OPZvMLJ7l3hjbsvo0ar9JXGf2eDXJXN6tXH1w57iU8KHgcwC70EYPu-28UjmPXq30bvFLh95hrjo8L5kxL6_M?c=0&m=image%2Fjpeg"
                    }
                ],
                "disk": [
                    {
                        "type": "CD",
                        "track": [
                            {
                                "name": "Ultra Music Power"
                            },
                            {
                                "name": "Star Time"
                            }
                        ]
                    },
                    {
                        "type": "DVD",
                        "track": [
                            {
                                "name": "Ultra Music Power",
                                "videoType": ["Video Clip & Making"]
                            }
                        ]
                    }
                ]
            },
            {
                "version": "通常盤・初回プレス仕様",
                "diskType": [
                    "CD"
                ],
                "cover": [
                    {
                        "url": "/material/AMIfv9606BrXrWMv7rGpnzO5aw45mBj-Y61e22DqypNkakTp0oUx_VKpwL_52hgJJbtHl_nIF57Dw4knRxz6aE0stXXbi1fuGYw5gdyFnw2hvMwF2kmTL1wSxT1n7uGmGBCLC31YRy4GQLfc_g_Fx0OUcmnbixoKmLhlSpC1spWiajj95DidlM8?c=0&m=image%2Fjpeg"
                    }
                ],
                "disk": [
                    {
                        "type": "CD",
                        "track": [
                            {
                                "name": "Ultra Music Power"
                            },
                            {
                                "name": "Star Time"
                            },
                            {
                                "name": "Too Shy"
                            },
                            {
                                "name": "Ultra Music Power (オリジナル・カラオケ)"
                            },
                            {
                                "name": "Star Time (オリジナル・カラオケ)"
                            },
                            {
                                "name": "Too Shy (オリジナル・カラオケ)"
                            }
                        ]
                    }
                ]
            },
            {
                "version": "通常盤",
                "diskType": [
                    "CD"
                ],
                "cover": [
                    {
                        "url": "/material/AMIfv96RJpkYInUwSh4QmPCMd71qZn0a3-WYunwXMWk4hN5oB8Fum3mNQGRbF6weZpQWEbl_Ftaf1v5roQ2mgI7sRNCSKFc7AAuHPHVkcfZwxvE61r91ZhmbeIT0oCHnwsnI0KnPRqL4GlRo45Vntd8s3fBvh67t4zAZo7FZvFB8DxA01SqI1qU?c=0&m=image%2Fjpeg"
                    }
                ],
                "disk": [
                    {
                        "pamphlet": "12P 歌詞ブックレット付属",
                        "type": "CD",
                        "track": [
                            {
                                "name": "Ultra Music Power"
                            },
                            {
                                "name": "Star Time"
                            },
                            {
                                "name": "Ultra Music Power (オリジナル・カラオケ)"
                            },
                            {
                                "name": "Star Time (オリジナル・カラオケ)"
                            }
                        ]
                    }
                ]
            }
        ]
    })
    const [menu, setMenu] = useState<any>()
    const getDiscoConf = () => {
        // getRawJson('HSJ_songMap.json', 'filetmp').then(res => {
        //     _SongMap.smap = res;
        //     getFileList(['filetmp/record']).then(arr => {
        //         const song = arr[0]?.map((item: string) => item.slice(0, -5))
        //         const tmpMap: any = {};
        //         const prev = _.keys(res.songs).map((name: string) => {
        //             const af = formatFileName(name);
        //             tmpMap[af] = name;
        //             return formatFileName(name)
        //         })
        //         _SongMap.songName = _.difference(prev, song).map(name => tmpMap[name]);
        getRawJson('HSJ_discMap.json', 'filetmp').then(dic => {
            console.log(dic)
            setMenu(dic)
        })
        // })
        // })
    }
    const getDiscoDetail = (item: any) => {
        setcurDisco(item)
    }

    const [curSong, setCurSong] = useState<jsongInfo>();
    const getSongwLrc = (name: string) => {
        getRawJson(name + '.json', 'filetmp/record').then(res => {
            formatLrc(res)
            setCurSong(res)

        })
    }
    useEffect(() => {
        getDiscoConf();
    }, []);

    const onUpload = () => {
        uploadLrc([{
            filename: 'HSJ_discMap.json',
            songs: theMap.disco
        }])
    }

    return (
        <div style={{ display: "flex" }} >
            <div style={{ width: 240 }}>
                <Collapse accordion>
                    {
                        menu?.album?.map((conf: any, pos: number) => {
                            return <Collapse.Panel key={`album ${conf.start} - ${conf.end}`} header={`album ${conf.start} - ${conf.end}`}>
                                {conf?.list?.map((item: any, idx: number) => <div key={idx} style={itemStyle} onClick={() => getDiscoDetail(item)}> {item.name}</div>)}
                            </Collapse.Panel>
                        })
                    }
                    {
                        menu?.single?.map((conf: any, pos: number) => {
                            return <Collapse.Panel key={`single ${conf.start} - ${conf.end}`} header={`single ${conf.start} - ${conf.end}`}>
                                {conf?.list?.map((item: any, idx: number) => <div key={idx} style={itemStyle} onClick={() => getDiscoDetail(item)}> {item.name}</div>)}
                            </Collapse.Panel>
                        })
                    }
                </Collapse>
            </div>
            <div style={{ flex: '1' }}>
                {
                    curDisco && <>
                        <div><span >{curDisco?.name}</span></div>
                        <div style={{ color: '#aaa' }}>{curDisco?.type} {curDisco?.release} </div>
                        {
                            discoType == 'song' && curDisco?.songList?.map((name: string) => {
                                const flag = _SongMap.songName.indexOf(name) > -1;
                                return <div key={name} style={{ color: flag ? "#eee" : "#333" }} onClick={() => !flag && getSongwLrc(formatFileName(name))}> {name}</div>
                            })
                        }
                        <Row>

                            {discoType == 'info' && curDisco?.goods.map((item, idx) => <Col key={idx} span={24}>
                                {false && item?.cover?.map((img, idx) => <img style={{ height: 160 }} src={img.url} />)}
                                <>{item.version} </>
                                {
                                    item.disk.map((disk, idx: any) => {
                                        return <div key={idx}>
                                            <div>{idx + 1} ( {disk.type} )</div>
                                            <ol>
                                                {
                                                    disk.track?.map((track, pos) => {

                                                        return <li key={pos}>
                                                            <div >{track.name} {track?.bonus && '(bonus)'}</div>
                                                            {track?.videoType?.length && <div style={{ color: "#aaa" }}>[ {track?.videoType.join(' , ')} ]</div>}
                                                        </li>
                                                    })
                                                }
                                            </ol>
                                        </div>
                                    })

                                }

                            </Col>)}
                        </Row>
                    </>}
            </div>
            <div style={{ flex: 1 }}>
                {
                    curSong && <>
                        <div>{curSong.name}</div>
                        <div>{curSong?.artist?.join(' · ')}</div>
                        <div>{curSong?.from?.map((name, idx) => <div key={idx} >{name}</div>)}</div>
                        <div>
                            {
                                curSong?.lrc?.map((item, idx) => {
                                    return <div key={idx}>
                                        <WordSeg dataSource={item.words} />
                                    </div>
                                })
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default Discos;
