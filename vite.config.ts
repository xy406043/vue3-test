import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import styleImport from 'vite-plugin-style-import'
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
    WindiCSS({}),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'css-doodle' || tag.startsWith('fc-')
        }
      }
    }),
    // 同时按需引入组件和样式，会在页面加载的时候引入组件样式。 因此会覆盖 unocss 的原子化样式
    // Components({ resolvers: [AntDesignVueResolver()] })

    // 只引入样式，在项目初始化时将组件样式添加到全局
    styleImport({
      // ! 不生效
      //   resolves: [AndDesignVueResolve()],
      // ! 只能使用此种写法 前置加上 /node_modules/才生效
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: name => `/node_modules/ant-design-vue/es/${name}/style/index.less`
        }
      ]
    })
  ],

  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      },
      {
        find: '@/',
        replacement: pathResolve('src') + '/'
      },
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/'
      }
    ]
  },

  server: {
    cors: true,
    open: true
  }
})
