<template>
  <div v-show="!item.children">
    <a href="javascript:;" @click="toPath(item.path)">{{ item.name }}</a>
  </div>
  <div v-show="item.children">
    <div class="tree-title">{{ item.name }}</div>
    <ul>
      <li v-for="(item, index) in item.children" :key="index">
        <TreeItem :item="item" :ctx="ctx"></TreeItem>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'tree-item'
}
</script>

// TODO 记录当前展示的markdown，并作出特殊的样式区分
<script setup lang="ts">
import { ref, toRefs } from 'vue'
const props = defineProps({
  item: null,
  ctx: null
})
const { ctx } = toRefs(props)

const toPath = (item: string) => {
  // 回到页面顶部
  ctx.value.fetchMDContent(item)
  document.getElementsByTagName('section')[1].scrollTop = 0
}
</script>

<style lang="less" scoped>
.tree-title {
  font-weight: bolder;
}
a {
  color: rgb(68, 223, 184) ;
}
</style>
