import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import unocss from 'unocss/vite'

import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  plugins: [
    unocss({}),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'css-doodle' || tag.startsWith('fc-')
        }
      }
    }),
    // ViteComponents({ globalComponentsDeclaration: true }),
    Components({ resolvers: [AntDesignVueResolver()] })
  ],

  resolve: {
    alias: [
      {
        find: '@/',
        replacement: pathResolve('src') + '/'
      }
    ]
  },

  server: {
    cors: true,
    open: true
  }
})
