import { _kataMap } from "@/pages/Lrc/intex";
import { _uuid } from "@/utils/tools";
const _ = require('lodash');

const strc = (item: any) => {
    if (!item.surface.trim())
        return null

    let cx = item.pos.replaceAll(',*', '').split(',');
    switch (cx[0]) {
        case '名詞':
            if (['...', '～', '(', ')', '.'].indexOf(item.surface) > -1) {
                item.curPos = '/';
                item.reading = '';
                item.left = true;
                break;
            }
            if (cx[1] === '接尾') {
                item.left = true;
            }
            if (cx[2] == '人名') {
                item.curPos = '/';
                break;
            }
            if (cx[1] === '代名詞' || cx[1] === '数') {
                item.curPos = '/';
                break;
            }
            item.curPos = 'n'; break;
        case '動詞':
            item.curPos = 'v'; break;
        case '助詞':
            item.curPos = 'av'; break;
        case '形容詞':
            item.curPos = 'a'; break;
        case '助動詞':
            item.curPos = 'mv'; break;
        case '副詞':
            item.curPos = 'adv'; break;
        case '記号':
            item.left = true;
        default:
            item.curPos = '/';
    }

    if (item.reading === item.surface || item.reading == '?') item.reading = '';
    if (item.reading) {
        item.reading = _.map(item.reading, (i: string) => _kataMap[i] || i).join('');
        if (item.reading === item.surface) item.reading = '';
    }
    return item;
}

export const prefixLine = (tokens: any) => {
    let tmp: any[] = [];
    _.map(tokens, (t: any) => {
        let tm = strc(t);
        if (tm)
            tmp.push(tm);
    });

    let ans: any[] = [];
    _.map(tmp, (word: eword, idx: any) => {
        if (idx > 0) {
            let prev: eword = ans[ans.length - 1];

            if (
                (/数/.test(word.pos) && /数/.test(prev.pos)) ||
                (/助動詞/.test(word.pos) && /^動詞/.test(prev.pos)) ||
                (word.surface == 'て' && /動詞/.test(prev.pos)) ||
                (word.surface == 'な' && /形容動詞語幹/.test(prev.pos))
            ) {
                prev.surface += word.surface;
                if (prev.reading)
                    prev.reading += (word.reading || word.surface);
                else if (word.reading)
                    prev.reading = prev.surface + word.reading;
                if (prev.surface == prev.reading)
                    prev.reading = "";

                if (word.surface == 'な') {
                    prev.curPos = "a";
                    word.isAfter = true;
                }
                return;
            }
        }

        if (!word.id) word.id = _uuid();
        ans.push(word);

    });
    return ans;
};

