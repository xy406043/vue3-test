<template>
  <div class="file-img-con">
    <!-- 热区图 -->
    <div class="file-img-item">
      <SAlert title="热区图" />
      <HotArea />
    </div>

    <!-- 裁剪 -->
    <div class="file-img-item">
      <SAlert title="裁剪" />
      <Cropper />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SAlert from '@/components/SAlert'
import HotArea from './components/hotArea.vue'
import Cropper from './components/clipper.vue'

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
