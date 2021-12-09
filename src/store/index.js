import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import statii from './modules/statii';

import objects from './modules/objects';
import tsg from './modules/tsg';
//import kvitancia from './modules/kvitancia';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth: auth,
        statii: statii,
        objects: objects,
        tsg: tsg,
        /*kvitancia: kvitancia,*/
    }
});