

import { prefixLine } from '@/pages/cherrymaho/Editor/components/utils';
import { NLP } from '@/services/api';
import { Spin } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from '../index.less';

const lrcJSON = require('./data/群青ランナウェイ.json');
const AllWords = require('../data/words.json');
const _ = require('lodash');
interface Props {
}

const pre = `現在、不透明 僕は街を歩く 人混みが騒ぎ出す夜と
ここに無い魔法、帰りの電車 青く照らした貴方が映る
鈍感な日々さ 何もなくて 相槌(あいづち)まで鬱陶(うっとう)しくなる
「まだ早いから、後でいいかな？」焦らす貴方が美しいの
Oh 「ウィンク」けど待った あら、失踪、感情、ウィンカー
チカチッカ、煌めいた ほら、決勝、全勝、ブレイカー
頭がグルグル、フル回転 「貴方が生きる糧になって」
夢が覚めだす夜に

分かんない2人はドキドキだ
交わる愛の理由もない (いま全開警戒フライアウェイ)
そして (2人劣等感情マイノリティ) 軽快なメロディで踊り出す
貴方と居たいの痛いの (もう1.2.3で飛び出して) その気持ちで (夢の底へ)
ラーラーラーララ ララララーララ
ほら単純明快ランナウェイ つまり真相妄想バースデー
ラーラーラーララ ララララーララ
「この耳鳴りは僕らの秘密」今は分かんないけどまた明日

回答、不完全 外が明るくなる 貴方の帰り道が目立つ頃
初めて映る、その横顔に どこか懐かしい匂いが籠る
残念な2人 「嘘ばかりだ」過去の話はどうでもいいの
この苦しみは歌になるんだ せめてもの悪あがきさ
「投げキッス!」こりゃ参った 今、参上、最強、クラッシャー
ヒラヒッラ、宙に舞った この、大胆、不敵のファイター
体が震えて込み上がる 感情には貴方が眠ってた
僕のすぐ側で穿(うが)って足掻いて
勿体ない愛日々にサヨナラ
止めどなく進むこの歌を (まだ純情欠陥チルドレン)
まさに (僕ら鈍感困難マジョリティ) 簡単なリズムで崩してく
貴方がズルいよズルいよ (いま4.5.6で投げ出して) 2人はまだ (声が響く)
ラーラーラーララ ララララーララ
2人謙遜群青パーリナイ 揺れる後悔、失態、エブリデイ
ラーラーラーララ ララララーララ
この朝焼けに貴方はいない 紛らわした嘘で笑ったまま

分かんない2人はドキドキだ 交わる愛の理由もない
そして 軽快なメロディで踊り出す
貴方と居たいの痛いの その気持ちで
ラーラーラーララ ララララーララ
ほら単純明快ランナウェイ つまり真相妄想バースデー
ラーラーラーララ ララララーララ
「この耳鳴りは僕らの秘密」今は分かんないけどまた明日`

const lrcEnum = pre.split('\n');
const idMap: any = {};
lrcEnum.map((str, idx) => {
    if (!idMap[str])
        idMap[str] = [];
    idMap[str].push(idx);
})
const lrcObject = {
    name: '群青ランナウェイ',
    lrc: pre.split('\n').map((item, idx) => ({ id: idx, surface: item, words: [] })) as any[]
};


const onNpl = async (str: string) => {
    const res = await NLP({ text: str, mode: 0 });
    return res;

}

const wordMap: any = {};
const Page: React.FC<Props> = () => {
    const [loading, setLoading] = useState(false);
    const getWords = (a: string[]) => {
        const ans: any[] = [];
        setLoading(true);
        const arrs = a.filter(item => item).map((str, idx) => {
            return onNpl(str)
        })
        return Promise.allSettled(arrs).then((res: any[]) =>
            res?.map((a) => a.value),
        ).then(arr => {
            arr.map((res, idx) => {
                let words = prefixLine(res.tokens);
                const ids: any[] = idMap[res.input];
                ids.map((id) => {
                    lrcObject.lrc[id].words = words.map(item => (_.omit(item, ['id'])));
                })
                ans.push({ words, lrc: ids });
            })
            setLoading(false);
            return ans;
        })

    }

    const genderWordMap = (arr: any[], name = "群青ランナウェイ") => {
        arr?.map(item => {
            item.words.map((words: any) => {
                if (words.pos.indexOf('記号') > -1) return;
                if (!wordMap[words.base])
                    wordMap[words.base] = {};
                if (!wordMap[words.base][words.surface])
                    wordMap[words.base][words.surface] = {};
                wordMap[words.base][words.surface].conf = _.omit(words, ['id']);
                if (!wordMap[words.base][words.surface].eg)
                    wordMap[words.base][words.surface].eg = {};
                if (!wordMap[words.base][words.surface].eg[name])
                    wordMap[words.base][words.surface].eg[name] = item.lrc || [];
                else {
                    const prev = wordMap[words.base][words.surface].eg[name];
                    wordMap[words.base][words.surface].eg[name] = _.uniq([...prev, ...item.lrc]);
                }
            })
        })

    }

    const genderLrc = () => {
        const a = ['現在、不透明 僕は街を歩く 人混みが騒ぎ出す夜と',
            'ここに無い魔法、帰りの電車 青く照らした貴方が映る']
        getWords(lrcEnum)
            // getWords(a)
            .then(ans => {
                genderWordMap(ans, lrcObject.name);
                console.log(lrcObject);
                console.log(wordMap)
            })
    }

    const [curLrc, setCurLrc] = useState<any>();
    useEffect(() => {
        // genderLrc();
        lrcJSON.lrc = lrcJSON.lrc.map((item: any) => {
            item.words = item.words.map((w: any) => {
                if (AllWords[w.base]) return AllWords[w.base][w.surface].conf
                return w
            })
            return item;
        })
        setCurLrc(lrcJSON)
    }, []);
    return (
        <div >
            <div>{curLrc?.name}</div>
            <Spin spinning={loading}>
                <div>
                    {curLrc?.lrc?.map((item: any, idx: number) => <div key={idx}>
                        {
                            _.map(item.words, (w: any, p: number) => {
                                return <div key={p} className={classNames(styles['ep-word-box'], w.left && styles['word-mark'])}>
                                    <div className={classNames(styles['ep-reading'], { [styles['word-center']]: w.reading?.length === 1 })}>{w.reading || <>&nbsp;</>}</div>
                                    <div className={classNames(styles['ep-word'], styles['word-' + w.curPos], { [styles['word-center']]: w.surface?.length === 1, })}>
                                        <span>{w.surface}</span>
                                    </div>
                                </div>
                            })
                        }
                    </div>)}
                </div>
            </Spin>
        </div>
    )
}
export default Page;
