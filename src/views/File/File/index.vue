<template>
  <div>
    <a-card class="mt-10px">
      <!-- 批量canvas绘制海报 -->
      <a-button type="primary" class="mb-10px" ghost @click="toDrawPoster">批量生成海报</a-button>
      <!-- 批量生成文件夹素材 -->
      <a-button type="primary" class="mb-10px ml-10px" ghost @click="toDealFolder">批量生成文件夹素材</a-button>

      <!-- 列表 -->
      <a-table :data-source="testData" :columns="columns" key="index" :scroll="{ x: 1000 }"> </a-table>

      <!-- 素材处理展示 -->
      <div v-show="false">
        <div v-for="(item, index) in testData" :key="index" :id="`showText` + item.id" v-html="item.copy"></div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testData, columns } from './comps/const'
import { posterDraw } from './helpers/posterDraw'
import { folderCreate } from './helpers/folderCreate'

import useCurrentInstance from '@/hooks/useCurrentInstance'
const { globalProperties: global, proxy: ctx } = useCurrentInstance()

const initTimes = ref(0)
const folderFileList = ref([])

const toDrawPoster = () => posterDraw(testData)
// TODO ctx.type
const toDealFolder = () => folderCreate(testData, testData.length, ctx, document)
</script>

<style lang="less" scoped></style>
