import { req } from "./api";

function Uint8ArrayToString(fileData: any[]) {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString

}

function buf2str2(buffer: any) {
    const dd: any = new Uint8Array(buffer);
    try {
        let encodedString = Uint8ArrayToString(dd);
        let decodedString = decodeURIComponent(escape(encodedString));//没有这一步中文会乱码
        return decodedString
    } catch (error) {
        return false;
    }
}

// 处理申请审核
export async function getDisco() {
    return req.get(`/jp/getAllList`)
}
export async function getRawJson(name: string, type: string) {
    return req.post(`/jp/getRawJson`, { name, folder: type })
}

export async function getTlrcList(path: string = '/artist-11010.html'): Promise<any> {
    return req.rawGet(`/tlrc/${path}`)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            return buf2str2(buffer);
        })
}
export async function uploadLrcs(data: any): Promise<any> {
    return req.post('/jp/uploadLrcs', data)
}

export async function getALL(path: string = '/sortSongs', data?: any): Promise<any> {
    return req.get('/jp' + path, data)
}

export async function uploadLrc(data: any): Promise<any> {
    return req.post('/jp/upload', data)
}
export async function sortS(data: any): Promise<any> {
    return req.post('/jp/sortS', data)
}

export async function getUlrcList(path: string = '/lyric/sa15103006/'): Promise<any> {
    return req.rawGet(`/ulrc/${path}`)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            return buf2str2(buffer);
        })
}

export async function getJnsPage(params: any, path: string = 'page'): Promise<any> {
    return req.rawGet(`/jns/${path}`, { artist: 15, id: 'disco', ...params })
        .then(res => res.arrayBuffer())
        .then(buffer => {
            return buf2str2(buffer);
        })
}
export async function getFileList(params: any): Promise<any> {
    return req.post('/jp/getFileList', params)
}
