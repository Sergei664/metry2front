<template>
    <div class="tabcontent">
      <v-container>

        <v-btn color="primary" @click="onClickOrgAdd">Добавить</v-btn>

      </v-container>
      <v-skeleton-loader :loading="loading">
        <template>
          <v-data-table
              :headers="headers"
              :items="org"
              class="elevation-1"
              @click:row="onClickOrg"
          >
          </v-data-table>
        </template>
      </v-skeleton-loader>
      <v-dialog
          v-model="dialogAddOrg"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
          scrollable
      >
        <v-card tile>
          <v-toolbar
              flat
              dark
              color="primary"
              class="orgDialog"
          >
            <v-btn
                icon
                dark
                @click="dialogAddOrg = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{nameDialog}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                  dark
                  text
                  @click="addOrganization"
              >
                Сохранить
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>

              <v-tabs
                  v-model="tab"
                  grow
              >
                <v-tab>
                  Общие сведения
                </v-tab>
                <v-tab>
                  Учёт в налоговом органе
                </v-tab>
                <v-tab>
                  Банковские реквизиты
                </v-tab>
                <v-tab>
                  Адреса и телефоны
                </v-tab>
                <!--<v-tab>
                  Сведения о лицензии
                </v-tab>-->
                <v-tab>
                  Сотрудники
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item>

                  <v-row>
                    <v-col cols="12" md="6" sm="6">
                      <h4>Cведения об организации</h4>
                      <v-text-field
                          v-model="Name"
                          label="Наименование*"
                          required
                      ></v-text-field>
                      <v-text-field
                          v-model="UrLico"
                          label="Юр.лицо"
                      ></v-text-field>
                      <v-select
                          :items="forma"
                          v-model="KodOKOPF"
                          label="Организационно-правовая форма"
                          dense
                      ></v-select>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                              v-model="InnTsj"
                              label="ИНН"
                          ></v-text-field>
                          <v-text-field
                              v-model="OGRN"
                              label="ОГРН"
                          ></v-text-field>
                          <label>
                            Доля участия субъекта Российской Федерации в уставном капитале организации
                          </label>
                          <v-text-field
                              v-model="DoliaSub"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" >
                          <v-text-field
                              v-model="KppTsj"
                              label="КПП"
                          ></v-text-field>
                          <v-radio-group
                              v-model="TypeOrg"
                              row
                          >
                            <v-radio
                                label="ТСЖ"
                                color="secondary"
                                value="0"
                            ></v-radio>
                            <v-radio
                                label="УК"
                                color="secondary"
                                value="1"
                            ></v-radio>
                          </v-radio-group>
                          <label>
                            Доля участия муниципального образования в уставном капитале организации
                          </label>
                          <v-text-field
                              v-model="DoliaMun"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-text-field
                          v-model="Site"
                          label="Официальный сайт в сети Интернет"
                      ></v-text-field>

                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                      <h4>Руководитель организации</h4>
                      <v-text-field
                          v-model="Podpisant"
                          label="ФИО"
                      ></v-text-field>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                              v-model="DoljnostPodp"
                              label="Должность"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                              v-model="KontEmail"
                              label="Адрес электронной почты"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-textarea
                          v-model="KontPhone"
                          label="Контактные телефоны"
                      ></v-textarea>
                      <v-text-field
                          v-model="BookerFio"
                          label="Бухгалтер"
                      ></v-text-field>
                      <h4>Документы</h4>
                      <a v-show="tsjStampLink != null" :href="tsjStampLink" target="_blank">Скан печати</a>
                      <v-file-input
                          v-model="tsjStamp"
                          accept="image/*"
                          label="Скан печати"
                      ></v-file-input>
                      <a v-show="tsjSignatureLink != null" :href="tsjSignatureLink" target="_blank">Скан подписи</a>
                      <v-file-input
                          v-model="tsjSignature"
                          accept="image/*"
                          label="Скан подписи"
                      ></v-file-input>
                    </v-col>
                  </v-row>

                </v-tab-item>
                <v-tab-item>
                  <v-row>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                          v-model="NameNalog"
                          label="Наименование регистрирующего органа"
                      ></v-text-field>
                      <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          class="mx-auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                              v-model="DateOGRN"
                              persistent-hint
                              v-bind="attrs"
                              label="Дата регистрации"
                              @blur="date = parseDate(DateOGRN)"
                              v-on="on"
                              :dense="true"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @change="changeDate" no-title @input="menu1 = false"></v-date-picker>
                      </v-menu>
                      <v-text-field
                          v-model="KodIFNS"
                          label="Код ИФНС"
                      ></v-text-field>
                      <v-text-field
                          v-model="RegNumPFR"
                          label="Регистрационный номер в ПФР"
                      ></v-text-field>

                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                          v-model="SvPostUch"
                          label="Серия и номер свидетельства о постановке на учёт"
                      ></v-text-field>
                      <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          class="mx-auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                              v-model="DateSvPostUch"
                              persistent-hint
                              v-bind="attrs"
                              label="Дата выдачи"
                              @blur="dateSv = parseDate(DateSvPostUch)"
                              v-on="on"
                              :dense="true"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="dateSv" @change="changeDate" no-title @input="menu2 = false"></v-date-picker>
                      </v-menu>
                      <v-text-field
                          v-model="OKATO"
                          label="Код ОКАТО"
                      ></v-text-field>
                      <v-text-field
                          v-model="RegNumFSS"
                          label="Регистрационный номер в ФСС"
                      ></v-text-field>
                    </v-col>
                    <v-text-field
                        v-model="OKVED"
                        label="Коды статистики"
                    ></v-text-field>

                  </v-row>
                </v-tab-item>
                <v-tab-item>
                  <!--
                  <div v-show="TypeOrg=='0'">
                    <h4>Реквизиты карты</h4>
                    <v-text-field
                        v-model="BicBank"
                        label="Банк"
                    ></v-text-field>
                    <v-row>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            v-model="NumSchet"
                            label="Номер счета"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            v-model="NumKard"
                            label="Номер карты"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                  -->
                  <h4>Расчётный счёт</h4>
                  <v-radio-group
                      v-model="IsUserSchetSystem"
                      row
                  >
                    <v-radio
                        label="Сервиса"
                        value="1"
                    ></v-radio>
                    <v-radio
                        label="Свой"
                        value="0"
                        @click="NameUK='';Inn='';RSNum='';ShtrihPrfx='';"
                    ></v-radio>
                    <v-radio
                        label="РИЦ"
                        value="2"
                        @click="NameUK='МЕТРЫ';Inn='4345455550';RSNum='40702810400009102261';ShtrihPrfx='15809';"
                    ></v-radio>
                  </v-radio-group>

                  <div v-show="IsUserSchetSystem == 2">
                    <v-row>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            v-model="NameUK"
                            label="Наименование"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            v-model="Inn"
                            label="ИНН"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-show="IsUserSchetSystem == 0 || IsUserSchetSystem == 2">
                    <v-text-field
                        v-model="RSSityBank"
                        label="Банк *"
                    ></v-text-field>
                    <v-row>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            v-model="RSNum"
                            label="Расчетный счет в банке"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6" sm="6">
                        <v-text-field
                            v-model="ShtrihPrfx"
                            label="Префикс штрихкода"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>

                </v-tab-item>
                <v-tab-item>
                  <v-row>
                    <v-col cols="12" md="6" sm="6">
                      <h4>Юридический адрес</h4>
                      <v-text-field
                          v-model="AdresIndex"
                          label="Почтовый индекс"
                      ></v-text-field>
                      <v-text-field
                          v-model="AdresRegion"
                          label="Регион"
                      ></v-text-field>
                      <v-text-field
                          v-model="AdresRaion"
                          label="Район"
                      ></v-text-field>
                      <v-text-field
                          v-model="AdresCity"
                          label="Населённый пункт"
                      ></v-text-field>
                      <v-text-field
                          v-model="AdresStreet"
                          label="Улица"
                      ></v-text-field>
                      <v-text-field
                          v-model="AdresHome"
                          label="Дом"
                      ></v-text-field>
                      <h4>Почтовый адрес. Соответсвует юридическому адресу</h4>
                      <v-text-field
                          v-model="PostAddr"
                          label="Адрес"
                      ></v-text-field>
                      <h4>Тарифы сервиса</h4>
                      <v-text-field
                          v-model="TarifUpravlen"
                          label="За пользование сервиса, руб."
                      ></v-text-field>
                      <p>Тип тарифа*</p>
                      <v-radio-group
                          v-model="TypeTarifUpr"
                          row
                      >
                        <v-radio
                            label="от площади"
                            value="0"
                        ></v-radio>
                        <v-radio
                            label="фиксировано"
                            value="1"
                        ></v-radio>
                      </v-radio-group>
                      <v-text-field
                          v-model="BuhTarif"
                          label="Бухгалтерское сопровождение, руб."
                      ></v-text-field>
                      <v-text-field
                          v-model="UrTarif"
                          label="Юридическое сопровождение, руб"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <h4>Контактная информация</h4>
                      <v-text-field
                          v-model="KontFIO"
                          label="Контактное лицо"
                      ></v-text-field>
                      <v-text-field
                          v-model="DopInfo"
                          label="Дополнительно"
                      ></v-text-field>
                      <h4>Диспетчерская служба</h4>
                      <v-text-field
                          v-model="DispetcherAdres"
                          label="Адрес диспетчерской службы"
                      ></v-text-field>
                      <v-text-field
                          v-model="DispetcherPhone"
                          label="Контактные телефоны"
                      ></v-text-field>
                      <p>Режим работы</p>
                      <b>Понедельник</b>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimePN0"
                              v-model="menuTimePN0"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimPN0"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimPN0"
                                  label="Начало"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimePN0"
                                v-model="RejimPN0"
                                full-width
                                @click:minute="$refs.menuTimePN0.save(RejimPN0)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimePN1"
                              v-model="menuTimePN1"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimPN1"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimPN1"
                                  label="Окончание"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimePN1"
                                v-model="RejimPN1"
                                full-width
                                @click:minute="$refs.menuTimePN1.save(RejimPN1)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <b>Вторник</b>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeVT0"
                              v-model="menuTimeVT0"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimVT0"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimVT0"
                                  label="Начало"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeVT0"
                                v-model="RejimVT0"
                                full-width
                                @click:minute="$refs.menuTimeVT0.save(RejimVT0)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeVT1"
                              v-model="menuTimeVT1"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimVT1"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimVT1"
                                  label="Окончание"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeVT1"
                                v-model="RejimVT1"
                                full-width
                                @click:minute="$refs.menuTimeVT1.save(RejimVT1)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <b>Среда</b>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeSR0"
                              v-model="menuTimeSR0"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimSR0"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimSR0"
                                  label="Начало"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeSR0"
                                v-model="RejimSR0"
                                full-width
                                @click:minute="$refs.menuTimeSR0.save(RejimSR0)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeSR1"
                              v-model="menuTimeSR1"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimSR1"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimSR1"
                                  label="Окончание"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeSR1"
                                v-model="RejimSR1"
                                full-width
                                @click:minute="$refs.menuTimeSR1.save(RejimSR1)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <b>Четверг</b>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeCHT0"
                              v-model="menuTimeCHT0"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimCHT0"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimCHT0"
                                  label="Начало"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeCHT0"
                                v-model="RejimCHT0"
                                full-width
                                @click:minute="$refs.menuTimeCHT0.save(RejimCHT0)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeCHT1"
                              v-model="menuTimeCHT1"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimCHT1"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimCHT1"
                                  label="Окончание"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeCHT1"
                                v-model="RejimCHT1"
                                full-width
                                @click:minute="$refs.menuTimeCHT1.save(RejimCHT1)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <b>Пятница</b>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimePT0"
                              v-model="menuTimePT0"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimPT0"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimPT0"
                                  label="Начало"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimePT0"
                                v-model="RejimPT0"
                                full-width
                                @click:minute="$refs.menuTimePT0.save(RejimPT0)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimePT1"
                              v-model="menuTimePT1"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimPT1"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimPT1"
                                  label="Окончание"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimePT1"
                                v-model="RejimPT1"
                                full-width
                                @click:minute="$refs.menuTimePT1.save(RejimPT1)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <b>Суббота</b>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeSB0"
                              v-model="menuTimeSB0"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimSB0"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimSB0"
                                  label="Начало"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeSB0"
                                v-model="RejimSB0"
                                full-width
                                @click:minute="$refs.menuTimeSB0.save(RejimSB0)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeSB1"
                              v-model="menuTimeSB1"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimSB1"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimSB1"
                                  label="Окончание"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeSB1"
                                v-model="RejimSB1"
                                full-width
                                @click:minute="$refs.menuTimeSB1.save(RejimSB1)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <b>Воскресенье</b>
                      <v-row>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeVS0"
                              v-model="menuTimeVS0"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimVS0"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimVS0"
                                  label="Начало"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeVS0"
                                v-model="RejimVS0"
                                full-width
                                @click:minute="$refs.menuTimeVS0.save(RejimVS0)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-menu
                              ref="menuTimeVS1"
                              v-model="menuTimeVS1"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="RejimVS1"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="RejimVS1"
                                  label="Окончание"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="menuTimeVS1"
                                v-model="RejimVS1"
                                full-width
                                @click:minute="$refs.menuTimeVS1.save(RejimVS1)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                      </v-row>



                    </v-col>
                  </v-row>
                </v-tab-item>
                <!--
                <v-tab-item>
                  <v-row>
                    <v-col cols="12" md="6" sm="6">

                      <v-text-field
                          v-model="LicenceNum"
                          label="Номер лицензии"
                      ></v-text-field>

                      <v-menu
                          ref="menu3"
                          v-model="menu3"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          class="mx-auto"
                      >
                        <template #activator="{ on, attrs }">
                          <v-text-field
                              v-model="LicenceDate"
                              persistent-hint
                              v-bind="attrs"
                              label="Дата получения лицензии"
                              @blur="dateLC = parseDate(LicenceDate)"
                              v-on="on"
                              :dense="true"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="dateLC" @change="changeDate" no-title @input="menu3 = false"></v-date-picker>
                      </v-menu>

                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-text-field
                          v-model="LicenceVydan"
                          label="Орган, выдавший лицензию"
                      ></v-text-field>
                      <v-file-input
                          v-model="LicenceFile"
                          accept="image/*"
                          label="Скан печати"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-tab-item>
                -->
                <v-tab-item>
                  <v-btn color="primary" class="mb-4" @click="onClickUserAdd">Добавить сотрудника</v-btn>
                  <template>
                    <v-data-table
                        :headers="userHeader"
                        :items="users"
                        class="elevation-1"
                        @click:row="onClickUser"
                    >
                    </v-data-table>
                  </template>
                </v-tab-item>
              </v-tabs-items>
          </v-card-text>

        </v-card>
      </v-dialog>
      <v-dialog
          v-model="dialogSucces"
          max-width="500"
      >
        <v-card>
          <v-card-title class="text-h5 text-md-center">
            {{dialogSuccesText}}
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="dialogAddUser"
          max-width="600"
      >

        <v-card>
          <v-card-title class="text-h5">
            {{nameDialogUser}}
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="dialogAddUser = false"
            >
              <v-icon color="primary">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="Surname"
                label="Фамилия"
            ></v-text-field>
            <v-text-field
                v-model="UserName"
                label="Имя"
            ></v-text-field>
            <v-text-field
                v-model="Otchestvo"
                label="Отчество"
            ></v-text-field>
            <v-text-field
                v-model="UserEmail"
                label="E-mail*"
                required
            ></v-text-field>
            <v-text-field
                v-model="Phone"
                label="Телефон"
            ></v-text-field>
            <v-select
                v-model="UkPdrazdelen"
                :items="PdrazdelenItems"
                label="Отдел"
            ></v-select>
            <v-select
                v-model="IsPredsedatel"
                :items="IsPredsedatelItems"
                label="Должность"
            ></v-select>
            <v-checkbox
                v-show="idUser>0"
                v-model="password"
                label="Изменить пароль"
            ></v-checkbox>
            <div v-show="password">
              <div class="genPassword" @click="genPassword(11)">Сгенерировать пароль</div>
              <v-text-field
                  v-model="UserPassword"
                  label="Пароль*"
              ></v-text-field>
              <v-text-field
                  v-model="UserConfirmPassword"
                  label="Подтверждение пароля*"
              ></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="addUser"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>

    export default {
        name: "organization",
        mounted() {
          this.$store.dispatch('GET_TSG_LIST', {}).then(() => {
            this.loading = false;
          }).catch(err => {
            console.warn(err);
          });
        },
        data() {
            return {
              loading: true,
              dialogAddOrg: false,
              dialogSucces: false,
              dialogAddUser: false,
              dialogSuccesText: '',
              nameDialog:'',
              nameDialogUser:'',
              headers: [
                {
                  text: 'НАИМЕНОВАНИЕ',
                  align: 'start',
                  value: 'Name',
                },
                { text: 'КОНТАКТНОЕ ЛИЦО', value: 'Podpisant' },
                { text: 'КОНТАКТЫ', value: 'contacts' },

              ],
              userHeader: [
                { text: 'СОТРУДНИК', value: 'Surname' },
                { text: 'ЭЛЕКТРОННАЯ ПОЧТА', value: 'UserEmail' },
                { text: 'ТЕЛЕФОН', value: 'Phone' },
                { text: 'ДОЛЖНОСТЬ', value: 'IsPredsedatel' },
                { text: 'ПОСЛЕДНИЙ ВХОД', value: 'DateLastLogin' },
              ],
              users:[],
              tab: null,
              IdTsj:0,
              Name:'',
              UrLico:'',
              KodOKOPF:'',
              forma:[
                {
                  text: 'Публичные акционерные общества',
                  value: 12247,
                },
                {
                  text: 'Непубличные акционерные общества',
                  value: 12267,
                },
                {
                  text: 'Общества с ограниченной ответственностью',
                  value: 12300,
                },
                {
                  text: 'Товарищества собственников жилья',
                  value: 20716,
                },
              ],
              InnTsj:'',
              KppTsj:'',
              TypeOrg:'',
              OGRN:'',
              DoliaSub:'',
              DoliaMun:'',
              Site:'',
              Podpisant:'',
              DoljnostPodp:'',
              KontEmail:'',
              KontPhone:'',
              BookerFio:'',
              tsjSignature:[],
              tsjStamp:[],
              tsjSignatureLink:'',
              tsjStampLink:'',
              NameNalog:'',
              SvPostUch:'',
              menu1: false,
              DateOGRN: '',
              date: '',
              menu2: false,
              DateSvPostUch: '',
              dateSv: '',
              KodIFNS: '',
              OKATO: '',
              RegNumPFR: '',
              RegNumFSS: '',
              OKVED: '',
              /*BicBank: '',
              NumSchet: '',
              NumKard: '',*/
              IsUserSchetSystem: '0',
              RSSityBank: '',
              RSNum: '',
              ShtrihPrfx: '',
              NameUK: '',
              Inn: '',
              AdresIndex: '',
              AdresRegion: '',
              AdresRaion: '',
              AdresCity: '',
              AdresStreet: '',
              AdresHome: '',
              PostAddr: '',
              TarifUpravlen: '0',
              TypeTarifUpr: '0',
              BuhTarif: '0',
              UrTarif: '0',
              KontFIO: '',
              DopInfo: '',
              DispetcherAdres: '',
              DispetcherPhone: '',
              menuTimePN0: false,
              RejimPN0:'',
              menuTimePN1: false,
              RejimPN1:'',
              menuTimeVT0: false,
              RejimVT0:'',
              menuTimeVT1: false,
              RejimVT1:'',
              menuTimeSR0: false,
              RejimSR0:'',
              menuTimeSR1: false,
              RejimSR1:'',
              menuTimeCHT0: false,
              RejimCHT0:'',
              menuTimeCHT1: false,
              RejimCHT1:'',
              menuTimePT0: false,
              RejimPT0:'',
              menuTimePT1: false,
              RejimPT1:'',
              menuTimeSB0: false,
              RejimSB0:'',
              menuTimeSB1: false,
              RejimSB1:'',
              menuTimeVS0: false,
              RejimVS0:'',
              menuTimeVS1: false,
              RejimVS1:'',
              LicenceNum:'',
              menu3: false,
              LicenceDate: '',
              dateLC: '',
              LicenceVydan: '',
              LicenceFile: [],
              idUser: '',
              Surname: '',
              UserName: '',
              Otchestvo: '',
              UserEmail: '',
              Phone: '',
              UkPdrazdelen: '',
              PdrazdelenItems: [],
              IsPredsedatel: '',
              IsPredsedatelItems: [],
              UserPassword: '',
              UserConfirmPassword: '',
              password:false,
            }
        },
        computed: {
          org() {
            return this.$store.getters.TSG_LIST ? this.$store.getters.TSG_LIST.data : [];
          },
        },
        methods: {
          onClickOrg(item) {
            this.$store.dispatch('GET_TSG', {
              id:item.IdTsj,
            }).then(response => {
              if(response.status==1){
                this.IdTsj = item.IdTsj;
                this.users = response.users;
                this.Name = response.data.Name;
                this.UrLico = response.data.UrLico;
                this.KodOKOPF = response.data.KodOKOPF;
                this.InnTsj = response.data.InnTsj;
                this.KppTsj = response.data.KppTsj;
                this.TypeOrg = String(response.data.TypeOrg);
                this.OGRN = response.data.OGRN;
                this.DoliaSub = response.data.DoliaSub;
                this.DoliaMun = response.data.DoliaMun;
                this.Site = response.data.Site;
                this.Podpisant = response.data.Podpisant;
                this.DoljnostPodp = response.data.DoljnostPodp;
                this.KontEmail = response.data.KontEmail;
                this.KontPhone = response.data.KontPhone;
                this.BookerFio = response.data.BookerFio;
                this.tsjSignatureLink = response.tsjSignatureLink;
                this.tsjStampLink = response.tsjStampLink;
                this.NameNalog = response.data.NameNalog;
                this.SvPostUch = response.data.SvPostUch;
                this.DateOGRN = response.data.DateOGRN;
                this.DateSvPostUch = response.data.DateSvPostUch;
                this.KodIFNS = response.data.KodIFNS;
                this.OKATO = response.data.OKATO;
                this.RegNumPFR = response.data.RegNumPFR;
                this.RegNumFSS = response.data.RegNumFSS;
                this.OKVED = response.data.OKVED;
               /* this.BicBank = response.data.BicBank;
                this.NumSchet = response.data.NumSchet;
                this.NumKard = response.data.NumKard;*/
                this.IsUserSchetSystem = String(response.data.IsUserSchetSystem);
                this.RSSityBank = response.data.RSSityBank;
                this.RSNum = response.data.RSNum;
                this.ShtrihPrfx = response.data.ShtrihPrfx;
                this.NameUK = response.data.NameUK;
                this.Inn = response.data.Inn;
                this.AdresIndex = response.data.AdresIndex;
                this.AdresRegion = response.data.AdresRegion;
                this.AdresRaion = response.data.AdresRaion;
                this.AdresCity = response.data.AdresCity;
                this.AdresStreet = response.data.AdresStreet;
                this.AdresHome = response.data.AdresHome;
                this.PostAddr = response.data.PostAddr;
                this.TarifUpravlen = response.data.TarifUpravlen;
                this.TypeTarifUpr = String(response.data.TypeTarifUpr);
                this.BuhTarif = response.data.BuhTarif;
                this.UrTarif = response.data.UrTarif;
                this.KontFIO = response.data.KontFIO;
                this.DopInfo = response.data.DopInfo;
                this.DispetcherAdres = response.data.DispetcherAdres;
                this.DispetcherPhone = response.data.DispetcherPhone;
                this.RejimPN0 = response.Rejim[0][0];
                this.RejimPN1 = response.Rejim[0][1];
                this.RejimVT0 = response.Rejim[1][0];
                this.RejimVT1 = response.Rejim[1][1];
                this.RejimSR0 = response.Rejim[2][0];
                this.RejimSR1 = response.Rejim[2][1];
                this.RejimCHT0 = response.Rejim[3][0];
                this.RejimCHT1 = response.Rejim[3][1];
                this.RejimPT0 = response.Rejim[4][0];
                this.RejimPT1 = response.Rejim[4][1];
                this.RejimSB0 = response.Rejim[5][0];
                this.RejimSB1 = response.Rejim[5][1];
                this.RejimVS0 = response.Rejim[6][0];
                this.RejimVS1 = response.Rejim[6][1];
                this.LicenceNum = response.data.LicenceNum;
                this.LicenceDate = response.data.LicenceDate;
                this.LicenceVydan = response.data.LicenceVydan;
                this.LicenceFile = response.data.LicenceFile;

                this.nameDialog = 'Изменить данные организации';
                this.dialogAddOrg = true;
              }

            }).catch(err => {
              console.warn(err);
            });

          },
          onClickOrgAdd() {
            this.IdTsj = 0;
            this.Name = '';
            this.UrLico = '';
            this.KodOKOPF = '';
            this.InnTsj = '';
            this.KppTsj = '';
            this.TypeOrg = '';
            this.OGRN = '';
            this.DoliaSub = '';
            this.DoliaMun = '';
            this.Site = '';
            this.Podpisant = '';
            this.DoljnostPodp = '';
            this.KontEmail = '';
            this.KontPhone = '';
            this.BookerFio = '';
            this.tsjSignature = [];
            this.tsjStamp = [];
            this.NameNalog = '';
            this.SvPostUch = '';
            this.DateOGRN = '';
            this.DateSvPostUch = '';
            this.dateSv = '';
            this.KodIFNS = '';
            this.OKATO = '';
            this.RegNumPFR = '';
            this.RegNumFSS = '';
            this.OKVED = '';
            /*this.BicBank = '';
            this.NumSchet = '';
            this.NumKard = '';*/
            this.IsUserSchetSystem = '0';
            this.RSSityBank = '';
            this.RSNum = '';
            this.ShtrihPrfx = '';
            this.NameUK = '';
            this.Inn = '';
            this.AdresIndex = '';
            this.AdresRegion = '';
            this.AdresRaion = '';
            this.AdresCity = '';
            this.AdresStreet = '';
            this.AdresHome = '';
            this.PostAddr = '';
            this.TarifUpravlen = '0';
            this.TypeTarifUpr = '0';
            this.BuhTarif = '0';
            this.UrTarif = '0';
            this.KontFIO = '';
            this.DopInfo = '';
            this.DispetcherAdres = '';
            this.DispetcherPhone = '';
            this.RejimPN0 = '';
            this.RejimPN1 = '';
            this.RejimVT0 = '';
            this.RejimVT1 = '';
            this.RejimSR0 = '';
            this.RejimSR1 = '';
            this.RejimCHT0 = '';
            this.RejimCHT1 = '';
            this.RejimPT0 = '';
            this.RejimPT1 = '';
            this.RejimSB0 = '';
            this.RejimSB1 = '';
            this.RejimVS0 = '';
            this.RejimVS1 = '';
            this.LicenceNum = '';
            this.LicenceDate = '';
            this.LicenceVydan = '';
            this.LicenceFile = [];
            this.users = [];
            this.tsjSignatureLink = null;
            this.tsjStampLink = null;
            this.nameDialog = 'Добавить организацию';
            this.dialogAddOrg = true;
          },

          addOrganization(){
            this.$store.dispatch('TSG_ADD', {
              IdTsj:this.IdTsj,
              Name:this.Name,
              UrLico:this.UrLico,
              KodOKOPF:this.KodOKOPF,
              InnTsj:this.InnTsj,
              KppTsj:this.KppTsj,
              TypeOrg:this.TypeOrg,
              OGRN:this.OGRN,
              DoliaSub:this.DoliaSub,
              DoliaMun:this.DoliaMun,
              Site:this.Site,
              Podpisant:this.Podpisant,
              DoljnostPodp:this.DoljnostPodp,
              KontEmail:this.KontEmail,
              KontPhone:this.KontPhone,
              BookerFio:this.BookerFio,
              tsjSignature:this.tsjSignature,
              tsjStamp:this.tsjStamp,
              NameNalog:this.NameNalog,
              SvPostUch:this.SvPostUch,
              DateOGRN:this.DateOGRN,
              DateSvPostUch:this.DateSvPostUch,
              KodIFNS:this.KodIFNS,
              OKATO:this.OKATO,
              RegNumPFR:this.RegNumPFR,
              RegNumFSS:this.RegNumFSS,
              OKVED:this.OKVED,
             /* BicBank:this.BicBank,
              NumSchet:this.NumSchet,
              NumKard:this.NumKard,*/
              IsUserSchetSystem:this.IsUserSchetSystem,
              RSSityBank:this.RSSityBank,
              RSNum:this.RSNum,
              ShtrihPrfx:this.ShtrihPrfx,
              NameUK:this.NameUK,
              Inn:this.Inn,
              AdresIndex:this.AdresIndex,
              AdresRegion:this.AdresRegion,
              AdresRaion:this.AdresRaion,
              AdresCity:this.AdresCity,
              AdresStreet:this.AdresStreet,
              AdresHome:this.AdresHome,
              PostAddr:this.PostAddr,
              TarifUpravlen:this.TarifUpravlen,
              TypeTarifUpr:this.TypeTarifUpr,
              BuhTarif:this.BuhTarif,
              UrTarif:this.UrTarif,
              KontFIO:this.KontFIO,
              DopInfo:this.DopInfo,
              DispetcherAdres:this.DispetcherAdres,
              DispetcherPhone:this.DispetcherPhone,
              RejimPN0:this.RejimPN0,
              RejimPN1:this.RejimPN1,
              RejimVT0:this.RejimVT0,
              RejimVT1:this.RejimVT1,
              RejimSR0:this.RejimSR0,
              RejimSR1:this.RejimSR1,
              RejimCHT0:this.RejimCHT0,
              RejimCHT1:this.RejimCHT1,
              RejimPT0:this.RejimPT0,
              RejimPT1:this.RejimPT1,
              RejimSB0:this.RejimSB0,
              RejimSB1:this.RejimSB1,
              RejimVS0:this.RejimVS0,
              RejimVS1:this.RejimVS1,
              LicenceNum:this.LicenceNum,
              LicenceDate:this.LicenceDate,
              LicenceVydan:this.LicenceVydan,
              LicenceFile:this.LicenceFile,

            }).then(response => {
              if(response.status==1){
                this.$store.dispatch('GET_TSG_LIST', {}).then(() => {
                  this.loading = false;
                }).catch(err => {
                  console.warn(err);
                });
                this.dialogSuccesText = response.message;
                this.dialogAddOrg = false;
                this.dialogSucces = true;
              }else{
                this.dialogSuccesText = response.message;
                this.dialogSucces = true;
              }
            }).catch(err => {
              console.warn(err);
            });
          },
          onClickUserAdd(){
            this.$store.dispatch('GET_USER', {
              id:0,
            }).then(response => {
              if(response.status==1){
                this.password = true;
                this.idUser = 0;
                this.Surname = '';
                this.UserName = '';
                this.Otchestvo = '';
                this.UserEmail = '';
                this.Phone = '';
                this.UkPdrazdelen = '';
                this.IsPredsedatel = '';
                this.UserPassword = '';
                this.UserConfirmPassword = '';
                this.IsPredsedatelItems = response.IsPredsedatelItems;
                this.PdrazdelenItems = response.PdrazdelenItems;

                this.nameDialogUser = 'Добавить сотрудника';
                this.dialogAddUser = true;
              }

            }).catch(err => {
              console.warn(err);
            });

          },
          onClickUser(item){
            this.$store.dispatch('GET_USER', {
              id:item.ID,
            }).then(response => {
              if(response.status==1){
                this.password = false;
                this.idUser = item.ID;
                this.Surname = response.data.Surname;
                this.UserName = response.data.UserName;
                this.Otchestvo = response.data.Otchestvo;
                this.UserEmail = response.data.UserEmail;
                this.Phone = response.data.Phone;
                this.UkPdrazdelen = response.data.UkPdrazdelen;
                this.IsPredsedatel = response.data.IsPredsedatel;
                this.UserPassword = '';
                this.UserConfirmPassword = '';
                this.IsPredsedatelItems = response.IsPredsedatelItems;
                this.PdrazdelenItems = response.PdrazdelenItems;

                this.nameDialogUser = 'Редактирование сотрудника';
                this.dialogAddUser = true;
              }

            }).catch(err => {
              console.warn(err);
            });

          },
          addUser(){
            this.$store.dispatch('USER_ADD', {
              UKWorker:this.IdTsj,
              ID:this.idUser,
              Surname:this.Surname,
              UserName:this.UserName,
              Otchestvo:this.Otchestvo,
              UserEmail:this.UserEmail,
              Phone:this.Phone,
              UkPdrazdelen:this.UkPdrazdelen,
              IsPredsedatel:this.IsPredsedatel,
              password:this.password,
              UserPassword:this.UserPassword,
              UserConfirmPassword:this.UserConfirmPassword,
            }).then(response => {
              if(response.status==1){
                this.users = response.users;
                this.dialogSuccesText = response.message;
                this.dialogAddUser = false;
                this.dialogSucces = true;
              }else{
                this.dialogSuccesText = response.message;
                this.dialogSucces = true;
              }
            }).catch(err => {
              console.warn(err);
            });
          },
          parseDate (date) {
            if (!date) return null;
            const [day, month, year] = date.split('.');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          },
          changeDate() {
            if(this.date) {
              let date = new Date(this.date);
              let month = date.getMonth() + 1;

              if (month < 10) {
                month = "0" + month;
              }
              let day = date.getDate();
              if (day < 10) {
                day = "0" + day;
              }
              this.DateOGRN = day + '.' + month + '.' + date.getFullYear();
            }
            if(this.dateSv) {
              let date = new Date(this.dateSv);
              let month = date.getMonth() + 1;

              if (month < 10) {
                month = "0" + month;
              }
              let day = date.getDate();
              if (day < 10) {
                day = "0" + day;
              }
              this.DateSvPostUch = day + '.' + month + '.' + date.getFullYear();
            }
            if(this.dateLC) {
              let date = new Date(this.dateLC);
              let month = date.getMonth() + 1;

              if (month < 10) {
                month = "0" + month;
              }
              let day = date.getDate();
              if (day < 10) {
                day = "0" + day;
              }
              this.LicenceDate = day + '.' + month + '.' + date.getFullYear();
            }
          },
          genPassword(len){
            if(len > 10) len = 10;
            len = len * (-1);
            let password = Math.random().toString(36).slice(len);
            this.UserPassword = password;
            this.UserConfirmPassword = password;
          },
        },
        filters: {

        }
    }
</script>

<style scoped>
    .tabcontent {
        padding-top: 60px;
    }
    .orgDialog{
      flex: initial;
    }
    .genPassword{
      padding-bottom: 10px;
      color: #1976d2;
      text-decoration: underline;
      cursor: pointer;
    }

</style>