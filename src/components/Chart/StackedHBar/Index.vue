<template>
  <a-empty v-if="!barData.seriesData.length" />
  <transition name="z-fade" mode="out-in">
    <v-chart
      :option="option"
      @click="handleClick"
      :autoresize="true"
      ref="chartRef"
      :loading="loading"
      v-if="barData.seriesData.length"
    />
  </transition>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, onMounted, watch } from 'vue';
import optionCreator from './options';

export default defineComponent({
  name: 'StackedHBar',

  props: {
    barData: {
      type: Object,
      default: () => ({}),
    },
    loading: Boolean,
  },

  setup(props) {
    const option = ref({});
    const { barData } = toRefs(props);

    function render() {
      console.log(barData.value);
      option.value = optionCreator(barData.value);
    }

    return {
      option,
      render,
    };
  },

  methods: {
    handleClick(param: any) {
      if (
        param.componentType !== 'yAxis' ||
        param.targetType !== 'axisLabel' ||
        param.type !== 'click'
      )
        return;

      this.$emit('clickLabel', param);
    },
  },
});
</script>

<style scoped>
.z-fade-enter-active,
.z-fade-leave-active {
  transition: opacity 0.5s;
}
.z-fade-enter,
.z-fade-leave-to {
  opacity: 0;
}
</style>
