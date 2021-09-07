<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  name: 'App',
  data() {
    return {
      locale: zhCN,
    };
  },
});
</script>

<style>
#app {
  height: 100%;
}
</style>
