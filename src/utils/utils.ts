import _ from 'lodash';

const chunkDisco = (arr: any[], step: number = 5, start: number = 2007) => {
  return _.map(
    _.groupBy(_.sortBy(arr, 'release'), (item: any) => {
      const time = item.release.slice(0, 4) - 0;
      if (time > start + step - 1) {
        start += step;
      }
      return start + '-' + (start + step - 1);
    }),
    (item: any[], key: string) => {
      const [start, end] = key.split('-');
      return {
        start,
        end,
        list: item,
      };
    },
  );
};

export default {
  chunkDisco,
};
