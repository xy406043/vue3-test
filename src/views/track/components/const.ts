import { HandleDay } from "@/types/common";
import pcCode from "@/utils/pc-code.json";

export const trackData = {
  noteTableColumns: [
    {
      title: "作者昵称",
      dataIndex: "nickname",
      width: 150,
    },
    {
      title: "作者小红书ID",
      dataIndex: "userCode",
      width: 150,
    },
    {
      title: "作者地理位置",
      dataIndex: "place",
      slots: { customRender: "place" },
      width: 150,
    },
    {
      title: "发布时间",
      dataIndex: "notePubDate",
      width: 150,
    },
    {
      title: "标题",
      dataIndex: "noteTitle",
      width: 200,
    },
    {
      title: "正文",
      dataIndex: "noteContent",
      width: 400,
      slots: { customRender: "noteContent" },
    },
    {
      title: "意向度",
      dataIndex: "intentionality",
      width: 100,
      slots: { customRender: "intentionality" },
      sorter: true,
    },
  ],

  commentTableColumns: [
    {
      title: "评论用户昵称",
      dataIndex: "nickname",
      width: 150,
    },
    {
      title: "评论用户小红书ID",
      dataIndex: "userCode",
      width: 150,
    },
    {
      title: "评论用户地理位置",
      dataIndex: "place",
      slots: { customRender: "place" },
      width: 150,
    },
    {
      title: "评论时间",
      dataIndex: "commentPubDate",
      width: 150,
    },
    {
      title: "评论内容",
      dataIndex: "commentContent",
      width: 150,
    },
    {
      title: "评论意向度",
      dataIndex: "intentionality",
      width: 150,
      slots: { customRender: "intentionality" },
      sorter: true,
    },
    {
      title: "评论笔记标题",
      width: 150,
      dataIndex: "noteTitle",
    },
    {
      title: "评论笔记正文",
      dataIndex: "noteContent",
      width: 400,
      slots: { customRender: "noteContent" },
    },
    {
      title: "评论笔记创建时间",
      dataIndex: "notePubDate",
      align: "center",
      width: 150,
    },
  ],

  days: [
    {
      value: HandleDay.Seven,
      label: "近7天",
    },
    {
      value: HandleDay.Thirty,
      label: "近30天",
    },
    {
      value: HandleDay.Ninety,
      label: "近90天",
    },
  ],

  tableTypes: [
    {
      value: 1,
      label: "意向笔记",
    },
    {
      value: 2,
      label: "意向评论",
    },
  ],

  pcCode,

  exportLoading: false,
};
