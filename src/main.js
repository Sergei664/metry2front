import Vue from 'vue';
//import '../node_modules/roboto-fontface/css/roboto/sass/roboto-fontface.scss';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import {store} from './store';
import router from './router';
import './assets/css/style.css'

Vue.config.productionTip = false;
//console.log(store);
new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app');
