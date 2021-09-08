<template>
  <div>
    <div
      v-for="msg in currentList"
      class="item flex items-center justify-between"
      @click="handleSeachResult(msg)"
      :key="msg.id"
    >
      <span class="flex items-center">
        <span :class="!msg.hasView ? 'no-view' : ''"
          >{{ msg.instName }}+{{ msg.keyword }}</span
        >
        <LoadingOutlined
          style="margin-left: 10px"
          v-if="msg.status == SearchStatusF.Loading"
        />
      </span>
      <span class="flex">
        <span>{{ SearchStatusF[msg.status] }}</span>
        <span style="margin-left: 20px">{{ msg.createdAt }}</span>
      </span>
    </div>

    <div class="bottom">
      <a-pagination
        v-model:current="currentPage"
        size="small"
        simple
        :total="list.length"
        :page-size="10"
        :show-total="showTotal"
      >
      </a-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  PropType,
  defineProps,
  computed,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import { SearchStatus } from "@/types/opinion";
import { OpinionService } from "@/api/opinion";
import { message } from "ant-design-vue";

const searchStatusCn: { [key in number]: string } = {
  [SearchStatus.Loading]: "搜索中...",
  [SearchStatus.Success]: "搜索成功",
  [SearchStatus.Fail]: "搜索失败",
};

const props = defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const currentPage = ref(1);
const pageSize = ref(10);
const { list } = toRefs(props);
const currentList = ref<any[]>([]);
const SearchStatusF = SearchStatus;

watch(
  [currentPage, list],
  ([page, newList]) => {
    currentList.value = newList.slice(
      (page - 1) * pageSize.value,
      page * pageSize.value
    );
  },
  { immediate: true }
);

const transformStatus = (status: SearchStatus) => {
  return searchStatusCn[status];
};

const handleSeachResult = async (msg: any) => {
  if (msg.status === SearchStatus.Loading)
    return message.warning("正在搜索中，请稍后");
  if (msg.status === SearchStatus.Fail) {
    OpinionService.searchAnalysisReport(msg.id)
      .catch((err) => {})
      .finally(() => {
        msg.hasView = true;
      });
    return;
  }
  window.open(`/opinionReport/${msg.id}`);
};

const showTotal = (total: number) => {
  return `共 ${total} 条`;
};
</script>

<style scoped>
.item {
  padding: 8px 10px;
}

.item:hover {
  cursor: pointer;
}

.bottom {
  background: #f5f5f5;
  padding: 5px 10px;
  display: flex;
  justify-content: flex-end;
}

.no-view {
  font-weight: 600;
}
</style>
