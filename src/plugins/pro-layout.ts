import type { App } from 'vue';
// import 'ant-design-vue/dist/antd.less'; // antd css
import '@ant-design-vue/pro-layout/dist/style.css'; // pro-layout css
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';

export default function loadProLayoutComp(app: App) {
  app.use(ProLayout as any).use(PageContainer);
}
