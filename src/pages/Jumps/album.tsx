import { downPage, getAlbumList, getPage } from '@/services/jump';
import { copyToClip } from '@/utils/tools';
import { Button, Col, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
const _ = require('lodash');

interface Props {
}

const Jump: React.FC<Props> = () => {
    const [List, setList] = useState([]);

    const [page, setPage] = useState<any>();
    const [curId, setCurId] = useState();
    useEffect(() => {
        getAlbumList().then(res => {
            setList(res.data?.marks || [])
        })
    }, []);

    useEffect(() => {
        if (curId) {
            getPage(curId).then(res => {
                setPage(res?.data);
            })
        }
    }, [curId]);

    const getData = (item: any) => {
        setCurId(item.id)
        // getSongJson(item.fileName).then(res => {
        //     setPage(res)
        // })
    }
    return (
        <div >
            <div style={{ padding: 16, textAlign: 'center' }}><Button onClick={() => downPage(curId)}  >Gender</Button></div>
            <Row style={{ height: 800, fontSize: 12 }} >
                <Col flex="200px" style={{ overflow: 'hidden' }}>
                    {_.map(List, (item: any, idx: number) => <div key={idx}><Tag color={curId == item.id ? 'blue' : undefined} key={idx} onClick={() => getData(item)}>{item.id} {item.title}</Tag></div>)}
                </Col>
                <Col flex="600px" style={{ height: 800, overflow: 'hidden' }}>
                    {curId && <iframe style={{ height: '100%', overflow: 'hidden', width: "100%" }} src={`https://www.johnnys-net.jp/page?id=discoDetail&artist=15&data=${curId}`} />}
                </Col>
                <Col flex="1" style={{ height: 800, overflow: 'auto', padding: 16 }}>
                    <h3 onClick={() => copyToClip((page.release + page?.name).replaceAll('Release', ''))}>{page?.name}</h3>
                    <div>【 {page?.type} 】 {page?.release} </div>
                    <Row>
                        <Col flex="1">
                            {
                                page?.list?.map((item: any, idx: any) => <div key={idx}>【{item.title}】 {item.summary}</div>)
                            }
                            <div>
                                {
                                    page?.ohters?.map((item: any, idx: any) => <div key={idx}>{item}</div>)
                                }
                            </div>
                        </Col>
                        <Col flex="1" style={{ display: 'none' }}>
                            <div >
                                {page?.imgs?.map((img: any, idx: any) => <div style={{ display: 'inline-block' }}>
                                    <img src={`https://www.johnnys-net.jp${img.src}`} style={{ height: 120, marginRight: 16 }} />
                                    <div>{img.pos}</div>
                                </div>)}
                            </div>
                        </Col>
                    </Row>
                    <div style={{ marginTop: 24 }}>   {page?.contentDesc}  </div>
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        {
                            page?.content?.map((item: any, idx: any) => <Col flex="1" key={idx}>
                                <h2>{item.title}</h2>
                                {item.desc.map((d: any, i: any) => {
                                    if (d[0] == '[') return <h3>{d}</h3>
                                    if (['作', '編'].indexOf(d[0]) > -1) return null

                                    return <div key={i} style={{ margin: '8px 0' }}>{d}</div>
                                })}
                            </Col>)
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default Jump;
