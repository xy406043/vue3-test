import { createApp } from 'vue';
import App from './App.vue';
import setupGlobComps from './plugins';
import router from './router';
import store from './store';
import 'virtual:windi.css';
// import 'ant-design-vue/dist/antd.less';

const app = createApp(App);

setupGlobComps(app);

app.use(router);
app.use(store);

app.mount('#app');
