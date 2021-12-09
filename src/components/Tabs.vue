<template>
    <div class="content">
        <v-tabs
                v-model="tabindx"
                background-color="white"
                slider-color="primary"
                show-arrows
                class="fixedtabs"
        >
            <v-tab v-for="item in tabs" :key="item.key" dense>
               {{ item.label }} <v-icon @click="handleRemove(item.key)" class="pl-1" small>mdi-close</v-icon>
            </v-tab>
        </v-tabs>
        <keep-alive>
            <component v-bind:is="currentTabComponent" v-bind="currentProperties" :key="keyTabComponent"></component>
        </keep-alive>
    </div>
</template>

<script>
    import { bus } from '@/plugins/bus'
    import organization from "./budget/organization";
    import Objects from "./budget/Objects";
    import ObjectAdd from './budget/ObjectAdd';
    import Services from "./budget/Services";
    import ServiceAdd from "./budget/ServiceAdd";
    import Kontragents from "./budget/Kontragents";
    import KontragentAdd from "./budget/KontragentAdd";
    import Flats from "./budget/Flats";
    import FlatAdd from "./budget/FlatAdd";
    import Ls from "./budget/Ls";
    import LsAdd from "./budget/LsAdd";
    import Residents from "./budget/Residents";
    import ResidentAdd from "./budget/ResidentAdd";
    import Kvitancia from "./budget/Kvitancia";
    import KvitanciaAdd from "./budget/KvitanciaAdd";
    import Ipu from "./budget/Ipu";
    export default {
        data () {
            return {
                tabindx: null,
                tab: 'maintab',
                tabcontents: [],
                tabs: []
            }
        },
        beforeMount () {
            this.load();
        },
        mounted() {
            bus.$on('newTab', this.newTabHandler);
        },
        methods: {
            newTabHandler(name, key, component, options) {
                this.addTab(name, key, component, options);
            },
            addTab(name, key, component, options) {
                let item = 'tab' + component + key;

                //уже открыта?
                //this.switchTab(item);
                let i = 0;
                for (let el of this.tabs) {
                    //уже открыта
                    if (el.key === item) {
                        this.tabindx = i;
                        return;
                    }
                    i++;
                }

                let itemCompon = component;

                //console.log("addTab-"+item);
                this.tabs.push({
                    label: name,
                    key: item,
                    scroll: 0
                });
                this.tabcontents.push({
                    key: item,
                    compon: itemCompon,
                    taboptions: options
                });
                this.tab = item;
                this.tabindx = this.tabs.length - 1;
                this.save();

                let id = '';
                if (options !== undefined && options.id !== undefined) {
                    id = options.id;
                }
                bus.$emit('refreshTab' + itemCompon + id);
            },
            closeTab(key, switchTo = null) {
                //console.log("close-"+key);
                this.handleRemove(key);
                if (switchTo) {
                    this.switchTab(switchTo);
                }
            },
            switchTab(toTab) {
                let i = 0;
                for (let el of this.tabs) {
                    //уже открыта
                    if (el.key === toTab) {
                        this.tabindx = i;
                        return;
                    }
                    i++;
                }
            },
            load() {
                let tabs = localStorage.getItem('VUE_TABS_LIST');
                if (tabs) {
                    this.tabs = JSON.parse(tabs);
                }
                let tabcontents = localStorage.getItem('VUE_TABS_CONTENT');
                if (tabcontents) {
                    this.tabcontents = JSON.parse(tabcontents);
                }
                let tab = localStorage.getItem('VUE_TABS_TAB');
                if (tab && tab !== 'undefined') {
                    tab = JSON.parse(tab);
                    let i = 0;
                    for (let el of this.tabs) {
                        if (el.key === tab) {
                            this.tabindx = i;
                            break;
                        }
                        i++;
                    }
                }
            },
            save() {
                localStorage.setItem('VUE_TABS_LIST', JSON.stringify(this.tabs));
                localStorage.setItem('VUE_TABS_CONTENT', JSON.stringify(this.tabcontents));
            },
            // eslint-disable-next-line no-unused-vars
            handleRemove(tab) {

                this.tabs = this.tabs.filter(function(item) {
                    return item.key !== tab;
                });
                this.tabcontents = this.tabcontents.filter(function(item) {
                    return item.key !== tab;
                });
                if (this.tabindx === this.tabs.length) {
                    this.tabindx--;
                }
                if(tab.includes('tabZayavkiAddnewZayav')){
                    let keyNewZayav = parseInt(tab.match(/\d+/))
                    let newZayavkaAdd = JSON.parse(localStorage.getItem("newZayavkaAdd"));
                    let i = newZayavkaAdd.indexOf(keyNewZayav);
                    if(i >= 0) {
                        newZayavkaAdd.splice(i,1);
                    }
                    localStorage.setItem('newZayav'+keyNewZayav, JSON.stringify({}));
                    localStorage.setItem('newZayavkaAdd', JSON.stringify(newZayavkaAdd));
                }
                this.save();
            }
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            tabindx: function (newTab, oldTab) {
                if (this.tabs && this.tabs.length > 0) {
                    if (this.tabs[oldTab] !== undefined) {
                        this.tabs[oldTab].scroll = window.scrollY;
                        //console.log("scroll save "+oldTab +"-"+this.tabs[oldTab].scroll);
                    }
                    this.tab = this.tabs[newTab].key;
                    //console.log("scroll to "+oldTab +"-"+this.tabs[newTab].scroll);
                    setTimeout(async () => {
                        window.scrollTo(0, this.tabs[newTab].scroll);
                    }, 200);
                }
                localStorage.setItem('VUE_TABS_LIST', JSON.stringify(this.tabs));
                localStorage.setItem('VUE_TABS_TAB', JSON.stringify(this.tab));
            }
        },
        components: {
            organization,
            Objects,
            ObjectAdd,
            Services,
            ServiceAdd,
            Kontragents,
            KontragentAdd,
            Flats,
            FlatAdd,
            Ls,
            LsAdd,
            Residents,
            ResidentAdd,
            Kvitancia,
            KvitanciaAdd,
            Ipu
        },
        computed: {
            currentTabComponent: function () {
                const tab = this.tab;
                for (let value of this.tabcontents) {
                    if (value.key === tab) {
                        return value.compon;
                    }
                }
                return null;
            },
            currentProperties: function() {
                const tab = this.tab;
                for (let value of this.tabcontents) {
                    if (value.key === tab) {
                        return value.taboptions;
                    }
                }
                return null;
            },
            keyTabComponent: function() {
                const tab = this.tab;
                for (let value of this.tabcontents) {
                    if (value.key === tab) {
                        return value.key;
                    }
                }
                return null;
            }
        }
    }
</script>

<style lang="sass">
    .v-tab
        font-size: 12px
    .fixedtabs
        position: fixed
        width: calc(99% - 256px)
        z-index: 3
    @media screen and (max-width: 1280px)
        .fixedtabs
            width: 99%
</style>