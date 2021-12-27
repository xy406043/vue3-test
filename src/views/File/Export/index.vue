<template>
  <!-- 导入数据并读取、导入数据并上传 -->
  <a-card class="top-menu mt-20px">
    <a-button type="primary" class="mb-10px" ghost @click="toImport">fileType导入</a-button>
    <input v-show="false" id="importFile" ref="importFile" type="file" @change="valueChange" />
    <a-button type="primary" class="ml-10px" ghost @click="toImport">fileType上传</a-button>
    <input v-show="false" id="uploadFile" ref="uploadFile" type="file" @change="valueChange2" />
    <a-button type="primary" class="ml-10px" @click="showImg">总结展示</a-button>
  </a-card>

  <!-- 文件导出 -- 特定样式 -->
  <a-card class="mt-20px top-menu">
    <a-button type="primary" class="mb-20px" ghost @click="toExport">导出</a-button>
    <a-table key="index" :data-source="testData" :columns="columns" :scroll="{ x: 1000 }">
      <template #place="{ record, text }"> 啥卡萨 </template>
    </a-table>
  </a-card>

  <!-- File累计图示 -->
  <a-modal v-model:visible="fileModal" :width="1200">
    <img src="/src/views/File/Export/assets/file.png" class="show-modal-img" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { columns, map, testData } from './components/const'
import { toImport, valueChange, valueChange2 } from './helpers/import'

const importFile = ref(null)
const fileModal = ref<boolean>(false)

import useCurrentInstance from '@/hooks/useCurrentInstance'
const { globalProperties: global, proxy: ctx } = useCurrentInstance()
const { $ame, $ams } = global

// const onTableChange = () => {}

import canExport from './components/export'
const toExport = () => {
  canExport(JSON.parse(JSON.stringify(testData)), [], 'Sasa', {
    custom: false,
    customMap: map,
    freeze: { x: 2, y: 1 }
  })
}

const showImg = () => {
  fileModal.value = true
  console.log('fileK', fileModal.value)
}
</script>

<style lang="less" scoped>
.top-menu {
  // margin-top: 20px;
}
</style>
