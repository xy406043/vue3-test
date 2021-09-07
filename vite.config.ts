import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'vite-plugin-components';
import styleImport from 'vite-plugin-style-import';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@border-radius-base': '4px',
        },
      },
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    ViteComponents({ globalComponentsDeclaration: true }),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      // @/xxxx => src/xxxx
      {
        find: '@/',
        replacement: pathResolve('src') + '/',
      },
    ],
  },
});
