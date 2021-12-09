<template>
  <div class="tabcontent">
    <template>
      <v-tabs>
        <v-tab>Cведения</v-tab>
        <v-tab>Документ</v-tab>
        <v-tab>Регистрация</v-tab>
        <v-tab>Льготы</v-tab>

        <v-tab-item>
          <v-row>
            <v-col cols="4" >
              <v-select
                  :items="HouseItem"
                  v-model="IdHouse"
                  label="Объект"
                  @input="changeFilterHouse"
                  dense
              ></v-select>
              <v-select
                  :items="FlatItem"
                  v-model="IdFlat"
                  label="Помещение"
                  @input="changeFilterFlat"
                  dense
              ></v-select>
              <v-select
                  :items="IdLsItem"
                  v-model="IdLs"
                  label="Лицевой счёт"
                  dense
              ></v-select>
              <v-text-field
                  v-model="SNILS"
                  label="СНИЛС"
              ></v-text-field>
              <v-radio-group
                  v-model="IsVoennoobizannyii"
                  label="Военнообязанный"
                  row
                  mandatory
              >
                <v-radio
                    label="да"
                    value="1"
                ></v-radio>
                <v-radio
                    label="нет"
                    value="0"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="4" >
              <v-text-field
                  v-model="Surname"
                  label="Фамилия*"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="Name"
                  label="Имя*"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="Patronymic"
                  label="Отчество"
              ></v-text-field>
              <v-text-field
                  v-model="Grajdanstvo"
                  label="Гражданство"
              ></v-text-field>
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  class="mx-auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                      v-model="DateRojden"
                      persistent-hint
                      v-bind="attrs"
                      label="Дата рождения"
                      @blur="dateStart = parseDate(DateRojden)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateStart" @change="changeDate" no-title @input="menu = false"></v-date-picker>
              </v-menu>
              <v-radio-group
                  v-model="Pol"
                  label="Пол"
                  row
                  mandatory
              >
                <v-radio
                    label="муж"
                    value="0"
                ></v-radio>
                <v-radio
                    label="жен"
                    value="1"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="4" >
              <h4>Место рождения</h4>
              <v-text-field
                  v-model="regionRogden"
                  label="Регион"
              ></v-text-field>
              <v-text-field
                  v-model="gorodRogden"
                  label="Населенный пункт"
              ></v-text-field>
              <h4>Контакты</h4>
              <v-text-field
                  v-model="ContactPhone"
                  label="Телефон"
              ></v-text-field>
              <v-text-field
                  v-model="ContactEmail"
                  label="Электронная почта"
              ></v-text-field>

              <v-select
                  :items="TypeItem"
                  v-model="Type"
                  label="Родственное отношение к собственнику"
                  dense
              ></v-select>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
          <v-col cols="4" >
            <v-select
                :items="PaspVidItem"
                v-model="PaspVid"
                label="Документ подтверждающий личность"
                dense
            ></v-select>
            <v-text-field
                v-model="PaspSer"
                label="Серия"
            ></v-text-field>
          </v-col>
          <v-col cols="4" >
            <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                class="mx-auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                    v-model="PaspDataVyd"
                    persistent-hint
                    v-bind="attrs"
                    label="Дата рождения"
                    @blur="dateVyd = parseDate(PaspDataVyd)"
                    v-on="on"
                    :dense="true"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dateVyd" @change="changeDate" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
            <v-text-field
                v-model="PaspNum"
                label="Номер"
            ></v-text-field>
          </v-col>
          <v-col cols="4" >
            <v-text-field
                v-model="PaspKemVyd"
                label="Кем и где выдан"
            ></v-text-field>
            <v-text-field
                v-model="PaspKod"
                label="Код"
            ></v-text-field>
          </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col cols="12">
              <v-radio-group
                  v-model="IsSobstvennik"
                  row
                  mandatory
              >
                <v-radio
                    label="Собственник"
                    value="1"
                ></v-radio>
                <v-radio
                    label="Наниматель"
                    value="2"
                ></v-radio>
                <v-radio
                    label="Совместное проживание"
                    value="0"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-show="IsSobstvennik == 1">
            <v-col cols="4">
              <v-text-field
                  v-model="SobstvennostPc"
                  label="Доля %"
              ></v-text-field>
              <v-checkbox
                  v-model="IsChlenTsj"
                  label="Член ТСЖ"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-text-field
                  v-model="SvidetONaime"
                  label="ЕГРН"
              ></v-text-field>
              <v-checkbox
                  v-model="SobsToKvit"
                  label="Ответственный плательщик"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-menu
                  ref="menu"
                  v-model="menu3"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  class="mx-auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                      v-model="DateVydSobsDoc"
                      persistent-hint
                      v-bind="attrs"
                      label="Дата рождения"
                      @blur="dateVydSobs = parseDate(DateVydSobsDoc)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateVydSobs" @change="changeDate" no-title @input="menu3 = false"></v-date-picker>
              </v-menu>
              <v-text-field
                  v-model="KemVydanSobsDoc"
                  label="Кем выдан документ на право собственности/ проживания"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-show="IsSobstvennik == 2">
            <v-col cols="4">
              <v-select
                  :items="TypeSobsDocItem"
                  v-model="TypeSobsDoc"
                  label="Договор - основание для вселения"
                  dense
              ></v-select>
            </v-col>
          </v-row>

          <h4>Адрес откуда прибыл</h4>
          <v-row>
            <v-col cols="4">
              <v-menu
                  ref="menu"
                  v-model="menu4"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  class="mx-auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                      v-model="DateRegister"
                      persistent-hint
                      v-bind="attrs"
                      label="Дата регистрации"
                      @blur="dateRegister = parseDate(DateRegister)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateRegister" @change="changeDate" no-title @input="menu4 = false"></v-date-picker>
              </v-menu>
              <v-text-field
                  v-model="OtkudaRegion"
                  label="Регион"
              ></v-text-field>
              <v-text-field
                  v-model="OtkudaDom"
                  label="Дом"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-menu
                  ref="menu"
                  v-model="menu5"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  class="mx-auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                      v-model="DataUbytiaSoStarogoAdresa"
                      persistent-hint
                      v-bind="attrs"
                      label="Дата регистрации"
                      @blur="dateUbytia = parseDate(DataUbytiaSoStarogoAdresa)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateUbytia" @change="changeDate" no-title @input="menu5 = false"></v-date-picker>
              </v-menu>
              <v-text-field
                  v-model="OtkudaGorod"
                  label="Населенный пункт"
              ></v-text-field>
              <v-text-field
                  v-model="OtkudaKv"
                  label="Квартира"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                  v-model="PrichPropis"
                  label="Причина регистрации"
              ></v-text-field>
              <v-text-field
                  v-model="OtkudaUlica"
                  label="Улица"
              ></v-text-field>
            </v-col>
          </v-row>

          <h4>Адрес куда выбыл</h4>
          <v-row>
            <v-col cols="4">
              <v-menu
                  ref="menu"
                  v-model="menu6"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  class="mx-auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                      v-model="DateVipisan"
                      persistent-hint
                      v-bind="attrs"
                      label="Дата регистрации"
                      @blur="dateVipisan = parseDate(DateVipisan)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateVipisan" @change="changeDate" no-title @input="menu6 = false"></v-date-picker>
              </v-menu>
              <v-text-field
                  v-model="KydaGorod"
                  label="Населенный пункт"
              ></v-text-field>
              <v-text-field
                  v-model="KydaKv"
                  label="Квартира"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                  v-model="PrichVypis"
                  label="Причина снятия с регистрации"
              ></v-text-field>
              <v-text-field
                  v-model="KydaUlica"
                  label="Улица"
              ></v-text-field>

            </v-col>
            <v-col cols="4">
              <v-text-field
                  v-model="KydaRegion"
                  label="Регион"
              ></v-text-field>
              <v-text-field
                  v-model="KydaDom"
                  label="Дом"
              ></v-text-field>
            </v-col>
          </v-row>

          <h4>Статус</h4>
          <v-row>
            <v-col cols="6">
              <v-radio-group
                  v-model="Projivaet"
                  row
                  mandatory
              >
                <v-radio
                    label="Проживает"
                    value="1"
                ></v-radio>
                <v-radio
                    label="Временно отсутствует"
                    value="2"
                ></v-radio>
                <v-radio
                    label="Не проживает"
                    value="0"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col cols="4">
              <v-select
                  :items="IdLgotaTypeItem"
                  v-model="IdLgotaType"
                  label="Вид льготы"
                  dense
              ></v-select>
              <v-textarea
                  v-model="Komment"
                  label="Комментарий"
              ></v-textarea>
            </v-col>
            <v-col cols="4">
              <v-text-field
                  v-model="NomerSpravki"
                  label="Номер"
              ></v-text-field>
              <v-menu
                  ref="menu"
                  v-model="menu7"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  class="mx-auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                      v-model="DateFrom"
                      persistent-hint
                      v-bind="attrs"
                      label="Дата начала"
                      @blur="dateFrom = parseDate(DateFrom)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateFrom" @change="changeDate" no-title @input="menu7 = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-text-field
                  v-model="SeriaSpravki"
                  label="Серия"
              ></v-text-field>
              <v-menu
                  ref="menu"
                  v-model="menu8"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  class="mx-auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                      v-model="DateDeleted"
                      persistent-hint
                      v-bind="attrs"
                      label="Срок действия"
                      @blur="dateDeleted = parseDate(DateDeleted)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateDeleted" @change="changeDate" no-title @input="menu8 = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </template>
    <v-btn
        color="primary"
        @click="addResident"
    >
      Сохранить
    </v-btn>
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
  </div>
