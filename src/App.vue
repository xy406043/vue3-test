<template>
  <a-config-provider :locale="getAntdLocale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useLocale } from '/@/locales/useLocale'

const { getAntdLocale } = useLocale()
</script>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>

<style lang="less">
html {
  margin: 0;
  padding: 0;
  overflow: hidden; // 避免滚动超过抖动
}

// 以下触发效果  side 模式， 一般情况下 仅router-view 外section区域可scroll(100vh 小时，侧边栏路由区域亦然)
.ant-pro-basicLayout-side {
  height: 100vh;
}

.ant-pro-basicLayout {
  height: 100vh !important;
  max-height: 100vh !important;
  aside {
    overflow: scroll !important;
  }
}
.ant-pro-basicLayout > .ant-layout {
  width: 100% !important;
  overflow: scroll !important;
  min-height: 0;
  // min-height: 100vh;
}
</style>
