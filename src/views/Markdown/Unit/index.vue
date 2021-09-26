<template>
  <div class="markodwContent" id="markodwContent">
    <!-- 页面渲染 -->
    <div class="preview-vditor" element-loading-text="正在努力，请稍候..." @scroll="docsScroll">
      <div id="khaleesi" class="vditor-preview" />
    </div>

    <!-- 文件目录 -->
    <Tree ref="cateTree" :ctx="ctx"></Tree>

    <!-- 文档目录 -->
    <!-- <Category ref="category" :ctx="ctx" :helpDocs="helpDocs" :content="content" :document="documentSub"></Category> -->
  </div>
</template>

<script setup lang="ts">
// vite 中无法使用require
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
import Tree from './comps/tree.vue'
import Category from './comps/category.vue'

import Vditor from 'vditor'
import 'vditor/dist/index.css'
import AboutAryaMd from './comps/test2'

import useCurrentInstance from '@/hooks/useCurrentInstance'
const { globalProperties: global, proxy: ctx } = useCurrentInstance()

// 忽略hightlight关于 unscapedHTML 的警告
hljs.configure({ ignoreUnescapedHTML: true })

let stringContent = ref<string>('')
let helpDocs = ref<any>(null)
const cateTree = ref<any>(null)
const category = ref<any>(null)
const renderLoading = ref<boolean>(false)

let mdPreList = ref<any>([])
let mdChooseIndex = ref<string>('')

const documentSub = ref<any>(document)

const content = computed(() => stringContent.value)

onMounted(() => {
  createCates()
})

// ~~ ================== markdown 加载 ======================================
// 获取文件内容，渲染到页面上
const fetchMDContent = (url: string) => {
  axios
    .get(url)
    .then(res => {
      stringContent.value = res.data
      console.log('result', res.data)
      updateVditorValue()
      // 高亮代码
      setTimeout(() => {
        document.querySelectorAll('pre').forEach((item: any) => {
          hljs.highlightBlock(item)
        })
      }, 200)

      setTimeout(() => {
        // 需要content更新完毕后再进行生成目录操作
        // category.value && category.value.createCategory()
      }, 300)
    })
    .catch(err => {
      console.log(err)
    })
}

const vditor = ref<any>(null)
import { hideVditorTextarea, updateHtmlStyle } from './helpers/vditor'
const createAray = () => {
  // 渲染文件方式一 ， 此处setItem即可
  // localStorage.setItem('vditorkhaleesi', AboutAryaMd)

  updateHtmlStyle()
  setTimeout(async () => {
    // ~~ 渲染方式一  编辑模式
    // const options = <any>{
    //   mode: 'sv',
    //   preview: {
    //     delay: 1000,
    //     show: true,
    //     markdown:{
    //       toc:true,
    //     }
    //   },
    //   // 渲染文件方式二，此处 设置vditor的值
    //   after: () => {
    //     updateVditorValue()
    //   }
    // }
    // vditor.value = new Vditor('khaleesi', options)
    // hideVditorTextarea()

    // ~~ 渲染方式二   纯预览方式
    updateVditorValue()
  }, 1000)
}
const updateVditorValue = async () => {
  renderLoading.value = false
  // vditor.value.setValue(content.value)

  let dom = <any>document.getElementById('khaleesi')
  let options = <any>{
    mode: 'light',
    anchor: 1,
    preview: {
      markdown: {
        toc: true,
        fixTermTypo: true, // 自动矫正术语
        listStyle: true, // 列表添加data-style属性
        mark: true // 启用mark标记
        // linkPrefix:"",// 链接强制前缀
      }
    }
  }
  await Vditor.preview(dom, content.value, options)
  renderLoading.value = true
}

// ==========================================================================

// ~~ =========== 所有markdown 目录 ==========================================
// 获取views_md 目录下markdown 文档 ---- 是否获取其子目录下的markdown文档

const createCates = () => {
  const upMoudles = import.meta.glob('/src/views_md/**/*.md')
  // console.log('%c 获取md目录', 'color:#2c80c5', upMoudles)
  // 按目录划分拆分出各个文件夹下的md文档，并在页面左侧进行展示
  // todo 当前选中渲染的文件在左侧应有不同的样式表现

  Object.keys(upMoudles).forEach((item: any, index: number) => {
    let paths = item.replace('/src/views_md/', '').split('/')
    let pathSimple = item.replace('/src/views_md/', '')
    mdPreList.value.push({
      path: item,
      pathSimple,
      paths,
      title: paths[paths.length - 1]
    })

    if ((mdChooseIndex.value && item == mdChooseIndex.value) || index == 0) {
      fetchMDContent(item)
    }
  })

  // console.log('cateRee', cateTree, cateTree.value)
  cateTree.value.toCateTree(mdPreList.value)

  createAray()
}

// ==========================================================================

const docsScroll = () => {
  // category.value.docsScroll()
}
</script>

<style lang="less">
// !typora 的主体样式文件 引用了与 在typora中效果不一致
@import './themes/markdown.less';

// ! 以下样式为使用 vditor 编辑模式 sv等时使用
// vditor 设置的样式
// @import '../../../assets/styles/style.less';

// .markodwContent {
//   margin: 0 auto;
//   padding: 30px;
//   margin-bottom: 60px !important;
// }
// @media screen and (min-width: 768px) {
//   .markodwContent {
//     width: 748px;
//     margin: 10px auto;
//   }
// }

// .preview-vditor {
//   width: 100%;
//   height: 100%;
//   min-height: 100vh;
//   background-color: @white;
//   .flex-box-center(column);
//   #khaleesi {
//     max-width: 748px;
//     height: 100%;
//     min-height: 100vh;
//     margin: 20px auto;
//     text-align: left;
//     .vditor-toolbar {
//       display: none;
//     }
//     .vditor-content {
//       .vditor-sv {
//         display: none !important;
//       }
//     }
//     .vditor-preview {
//       padding: 0 20px;
//       box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
//       .vditor-preview__action {
//         display: none;
//       }
//       .vditor-reset {
//         h1 {
//           text-align: center;
//         }
//       }
//     }
//   }
//   .vditor {
//     border: 0;
//   }
// }

// @media (max-width: 768px) {
//   .preview-vditor {
//     #khaleesi {
//       width: 100% !important;
//       margin: 0 !important;
//     }
//     .vditor-preview {
//       padding: 0 10px;
//     }
//     .vditor-reset {
//       table {
//         display: inline-block;
//         overflow-x: auto;
//       }
//     }
//   }
// }
</style>
