import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { AllSongMap } from './db';
const _ = require('lodash');

interface Props {
}

type Song = {
    name: string;
    singer?: string;
    from: string[];
    info?: string[];
}

const Jump: React.FC<Props> = () => {
    useEffect(() => {

    }, []);

    return (
        <Row gutter={[16, 16]}>
            {
                _.map(AllSongMap, (song: Song, name: string) => {
                    return <Col span={6} key={name}>
                        <div style={{ background: "#f8f8f8" }}>
                            <div>
                                {name}
                            </div>
                            <div style={{ paddingLeft: 16 }}>
                                {song.from?.map(f => <div key={f}> {f}</div>)}
                            </div>
                        </div>
                    </Col>
                })
            }
        </Row>
    )
}
export default Jump;
