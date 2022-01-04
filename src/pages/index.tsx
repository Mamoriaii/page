import React, { useEffect } from 'react';
import { history } from 'umi';

export default () => {
    return (
        <div>
            <p onClick={() => history.push('/cherrymaho')}>cherrymaho</p>
            <p onClick={() => history.push('/cherrymaho/AutoSplit')}>AutoSplit</p>
            <p onClick={() => history.push('/cherrymaho/Editor')}>Editor</p>
            <p onClick={() => history.push('/Lrc')}>LRC</p>
            <p onClick={() => history.push('/Bookkepping')}>Bookkepping</p>
        </div>
    );
}
