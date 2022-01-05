type jdisk = {
  type: string;
  track: {
    name: string;
    bonus?: boolean;
    videoType?: string[];
    desc?: string[];
  }[];
  desc?: string[];
  pamphlet?: string;
  tokuten?: string[];
};

type jgoods = {
  version: string;
  diskType: string[];
  cover: {
    url: Url;
    desc?: string;
  }[];
  disk: jdisk[];
};

type jdisco = {
  type: 'album' | 'single';
  name: string;
  release: DateStr;
  filename?: string;
  goods: jgoods[];
  songList?: string[];
};

type videoType = string;
type jdisolink = {
  name: string;
  from: string[];
  video: videoType[];
  karaok?: boolean;
};

type nplWord = {
  [key: string]: any;
  surface: string;
  reading?: string;
  base?: string;
  curPos?: string;
  type?: string;
  cls?: string;
};
type jlrc = {
  surface: string;
  isDiff?: boolean;
  words: {
    surface: string;
    reading?: string;
    base?: string;
    curPos?: string;
    type?: string;
  }[];
};
type jsongInfo = {
  name: string;
  artist?: string[];
  info?: string[];
  from?: string[];
  producer?: { label: string; value: string[] }[];
  lrc: jlrc[];
  pureLrc: string[];
};
