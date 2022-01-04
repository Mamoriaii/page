import { NLP } from "@/services/api";
import { uploadLrc } from "@/services/hsj";
import { useMemoizedFn } from 'ahooks';
import { useRef, useState } from "react";
import { prefixLine } from "../cherrymaho/Editor/components/utils";
const _ = require('lodash')
const fetchNpl = async (str: string) => {
    const res = await NLP({ text: str, mode: 0 });
    return res;
}
export function useLrcNpl() {
    const Ref = useRef<{ wordMap: any; idMap: any; }>({ wordMap: {}, idMap: {} });
    const [loading, setLoading] = useState(false);
    const [lrcObject, setlrcObject] = useState<any>();
    const getWords = (a: string[]) => {
        const ans: any[] = [];
        setLoading(true);
        const arrs = a.filter(item => item).map((str, idx) => {
            return fetchNpl(str)
        })
        return Promise.allSettled(arrs).then((res: any[]) =>
            res?.map((a) => a.value),
        ).then(arr => {
            arr.map((res, idx) => {
                let words = prefixLine(res?.tokens) || [];
                const ids: any[] = Ref.current.idMap[res?.input] || [];
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
                if (!Ref.current.wordMap[words.base])
                    Ref.current.wordMap[words.base] = {};
                if (!Ref.current.wordMap[words.base][words.surface])
                    Ref.current.wordMap[words.base][words.surface] = {};
                Ref.current.wordMap[words.base][words.surface].conf = _.omit(words, ['id']);
                if (!Ref.current.wordMap[words.base][words.surface].eg)
                    Ref.current.wordMap[words.base][words.surface].eg = {};
                if (!Ref.current.wordMap[words.base][words.surface].eg[name])
                    Ref.current.wordMap[words.base][words.surface].eg[name] = item.lrc || [];
                else {
                    const prev = Ref.current.wordMap[words.base][words.surface].eg[name];
                    Ref.current.wordMap[words.base][words.surface].eg[name] = _.uniq([...prev, ...item.lrc]);
                }
            })
        })

    }

    const genderLrc = (lrcEnum: string[]) => {
        return getWords(lrcEnum)
            // getWords(a)
            .then(ans => {
                if (!lrcObject?.name) {
                    console.log('?????')
                    return
                }
                genderWordMap(ans, lrcObject.name);
                return lrcObject;
                // console.log(lrcObject);
                // console.log(Ref.current.wordMap)
            })
    }

    const onInitData = (item: jnssongInfo) => {
        if (!item?.name) return Promise.resolve(false);
        const idMap: any = {};
        item?.lrc.map((str, idx) => {
            if (!idMap[str])
                idMap[str] = [];
            idMap[str].push(idx);
        })
        const lrcObject = {
            ...item,
            pureLrc: item.lrc,
            lrc: item?.lrc.map((item, idx) => ({ id: idx, surface: item, words: [] })) as any[]
        };
        setlrcObject(lrcObject);
        console.log(lrcObject);
        Ref.current.idMap = idMap;
        return Promise.resolve(true);
    }

    const startNpl = useMemoizedFn(() => {
        return genderLrc(lrcObject?.pureLrc || [])
    })

    const showAns = () => {
        console.log(Ref?.current?.wordMap)
        console.log(Ref?.current?.idMap)
        console.log(lrcObject);
    }

    const onUpload = useMemoizedFn(() => {
        if (lrcObject?.name) {
            return uploadLrc([
                lrcObject
            ])
        }

        return Promise.resolve(false)
    })



    return {
        onInitData,
        loading,
        showAns,
        startNpl,
        onUpload
    }
}