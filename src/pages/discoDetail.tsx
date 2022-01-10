import { Col, Collapse, Row, Tag } from 'antd';
import React, { useState } from 'react';
const _ = require('lodash');
interface Props {
  curNode?: jdisco;
  songMap?: uMap<jdisolink>;
  onNameClick?: (name: string) => void;
}

const DiscoDetail: React.FC<Props> = ({ curNode, songMap, onNameClick }) => {
  const [showMode, setShowMode] = useState<'songlist' | 'verslist'>('songlist');

  if (!curNode) return null;
  return (
    <>
      <div>
        <Tag
          color={showMode == 'songlist' ? 'blue' : 'red'}
          onClick={() =>
            setShowMode(showMode == 'songlist' ? 'verslist' : 'songlist')
          }
        >
          {showMode}
        </Tag>
      </div>
      <div>{curNode?.name}</div>
      <div>
        {curNode?.type} {curNode?.release}{' '}
      </div>
      {showMode == 'songlist' && (
        <div>
          {curNode?.songList?.map((name) => (
            <div key={name} onClick={() => onNameClick && onNameClick(name)}>
              {name}
            </div>
          ))}
        </div>
      )}

      {showMode == 'verslist' && (
        <Collapse expandIconPosition="right">
          {curNode?.goods.map((good, idx) => (
            <Collapse.Panel header={<>{good.version}</>} key={idx}>
              <Row wrap gutter={[16, 16]}>
                {good.disk?.map((disk, didx) => (
                  <Col
                    flex={good?.disk?.length > 1 ? '50%' : '100%'}
                    style={{ width: 0 }}
                    key={didx}
                  >
                    <div style={{ background: '#eee' }}>
                      <div>{disk.type}</div>
                      <div>{disk.desc}</div>
                    </div>
                    <div>
                      {disk.track?.map((song, sidx) => (
                        <div
                          key={sidx}
                          style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                          onClick={() => onNameClick && onNameClick(song.name)}
                        >
                          {song.name}
                        </div>
                      ))}
                    </div>
                  </Col>
                ))}
              </Row>
            </Collapse.Panel>
          ))}
          {/* <Row wrap>
                    {
                        curNode?.goods?.map((good, idx) => <Col flex="33.33%" key={idx}>
                            <div>{good.version}</div>
                        </Col>)
                    }
                </Row> */}
        </Collapse>
      )}
    </>
  );
};
export default DiscoDetail;
