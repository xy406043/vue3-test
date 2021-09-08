<template>
  <pro-layout
    v-model:collapsed="baseState.collapsed"
    v-model:selectedKeys="baseState.selectedKeys"
    v-model:openKeys="baseState.openKeys"
    v-bind="state"
  >
    <!-- custom right-content -->
    <template #rightContentRender>
      <right-content />
    </template>
    <!-- content begin -->
    <router-view />
    <!-- content end -->
  </pro-layout>
</template>

<script setup lang="ts">
import { defineComponent, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { getMenuData, clearMenuItem } from "@ant-design-vue/pro-layout";
import type { RouteContextProps } from "@ant-design-vue/pro-layout";
import layoutConf from "../configs/layoutConf";
import RightContent from "@/components/GlobalHeader/RightContent.vue";
import Logo from "@/assets/logo.png";

const i18n = (t: string) => t;
const router = useRouter();
const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));
const baseState = reactive<Omit<RouteContextProps, "menuData">>({
  selectedKeys: [],
  openKeys: [],
  collapsed: false,
});
const state = reactive({
  menuData,
  splitMenus: false,
  logo: Logo,
  ...layoutConf,
});
watchEffect(() => {
  if (router.currentRoute) {
    baseState.selectedKeys = router.currentRoute.value.matched
      .concat()
      .map((r) => r.path);
  }
});
</script>
