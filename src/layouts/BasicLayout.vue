<template>
  <pro-layout
    v-model:collapsed="baseState.collapsed"
    v-model:selectedKeys="baseState.selectedKeys"
    v-model:openKeys="baseState.openKeys"
    v-bind="state"
  >
    <router-view />
  </pro-layout>
</template>

<script setup lang="ts">
import { reactive, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMenuData, clearMenuItem } from '@ant-design-vue/pro-layout'
import type { RouteContextProps } from '@ant-design-vue/pro-layout'
import layoutConf from '../configs/layoutConf'
import Logo from '@/assets/logo.png'

const i18n = (t: string) => t
const router = useRouter()
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()))
const baseState = reactive<Omit<RouteContextProps, 'menuData'>>({
  selectedKeys: [],
  openKeys: [],
  collapsed: false
})
const state = reactive({
  menuData,
  splitMenus: false,
  logo: Logo,
  ...layoutConf
})
watchEffect(() => {
  if (router.currentRoute) {
    baseState.selectedKeys = router.currentRoute.value.matched.concat().map(r => r.path)
  }
})
onMounted(() => {})
</script>

<style lang="less">
.ant-pro-sider-logo {
  mix-blend-mode: color-dodge;
}
</style>
