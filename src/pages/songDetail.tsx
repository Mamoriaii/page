import { apis } from '@/services/apis';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import WordSeg from './components/WordSeg';
const _ = require('lodash');
interface Props {
  name?: string;
  songMap?: uMap<jdisolink>;
}

const confKeys: any[] = ['katakana', 'type', 'npl', 'word', 'grammar', 'trans'];
const SongDetail: React.FC<Props> = ({ name, songMap }) => {
  const [curSong, setCurSong] = useState<jdisolink & jsongInfo>();
  const [conf, setConf] = useState<{
    katakana?: boolean;
    type?: boolean; // 词性
    npl?: boolean;
    word?: boolean;
    grammar?: boolean;
    trans?: boolean;
  }>({});

  useEffect(() => {
    if (name && songMap) {
      const dif = songMap[name];
      apis.disco.getSong(name).then((res) => {
        if (res) {
          setCurSong({
            ...res,
            ...dif,
          });
        }
      });
    }
  }, [name, songMap]);
  if (!curSong) return null;
  return (
    <div>
      <div>
        {
          // @ts-ignore
          confKeys.map((key) => (
            <Tag
              color={conf[key] ? 'error' : ''}
              onClick={() => setConf({ ...conf, [key]: !conf[key] })}
            >
              {key}
            </Tag>
          ))
        }
      </div>
      <div>{curSong?.name}</div>
      <div>{curSong?.from?.join(' / ')}</div>
      <div>
        {curSong?.lrc?.map((item, idx) => (
          <div
            key={idx}
            style={{ background: item?.isDiff ? 'red' : undefined }}
          >
            <WordSeg
              dataSource={item?.words}
              katakana={conf.katakana}
              npl={conf.npl}
              type={conf.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SongDetail;
