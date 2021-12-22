import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite' // 取代 vite-plugin-components
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import unocss from 'unocss/vite'
import styleImport, { AndDesignVueResolve } from 'vite-plugin-style-import'
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
    Components({ resolvers: [AntDesignVueResolver()] })

    // styleImport({
    // ! 不生效
    //   resolves: [AndDesignVueResolve()],
    // ! 只能使用此种写法 前置加上 /node_modules/才生效
    //   libs: [
    //     {
    //       libraryName: 'ant-design-vue',
    //       esModule: true,
    //       resolveStyle: name => `/node_modules/ant-design-vue/es/${name}/style/index.less`
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
  },

  server: {
    cors: true,
    open: true
  }
})
