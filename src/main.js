import { createApp } from 'vue';

import store from './store/index';
import router from './router.js';
import App from './App.vue';

import BaseDialog from './components/ui/BaseDialog';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-dialog', BaseDialog);

app.mount('#app');
