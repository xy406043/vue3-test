<template>
  <v-chart :option="loading ? {} : option" :loading="loading" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChartContainer',
  props: {
    empty: Boolean,
    loading: Boolean,
    option: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>
