import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/discopage/index' }],
  fastRefresh: {},
  base: '/page',
  publicPath: '/page/',
});
