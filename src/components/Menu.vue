<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
        >
          <a href="/" class="logo">
            <v-img
                src="./../assets/logo.svg"
            ></v-img>
          </a>
            <v-list>
                <template v-for="(item, i) in menus">
                    <v-list-item
                            :key="i"
                            link
                            v-if="item.navgroup === undefined"
                            @click="item.navtab"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-group
                            :key="'g'+i"
                            :prepend-icon="item.icon"
                            append-icon="mdi-chevron-right"
                            v-if="item.navgroup !== undefined"
                            value="true"
                            no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </template>

                        <v-list-item
                                v-for="(subitem, i) in item.navgroup"
                                :key="i"
                                link
                                @click="subitem.navtab"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                  {{ subitem.title }}
                                  <v-badge v-show="subitem.badge > 0" color="blue" offset-x="-10" offset-y="4"><span slot="badge">{{ subitem.badge }}</span> </v-badge>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list-group>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                app
                color="white"
                dark
                outlined
                elevation="0"
        >
            <v-app-bar-nav-icon color="blue" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-spacer></v-spacer>

            <v-btn @click="logoutClick" color="blue" text>
                <span class="mr-2">Выход</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
    import { bus } from '../plugins/bus.js'

    export default {
        name: "Menu",

        data () {
            return {
                drawer: true,
                menus: [
                    { title: 'Управление', icon: 'mdi-format-columns', open: false,
                        navgroup: [
                          { title: 'Организации', icon: 'mdi-square-medium', navtab: () => {
                              bus.$emit('newTab', 'Организации', 0, 'organization', {});
                            }},
                            { title: 'Рабочий стол', icon: 'mdi-square-medium', navtab: () => {
                              bus.$emit('newTab', 'Cтатьи оборота', 0, 'StatiiZatrat', {});
                            }},
                          { title: 'Задачи', icon: 'mdi-square-medium', navtab: () => {
                              bus.$emit('newTab', 'Cтатьи оборота', 0, 'StatiiZatrat', {});
                            }},
                          { title: 'Аналитика', icon: 'mdi-square-medium', navtab: () => {
                              bus.$emit('newTab', 'Cтатьи оборота', 0, 'StatiiZatrat', {});
                            }},
                          { title: 'Отчёты', icon: 'mdi-square-medium', navtab: () => {
                              bus.$emit('newTab', 'Cтатьи оборота', 0, 'StatiiZatrat', {});
                            }},
                          { title: 'Календарь', icon: 'mdi-square-medium', navtab: () => {
                              bus.$emit('newTab', 'Cтатьи оборота', 0, 'StatiiZatrat', {});
                            }},
                        ]
                    },
                    { title: 'Расчет оплаты', icon: 'mdi-cash-100', open: false,
                        navgroup: [
                            { title: 'Объекты', icon: 'mdi-square-medium', badge: 0, navtab: () => {
                                bus.$emit('newTab', 'Объекты', 0, 'Objects', {})
                            }},
                            { title: 'Помещения', icon: 'mdi-square-medium', badge: 0, navtab: () => {
                              bus.$emit('newTab', 'Помещения', 0, 'Flats', {})
                            }},
                            { title: 'Лицевые счета', icon: 'mdi-square-medium', badge: 0, navtab: () => {
                              bus.$emit('newTab', 'Лицевые счета', 0, 'Ls', {})
                            }},
                            { title: 'Квитанции', icon: 'mdi-square-medium', badge: 0, navtab: () => {
                              bus.$emit('newTab', 'Квитанции', 0, 'Kvitancia', {})
                            }},
                            { title: 'Потребители', icon: 'mdi-square-medium', badge: 0, navtab: () => {
                              bus.$emit('newTab', 'Потребители', 0, 'Residents', {})
                            }},
                            { title: 'ОПУ', icon: 'mdi-square-medium', navtab: () => {
                                bus.$emit('newTab', 'ОПУ', 0, 'Opu', {})
                            }},
                            { title: 'ИПУ', icon: 'mdi-square-medium', navtab: () => {
                                bus.$emit('newTab', 'Индивидуальные приборы учета', 0, 'Ipu', {})
                            }},
                            { title: 'Услуги', icon: 'mdi-square-medium', navtab: () => {
                                bus.$emit('newTab', 'Услуги', 0, 'Services', {})
                            }},
                            { title: 'Организации', icon: 'mdi-square-medium', navtab: () => {
                                bus.$emit('newTab', 'Организации (контрагенты)', 0, 'Kontragents', {})
                            }}
                        ]
                    },
                ],
            }
        },
        methods: {
          logoutClick() {
            this.$store.dispatch('AUTH_LOGOUT', {email: this.email, password: this.password});
          }
        },
    }
</script>

<style lang="sass">
    .v-list-group--active > .v-list-group__header
        > .v-list-group__header__append-icon .v-icon
            transform: rotate(90deg)
        &.v-list-group__header--sub-group
            > .v-list-group__header__prepend-icon .v-icon
                transform: rotate(90deg)
</style>