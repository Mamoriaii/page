import { apis } from '@/services/apis';
import utils from '@/utils/utils';
import { Col, Menu, Row } from 'antd';
import { useEffect, useState } from 'react';
import DiscoDetail from '../discoDetail';
import SongDetail from '../songDetail';

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
    <>
      <div>
        <Menu mode="horizontal" style={{ marginTop: 6 }}>
          <Menu.SubMenu key={'album'} title={<>Album</>}>
            {!!albums?.length &&
              albums?.map((conf, idx) => (
                <Menu.SubMenu
                  key={'album' + idx}
                  title={
                    <>
                      Album {conf.start} - {conf.end}
                    </>
                  }
                >
                  {conf.list?.map((disc, pos) => (
                    <Menu.Item
                      key={`a-${idx}-${pos}`}
                      onClick={() => setCur(disc)}
                    >
                      {disc.name}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
          </Menu.SubMenu>

          <Menu.SubMenu key={'Single'} title={<>Single</>}>
            {!!singles?.length &&
              singles?.map((conf, idx) => (
                <Menu.SubMenu
                  key={'single' + idx}
                  title={
                    <>
                      Single {conf.start} - {conf.end}
                    </>
                  }
                >
                  {conf.list?.map((disc, pos) => (
                    <Menu.Item
                      key={`s-${idx}-${pos}`}
                      onClick={() => setCur(disc)}
                    >
                      {disc.name}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))}
          </Menu.SubMenu>
        </Menu>
      </div>

      <Row>
        <Col flex="400px">
          <DiscoDetail curNode={curDisco} onNameClick={setCurSongName} />
        </Col>
        <Col flex={'1'} style={{ minWidth: 500 }}>
          <SongDetail name={curSongName} songMap={songs} />
        </Col>
      </Row>
    </>
  );
}