</template>

<script>
export default {
  name: "ResidentAdd",
  props: ['id'],
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
      this.tsg = response.data;
    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_OBJECT_LIST', {IdTsj: 0, IsDeleted: 0}).then(response => {
      this.object = response.data;
    }).catch(err => {
      console.warn(err);
    });


      this.$store.dispatch('GET_RESIDENT', {
        id: this.$props.id,
      }).then(response => {
        if (response.status == 1) {
          if (response.data.IdResid > 0) {
            this.IdResid = response.data.IdResid;
            this.IdFlat = response.data.IdFlat;
            this.IdHouse = response.IdHouse;
            this.IdLs = response.data.IdLs;
            this.SNILS = response.data.SNILS;
            this.IsVoennoobizannyii = response.data.IsVoennoobizannyii;
            this.Surname = response.data.Surname;
            this.Name = response.data.Name;
            this.Patronymic = response.data.Patronymic;
            this.Grajdanstvo = response.data.Grajdanstvo;
            this.DateRojden = response.data.DateRojden;
            this.Pol = response.data.Pol;
            if(response.data.MestoRojden!=''){
              let Rogden = response.data.MestoRojden.split('|');
              this.regionRogden = Rogden[1];
              this.gorodRogden = Rogden[3];
            }
            this.ContactPhone = response.data.ContactPhone;
            this.ContactEmail = response.data.ContactEmail;
            this.IsSobstvennik = response.data.IsSobstvennik;
            this.Type = response.data.Type;
            this.PaspVid = response.data.PaspVid;
            this.PaspSer = response.data.PaspSer;
            this.PaspDataVyd = response.data.PaspDataVyd;
            this.PaspNum = response.data.PaspNum;
            this.PaspKemVyd = response.data.PaspKemVyd;
            this.PaspKod = response.data.PaspKod;
            this.SobstvennostPc = response.data.SobstvennostPc;
            this.IsChlenTsj = response.data.IsChlenTsj==1?true:false;
            this.SvidetONaime = response.data.SvidetONaime;
            this.SobsToKvit = response.data.SobsToKvit==1?true:false;
            this.DateVydSobsDoc = response.data.DateVydSobsDoc;
            this.KemVydanSobsDoc = response.data.KemVydanSobsDoc;
            this.TypeSobsDoc = response.data.TypeSobsDoc;
            this.DateRegister = response.data.DateRegister;
            if(response.data.OtkudaPribylAdres!=''){
              let Otkuda = response.data.OtkudaPribylAdres.split('|');
              this.OtkudaRegion = Otkuda[1];
              this.OtkudaGorod = Otkuda[3];
              this.OtkudaUlica = Otkuda[4];
              this.OtkudaDom = Otkuda[5];
              this.OtkudaKv = Otkuda[6];
            }
            if(response.data.KydaVybyl!=''){
              let Kyda = response.data.KydaVybyl.split('|');
              this.KydaRegion = Kyda[1];
              this.KydaGorod = Kyda[3];
              this.KydaUlica = Kyda[4];
              this.KydaDom = Kyda[5];
              this.KydaKv = Kyda[6];
            }
            this.DataUbytiaSoStarogoAdresa = response.data.DataUbytiaSoStarogoAdresa;
            this.PrichPropis = response.data.PrichPropis;
            this.DateVipisan = response.data.DateVipisan;
            this.PrichVypis = response.data.PrichVypis;
            this.Projivaet = response.data.Projivaet;
            this.IdResLgot = response.lgota.IdResLgot;
            this.IdLgotaType = response.lgota.IdLgotaType;
            this.Komment = response.lgota.Komment;
            this.NomerSpravki = response.lgota.NomerSpravki;
            this.SeriaSpravki = response.lgota.SeriaSpravki;
            this.DateFrom = response.lgota.DateFrom;
            this.DateDeleted = response.lgota.DateDeleted;

            this.IdLsItem = response.IdLsItem;
            this.$store.dispatch('GET_FLAT_LIST', {IdHouse:this.IdHouse}).then(() => {

            }).catch(err => {
              console.warn(err);
            });
            this.loading = false;

          }
          this.TypeItem = response.TypeItem;
          this.PaspVidItem = response.PaspVidItem;
          this.TypeSobsDocItem = response.TypeSobsDocItem;
          this.IdLgotaTypeItem = response.IdLgotaTypeItem;
        }
      }).catch(err => {
        console.warn(err);
      });

  },
  data() {
    return {
      loading: true,
      tsg: [],
      object: [],
      dialogSucces: false,
      dialogSuccesText: '',
      menu: false,
      dateStart: '',
      menu2: false,
      dateVyd: '',
      menu3: false,
      dateVydSobs: '',
      menu4: false,
      dateRegister: '',
      menu5: false,
      dateUbytia: '',
      menu6: false,
      dateVipisan: '',
      menu7: false,
      dateFrom: '',
      menu8: false,
      dateDeleted: '',
      IdHouse: '',
      IdFlat: '',
      IdLs: '',
      IdResid: '',
      SNILS: '',
      IsVoennoobizannyii: '',
      Surname: '',
      Name: '',
      Patronymic: '',
      Grajdanstvo: '',
      DateRojden: '',
      Pol: '',
      regionRogden: '',
      gorodRogden: '',
      ContactPhone: '',
      ContactEmail: '',
      IsSobstvennik: '',
      Type: '',
      PaspVid: '',
      PaspSer: '',
      PaspDataVyd: '',
      PaspNum: '',
      PaspKemVyd: '',
      PaspKod: '',
      SobstvennostPc: '',
      IsChlenTsj: false,
      SvidetONaime: '',
      SobsToKvit: false,
      DateVydSobsDoc: '',
      KemVydanSobsDoc: '',
      TypeSobsDoc: '',
      DateRegister: '',
      OtkudaRegion: '',
      OtkudaDom: '',
      DataUbytiaSoStarogoAdresa: '',
      OtkudaGorod: '',
      OtkudaKv: '',
      PrichPropis: '',
      OtkudaUlica: '',
      DateVipisan: '',
      KydaGorod: '',
      KydaKv: '',
      PrichVypis: '',
      KydaUlica: '',
      KydaRegion: '',
      KydaDom: '',
      Projivaet: '',
      IdResLgot: 0,
      IdLgotaType: '',
      Komment: '',
      NomerSpravki: '',
      SeriaSpravki: '',
      DateFrom: '',
      DateDeleted: '',
      TypeItem: [],
      PaspVidItem: [],
      TypeSobsDocItem: [],
      IdLgotaTypeItem: [],
      IdLsItem:[],
    }
  },
  computed: {
    FlatItem(){
      let ret = [];
      if(this.$store.getters.FLAT_LIST){
        let flat = this.$store.getters.FLAT_LIST.data;
        flat.forEach(item => {
          ret.push({text: item.NumFlat, value: item.IdFlat});
        });
      }
      return ret;
    },
    HouseItem(){
      if (this.object && this.tsg) {
        let ret = [];
        this.tsg.forEach(itemtsg => {
          ret.push({header: itemtsg.Name});
          this.object.forEach(itemobject => {
            if(itemtsg.IdTsj == itemobject.IdTsj){
              ret.push({text: itemobject.adress,value: itemobject.IdHouse});
            }
          });
        });
        return ret;
      }else{
        return [];
      }
    }
  },
  methods: {
    changeFilterHouse(){
      this.IdFlat = '';
      this.IdLs= '',
      this.IdLsItem = [];
      this.$store.dispatch('GET_FLAT_LIST', {IdHouse:this.IdHouse}).then(() => {
      }).catch(err => {
        console.warn(err);
      });

    },
    changeFilterFlat(){
      this.IdLs= '';
      this.IdLsItem = [];
      this.$store.dispatch('GET_LS_LIST', {IdHouse:this.IdHouse,IdFlat:this.IdFlat}).then(response => {
        let ls = response.data;
        let ret = [];
        ls.forEach(item => {
          ret.push({text: item.LicSchet,value: item.IdLs});
        });
        this.IdLsItem = ret;
      }).catch(err => {
        console.warn(err);
      });
    },
    addResident(){
      this.$store.dispatch('RESIDENT_ADD', {

        IdResid:this.IdResid,
        IdFlat:this.IdFlat,
        IdHouse:this.IdHouse,
        IdLs:this.IdLs,
        SNILS:this.SNILS,
        IsVoennoobizannyii:this.IsVoennoobizannyii,
        Surname:this.Surname,
        Name:this.Name,
        Patronymic:this.Patronymic,
        Grajdanstvo:this.Grajdanstvo,
        DateRojden:this.DateRojden,
        Pol:this.Pol,
        MestoRojden:'Россия|'+this.regionRogden+'||'+this.gorodRogden,
        ContactPhone:this.ContactPhone,
        ContactEmail:this.ContactEmail,
        IsSobstvennik:this.IsSobstvennik,
        Type:this.Type,
        PaspVid:this.PaspVid,
        PaspSer:this.PaspSer,
        PaspDataVyd:this.PaspDataVyd,
        PaspNum:this.PaspNum,
        PaspKemVyd:this.PaspKemVyd,
        PaspKod:this.PaspKod,
        SobstvennostPc:this.SobstvennostPc,
        IsChlenTsj:this.IsChlenTsj,
        SvidetONaime:this.SvidetONaime,
        SobsToKvit:this.SobsToKvit,
        DateVydSobsDoc:this.DateVydSobsDoc,
        KemVydanSobsDoc:this.KemVydanSobsDoc,
        TypeSobsDoc:this.TypeSobsDoc,
        DateRegister:this.DateRegister,
        OtkudaPribylAdres:'Россия|'+this.OtkudaRegion+'||'+this.OtkudaGorod+'|'+this.OtkudaUlica+'|'+this.OtkudaDom+'|'+this.OtkudaKv,
        KydaVybyl:'Россия|'+this.KydaRegion+'||'+this.KydaGorod+'|'+this.KydaUlica+'|'+this.KydaDom+'|'+this.KydaKv,
        DataUbytiaSoStarogoAdresa:this.DataUbytiaSoStarogoAdresa,
        PrichPropis:this.PrichPropis,
        DateVipisan:this.DateVipisan,
        PrichVypis:this.PrichVypis,
        Projivaet:this.Projivaet,
        IdLgotaType:this.IdLgotaType,
        Komment:this.Komment,
        NomerSpravki:this.NomerSpravki,
        SeriaSpravki:this.SeriaSpravki,
        DateFrom:this.DateFrom,
        DateDeleted:this.DateDeleted,
        IdResLgot:this.IdResLgot,
      }).then(response => {
        if(response.status==1){
          this.dialogSuccesText = response.message;
          this.dialogSucces = true;
        }else{
          this.dialogSuccesText = response.message;
          this.dialogSucces = true;
        }
      }).catch(err => {
        console.warn(err);
      });
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split('.');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    changeDate() {
      let date;
      if (this.dateStart) {
        date = new Date(this.dateStart);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateRojden = day + '.' + month + '.' + date.getFullYear();
      }
      if (this.dateVyd) {
        date = new Date(this.dateVyd);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.PaspDataVyd= day + '.' + month + '.' + date.getFullYear();
      }
      if (this.dateVydSobs) {
        date = new Date(this.dateVydSobs);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateVydSobsDoc= day + '.' + month + '.' + date.getFullYear();
      }
      if (this.dateRegister) {
        date = new Date(this.dateRegister);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateRegister= day + '.' + month + '.' + date.getFullYear();
      }
      if (this.dateUbytia) {
        date = new Date(this.dateUbytia);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DataUbytiaSoStarogoAdresa= day + '.' + month + '.' + date.getFullYear();
      }
      if (this.dateVipisan) {
        date = new Date(this.dateVipisan);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateVipisan= day + '.' + month + '.' + date.getFullYear();
      }
      if (this.dateFrom) {
        date = new Date(this.dateFrom);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateFrom= day + '.' + month + '.' + date.getFullYear();
      }
      if (this.dateDeleted) {
        date = new Date(this.dateDeleted);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateDeleted= day + '.' + month + '.' + date.getFullYear();
      }
    },
  }

}
</script>

<style scoped>
  .tabcontent {
    padding-top: 60px;
  }
</style>