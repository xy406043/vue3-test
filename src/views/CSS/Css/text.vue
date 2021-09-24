<template>
  <div class="xy-con">
    <div class="xy-item">
      <SAlert title="文字描边"></SAlert>
      <TextTESTStroke />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextTESTStroke from './comps/text-test-stroke.vue'
</script>

<style lang="less" scoped>
.xy-con {
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  .xy-item {
    width: 48%;
    margin: 0 1%;
    padding: 0 3px;
  }
}
</style>
