<template>
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
</template>

// TODO 目录点击移动到对应标题的位置稍微有些偏差
<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { Catalogue, Nav } from '../types/index'

const props = defineProps({
  ctx: null,
  helpDocs: null,
  content: null,
  document: null
})
const { ctx, helpDocs, content, document: documentSub } = toRefs(props)

let navList = ref<Nav[]>([])
let activeIndex = ref<number>(0)
let docsFirstLevels = ref<number[]>([])
let docsSecondLevels = ref<number[]>([])
let childrenActiveIndex = ref<number>(0)
let titleClickScroll = ref<boolean>(false)

const createCategory = () => {
  // 生成目录
  navList.value = handleNavTree()
  getDocsFirstLevels(0)
}

const childrenCurrentClick = (index: number) => {
  childrenActiveIndex.value = index
}

const getDocsFirstLevels = (times: number) => {
  // 解决图片加载会影响高度问题
  setTimeout(() => {
    let firstLevels: Array<number> = []
    Array.from(documentSub.value.querySelectorAll('h3'), (element: any) => {
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
      return ctx.value?.$el.querySelector(`#data-${item.index}`).offsetTop - 60
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
  documentSub.value.getElementsByTagName('section')[1].scrollTop = ctx.value?.$el.querySelector(`#data-${id}`).offsetTop - 40
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

defineExpose({ createCategory, docsScroll })
</script>

<style lang="less" scoped>
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
