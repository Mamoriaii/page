export const encodeParam = (param: any) => {
    return (
        '?' +
        Object.keys(param)
            .map((key: string) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(param[key].replaceAll('&', '%26'));
            })
            .join('&')
    );
};
const BASE = 'http://localhost:3000';
export const req = {
    post: (url: string, data?: any) => fetch(BASE + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()),
    get(url: string, data?: any, inbody: boolean = false) {
        if (inbody) {
            return fetch(BASE + url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(res => res.json())
        }
        let path = url;
        if (data)
            path = url + encodeParam(data);
        return fetch(BASE + path).then(res => res.json());
    },
    rawGet: (url: string, data?: any) => {
        let path = url;
        if (data)
            path = url + encodeParam(data);
        return fetch(BASE + path)
    }
}

export const NLP = (data: any) => {
    // return fetch('http://localhost/pi/kuromoji/rest/tokenizer/tokenize', {
    return req.post('/nlp/tokenize', data);
}

export const getJson = (pathname: string) => {
    return fetch('http://localhost:3080/' + pathname, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
};

export const getGrammerWithHtml = (data: any) => {
    return req.post('/pre/getGrammar', data);
};
export const getGrammer = (data: any) => {
    return req.get('/pre/yfk', data);
};
// export const readFile = (blob: any) => {
//     return new Promise((rev, rej) => {
//         var reader = new FileReader();
//         reader.onload = function (event) {
//             rev(reader.result);
//         };
//         reader.readAsText(blob);
//         reader.onerror = rej;
//     })
// }
// export const getPage = (pathname: string) => {
//     return req.rawGet('/zdgram/grammar.php?action=view&id=2&level=&cha=')
//         .then(res => res.blob()).then(blob => readFile(blob)).then(res => {
//             return res;
//         });
// }

