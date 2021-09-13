import type { App } from 'vue'
import '@ant-design-vue/pro-layout/dist/style.css' // pro-layout css
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
  Upload,
  message,
  Progress,
  Tooltip
} from 'ant-design-vue'

export default function loadAntdComps(app: App) {
  app.use(Button)
  app.use(Card)
  app.use(Tabs)
  app.use(Radio)
  app.use(Table)
  app.use(Divider)
  app.use(Descriptions)
  app.use(Input)
  app.use(Select)
  app.use(Badge)
  app.use(Popover)
  app.use(Pagination)
  app.use(Alert)
  app.use(Empty)
  app.use(Result)
  app.use(ConfigProvider)
  app.use(Cascader)
  app.use(Form)
  app.use(Checkbox)
  app.use(Dropdown)
  app.use(Avatar)
  app.use(Menu)
  app.use(Modal)
  app.use(AutoComplete)
  app.use(Upload)
  app.use(Tooltip)
  app.use(Progress)

  const $msg = (type, msg) => message[type](msg)
  app.config.globalProperties.$ams = msg => $msg('success', msg)
  app.config.globalProperties.$ame = msg => $msg('error', msg)
  app.config.globalProperties.$amw = msg => $msg('warning', msg)
  app.config.globalProperties.$nsg = (type, msg, description) => notification[type]({ message: msg, description: description })
  app.config.globalProperties.$ans = (msg, description) => $nsg('success', msg, description)
  app.config.globalProperties.$ani = (msg, description) => $nsg('info', msg, description)
  app.config.globalProperties.$anw = (msg, description) => $nsg('warning', msg, description)
  app.config.globalProperties.$ane = (msg, description) => $nsg('error', msg, description)
  app.config.globalProperties.$mcf = (msg, callback, cancelCallback) => {
    Modal.confirm({
      content: msg,
      onOk() {
        const fn = Modal.destroyAll
        callback(fn)
      },
      onCancel() {
        Modal.destroyAll()
        if (cancelCallback) {
          cancelCallback()
        }
      }
    })
  }
}