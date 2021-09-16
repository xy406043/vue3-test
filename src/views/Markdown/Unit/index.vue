<template>
  <div class="markodwContent" id="markodwContent">
    <!-- 页面渲染 -->
    <div v-show="false" v-html="compiledMarkdown" ref="helpDocs" id="helpDocs" class="center" @scroll="docsScroll"></div>
    <div class="preview-vditor" element-loading-text="正在努力，请稍候...">
      <div id="khaleesi" class="vditor-preview" />
    </div>

    <!-- 文件目录 -->
    <Tree ref="cateTree" :ctx="ctx"></Tree>

    <!-- 文档目录 -->
    <Category ref="category" :ctx="ctx" :helpDocs="helpDocs" :content="content" :document="documentSub"></Category>
  </div>
</template>

<script setup lang="ts">
// TODO 可切换展示MODE， 普通渲染 / vdior渲染mode（通过arya模式）

// vite 中无法使用require
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
import Tree from './comps/tree.vue'
import Category from './comps/category.vue'
import Vditor from 'vditor'

import useCurrentInstance from '@/hooks/useCurrentInstance'
const { globalProperties: global, proxy: ctx } = useCurrentInstance()

// marked 配置
let rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  //   tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})
// 忽略hightlight关于 unscapedHTML 的警告
hljs.configure({ ignoreUnescapedHTML: true })

// TODO v-html只能识别基础的markdown语法 ,无法识别[TOC]、[^footnote]等。 marked 甚至 无法识别 - [ ]，需要自定义生成目录

// vite-plugin-markdown， 可以多种格式进行引用，引用为html 或者组件 直接进行使用，有声明提醒但是不影响。
// 只是无法使用require, 且import后面必须为简单字符串，不可以是模板字符串 或者 引用变量，从而无法动态引用不同的markdown文档
// import { html } from '@/views_md/simple/a_p.md'

let htmlContent = ref<string>('')
let helpDocs = ref<any>(null)
const cateTree = ref<any>(null)
const category = ref<any>(null)

let mdPreList = ref<any>([])
let mdChooseIndex = ref<string>('')

const documentSub = ref<any>(document)

const content = computed(() => htmlContent.value)

const compiledMarkdown = computed(() => {
  let index = 0
  rendererMD.heading = function (text: string, level: any) {
    // 依据所需目录进行设置
    if (level == 4 || level == 3) {
      return `<h${level} id="data-${index++}">${text}</h${level}>`
    } else {
      return `<h${level}>${text}</h${level}>`
    }
  }
  return marked(content.value)
})

onMounted(() => {
  createCates()

  createAray()
})

// ~~ ================== markdown 加载 ======================================
// 获取文件内容，渲染到页面上
const fetchMDContent = (url: string) => {
  axios
    .get(url)
    .then(res => {
      htmlContent.value = res.data
      //   htmlContent.value = marked(res.data)
      // 高亮代码
      setTimeout(() => {
        document.querySelectorAll('pre').forEach((item: any) => {
          hljs.highlightBlock(item)
        })
      }, 200)

      setTimeout(() => {
        // 需要content更新完毕后再进行生成目录操作
        category.value.createCategory()
      }, 300)
    })
    .catch(err => {
      console.log(err)
    })
}

const vditor = ref<any>(null)
import { hideVditorTextarea, updateHtmlStyle } from './helpers/vditor'
const createAray = () => {
  localStorage.setItem('vditorkhaleesi', content.value)
  updateHtmlStyle()

  setTimeout(() => {
    const options = <any>{
      width: '61.8%',
      mode: 'sv',
      preview: {
        delay: 1000,
        show: true
      },
      after: () => {
        vditor.value.setValue(content.value)
      }
    }
    vditor.value = new Vditor('khaleesi', options)
    hideVditorTextarea()
  }, 1000)
}

// ==========================================================================

// ~~ =========== 所有markdown 目录 ==========================================
// 获取views_md 目录下markdown 文档 ---- 是否获取其子目录下的markdown文档

const createCates = () => {
  const upMoudles = import.meta.glob('/src/views_md/**/*.md')
  // console.log('%c 获取md目录', 'color:#2c80c5', upMoudles)
  // TODO 按目录划分拆分出各个文件夹下的md文档，并在页面左侧进行展示

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

  console.log('cateRee', cateTree, cateTree.value)
  cateTree.value.toCateTree(mdPreList.value)
}

// ==========================================================================

// ~~ =========== 文章目录相关 ================================================

const docsScroll = () => category.value.docsScroll

// ==========================================================================
</script>

<style lang="less">
// !typora 的主体样式文件 引用了与 在typora中效果不一致
@import './themes/markdown.less';
@import '../../../assets/styles/style.less';

.markodwContent {
  margin: 0 auto;
  padding: 30px;
  margin-bottom: 60px !important;
}
@media screen and (min-width: 768px) {
  .markodwContent {
    width: 748px;
    margin: 10px auto;
  }
}

.preview-vditor {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: @white;
  .flex-box-center(column);
  #khaleesi {
    max-width: 960px;
    height: 100%;
    min-height: 100vh;
    margin: 20px auto;
    text-align: left;
    .vditor-toolbar {
      display: none;
    }
    .vditor-content {
      .vditor-sv {
        display: none !important;
      }
    }
    .vditor-preview {
      padding: 0 20px;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
      .vditor-preview__action {
        display: none;
      }
      .vditor-reset {
        h1 {
          text-align: center;
        }
      }
    }
  }
  .vditor {
    border: 0;
  }
}

@media (max-width: 768px) {
  .preview-vditor {
    #khaleesi {
      width: 100% !important;
      margin: 0 !important;
    }
    .vditor-preview {
      padding: 0 10px;
    }
    .vditor-reset {
      table {
        display: inline-block;
        overflow-x: auto;
      }
    }
  }
}
</style>
