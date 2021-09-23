<template>
  <div class="css-canvas-con">
    <div class="css-canvas-item">
      <SAlert title="canvas滤镜" />
      <Scan />
    </div>

    <div class="css-canvas-item">
      <SAlert title="css滤镜" />
      <CssFilter />
    </div>
  </div>
</template>

<script setup lang="ts">
import SAlert from '@/components/SAlert'
import Scan from './comps/canvasFilter.vue'
import CssFilter from './comps/cssFilter.vue'
</script>

<style lang="less" scoped>
.css-canvas-con {
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  .css-canvas-item {
    width: 48%;
    margin: 0 1%;
    padding: 0 3px;
  }
}
</style>
