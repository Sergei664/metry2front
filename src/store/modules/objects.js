import axios from "axios";
import querystring from "querystring";
//import querystring from "querystring";

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
    OBJECT_LIST: state => {
        return state.object;
    },
    SERVICE_LIST: state => {
        return state.service;
    },
    SERVICE_ADD: state => {
        return state.serviceAdd;
    },
    KONTRAGENT_LIST: state => {
        return state.kontragent;
    },
    FLAT_LIST: state => {
        return state.flat;
    },
    LS_LIST: state => {
        return state.ls;
    },
    RESIDENT_LIST: state => {
        return state.resident;
    },
};

const mutations = {
    SET_OBJECT_LIST: (state, payload) => {
        state.object = payload;
    },
    SET_SERVICE_LIST: (state, payload) => {
        state.service = payload;
    },
    SET_SERVICE_ADD: (state, payload) => {
        state.serviceAdd = payload;
    },
    SET_KONTRAGENT_LIST: (state, payload) => {
        state.kontragent = payload;
    },
    SET_FLAT_LIST: (state, payload) => {
        state.flat = payload;
    },
    SET_LS_LIST: (state, payload) => {
        state.ls = payload;
    },
    SET_RESIDENT_LIST: (state, payload) => {
        state.resident = payload;
    },
};

const actions = {

    GET_OBJECT_LIST: async (context,payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.get('http://metryobject.localhost:8701/object?' + req).catch(err => {
            return err;
        });
        context.commit('SET_OBJECT_LIST', data);
        return data;
    },
    GET_OBJECT: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/object/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    OBJECT_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/object/add', req, config);
        return data;
    },
    GET_SERVICE_LIST: async (context,payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.get('http://metryobject.localhost:8701/service?' + req).catch(err => {
            return err;
        });
        context.commit('SET_SERVICE_LIST', data);
        return data;
    },
    GET_SERVICE: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/service/view?' + req);
            context.commit('SET_SERVICE_ADD', data);
            return data;
        } catch (err) {
            return err;
        }
    },
    SERVICE_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/service/add', req, config);
        return data;
    },

    GET_KONTRAGENT_LIST: async (context,payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.get('http://metryobject.localhost:8701/kontragent?' + req).catch(err => {
            return err;
        });
        context.commit('SET_KONTRAGENT_LIST', data);
        return data;
    },
    GET_KONTRAGENT: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/kontragent/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    KONTRAGENT_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/kontragent/add', req, config);
        return data;
    },
    GET_FLAT_LIST: async (context,payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.get('http://metryobject.localhost:8701/flat?' + req).catch(err => {
            return err;
        });
        context.commit('SET_FLAT_LIST', data);
        return data;
    },
    GET_FLAT: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/flat/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    FLAT_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/flat/add', req, config);
        return data;
    },
    LS_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/ls/add', req, config);
        return data;
    },
    GET_LS_LIST: async (context,payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.get('http://metryobject.localhost:8701/ls?' + req).catch(err => {
            return err;
        });
        context.commit('SET_LS_LIST', data);
        return data;
    },
    GET_LS: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/ls/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    GET_LS_SERVICE_FILTER: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/ls/service-filter?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    GET_POST_TO_HOUSE_SERVICE_FILTER: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/service/view-post-house?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    POST_TO_LS: async (context, payload) => {
        const formData = new FormData();
        //formData.append("lsItem", payload.lsItem);
        formData.append("IdPost", payload.IdPost);
        payload.lsItem.forEach((item) => {
            formData.append('lsItem['+item.IdLs+'][IdLs]', item.IdLs);
            formData.append('lsItem['+item.IdLs+'][checked]', item.checked);
            formData.append('lsItem['+item.IdLs+'][LicSchet]', item.LicSchet);
        });
        //const req = querystring.stringify(payload);
        console.log(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/ls/post-ls', formData, config);
        return data;
    },
    POST_TO_HOUSE: async (context, payload) => {
        const formData = new FormData();
        formData.append("IdPost", payload.IdPost);
        formData.append("IdHouse", payload.IdHouse);
        formData.append("IdTsj", payload.IdTsj);
        formData.append("TarifSumm", payload.TarifSumm);
        formData.append("IdPosHouse", payload.IdPosHouse);
        payload.FormulaItem.forEach((item) => {
            formData.append('TypeFormula[]', item.value);
            /*formData.append('lsItem['+item.IdLs+'][checked]', item.checked);
            formData.append('lsItem['+item.IdLs+'][LicSchet]', item.LicSchet);*/
        });
        //const req = querystring.stringify(payload);
        console.log(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/service/post-house', formData, config);
        return data;
    },
    GET_RESIDENT_LIST: async (context,payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.get('http://metryobject.localhost:8701/resident?' + req).catch(err => {
            return err;
        });
        context.commit('SET_RESIDENT_LIST', data);
        return data;
    },
    GET_RESIDENT: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/resident/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    RESIDENT_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/resident/add', req, config);
        return data;
    },
    GET_KVITANCIA: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/kvitancia/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    KVITANCIA_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/kvitancia/add', req, config);
        return data;
    },
    KVITANCIA_FORM: async (context, payload) => {
        const formData = new FormData();
        formData.append("IdHouse", payload.IdHouse);
        formData.append("dateMonth", payload.dateMonth);
        formData.append("IdKvSet", payload.IdKvSet);
        payload.lsItem.forEach((item) => {
            formData.append('lsItem['+item.IdLs+'][IdLs]', item.IdLs);
            formData.append('lsItem['+item.IdLs+'][checked]', item.checked);
            formData.append('lsItem['+item.IdLs+'][LicSchet]', item.LicSchet);
        });
        //const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/kvitancia/form', formData, config);
        return data;
    },
    GET_IPU_LIST: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/ipu/list?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    GET_IPU_LIST_DATA: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/ipu/list-data?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    GET_IPU: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/ipu/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    GET_IPU_DATA: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('http://metryobject.localhost:8701/ipu/view-data?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    SCHET_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/ipu/add', req, config);
        return data;
    },
    SCHET_DATA_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metryobject.localhost:8701/ipu/add-data', req, config);
        return data;
    },

}

export default {
    state: () => ({
        object: null,
        service: null,
        serviceAdd: null,
        kontragent: null,
        flat: null,
        ls: null,
        resident: null,
    }),
    mutations,
    actions,
    getters
};