import request from '@/utils/request';
const getDisco = (): API.Resp<{ album: jdisco[]; single: jdisco[] }> =>
  request.get('./static/HSJ_discMap.json');
const getSongs = (): API.Resp<{ songs: uMap<jdisolink> }> =>
  request.get('./static/HSJ_songMap.json');
const getSong = (name: string): API.Resp<jsongInfo> =>
  request.get(`./static/allLrc/record/${name}.json`);

export const apis = {
  disco: {
    getDisco,
    getSongs,
    getSong,
  },
};
