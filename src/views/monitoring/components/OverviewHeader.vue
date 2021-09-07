<template>
  <a-card>
    <div class="flex justify-between">
      <div class="flex">
        <div class="header-span">
          <span>机构名称：</span>
          <span>{{ instName }}</span>
        </div>
        <div class="header-span">
          <span>时间范围：</span>
          <a-radio-group :value="days" @change="handleChangeDay">
            <a-radio-button :value="3">近3月</a-radio-button>
            <a-radio-button :value="6">近6月</a-radio-button>
            <a-radio-button :value="12">近12月</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
    <a-divider></a-divider>
    <div class="flex">
      <div class="header-span">
        <span>总笔记数：</span>
        <span>{{ notesNum }}</span>
      </div>
      <div class="header-span">
        <span>总作者数：</span>
        <span>{{ authorNum }}</span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    authorNum: Number,
    days: Number,
    instName: String,
    notesNum: Number,
  },

  methods: {
    handleChangeDay(e: any) {
      this.$emit('dayChange', e.target.value);
    },
    // $emit('update:days', $event.target.value)
  },
});
</script>


<style scoped>
.header-span {
  display: flex;
  width: 300px;
  align-items: center;
}

.header-span span:nth-child(2) {
  font-weight: 600;
}
</style>
