import { genderSong, getAlbumList, getSongJson } from '@/services/jump';
import { copyToClip } from '@/utils/tools';
import { Button, Col, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
const _ = require('lodash');

interface Props {
}

function Uint8ArrayToString(fileData: any[]) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString

}
function buf2str(buffer: any) {
    // @ts-ignore
    const dd: any[] = new Uint8Array(buffer);
    try {
        let encodedString = Uint8ArrayToString(dd);
        let decodedString = decodeURIComponent(escape(encodedString));//没有这一步中文会乱码
        return decodedString
    } catch (error) {
        return false;
    }
}
const Jump: React.FC<Props> = () => {
    const [List, setList] = useState([]);

    const [page, setPage] = useState<any>();

    const [theS, setSongs] = useState<{ songs: string[][] }>({ songs: [] });
    const [curId, setCurId] = useState();
    useEffect(() => {
        getAlbumList().then(res => {
            setList(res.data?.marks || [])
        })
    }, []);

    // useEffect(() => {
    //     if (List?.length) {
    //         List.map((item: any, idx) => {
    //             const name = item.fileName.replace(' Release', '');
    //             getSongJson(name).then(page => {
    //                 if (page) {
    //                     const songs: any[] = [];
    //                     const bk: any[] = [];
    //                     const others: any[] = []
    //                     page?.content?.map((item: any, idx: any) => {
    //                         item.desc.map((d: string) => {
    //                             let indx = d.indexOf('.');
    //                             let first = _.trim(d)[0];

    //                             if (indx > -1 && ['1', '2', '3', '4', '5', '6', '7', '8'].indexOf(first) > -1) {
    //                                 const name = d.substring(indx + 1);
    //                                 if (d.indexOf('(オリジナル･カラオケ)') > -1) {
    //                                     bk.push(name)
    //                                 } else {
    //                                     songs.push(name)
    //                                 }
    //                             } else if (indx > 0) {
    //                                 others.push(d)
    //                             }
    //                             if (first == '0') {
    //                                 let indx = d.indexOf(' ');
    //                                 const name = d.substring(indx + 1);
    //                                 if (d.indexOf('オリジナル') > -1) {
    //                                     bk.push(name)
    //                                 } else {
    //                                     songs.push(name)
    //                                 }
    //                             }
    //                         })
    //                     })
    //                     if (songs?.length) {
    //                         const params = {
    //                             folder: genderName(page?.release + ' ' + page?.name),
    //                             songs: songs.map(str => genderName(str))
    //                         }
    //                         genderSong(params);
    //                     }
    //                 }
    //             })
    //         })
    //     }
    // }, [List]);

    const getData = (item: any) => {
        setCurId(item.id)
        const name = item.fileName.replace(' Release', '');
        getSongJson(name).then(res => {
            if (res) {
                const songs: any[] = [];
                const bk: any[] = [];
                const others: any[] = []
                res?.content?.map((item: any, idx: any) => {
                    item.desc.map((d: string) => {
                        const tmp = _.trim(d);


                        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(tmp[0]) > -1) {
                            let indx = tmp.indexOf('.');
                            if (indx == -1) {
                                indx = tmp.indexOf(' ');
                            }
                            const name = tmp.substring(indx + 1);
                            if (d.indexOf('nstrumental') > -1 || d.indexOf('(オリジナル･カラオケ)') > -1) {
                                bk.push(name)
                            } else {
                                songs.push(name)
                            }
                        }

                        // if (indx > -1 && ['1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(first) > -1) {
                        //     const name = d.substring(indx + 1);
                        //     if (d.indexOf('(オリジナル･カラオケ)') > -1) {
                        //         bk.push(name)
                        //     } else {
                        //         songs.push(name)
                        //     }
                        // } else if (indx > 0) {
                        //     others.push(d)
                        // }


                        // if (first == '0') {
                        //     let indx = _.trim(d).indexOf(' ');
                        //     const name = _.trim(d).substring(indx + 1);
                        //     console.log(idx, name)
                        //     if (d.indexOf('オリジナル') > -1) {
                        //         bk.push(name)
                        //     } else {
                        //         songs.push(name)
                        //     }
                        // }
                    })
                })

                setSongs({
                    songs: [_.uniq(songs), _.uniq(bk), others],
                })
            }
            setPage(res)
        })
    }

    const genderName = (str: string) => {
        str = str.replace(/\//g, '╱');
        return str
    }
    const createFolder = () => {
        if (theS.songs[0]?.length) {
            const params = {
                folder: genderName(page?.release + ' ' + page?.name),
                songs: theS.songs[0].map(str => genderName(str))
            }
            genderSong(params);
        } else {
            console.log(page?.name)
        }
    }
    const getFIle = () => {
        fetch('http://localhost:3000/xlrc/try-error/').then(res => res.arrayBuffer()).then(res => buf2str(res)).then(res => {
            console.log(res)
        })
    }
    return (
        <div >
            <div style={{ padding: 16, textAlign: 'center' }}><Button onClick={createFolder}  >Gender</Button></div>
            <Row style={{ height: 800, fontSize: 12 }} >
                <Col flex="200px" style={{ overflow: 'hidden' }}>
                    {_.map(List, (item: any, idx: number) => <div key={idx}><Tag color={curId == item.id ? 'blue' : undefined} key={idx} onClick={() => getData(item)}>{item.id} {item.title}</Tag></div>)}
                </Col>
                {/* <Col flex="600px" style={{ height: 800, overflow: 'hidden' }}>
                    {curId && <iframe style={{ height: '100%', overflow: 'hidden', width: "100%" }} src={`https://www.johnnys-net.jp/page?id=discoDetail&artist=15&data=${curId}`} />}
                </Col> */}
                <Col flex="1" style={{ height: 800, overflow: 'auto', background: "#f8f8f8", padding: 16 }}>
                    {
                        ['1', '2', '3', '4', '5', '6', '7', '8'].indexOf('1.マエヲムケ'[0])
                    }
                    <h3 onClick={() => copyToClip((page?.release + page?.name))}>{page?.release + ' ' + page?.name}</h3>

                    <Row gutter={16} style={{ marginTop: 16 }}>
                        {
                            theS?.songs?.map((list, idx: number) => <Col flex="1" key={idx}>
                                {
                                    list.map((str, id) => <div key={id} >{id + 1} . {str}</div>)
                                }
                            </Col>)
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default Jump;
