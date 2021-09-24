<template>
  <div class="file-img-con">
    <div class="file-img-item">
      <SAlert title="热区图" />
      <HotArea />
    </div>

    <div class="file-img-item">
      <SAlert title="裁剪" />
      <Cropper />
    </div>

    <div class="file-img-item">
      <SAlert tilte="滚轮" />
      <Wheel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HotArea from './components/hotArea.vue'
import Cropper from './components/clipper.vue'
import Wheel from './components/imgWheel.vue'

onMounted(() => {})
</script>

<style lang="less" scoped>
.file-img-con {
  .file-img-item {
    background-color: white;
    border-radius: 5px;
    padding: 0 5px 10px 5px;
  }
  .file-img-item:nth-child(2n + 1) {
    // width: 48%;
    // margin-right: 2%;
  }
}
</style>
