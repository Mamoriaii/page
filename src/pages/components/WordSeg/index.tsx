import classNames from 'classnames';
import React from 'react';
import styles from './index.less';
const _ = require('lodash');
interface Props {
  dataSource: nplWord[];
  npl?: boolean;
  katakana?: boolean;
  type?: boolean;
}

const WordSeg: React.FC<Props> = ({ dataSource, npl, katakana, type }) => {
  return (
    <>
      {dataSource.map((w: any, p: number) => {
        return (
          <div
            key={p}
            className={classNames(
              styles['lrc-word-box'],
              npl && styles['lrc-word-npl'],
              type && styles['lrc-word-type'],
            )}
          >
            {katakana && (
              <div
                className={classNames(styles['lrc-reading'], {
                  [styles['word-center']]: w.reading?.length === 1,
                })}
              >
                {w.reading || <>&nbsp;</>}
              </div>
            )}
            <div
              className={classNames(
                styles['lrc-word'],
                type && styles['word-' + (w.type || w.cls || w.curPos)],
                { [styles['word-center']]: w.surface?.length === 1 },
              )}
            >
              <span>{w.surface}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default WordSeg;
