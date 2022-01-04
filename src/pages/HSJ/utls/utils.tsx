const theMap: any = {
    disco: {},
    song: {}
}


const formatTrack = (arr: any[], fromName?: string) => {
    return (arr || []).map(s => {
        let name = s;
        const item: any = { name: s };
        if (typeof s !== 'string') {
            name = s.name;
            item.name = s.name;
            // item = s;
            const tmp = _.omit(item, ['name', 'type', 'Bonus', 'desc']);
            if (!_.isEmpty(tmp)) {
                console.log(tmp);
            }

            if (s?.type) item.videoType = s.type;
            if (s?.Bonus) item.bonus = s.Bonus;
            if (s?.desc) item.desc = s.desc;
        }
        let pureName = '';
        if (name.indexOf("オリジナル") > -1) {
            name = name.replace("(オリジナル･カラオケ)", '').replace('（オリジナル・カラオケ）', '').replace('(オリジナル・カラオケ)', '');
            pureName = name;
            item.name = [name, ' (オリジナル・カラオケ)'].join('');
        }
        const key = pureName || item.name;
        const song = theMap.song[key] || {};
        song.name = key;
        if (fromName)
            song.from = _.uniq([fromName, ...song.from || []]);

        if (pureName)
            song.karaok = true;


        if (item.videoType) {
            song.video = _.uniq([...item.videoType, ...song.video || []])
        }
        theMap.song[key] = song;

        return item;
    })
}

const formatDisco = (prev: jnsdisco, filename?: string) => {

    const goods: jgoods[] = prev.group?.map(item => {
        const cover: jgoods['cover'] = [{ url: item.cover }];
        if (item.coverInfo) {
            cover[0].desc = item.coverInfo
        }

        const disk: jgoods['disk'] = [];

        const prevc: any = {};
        if (item?.pamphlet) prevc.pamphlet = item.pamphlet;
        if (item?.info?.length) prev.desc = item.info;
        if (item.CD) {
            disk.push({ ...prevc, type: 'CD', track: formatTrack(item.CD, prev.name) })
        }
        if (item.CD2) {
            disk.push({ ...prevc, type: 'CD', track: formatTrack(item.CD2, prev.name) })
        }
        if (item.CD3) {
            disk.push({ ...prevc, type: 'CD', track: formatTrack(item.CD3, prev.name) })
        }
        if (item.DVD) {
            disk.push({ ...prevc, type: 'DVD', track: formatTrack(item.DVD, prev.name) })
        }

        return {
            version: item.version,
            diskType: item.disk,
            cover,
            disk
        }
    })
    let ans: jdisco = {
        type: prev.type,
        name: prev.name,
        filename: filename || prev?.name,
        release: prev.release,
        goods
    }
    return ans;
}


const genderList = (arr: any[], step: number = 5, start: number = 2007) => {
    return _.map(_.groupBy(_.sortBy(arr, 'release'), (item: any) => {
        const time = item.release.slice(0, 4) - 0;
        if (time > (start + step - 1)) {
            start += step;
        }
        return start + '-' + (start + step - 1);

    }), (item: any[], key: string) => {
        const [start, end] = key.split('-');
        return {
            start,
            end,
            list: item
        }
    })
}

const prueSong = (disco: jdisco) => {
    const map: any = {};
    disco.goods.map(good => {
        good.disk.map((disk => {
            let tracks = disk.track.filter(song => {
                if (song?.videoType) return false

                if (song.name.indexOf('カラオケ') > -1) return false;
                return true
            })

            tracks.map(song => {
                map[song.name] = true;
            })
        }))
    })

    return _.keys(map);

}

