import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import styleImport from 'vite-plugin-style-import'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import mdPlugin = require('vite-plugin-markdown')

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@border-radius-base': '4px'
        }
      }
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag == 'css-doodle' || tag.startsWith('fc-')
        }
      }
    }),
    WindiCSS(),
    ViteComponents({ globalComponentsDeclaration: true }),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: name => {
            return `ant-design-vue/es/${name}/style/index`
          }
        }
      ]
    }),
    // todo eslint报 传入Mode类型错误  枚举类型
    // mdPlugin.plugin({
    //   mode: ['html']
    // })
  ],
  resolve: {
    alias: [
      // @/xxxx => src/xxxx
      {
        find: '@/',
        replacement: pathResolve('src') + '/'
      }
    ]
  }
})
