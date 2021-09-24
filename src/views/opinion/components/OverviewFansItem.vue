<template>
  <a-card
    style="border-top: 0; border-radius: 0px"
    :bodyStyle="{ padding: '24px 0px' }"
  >
    <share-chart
      style="padding: 0px 24px"
      :pieData="firstPieOptions"
      :lineData="firstLineOptions"
    />
    <split-line />
    <div style="padding: 0px 24px">
      <s-radio-group :options="noteTypes4Tab" v-model:value="category" />
      <s-alert title="笔记热词" desc="仅显示TOP10热词" />
      <bar-chart :barData="barOptions" style="height: 300px" />
      <s-alert title="笔记舆情倾向" />
      <share-chart
        style="padding: 0px 24px"
        :pieData="secondPieOptions"
        :lineData="secondLineOptions"
      />
      <s-alert title="笔记列表" desc="仅展示最新的15个笔记" />
      <a-radio-group
        v-model:value="choseNoteType4Table"
        style="margin-bottom: 20px"
      >
        <a-radio-button
          :value="note.value"
          v-for="note in noteTypes4Table"
          :key="note.value"
        >
          {{ note.label }}
        </a-radio-button>
      </a-radio-group>
      <a-table
        :columns="tableColums"
        :dataSource="tableData"
        :pagination="false"
        size="small"
        key="id"
      >
        <template #content="{ text }">
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
      </a-table>
    </div>
  </a-card>
</template>

<script setup lang="ts" name="OverviewHeader">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import ShareChart from "@/components/ShareChart";
import SplitLine from "@/components/SplitLine";
import BarChart from "@/components/Chart/BarChart";
import SRadioGroup from "@/components/SRadioGroup";
import useShareChartData from "@/hooks/useShareChartData";
import { NoteCategory } from "@/types/common";

const originNoteTypes4Tab = [
  {
    value: "kol",
    label: "KOL笔记",
  },
  {
    value: "koc",
    label: "KOC笔记",
  },
  {
    value: "common",
    label: "素人笔记",
  },
];

// 需要修改 todo
const originNoteTypes4Table = [
  {
    value: "total",
    label: "全部笔记",
  },
  {
    value: "positiveNotes",
    label: "正面笔记",
  },
  {
    value: "neutralNotes",
    label: "中性笔记",
  },
  {
    value: "negativeNotes",
    label: "负面笔记",
  },
];

const props = defineProps({
  sourceData: {
    type: Object,
    default: () => ({}),
  },
  reportId: Number,
});

const { sourceData, reportId } = toRefs(props);
const noteTypes4Tab = reactive(originNoteTypes4Tab);
const noteTypes4Table = reactive(originNoteTypes4Table);
const choseNoteType4Table = ref("total");
const tableData = ref([]);
const category = ref<string>("kol");
const barOptions = reactive({
  yData: [],
  seriesData: [],
});
const firstPieOptions = reactive<any>({ title: "笔记作者粉丝量级分布" });
const firstLineOptions = reactive<any>({
  title: "不同粉丝量级作者的笔记数量趋势",
  yName: "笔记数(个)",
});
const secondPieOptions = reactive<any>({ title: "舆情倾向分布" });
const secondLineOptions = reactive<any>({
  title: "不同情感倾向的笔记数量趋势",
});

watch(
  [category, reportId],
  () => {
    useShareChartData(
      firstPieOptions,
      firstLineOptions,
      sourceData.value.fans.total,
      sourceData.value.fans.byDayList,
      NoteCategory.FansNum
    );
    // 热词折线图
    const currentCategory = category.value;
    const barData = sourceData.value[currentCategory].hotWords.wordList.sort(
      (a: { value: number }, b: { value: number }) => a.value - b.value
    );
    barOptions.yData = barData.map((item: any) => item.name);
    barOptions.seriesData = barData.map((item: any) => item.value);

    // 笔记作者粉丝数量
    const secondData = sourceData.value[currentCategory].sentiment;
    const currentNoteType = noteTypes4Tab.find(
      (item) => item.value === currentCategory
    );
    secondPieOptions.title = `${currentNoteType?.label}作者粉丝量级分布`;
    useShareChartData(
      secondPieOptions,
      secondLineOptions,
      secondData.total,
      secondData.byDayList,
      NoteCategory.Emotion
    );
  },
  {
    immediate: true,
  }
);

watch(
  choseNoteType4Table,
  () => {
    tableData.value =
      sourceData.value[category.value].notes[choseNoteType4Table.value];
  },
  {
    immediate: true,
  }
);

const tableColums = ref<any[]>([
  {
    title: "作者昵称",
    dataIndex: "nickname",
  },
  {
    title: "作者小红书ID",
    dataIndex: "authorId",
  },
  {
    title: "发布时间",
    dataIndex: "pubDate",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "正文",
    dataIndex: "content",
    width: 200,
    slots: { customRender: "content" },
  },
]);
</script>

<style lang="less" scoped>
.radio-group {
  width: 100%;
  margin: 20px 0 40px 0;

  .radio-btn {
    width: 33.33%;
    height: 60px;

    span:nth-child(2) {
      width: 100%;
      display: inline-block;
    }
  }
}
.one-row {
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
