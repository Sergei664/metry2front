import axios from "axios";
//import querystring from "querystring";
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

const actions = {
    /*KVITANCIA_FORM: async (context, payload) => {
        const formData = new FormData();
        formData.append("IdHouse", payload.IdHouse);
        formData.append("dateMonth", payload.dateMonth);
        payload.lsItem.forEach((item) => {
            formData.append('lsItem['+item.IdLs+'][IdLs]', item.IdLs);
            formData.append('lsItem['+item.IdLs+'][checked]', item.checked);
            formData.append('lsItem['+item.IdLs+'][LicSchet]', item.LicSchet);
        });
        //const req = querystring.stringify(payload);
        let {data} = await axios.post('http://metrykvitancia.localhost:8701/kvitancia/form', formData, config);
        return data;
    },*/
}

export default {
    state: () => ({

    }),

    actions,

};