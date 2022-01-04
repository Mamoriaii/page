import { getFileList, getRawJson } from '@/services/hsj';
import React, { useEffect, useState } from 'react';
import { useLrcNpl } from './useLrcNpl';
const _ = require('lodash');
interface Props {
}
const offset = 0;
export function clearStr(str: string) {
    return str.replace(/[\?？\/╱\!！＆&♯｢｣]/g, '').replaceAll(' ', '').trim();
}
const lrcMap: any = {};
const SongNpl: React.FC<Props> = () => {
    const { onInitData, onUpload, startNpl, showAns, loading } = useLrcNpl();
    const genderLrc = async (name: string) => {
        getRawJson(name, 'allLrc/record').then(res => {
            onInitData(res).then(flag => {
                if (!flag) {
                    console.log(res);

                } else {
                    setFrozen(true);
                    startNpl().then(flag => {
                        setFrozen(false)
                    });
                }
            });
        })
    }
    const [frozen, setFrozen] = useState(true);
    const [songs, setSongs] = useState([
        "INFINITY.json"
    ]);
    const [temp, setTemp] = useState<any[]>([]);
    useEffect(() => {
        getFileList(['filetmp', "allLrc/record"]).then((res) => {
            const [all, tmp] = res || [];
        })
    }, []);
    const start = () => {
        if (songs?.length) {
            if (songs?.length < offset) {
                return
            }
            let name = songs[offset];
            setTemp([name, ...temp]);
            setSongs(songs.filter(n => n != name))
            genderLrc(name);
        }
    }
    useEffect(() => {
        if (!frozen) {
            onUpload().then(res => {
                setFrozen(true);
                start();

            });
        }
    }, [frozen])
    return (
        <div >
            <div onClick={showAns}>show</div>
            <div onClick={start}>start</div>
            <div onClick={onUpload}>onUpload</div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: 300 }}>
                    {
                        songs?.map((name, idx) => {
                            if (idx < offset) return null;
                            return <div key={idx}>{idx} {name}</div>
                        })
                    }
                </div>
                <div style={{ width: 300, background: loading ? 'pink' : '' }}>
                    <div>
                        {loading ? 'true' : 'false'}
                    </div>
                    {
                        temp?.map(name => <div >{name}</div>)
                    }
                </div>
            </div>
        </div>
    )
}
export default SongNpl;
