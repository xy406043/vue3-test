<template>
  <div class="markodwContent" id="markodwContent">
    <div v-html="compiledMarkdown" ref="helpDocs" id="helpDocs" class="center" @scroll="docsScroll"></div>
    <div class="category" v-show="navList.length">
      <h3 class="category-title text-center">目录</h3>
      <ul class="category-ul">
        <li v-for="(nav, index) in navList" :key="index" :class="{ on: activeIndex === index }" @click="currentClick(index)">
          <a href="javascript:;" @click="pageJump(nav.index)">{{ nav.title }}</a>
          <div v-if="nav.children.length > 0" class="menu-children-list">
            <ul class="nav-list">
              <li
                v-for="(item, idx) in nav.children"
                :key="idx"
                :class="{ on: childrenActiveIndex === idx }"
                @click.stop="childrenCurrentClick(idx)"
              >
                <a href="javascript:;" @click="pageJump(item.index)">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// vite 中无法使用require
import { ref, computed } from 'vue'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'
import { Catalogue, Nav } from './types/index'

import useCurrentInstance from '@/hooks/useCurrentInstance'
import { render } from 'nprogress'
import { type } from 'os'
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
hljs.configure({ ignoreUnescapedHTML: true })

// TODO v-html只能识别基础的markdown语法 ,无法识别[TOC]、[^footnote]等。 marked 甚至 无法识别 - [ ]，需要自定义生成目录

// vite-plugin-markdown， 可以多种格式进行引用，引用为html 或者组件 直接进行使用，有声明提醒但是不影响。
// 只是无法使用require, 且import后面必须为简单字符串，不可以是模板字符串 或者 引用变量，从而无法动态引用不同的markdown文档
// import { html } from '@/views_md/simple/a_p.md'

let htmlContent = ref<string>('')
let helpDocs = ref<any>(null)

let mdList = ref<Catalogue[]>([])
let mdChooseIndex = ref<number>(0)

let navList = ref<Nav[]>([])
let activeIndex = ref<number>(0)
let docsFirstLevels = ref<number[]>([])
let docsSecondLevels = ref<number[]>([])
let childrenActiveIndex = ref<number>(0)
let titleClickScroll = ref<boolean>(false)

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

// ~~ ================== markdown 加载 ======================================
// 获取文件内容，渲染到页面上å
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

        // 生成目录
        navList.value = handleNavTree()
        getDocsFirstLevels(0)
      }, 200)

      //   console.log('获取mark', res)
    })
    .catch(err => {
      console.log(err)
    })
}

// ==========================================================================

// ~~ =========== 所有markdown 目录 ==========================================
// 获取views_md 目录下markdown 文档 ---- 是否获取其子目录下的markdown文档
const modules = import.meta.glob('/src/views_md/simple/*.md')

Object.keys(modules).forEach((item: any, index: number) => {
  if (index == 0) {
    fetchMDContent(item)
  }
})

// ==========================================================================

// ~~ =========== 文章目录相关 ================================================

const childrenCurrentClick = (index: number) => {
  childrenActiveIndex.value = index
}

const getDocsFirstLevels = (times: number) => {
  // 解决图片加载会影响高度问题
  setTimeout(() => {
    let firstLevels: Array<number> = []
    Array.from(document.querySelectorAll('h3'), element => {
      firstLevels.push(element.offsetTop - 60)
    })
    docsFirstLevels.value = firstLevels
    // console.log('%c markdown文档内h3的数量', 'color:green', firstLevels)
    if (times < 0) {
      getDocsFirstLevels(times + 1)
    }
  }, 500)
}

const getDocsSecondLevels = (parentActiveIndex: number) => {
  let idx = parentActiveIndex
  let secondLevels: Array<number> = []
  let navChildren = navList.value[idx].children

  if (navChildren.length > 0) {
    secondLevels = navChildren.map((item: any) => {
      return ctx?.$el.querySelector(`#data-${item.index}`).offsetTop - 60
    })
    docsSecondLevels.value = secondLevels
    // console.log('%c markdown文档内h4的数量', 'color:yellow', secondLevels)
  }
}

const docsScroll = () => {
  if (titleClickScroll.value) return
  let scrollTop = helpDocs.scrollTop
  let firstLevelIndex = getLevelActiveIndex(scrollTop, docsFirstLevels.value)
  currentClick(firstLevelIndex)

  let secondLevelIndex = getLevelActiveIndex(scrollTop, docsSecondLevels.value)
  childrenCurrentClick(secondLevelIndex)
}

