import axios from "axios";
import querystring from "querystring";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
};
const mutations = {
    SET_LOGIN: (state, payload) => {
        state.token = payload.token;
        state.status = 1;
    },
    SET_LOGOUT: (state, payload) => {
        state.auth = payload;
    },
};
const actions = {
    AUTH_REQUEST: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('/budget-api/auth/login', req, config);
        context.commit('SET_LOGIN', data);
        if (data.status == 1) {
            const token = data.token;
            const user = data.user;
            localStorage.setItem('user-token', token);
            localStorage.setItem('user-id', user);
            window.location.href = '/';
            //this.$router.push('/');
        } else {
            throw Error(data.message);
        }
        return data;
    },
    AUTH_LOGOUT: async (context) => {
        context.commit('SET_LOGOUT');
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-id');
        window.location.href = '/';
        //this.$router.push('/login');
    }
};

export default {
    state: () => ({
        token: localStorage.getItem('user-token') || '',
        status: 0,
    }),
    mutations,
    actions,
    getters
};
