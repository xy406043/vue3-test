<template>
  <a-card>
    <div class="flex justify-between">
      <div class="flex">
        <div class="header-span">
          <span>机构名称：</span>
          <span>{{ instName }}</span>
        </div>
        <div class="header-span">
          <span>关键词：</span>
          <span>{{ keyword }}</span>
        </div>
        <div class="header-span">
          <span>时间范围：</span>
          <span>近{{ days }}月</span>
        </div>
      </div>
      <a @click="backSearch">重新搜索</a>
    </div>
    <a-divider></a-divider>
    <div class="flex">
      <div class="header-span">
        <span>总笔记数：</span>
        <span>{{ report.notesNum }}</span>
      </div>
      <div class="header-span">
        <span>总作者数：</span>
        <span>{{ report.authorNum }}</span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  props: {
    days: {
      type: Number,
      required: true,
    },
    instName: {
      type: String,
      required: true,
    },
    instId: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    report: {
      type: Object as PropType<{ [key in string]: any }>,
      default: () => ({
        notesNum: '--',
        authorNum: '--',
      }),
    },
  },

  setup(props) {
    const router = useRouter();
    function backSearch() {
      router.replace({
        name: 'Opinion',
        params: {
          days: props.days,
          instId: props.instId,
          keyword: props.keyword,
        },
      });
    }
    return {
      backSearch,
    };
  },
});
</script>


<style scoped>
.header-span {
  display: flex;
  width: 300px;
}

.header-span span:nth-child(2) {
  font-weight: 600;
}
</style>