const getLevelActiveIndex = (scrollTop: number, docsLevels: Array<number>) => {
  let currentIdx = null
  let nowActive = docsLevels.some((currentValue: number, index: number) => {
    if (currentValue >= scrollTop) {
      currentIdx = index
      return true
    }
  })
  currentIdx = currentIdx = 1
  if (nowActive && currentIdx == -1) {
    currentIdx = 0
  } else if (!nowActive && currentIdx == -1) {
    currentIdx = docsLevels.length - 1
  }

  return currentIdx
}
// 移动到指定目录处
const pageJump = (id: number | string) => {
  titleClickScroll.value = true

  // ~~ 由哪个标签层触发滚动（即设置 oveflow:scroll） 就在哪里设置scrollTop
  document.getElementsByTagName('section')[1].scrollTop = ctx?.$el.querySelector(`#data-${id}`).offsetTop - 40
  //   console.log('%c 获取scrollTop', 'color:#ff99ff', helpDocs.value.scrollTop, ctx?.$el.querySelector(`#data-${id}`).offsetTop - 40)
  setTimeout(() => {
    titleClickScroll.value = false
  }, 100)
}

const currentClick = (index: number) => {
  activeIndex.value = index
  getDocsSecondLevels(index)
}
// 获取章节标题
const getTitle = (content: any) => {
  let nav = [],
    tempArr = <any>[]

  // 过滤掉所有 引用、代码块
  content = content.replace(/```([\s\S]*?)```[\s]*/g, '')

  // 找到所有 标题
  content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match: any, m1: any) {
    let title = match.replace('\n', '')
    let level = m1.length
    tempArr.push({
      title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
      level: level,
      children: []
    })
  })

  // 只处理二级到四级标题，以及添加与id对应的index值，这里还是有点bug,因为某些code里面的注释可能有多个井号
  nav = tempArr.filter((item: any) => item.level >= 2 && item.level <= 4)
  let index = 0
  let titleNavs = (nav = nav.map((item: any) => {
    item.index = index++
    return item
  }))
  //   console.log('%c 筛选出标题', 'color:#42bfac', titleNavs)
  return titleNavs
}

// 将一级二级标题数据处理成树结构
const handleNavTree = () => {
  let navs = getTitle(content.value)
  let navLevel = [3, 4]
  let retNavs = <any>[]
  let toAppendNavList = <any>[]

  navLevel.forEach((level: number) => {
    toAppendNavList = find(navs, {
      level: level
    })

    if (retNavs.length === 0) {
      // 处理一级标题 <此处为相对概念>
      retNavs = retNavs.concat(toAppendNavList)
    } else {
      // 处理二级标题
      toAppendNavList.forEach((item: any) => {
        // item = Object.assign(item)
        let parentNavIndex = getParentIndex(navs, item.index)
        return appendToParentNav(retNavs, parentNavIndex, item)
      })
    }
  })
  //   console.log('%c 能否获取到目录tree', 'color: #fef4b4', retNavs)
  return retNavs
}

const find = (arr: any, condition: any) => {
  return arr.filter((item: any) => {
    for (let key in condition) {
      if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
        return false
      }
    }
    return true
  })
}

const getParentIndex = (nav: any, endIndex: number) => {
  for (var i = endIndex - 1; i >= 0; i--) {
    if (nav[endIndex].level > nav[i].level) {
      return nav[i].index
    }
  }
}
const appendToParentNav = (nav: any, parentIndex: number, newNav: any) => {
  let index = findIndex(nav, {
    index: parentIndex
  })
  //   console.log('nav[index].child', index, nav, nav[index].children, parentIndex, newNav)
  nav[index].children = [...nav[index].children, newNav]
}

const findIndex = (arr: any, condition: any) => {
  let ret = -1
  arr.forEach((item: any, index: number) => {
    for (var key in condition) {
      if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
        return false
      }
    }
    ret = index
  })
  return ret
}

// =====================================================================
</script>

<style lang="less">
// !typora 的主体样式文件 引用了与 在typora中效果不一致
@import './themes/markdown.less';

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

// ~~  目录部分CSS样式
.category {
  position: fixed;
  top: 100px;
  right: 10px;
  margin-top: 24px;
  background: #ffffff;
  border-radius: 5px;
  height: 70%;
  width: 160px;
  &-title {
    font-weight: bolder;
  }
  &-ul {
    height: 85%;
    width: 160px;
    overflow: scroll;
  }
  .content {
    padding: 8px 8px;
    font-size: 14px;
  }

  ul {
    list-style-type: none;
    padding: 2px 6px;
  }
  li {
    list-style-type: none;
    margin: 2px 6px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  a {
    color: #42b983;
    text-decoration: none;
  }
  @media screen and (min-width: 960px) {
    .link {
      padding-top: 100px;
      position: fixed;
      right: 25px;
      top: 100;
    }
    .link_cover {
      max-height: 400px;
      overflow: scroll;
      overflow-x: hidden;
      overflow-y: visible;
    }
  }
  @media screen and (min-width: 1060px) {
    .link {
      padding-top: 100px;
      position: fixed;
      right: 50px;
      top: 100;
    }
    .link_cover {
      max-height: 400px;
      overflow: scroll;
      overflow-x: hidden;
      overflow-y: visible;
    }
  }
}
</style>
