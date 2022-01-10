import { apis } from '@/services/apis';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import WordSeg from './components/WordSeg';
const _ = require('lodash');
interface Props {
  name?: string;
  songMap?: uMap<jdisolink>;
}

const formatLrc = (info: jsongInfo) => {
  const lrcs: jlrc[] = info.lrc.map((item) => {
    let sf = '';
    const idxs: any[] = [];
    const words = item?.words.map((w, pos) => {
      let ttmp = sf + w.surface;
      if (item.surface.indexOf(ttmp) != 0) {
        const char = item.surface.charAt(sf.length);
        sf = sf + char + w.surface;
        idxs.push({
          pos,
          value: { surface: char },
        });
      } else sf = ttmp;
      const tmp = _.pick(w, ['surface', 'reading', 'base']);
      if (w.base != '*' && w.curPos) tmp.type = w.curPos;
      if (w.base == '*') delete tmp['base'];
      return tmp;
    });
    if (idxs?.length) {
      idxs.reverse();
      idxs.map((item) => {
        words.splice(item.pos, 0, item.value);
      });
    }

    sf = words.reduce((ans, w) => {
      return (ans += w.surface);
    }, '');
    if (sf != item.surface) {
      item.isDiff = true;
      console.log(sf);
    }

    item.words = words;
    return item;
  });
  info.lrc = lrcs;
  return info;
};

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
          const ans = formatLrc(res);
          setCurSong({
            ...ans,
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
        {confKeys.map((key) => (
          <Tag
            // @ts-ignore
            color={conf[key] ? 'error' : ''}
            // @ts-ignore
            onClick={() => setConf({ ...conf, [key]: !conf[key] })}
          >
            {key}
          </Tag>
        ))}
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
