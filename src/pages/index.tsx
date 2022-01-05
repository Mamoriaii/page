import { apis } from '@/services/apis';
import utils from '@/utils/utils';
import { Col, Collapse, Row } from 'antd';
import { useEffect, useState } from 'react';
import DiscoDetail from './discoDetail';
import SongDetail from './songDetail';

export default function IndexPage() {
  const [albums, setAlbums] =
    useState<{ start: DateStr; end: DateStr; list: jdisco[] }[]>();
  const [singles, setSingles] =
    useState<{ start: DateStr; end: DateStr; list: jdisco[] }[]>();
  const [songs, setSongs] = useState<uMap<jdisolink>>();
  const [curDisco, setCur] = useState<jdisco>();
  const [curSongName, setCurSongName] = useState<string>('瞳のスクリーン');
  useEffect(() => {
    apis.disco.getDisco().then((res) => {
      setAlbums(utils.chunkDisco(res?.album || [], 10) || []);
      setSingles(utils.chunkDisco(res?.single || []) || []);
    });
    apis.disco.getSongs().then((res) => {
      setSongs(res?.songs);
    });
  }, []);
  return (
    <Row>
      <Col flex={'300px'} style={{ display: 'none' }}>
        <Collapse>
          {!!albums?.length &&
            albums?.map((conf, idx) => (
              <Collapse.Panel
                key={'album' + idx}
                header={
                  <>
                    Album {conf.start} - {conf.end}
                  </>
                }
              >
                {conf.list?.map((disc, pos) => (
                  <li key={pos} onClick={() => setCur(disc)}>
                    {disc.name}
                  </li>
                ))}
              </Collapse.Panel>
            ))}
          {!!singles?.length &&
            singles?.map((conf, idx) => (
              <Collapse.Panel
                key={'single' + idx}
                header={
                  <>
                    Single {conf.start} - {conf.end}
                  </>
                }
              >
                {conf.list?.map((disc, pos) => (
                  <li key={pos} onClick={() => setCur(disc)}>
                    {disc.name}
                  </li>
                ))}
              </Collapse.Panel>
            ))}
        </Collapse>
      </Col>
      <Col flex="400px" style={{ display: 'none' }}>
        <DiscoDetail curNode={curDisco} onNameClick={setCurSongName} />
      </Col>
      <Col flex={'1'} style={{ minWidth: 500 }}>
        <SongDetail name={curSongName} songMap={songs} />
      </Col>
    </Row>
  );
}
