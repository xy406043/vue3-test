<template>
  <v-chart :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch } from 'vue';
import optionCreator from './options';

export default defineComponent({
  name: 'BarChart',

  props: {
    barData: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const option = ref({});
    const { barData } = toRefs(props);

    watch(
      barData,
      (newVal) => {
        option.value = optionCreator(newVal);
      },
      {
        immediate: true,
        deep: true,
      },
    );

    return {
      option,
    };
  },
});
</script>
