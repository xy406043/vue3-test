import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import styleImport from 'vite-plugin-style-import'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  // const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  // const viteEnv = wrapperEnv(env)

  // const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },

    plugins: [
      WindiCSS({}), // 会引起内存溢出
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
      // port: VITE_PORT
    },

    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        // '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US'
      ]
    }
  }
}
