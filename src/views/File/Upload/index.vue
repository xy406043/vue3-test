<template>
  <div class="file-con">
    <!-- 选择文件处理 -->
    <div class="file-con-item">
      <SAlert title="基操" />
      <div class="inline-flex flex-col">
        <a-button type="primary" ghost class="mb-10px" @click="submit">模拟base64图片上传</a-button>
        <a-button type="primary" ghost class="mb-10px" @click="fetchUpload">网图重新上传</a-button>
        <a-button type="primary" ghost class="mb-10px" @click="videoFirstFrame">获取视频第一帧</a-button>
        <input v-show="false" type="file" id="uploadfile" @change="fileChoose" />
      </div>
    </div>

    <!-- 上传 -->
    <div class="file-con-item">
      <SAlert title="组件上传" />
      <div class="file-con-item">
        <HybridUpload ref="upload" :maxLen="10" v-model="urlList" :defaultList="urlList" />
        {{ urlList.length ? urlList : '' }}
      </div>
    </div>
  </div>
</template>

// TODO 通用类型支持
<script setup lang="ts">
import { ref, watch } from 'vue'
import HybridUpload from '@/components/Upload/inex.vue'
import { submit, fileChoose, fetchUpload, videoFirstFrame } from './helpers/choose'
import SAlert from '@/components/SAlert'

const urlList = ref([
  {
    url: 'https://easystock.oss-cn-hangzhou.aliyuncs.com/d4daa2752db442599a4b1f7edc758765.png',
    name: '',
    type: ''
  }
])
const upload = ref(null)

// watch(urlList, () => {})
</script>

<style lang="less" scoped>
.file-con {
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  &-item {
    width: 48%;
    margin: 0 1%;
    padding: 0 3px;
  }
}
</style>
