<!--
 * @Author: Vben
 * @Description: Multi-language switching component
-->
<template>
  <!-- <Dropdown
    placement="bottomCenter"
    :trigger="['click']"
    :dropMenuList="localeList"
    :selectedKeys="selectedKeys"
    overlayClassName="app-locale-picker-overlay"
    @menuEvent="handleMenuEvent"
  >
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </Dropdown> -->

  <div>
    <div v-for="item in localeList" :key="item.text" @click="handleMenuEvent(item)">{{ item.text }}</div>

    {{ showName }}
  </div>
</template>
<script lang="ts" setup>
import type { LocaleType } from '/#/config'
import type { DropMenu } from '/@/components/Dropdown'
import { ref, watchEffect, unref, computed } from 'vue'
import { Dropdown } from '/@/components/Dropdown'
import { Icon } from '/@/components/Icon'
import { useLocale } from '/@/locales/useLocale'
import { localeList } from '/@/settings/localeSetting'

import { useI18n } from '/@/hooks/web/useI18n'
const { t } = useI18n()

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: true },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean }
})

const selectedKeys = ref<string[]>([])

const { changeLocale, getLocale } = useLocale()

const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find(item => item.event === key)?.text
})

watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})

async function toggleLocale(lang: LocaleType | string) {
  await changeLocale(lang as LocaleType)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}

function handleMenuEvent(menu: DropMenu) {
  if (unref(getLocale) === menu.event) {
    return
  }
  toggleLocale(menu.event as string)
}

const showName = ref<string>(t('layout.header.home'))
</script>

<style lang="less">
.app-locale-picker-overlay {
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
