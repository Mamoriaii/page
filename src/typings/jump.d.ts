
type jnssongInfo = {
    name: string;
    artist?: string[];
    info?: string[];
    from?: string[];
    producer?: { label: string; value: string[] }[];
    lrc: string[]
}

type jnsdisco = {
    name: string;
    type: 'single' | 'album';
    release: DateStr;
    info?: string[];
    ohterCovers?: {
        version: string;
        cover: Url;
    }[];
    group: {
        version: string;
        cover: Url;
        coverInfo?: string;
        disk: string[];
        info?: string[];
        pamphlet?: string[];
        tokuten?: string[];
        CD: string[];
        CD2?: string[];
        CD3?: string[];
        DVD?: string[] | { name: string; type: string[] }[];
    }[];
    desc?: string[];
}


//#region  LRC
type jsongLrc = {
    name: string;
    info?: {
        singer?: string[];
        lyrics?: string[];
        composer?: string[];
        desc?: string[];
    };
    lrcs: string[];
}



//#endregion

type jgoods = {
    version: string;
    diskType: string[];
    cover: {
        url: Url;
        desc?: string;
    }[];
    disk: {
        type: string;
        track: { name: string; bonus?: boolean; videoType?: string[]; desc?: string[]; }[];
        desc?: string[];
        pamphlet?: string;
        tokuten?: string[];
    }[]
}
type jdisco = {
    type: 'album' | 'single',
    name: string;
    release: DateStr;
    filename?: string;
    goods: jgoods[];
    songList?: string[];
}


type nplWord = {
    [key: string]: any;
    surface: string;
    reading?: string;
    base?: string;
    curPos?: string;
    type?: string;
    cls?: string;
}
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
}
type jsongInfo = {
    name: string;
    artist?: string[];
    info?: string[];
    from?: string[];
    producer?: { label: string; value: string[] }[];
    lrc: jlrc[];
    pureLrc: string[];
}