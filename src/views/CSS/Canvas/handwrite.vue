<template>
  <div id="app">
    <xy1 ref="hellow2" :btnText="btnText2" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 主动引入 样式
// import 'xy-vite-tools/style.css'

let hellow = ref<any>(null)
const btnText = ref<string>('测试组件文案1')
const btnText2 = ref<string>('测试组件文案2 ')

onMounted(() => {
  console.log('数据项目', hellow.value)
})
</script>
