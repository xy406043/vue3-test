import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import styleImport from 'vite-plugin-style-import'
import winCss from 'vite-plugin-windicss'
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
    winCss(),
    ViteComponents({ customComponentResolvers: [AntDesignVueResolver()], globalComponentsDeclaration: true })
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: 'ant-design-vue',
    //       resolveStyle: name => {
    //         return `ant-design-vue/lib/${name}/style`
    //       }
    //     }
    //   ]
    // })
  ],
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: pathResolve('src') + '/'
      }
    ]
  }
})
