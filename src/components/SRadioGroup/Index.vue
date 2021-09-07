<template>
  <a-radio-group size="large" class="radio-group" :value="value" @change="onChange">
    <a-radio-button
      :value="item.value"
      :key="item.value"
      class="radio-button"
      v-for="item in options"
      :style="{ width: `${100 / options.length}%` }"
    >
      {{ item.label }}
    </a-radio-button>
  </a-radio-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SRadioGroup',
  props: {
    options: {
      type: Array as PropType<any[]>,
      default: () => [],
    },

    value: [String, Number],
  },
  setup() {},

  methods: {
    onChange(e: any) {
      this.$emit('update:value', e.target.value);
    },
  },
});
</script>

<style lang="less" scoped>
.radio-group {
  width: 100%;
}
.radio-button {
  height: 55px;
}

.radio-button :nth-child(2) {
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 55px;
}
</style>
