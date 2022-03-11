<template>
  <div v-show="mdList.length" class="paths">
    <h3 class="paths-title text-center">文件目录</h3>
    <ul class="paths-ul">
      <li v-for="(item, index) in mdList" :key="index">
        <TreeItem :item="item" :ctx="ctx"></TreeItem>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import TreeItem from './tree-item.vue'

const mdList = ref<any>([])
const props = defineProps({
  ctx: null
})
const { ctx } = toRefs(props)

// TODO 优化算法
// 转换为目录树
const toCateTree = (list: any) => {
  const showList = [] as any
  let deeps = 0
  // 先对每个路径深度化
  list.forEach((item: any) => {
    let p = {}
    const length = item.paths.length
    deeps = deeps > length ? deeps : length
    const treeItem = (num: number) => {
      const pt = {
        name: item.paths[num]
      }
      if (num + 1 !== length) {
        pt.children = [treeItem(num + 1)]
      } else {
        pt.path = item.path
      }
      return pt
    }
    p = treeItem(0)
    showList.push(p)
  })

  //   console.log('深度化', showList)
  // 然后依次合并到一起, 依层级进行合并，当前层级合并完成之后才进行下一层级的合并
  const joinDeepArr = (list: any) => {
    const itemArr = [] as any
    list.forEach((item: any) => {
      const itemIndex = itemArr.findIndex((x: any) => x.name == item.name)
      if (itemIndex == -1) {
        itemArr.push(item)
      } else if (item.children) {
        itemArr[itemIndex].children = itemArr[itemIndex].children ? [...itemArr[itemIndex].children, ...item.children] : item.children
      }
    })
    itemArr.forEach((y: any) => {
      if (y.children) y.children = joinDeepArr(y.children)
    })
    return itemArr
  }
  const result = joinDeepArr(showList)

  mdList.value = result
}

// 暴露出可被父组件使用的方法
defineExpose({
  toCateTree
})
</script>

<style lang="less" scoped>
// ~~  文件目录部分 CSS样式
.paths {
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
}
</style>
