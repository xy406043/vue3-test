<template>
  <div class="flex" style="height: 400px">
    <!-- 饼图 -->
    <chart-container
      style="width: 40%"
      :autoresize="true"
      :loading="loading"
      :empty="empty"
      :option="pieOption"
    />
    <!-- 折线图 -->
    <chart-container
      style="width: 60%"
      :autoresize="true"
      :loading="loading"
      :empty="empty"
      :option="lineOption"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, ref } from 'vue';
import createPieOption from '../Chart/PieChart/options';
import createLineOption from '../Chart/LineChart/options';
import ChartContainer from '../Chart/Container.vue';

export default defineComponent({
  name: 'ShareChart',
  components: {
    ChartContainer,
  },
  props: {
    pieData: {
      type: Object,
      default: () => ({}),
    },
    lineData: {
      type: Object,
      default: () => ({}),
    },
    empty: Boolean,
    loading: Boolean,
  },
  setup(props) {
    const { pieData, lineData } = toRefs(props);
    const pieOption = ref({});
    const lineOption = ref({});
    watch(
      [pieData, lineData],
      ([newPieData, newLineData]) => {
        pieOption.value = createPieOption(newPieData);
        lineOption.value = createLineOption(newLineData);
      },
      {
        deep: true,
        immediate: true,
      },
    );

    return {
      pieOption,
      lineOption,
    };
  },
});
</script>
