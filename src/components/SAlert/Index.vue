<template>
  <div class="z-container">
    <div class="block"></div>
    <span class="title">{{ title }}</span>
    <span class="desc">{{ desc }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SAlert',

  props: {
    title: String,
    desc: String
  }
})
</script>

<style scoped>
.z-container {
  background: #f7f8fa;
  border-radius: 3px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  height: 40px;
  margin: 40px 0 20px;
}

.block {
  width: 8px;
  height: 18px;
  background: #000;
  margin-right: 7px;
}

.title {
  font-weight: 600;
  margin-right: 30px;
  font-size: 14px;
}

.desc {
  color: #9e9e9e;
}
</style>
