import axios from "axios";
import querystring from "querystring";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.xsrfCookieName = '_csrf';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
const token = localStorage.getItem('user-token');
const user = localStorage.getItem('user-id');
if (token && user) {
    axios.defaults.headers.common['X-Authorization'] = 'Bearer ' + token;
    axios.defaults.headers.common['X-User'] = user;
}

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const getters = {
    STATIILIST: state => {
        return state.statiilist;
    },
};
const mutations = {
    SET_STATIILIST: (state, payload) => {
        state.statiilist = payload;
    }
};
const actions = {
    GET_STATIILIST: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('/budget-api/settings/list?'+req);
            context.commit('SET_STATIILIST', data);
            return data;
        } catch(err) {
            return err;
        }
    },

    SAVE_STATIILIST: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('/budget-api/settings/add', req, config);
        //context.commit('ADD_STATIILIST', payload);
        return data;
    },

    EDIT_STATIILIST: async (context, payload) => {
        let {data} = await axios.get('/budget-api/settings/edit/' + payload.id);
        return data;
    },

    UPDATE_STATIILIST: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('/budget-api/settings/update',req, config);
        return data;
    },

    DEL_STATIILIST: async (context, payload) => {
        const req = new FormData();
        payload.ids.forEach((item) => {
            req.append('ids[]', item);
        });
        let {data} = await axios.post('/budget-api/settings/del', req, config);
        return data;
    },

    IMPORT_STATIILIST: async (context, payload) => {
        const formData = new FormData();
        formData.append('IdOrg', payload.IdOrg);
        formData.append('IdHouse', payload.IdHouse);
        if (payload.file) {
            formData.append('file', payload.file);
        }
        let {data} = await axios.post('/budget-api/settings/import', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    },
};

export default {
    state: () => ({
        statiilist: null
    }),
    mutations,
    actions,
    getters
};
