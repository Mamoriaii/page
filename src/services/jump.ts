import { req } from "./api";

export const getList = (category = 1) => {
    return Promise.resolve({ "code": 0, "data": { "others": [], "marks": [{ "id": "2503", "title": "Sing-along", "fileName": "2021.11.24 Sing-along" }, { "id": "2466", "title": "群青ランナウェイ", "fileName": "2021.08.25 群青ランナウェイ" }, { "id": "2427", "title": "ネガティブファイター", "fileName": "2021.05.12 ネガティブファイター" }, { "id": "2353", "title": "Your Song", "fileName": "2020.09.30 Your Song" }, { "id": "2330", "title": "Last Mermaid...", "fileName": "2020.07.01 Last Mermaid..." }, { "id": "2294", "title": "I am / Muah Muah", "fileName": "2020.02.26 I am ╱ Muah Muah" }, { "id": "2244", "title": "ファンファーレ！", "fileName": "2019.08.21 ファンファーレ！" }, { "id": "2219", "title": "Lucky-Unlucky／Hey! Say! JUMP｜Oh! my darling／山田涼介", "fileName": "2019.05.22 Lucky-Unlucky／Hey! Say! JUMP｜Oh! my darling／山田涼介" }, { "id": "2136", "title": "COSMIC☆HUMAN", "fileName": "2018.08.01 COSMIC☆HUMAN" }, { "id": "2016", "title": "マエヲムケ", "fileName": "2018.02.14 マエヲムケ" }, { "id": "1993", "title": "White Love", "fileName": "2017.12.20 White Love" }, { "id": "1945", "title": "Precious Girl(Hey! Say! JUMP)/Are You There？(A.Y.T.)", "fileName": "2017.07.05 Precious Girl(Hey! Say! JUMP)╱Are You There？(A.Y.T.)" }, { "id": "1902", "title": "OVER THE TOP", "fileName": "2017.02.22 OVER THE TOP" }, { "id": "1886", "title": "Give Me Love", "fileName": "2016.12.14 Give Me Love" }, { "id": "1862", "title": "Fantastic Time", "fileName": "2016.10.26 Fantastic Time" }, { "id": "1809", "title": "真剣SUNSHINE(よみ：まじさんしゃいん)", "fileName": "2016.05.11 真剣SUNSHINE(よみ：まじさんしゃいん)" }, { "id": "1728", "title": "キミアトラクション", "fileName": "2015.10.21 キミアトラクション" }, { "id": "1672", "title": "Chau♯ / 我 I Need You(読み：チャウ / オー･アイ･ニード･ユー)", "fileName": "2015.04.29 Chau♯ ╱ 我 I Need You(読み：チャウ ╱ オー･アイ･ニード･ユー)" }, { "id": "1572", "title": "ウィークエンダー/明日へのYELL", "fileName": "2014.09.03 ウィークエンダー╱明日へのYELL" }, { "id": "2061", "title": "AinoArika/愛すればもっとハッピーライフ", "fileName": "2014.02.05 AinoArika╱愛すればもっとハッピーライフ" }, { "id": "1518", "title": "Ride With Me", "fileName": "2013.12.25 Ride With Me" }, { "id": "1443", "title": "Come On A My House", "fileName": "2013.06.26 Come On A My House" }, { "id": "216", "title": "SUPER DELICATE", "fileName": "2012.02.22 SUPER DELICATE" }, { "id": "217", "title": "Magic Power", "fileName": "2011.09.21 Magic Power" }, { "id": "218", "title": "OVER", "fileName": "2011.06.29 OVER" }, { "id": "219", "title": "｢ありがとう｣～世界のどこにいても～", "fileName": "2010.12.15 ｢ありがとう｣～世界のどこにいても～" }, { "id": "220", "title": "瞳のスクリーン", "fileName": "2010.02.24 瞳のスクリーン" }, { "id": "221", "title": "真夜中のシャドーボーイ", "fileName": "2008.10.22 真夜中のシャドーボーイ" }, { "id": "222", "title": "Your Seed／冒険ライダー", "fileName": "2008.07.23 Your Seed／冒険ライダー" }, { "id": "223", "title": "Dreams come true", "fileName": "2008.05.21 Dreams come true" }, { "id": "224", "title": "Ultra Music Power", "fileName": "2007.11.14 Ultra Music Power" }] } })
    return req.get(`/jump/single?category=${category}`)
}

export const getPage = (data = 2330) => {
    return req.get(`/jump/single/dl?data=${data}`)
}

export const downPage = (data = 2330) => {
    return req.get(`/jump/single/down?data=${data}`)
}

export const getSongJson = (name: string, type: string = 'songs') => {
    return req.get(`/jump/json?name=${name}&type=${type}`)

}


export const genderSong = (params: any) => {
    return req.post(`/jump/file`, params);
}


export const getAlbumList = () => {
    return Promise.resolve({ "code": 0, "data": { "others": [], "marks": [{ "id": "2376", "title": "Fab! -Music speaks.-", "fileName": "2020.12.16 Fab! -Music speaks.-" }, { "id": "2258", "title": "PARADE", "fileName": "2019.10.30 PARADE" }, { "id": "2139", "title": "SENSE or LOVE", "fileName": "2018.08.22 SENSE or LOVE" }, { "id": "1951", "title": "Hey! Say! JUMP 2007-2017 I/O", "fileName": "2017.07.26 Hey! Say! JUMP 2007-2017 I╱O" }, { "id": "1834", "title": "DEAR.", "fileName": "2016.07.27 DEAR." }, { "id": "1686", "title": "JUMPing CAR", "fileName": "2015.06.24 JUMPing CAR" }, { "id": "2118", "title": "smart", "fileName": "2014.06.18 smart" }, { "id": "1284", "title": "JUMP WORLD", "fileName": "2012.06.06 JUMP WORLD" }, { "id": "210", "title": "JUMP NO.1", "fileName": "2010.07.07 JUMP NO.1" }] } })
    return req.get(`/jump/single?category=2`)
}