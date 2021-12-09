import axios from "axios";
import querystring from "querystring";
//import querystring from "querystring";

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
    TSG_LIST: state => {
        return state.tsg;
    },
};

const mutations = {
    SET_TSG_LIST: (state, payload) => {
        state.tsg = payload;
    },
};

const actions = {
    GET_TSG_LIST: async (context,) => {
        let {data} = await axios.get('/infotsj/').catch(err => {
            return err;
        });
        context.commit('SET_TSG_LIST', data);
        return data;
    },

    GET_TSG: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('/infotsj/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    TSG_ADD: async (context, payload) => {
        const formData = new FormData();
        formData.append("IdTsj", payload.IdTsj);
        formData.append("Name", payload.Name);
        formData.append("UrLico", payload.UrLico);
        formData.append("KodOKOPF", payload.KodOKOPF);
        formData.append("InnTsj", payload.InnTsj);
        formData.append("KppTsj", payload.KppTsj);
        formData.append("TypeOrg", payload.TypeOrg);
        formData.append("OGRN", payload.OGRN);
        formData.append("DoliaSub", payload.DoliaSub);
        formData.append("DoliaMun", payload.DoliaMun);
        formData.append("Site", payload.Site);
        formData.append("Podpisant", payload.Podpisant);
        formData.append("DoljnostPodp", payload.DoljnostPodp);
        formData.append("KontEmail", payload.KontEmail);
        formData.append("KontPhone", payload.KontPhone);
        formData.append("BookerFio", payload.BookerFio);
        formData.append("tsjSignature", payload.tsjSignature);
        formData.append("tsjStamp", payload.tsjStamp);
        formData.append("NameNalog", payload.NameNalog);
        formData.append("SvPostUch", payload.SvPostUch);
        formData.append("DateOGRN", payload.DateOGRN);
        formData.append("DateSvPostUch", payload.DateSvPostUch);
        formData.append("KodIFNS", payload.KodIFNS);
        formData.append("OKATO", payload.OKATO);
        formData.append("RegNumPFR", payload.RegNumPFR);
        formData.append("RegNumFSS", payload.RegNumFSS);
        formData.append("OKVED", payload.OKVED);
        /*formData.append("BicBank", payload.BicBank);
        formData.append("NumSchet", payload.NumSchet);
        formData.append("NumKard", payload.NumKard);*/
        formData.append("IsUserSchetSystem", payload.IsUserSchetSystem);
        formData.append("RSSityBank", payload.RSSityBank);
        formData.append("RSNum", payload.RSNum);
        formData.append("ShtrihPrfx", payload.ShtrihPrfx);
        formData.append("NameUK", payload.NameUK);
        formData.append("Inn", payload.Inn);
        formData.append("AdresIndex", payload.AdresIndex);
        formData.append("AdresRegion", payload.AdresRegion);
        formData.append("AdresRaion", payload.AdresRaion);
        formData.append("AdresCity", payload.AdresCity);
        formData.append("AdresStreet", payload.AdresStreet);
        formData.append("AdresHome", payload.AdresHome);
        formData.append("PostAddr", payload.PostAddr);
        formData.append("TarifUpravlen", payload.TarifUpravlen);
        formData.append("TypeTarifUpr", payload.TypeTarifUpr);
        formData.append("BuhTarif", payload.BuhTarif);
        formData.append("UrTarif", payload.UrTarif);
        formData.append("KontFIO", payload.KontFIO);
        formData.append("DopInfo", payload.DopInfo);
        formData.append("DispetcherAdres", payload.DispetcherAdres);
        formData.append("DispetcherPhone", payload.DispetcherPhone);
        formData.append("Rejim[0][0]", payload.RejimPN0);
        formData.append("Rejim[0][1]", payload.RejimPN1);
        formData.append("Rejim[1][0]", payload.RejimVT0);
        formData.append("Rejim[1][1]", payload.RejimVT1);
        formData.append("Rejim[2][0]", payload.RejimSR0);
        formData.append("Rejim[2][1]", payload.RejimSR1);
        formData.append("Rejim[3][0]", payload.RejimCHT0);
        formData.append("Rejim[3][1]", payload.RejimCHT1);
        formData.append("Rejim[4][0]", payload.RejimPT0);
        formData.append("Rejim[4][1]", payload.RejimPT1);
        formData.append("Rejim[5][0]", payload.RejimSB0);
        formData.append("Rejim[5][1]", payload.RejimSB1);
        formData.append("Rejim[6][0]", payload.RejimVS0);
        formData.append("Rejim[6][1]", payload.RejimVS1);
        formData.append("LicenceNum", payload.LicenceNum);
        formData.append("LicenceDate", payload.LicenceDate);
        formData.append("LicenceVydan", payload.LicenceVydan);
        formData.append("LicenceFile", payload.LicenceFile);
        let {data} = await axios.post('/infotsj/recordstsj', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    },
    GET_USER: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('/user/view?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },
    USER_ADD: async (context, payload) => {
        const req = querystring.stringify(payload);
        let {data} = await axios.post('/user/add', req, config);
        return data;
    },
    GET_TSG_ALL_LIST: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('/infotsj/all-list?' + req);
            return data;
        } catch (err) {
            return err;
        }

    },
    GET_TSG_BANK: async (context, payload) => {
        try {
            const req = querystring.stringify(payload);
            let {data} = await axios.get('/infotsj/bank?' + req);
            return data;
        } catch (err) {
            return err;
        }
    },

};


export default {
    state: () => ({
        tsg: null,
    }),
    mutations,
    actions,
    getters
};