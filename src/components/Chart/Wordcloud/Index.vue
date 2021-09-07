<template>
  <v-chart :option="option" />
</template>

<script lang="ts">
import { defineComponent, watch, ref, toRefs } from 'vue';
import optionCreator from './options';
import 'echarts-wordcloud';

export default defineComponent({
  name: 'WordCloudChart',

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const { list } = toRefs(props);
    const option = ref({});
    watch(list, (val) => {
      option.value = optionCreator(val);
    });

    return {
      option,
    };
  },

  mounted() {
    this.option = optionCreator(this.list);
  },
});
</script>
