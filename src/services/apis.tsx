import request from '@/utils/request';
const getDisco = (): API.Resp<{ album: jdisco[]; single: jdisco[] }> =>
  request.get('./HSJ_discMap.json');
const getSongs = (): API.Resp<{ songs: uMap<jdisolink> }> =>
  request.get('./HSJ_songMap.json');
const getSong = (name: string): API.Resp<jsongInfo> =>
  request.get(`./allLrc/record/${name}.json`);

export const apis = {
  disco: {
    getDisco,
    getSongs,
    getSong,
  },
};
