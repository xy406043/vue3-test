import type { App } from 'vue';
import '@ant-design-vue/pro-layout/dist/style.css'; // pro-layout css
import {
  Button,
  Card,
  Tabs,
  Radio,
  Table,
  Divider,
  Descriptions,
  Input,
  Select,
  Badge,
  Popover,
  Pagination,
  Alert,
  Empty,
  Result,
  ConfigProvider,
  Cascader,
  Form,
  Checkbox,
  Dropdown,
  Avatar,
  Menu,
  Modal,
  AutoComplete,
} from 'ant-design-vue';

export default function loadAntdComps(app: App) {
  app.use(Button);
  app.use(Card);
  app.use(Tabs);
  app.use(Radio);
  app.use(Table);
  app.use(Divider);
  app.use(Descriptions);
  app.use(Input);
  app.use(Select);
  app.use(Badge);
  app.use(Popover);
  app.use(Pagination);
  app.use(Alert);
  app.use(Empty);
  app.use(Result);
  app.use(ConfigProvider);
  app.use(Cascader);
  app.use(Form);
  app.use(Checkbox);
  app.use(Dropdown);
  app.use(Avatar);
  app.use(Menu);
  app.use(Modal);
  app.use(AutoComplete);
}
