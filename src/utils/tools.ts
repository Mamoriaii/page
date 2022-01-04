import { message } from 'antd';
import { useEffect, useState } from 'react';
export const _uuid = () => {
    var withLine = true; //带不带横线
    var len = 36; //长度为36
    var radix = 16; //16进制
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (withLine) {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < len; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    } else {
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    }
    return uuid.join('');
};

export const copyToClip = (content: string) => {
    let aux = document.createElement('input');
    aux.setAttribute('value', content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    message.success('已复制到剪贴板');
};



export const useDebounce = (value: any, delay = 300) => {
    const [debounceValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debounceValue;
}

export const sleep = (data: any, delay: number = 200): any => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(data);
            } catch (e) {
                reject(null);
            }
        }, delay);
    });
};