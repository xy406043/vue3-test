<template>
  <div>
    <a-card class="mt-10px">
      <!-- 批量canvas绘制海报 -->
      <a-button type="primary" class="mb-10px" ghost @click="toDrawPoster">批量生成海报</a-button>
      <!-- 批量生成文件夹素材 -->
      <a-button type="primary" class="mb-10px ml-10px" ghost @click="toDealFolder">批量生成文件夹素材</a-button>
      <a-table :data-source="testData" :columns="columns" key="index" :scroll="{ x: 1000 }"> </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { testData, columns } from './comps/const'
import { posterDraw } from './helpers/posterDraw'

const toDrawPoster = () => {
  posterDraw(testData)
}

const toDealFolder = () => {}
</script>

<style lang="less" scoped></style>
