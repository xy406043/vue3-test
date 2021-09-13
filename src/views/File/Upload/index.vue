<template>
  <a-button type="primary" ghost @click="submit">lsa</a-button>
  <a-radio-group v-model:value="showContent">
    <a-radio-button :value="0">Hangzhou</a-radio-button>
    <a-radio-button :value="1">Shanghai</a-radio-button>
  </a-radio-group>
  <div v-if="!showContent">
    <HybridUpload ref="upload" :maxLen="10" v-model="urlList" :defaultList="urlList" />
    {{ urlList.length ? urlList : '' }}
  </div>
  <div v-else>
    <HybridUpload ref="upload2" :maxLen="2" v-model="urlList2" :defaultList="urlList2" />
  </div>
</template>

// TODO 通用类型支持
<script setup lang="ts">
import { ref, watch } from 'vue'
import { OpinionService } from '@/api/opinion'
import HybridUpload from '@/components/Upload/inex.vue'

const urlList = ref([
  {
    url: 'https://easystock.oss-cn-hangzhou.aliyuncs.com/d4daa2752db442599a4b1f7edc758765.png',
    name: '',
    type: ''
  }
])
const urlList2 = ref([])
const showContent = ref<number>(0)
const upload = ref(null)
const accpetType = ref(['video/mp4', 'video/flv'])

async function submit() {
  console.log('获取当前上窜列表', urlList.value, JSON.stringify(urlList.value))
}

// watch(urlList, () => {})
</script>

<style lang="less" scoped></style>
