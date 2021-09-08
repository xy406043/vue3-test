<template>
  <div class="header">
    <div>
      <span>关键词：</span>
      <a-radio-group
        button-style="solid"
        v-model:value="searchParams.keywordId"
      >
        <a-radio-button
          :value="keyword.id"
          :key="keyword.id"
          v-for="keyword in keywords"
        >
          {{ keyword.name }}
        </a-radio-button>
      </a-radio-group>
    </div>

    <div style="margin-top: 20px">
      <span>时间范围：</span>
      <a-radio-group button-style="solid" v-model:value="searchParams.days">
        <a-radio-button :value="day.value" :key="day.value" v-for="day in days">
          {{ day.label }}
        </a-radio-button>
      </a-radio-group>
    </div>

    <div style="margin-top: 20px">
      <span>地理位置：</span>
      <a-cascader
        :options="pcCode"
        :fieldNames="{ label: 'name', value: 'name', children: 'children' }"
        style="width: 400px"
        v-model:value="searchParams.city"
        placeholder="请选择"
      >
      </a-cascader>
    </div>
  </div>

  <a-button
    style="margin: 20px 0; float: right"
    @click="exportExcel"
    :loading="exportLoading"
  >
    导出
  </a-button>

  <s-radio-group
    :options="tableTypes"
    style="margin-bottom: 20px"
    v-model:value="searchParams.type"
  ></s-radio-group>

  <a-table
    :columns="noteTableColumns"
    :dataSource="dataSource"
    :loading="loading"
    @change="onTableChange"
    :pagination="false"
    key="id"
    v-if="searchParams.type == 1"
    :scroll="{ x: 1000 }"
  >
    <template #place="{ record }">
      {{ fmtPlace(record) }}
    </template>
    <template #noteContent="{ text }">
      <a-popover
        :content="text"
        placement="left"
        :overlayStyle="{ maxWidth: '800px' }"
      >
        <template #content>
          <div style="max-width: 400px">{{ text }}</div>
        </template>
        <div class="one-row">{{ text }}</div>
      </a-popover>
    </template>
    <template #intentionality="{ text }">
      {{ (text * 100).toFixed(2) }}%
    </template>
  </a-table>

  <a-table
    :columns="commentTableColumns"
    :dataSource="dataSource"
    :loading="loading"
    @change="onTableChange"
    :pagination="false"
    key="id"
    v-if="searchParams.type == 2"
    :scroll="{ x: 1000 }"
  >
    <template #authorId>*****</template>
    <template #place="{ record }">
      {{ fmtPlace(record) }}
    </template>
    <template #noteContent="{ text }">
      <a-popover
        :content="text"
        placement="left"
        :overlayStyle="{ maxWidth: '800px' }"
      >
        <template #content>
          <div style="max-width: 400px">{{ text }}</div>
        </template>
        <div class="one-row">{{ text }}</div>
      </a-popover>
    </template>
    <template #intentionality="{ text }">
      {{ (text * 100).toFixed(2) }}%
    </template>
  </a-table>
  <a-pagination
    v-model:current="currentPage"
    v-model:pageSize="pageSize"
    showSizeChanger
    showQuickJumper
    :total="total"
    :show-total="showTotal"
    class="pagination"
    @change="onPaginationChange"
    @showSizeChange="onSizeChange"
  ></a-pagination>
</template>

<script lang="ts">
import { trackData } from "./const";
import { defineComponent, reactive, toRefs, watch, ref, PropType } from "vue";
import { HandleDay } from "@/types/common";
import { TrackingService } from "@/api/track";
import SRadioGroup from "@/components/SRadioGroup";
import excel from "@/utils/excel";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "TrackItem",

  components: {
    SRadioGroup,
  },

  props: {
    keywords: {
      type: Array as PropType<{ id?: string; name: string; type: string }[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { keywords } = toRefs(props);
    const loading = ref(false);
    const total = ref(0);
    const dataSource = ref([]);
    const pageSize = ref(20);
    const currentPage = ref(1);
    const searchParams = reactive<{ [index: string]: any }>({
      keywordId: undefined,
      days: HandleDay.Ninety,
      type: 1,
      sort: "",
      city: [],
    });

    watch(keywords, (val) => {
      searchParams.keywordId = val[0].id;
    });

    function requestList() {
      loading.value = true;
      const city = searchParams.city[searchParams.city.length - 1] || "";
      TrackingService.noteList({
        ...searchParams,
        city,
        currentPage: currentPage.value,
        pageSize: pageSize.value,
      })
        .then((res) => {
          dataSource.value = res.list || [];
          total.value = res.totalCount;
        })
        .finally(() => {
          loading.value = false;
        });
    }

    watch(
      searchParams,
      () => {
        currentPage.value = 1;
        requestList();
      },
      {
        deep: true,
      }
    );

    return {
      searchParams,
      dataSource,
      total,
      loading,
      pageSize,
      currentPage,
      requestList,
    };
  },

  data() {
    return trackData;
  },
  methods: {
    onTableChange(...arg: any) {
      const sortParams = arg[2];
      if (sortParams?.columnKey !== "intentionality") return;
      this.searchParams.sort = sortParams.order
        ? sortParams.order === "ascend"
          ? "ASC"
          : "DESC"
        : "";
    },

    showTotal(total: number) {
      return `共 ${total} 条数据`;
    },

    fmtPlace(record: any) {
      if (!(record.province && record.city && record.county)) return "--";
      return `${record.province ? record.province + ">" : ""}${
        record.city && record.city !== record.province ? record.city + ">" : ""
      }${record.county || ""}`;
    },

    async exportExcel() {
      if (!this.total) return message.warning("未发现数据！");
      const city =
        this.searchParams.city[this.searchParams.city.length - 1] || "";
      this.exportLoading = true;
      const result = await TrackingService.noteList({
        ...this.searchParams,
        city,
        currentPage: 1,
        pageSize: this.total,
      });

      try {
        result.list.forEach((item: any) => {
          item.authorId = "*****";
          item.place = this.fmtPlace(item);
          item.intentionality = (item.intentionality * 100).toFixed(2) + "%";
        });

        const title =
          this.searchParams.type === 1
            ? [
                "作者昵称",
                "作者小红书ID",
                "作者地理位置",
                "发布时间",
                "标题",
                "意向度",
                "正文",
              ]
            : [
                "评论用户昵称",
                "评论用户小红书ID",
                "评论用户地理位置",
                "评论时间",
                "评论内容",
                "评论意向度",
                "评论笔记标题",
                "评论笔记创建时间",
                "评论笔记正文",
              ];

        const key =
          this.searchParams.type === 1
            ? [
                "nickname",
                "userCode",
                "place",
                "notePubDate",
                "noteTitle",
                "intentionality",
                "noteContent",
              ]
            : [
                "nickname",
                "userCode",
                "place",
                "commentPubDate",
                "commentContent",
                "intentionality",
                "noteTitle",
                "notePubDate",
                "noteContent",
              ];

        const excelParams = {
          title,
          key,
          data: result.list,
          autoWidth: true,
          filename: "线索导出",
        };

        excel.export_array_to_excel(excelParams);
      } catch (err) {
        console.log(err);
      }
      this.exportLoading = false;
    },

    onPaginationChange() {
      this.requestList();
    },

    onSizeChange() {
      this.requestList();
    },
  },
});
</script>

<style scoped>
.header {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 4px;
}

.pagination {
  float: right;
  margin-top: 20px;
}

.one-row {
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
