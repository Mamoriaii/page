import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': '#1DA57A',
    '@light-text-color': '#fff',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   { path: '/Lrc', component: '@/pages/Lrc' },
  // ],
});
