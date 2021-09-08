<template>
  <a-card>
    <a-tabs v-model:activeKey="currentType">
      <a-tab-pane :key="trackType.Part" tab="整形部位">
        <track-pane :keywords="keywords[trackType.Part]" />
      </a-tab-pane>
      <a-tab-pane :key="trackType.Project" tab="整形项目">
        <track-pane :keywords="keywords[trackType.Project]" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref, watch } from "vue";
import { TrackingService, TrackType } from "@/api/track";
import TrackPane from "./components/TrackPane.vue";

const trackType = ref(TrackType);
const currentType = ref(TrackType.Part);
const keywords = reactive({
  [TrackType.Part]: [],
  [TrackType.Project]: [],
});

watch(
  currentType,
  (type) => {
    TrackingService.keywords(type).then((list) => {
      keywords[type] = list;
    });
  },
  { immediate: true }
);
</script>
