<template>
  <div>
    <a-button type="primary" ghost @click="toExport">导出</a-button>
    <a-table :columns="columns" :dataSource="testData" @change="onTableChange" :pagination="false" key="id" :scroll="{ x: 1000 }">
      <template #place="{ record }"> 啥卡萨 </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { mapTo } from 'rxjs'
import { columns, map, testData } from './components/const'
import canExport from './components/export'

const onTableChange = () => {}
const toExport = () => {
  canExport(JSON.parse(JSON.stringify(testData)), [], 'Sasa', {
    custom: false,
    customMap: map,
    freeze: { x: 2, y: 1 }
  })
}
</script>

<style lang="less" scoped></style>
