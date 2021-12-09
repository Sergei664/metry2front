<template>
  <div class="tabcontent">
      <template>
        <v-tabs>
          <v-tab>Квитанции</v-tab>
          <v-tab>Настройки квитанции</v-tab>
          <v-tab>Расчетные площади</v-tab>
          <v-tab>Настройка пеней</v-tab>
          <v-tab>Реквизиты для оплаты</v-tab>

          <v-tab-item>
            <v-row>
              <v-col cols="3" >
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
                        v-model="dateMonth"
                        persistent-hint
                        v-bind="attrs"
                        width="290"
                        label="Расчетный период"
                        v-on="on"
                        :dense="true"
                    ></v-text-field>
                  </template>
                  <v-date-picker width="290" type="month" v-model="dateM" @change="changeDate" no-title @input="menu3 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-radio-group
                    v-model="TypeFl"
                    label="Тип помещения"
                    row
                    mandatory
                >
                  <v-radio
                      label="жилое"
                      value="0"
                      @click="changeFilterLs"
                  ></v-radio>
                  <v-radio
                      label="нежилое"
                      value="1"
                      @click="changeFilterLs"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="3">
                <v-radio-group
                    v-model="IsKapremont"
                    label="Капремонт"
                    row
                    mandatory
                >
                  <v-radio
                      label="нет"
                      value="0"
                      @click="changeFilterLs"
                  ></v-radio>
                  <v-radio
                      label="да"
                      value="1"
                      @click="changeFilterLs"
                  ></v-radio>
                </v-radio-group>
              </v-col>

            </v-row>
            <h4>Выберите лицевые счета для формирования квитанции</h4>
            <v-row>
              <v-col cols="2">
                <a  @click="clickAllLs">Выделить все</a>
              </v-col>
              <v-col cols="2">
                <a @click="clickDeleteLs">Снять выделение</a>
              </v-col>
              <v-col cols="8"></v-col>
              <template v-for="(ls) in lsItem">
                <v-col cols="2" :key="ls.IdLs">
                  <v-checkbox
                      v-model="ls.checked"
                      :label="`${ls.LicSchet}`"
                  ></v-checkbox>
                </v-col>
              </template>
            </v-row>
            <v-btn color="primary" @click="onClickKvitancia">Сформировать квитанции</v-btn>
          </v-tab-item>
          <v-tab-item>

            <v-row>
              <v-col cols="6" >
                <v-select
                    :items="TypeKvitItem"
                    v-model="TypeKvit"
                    label="Тип квитанции*"
                    required
                    dense
                ></v-select>
              </v-col>
            </v-row>
            <h4>Отображать долг в квитанции на </h4>
            <v-row>
              <v-col cols="6" >
                <v-select
                    :items="dayKvitItem"
                    v-model="dayDolg"
                    label="Число"
                    dense
                ></v-select>

              </v-col>
              <v-col cols="6" >
                <v-select
                    :items="monthKvitItem"
                    v-model="monthDolg"
                    dense
                ></v-select>
              </v-col>
            </v-row>
            <h4>Оплатить квитанции до</h4>
            <v-row>
              <v-col cols="6" >
                <v-select
                    :items="dayKvitItem"
                    v-model="dayPay"
                    label="Число"
                    dense
                ></v-select>

              </v-col>
              <v-col cols="6" >
                <v-select
                    :items="monthKvitItem"
                    v-model="monthPay"
                    dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" >
                <v-select
                    :items="TotalPayItem"
                    v-model="TotalPay"
                    label="Отображать в Итого к оплате"
                    dense
                ></v-select>
                <v-checkbox
                    v-model="IsInformation"
                    label="Отображать справочную информацию по дому"
                ></v-checkbox>
                <v-checkbox
                    v-model="IsContact"
                    label="Отображать контактные данные организации"
                ></v-checkbox>

              </v-col>
              <v-col cols="6" >
                <v-checkbox
                    v-model="IsCostHouse"
                    label="Отображать информацию по расходам общедомовых приборов учёта"
                ></v-checkbox>
                <v-checkbox
                    v-model="IsCostIndividual"
                    label="Отображать информацию по расходам индивидуальных приборов учёта"
                ></v-checkbox>
                <v-checkbox
                    v-model="IsIndividualAppliance"
                    label="Отображать бланк с показаниями индивидуальных приборов учёта"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-textarea
                v-model="InformationText"
                label="Примечание в квитанции"
            ></v-textarea>
            <v-btn
                color="primary"
                @click="addKvitancia"
            >
              Сохранить
            </v-btn>
          </v-tab-item>
          <v-tab-item>

            <v-row>
              <v-col cols="6" >
                <v-text-field
                    v-model="PloshGilaya"
                    :label="`Площадь жилых помещений (Актуальная ${house.PloshGilaya} м2)`"
                    suffix="м2"
                ></v-text-field>
                <v-text-field
                    v-model="PloshObsh"
                    :label="`Площадь всех помещений (Актуальная ${house.PloshObsh} м2)`"
                    suffix="м2"
                ></v-text-field>
                <v-text-field
                    v-model="PloshRaschOtopl"
                    label="Площадь помещений для расчёта отопления"
                    suffix="м2"
                ></v-text-field>
              </v-col>
              <v-col cols="6" >
                <v-text-field
                    v-model="PloshNeGilaya"
                    :label="`Площадь нежилых помещений (Актуальная ${house.PloshNeGilaya} м2)`"
                    suffix="м2"
                ></v-text-field>
                <v-text-field
                    v-model="PloshObshImush"
                    :label="`Площадь общего имущества (Актуальная ${house.PloshObPolz} м2)`"
                    suffix="м2"
                ></v-text-field>
                <v-text-field
                    v-model="PloshRaschElectro"
                    :label="`Площадь помещений для расчёта электроэнергии на ОДН (Актуальная ${house.PloshObOsvesh} м2)`"
                    suffix="м2"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
                color="primary"
                @click="addKvitancia"
            >
              Сохранить
            </v-btn>
          </v-tab-item>
          <v-tab-item>
            <h4>Начислять пени</h4>
            <v-row>
              <v-col cols="6" >
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
                        v-model="DatePenyOt"
                        persistent-hint
                        v-bind="attrs"
                        label="Дата начала"
                        @blur="datePenyOt = parseDate(DatePenyOt)"
                        v-on="on"
                        :dense="true"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="datePenyOt" @change="changeDate" no-title @input="menu = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" >
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
                        v-model="DatePenyDo"
                        persistent-hint
                        v-bind="attrs"
                        label="Дата окончания"
                        @blur="datePenyDo = parseDate(DatePenyDo)"
                        v-on="on"
                        :dense="true"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="datePenyDo" @change="changeDate" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-btn
                color="primary"
                @click="addKvitancia"
            >
              Сохранить
            </v-btn>
          </v-tab-item>
          <v-tab-item>
            <v-text-field
                v-model="RSSityBank"
                label="Банк *"
            ></v-text-field>
            <v-text-field
                v-model="RSNum"
                label="Расчетный счет в банке"
            ></v-text-field>
            <v-btn
                color="primary"
                @click="addKvitancia"
            >
              Сохранить
            </v-btn>
          </v-tab-item>
        </v-tabs>
      </template>
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
  name: "KvitanciaAdd",
  props: ['id'],
  mounted() {

    this.$store.dispatch('GET_KVITANCIA', {
      id:this.$props.id,
    }).then(response => {
      if(response.status==1){
        if(response.data.IdKvSet>0){
          this.IdKvSet = response.data.IdKvSet;
          this.TypeKvitItem = response.data.TypeKvitItem;
          this.TypeKvit = response.data.TypeKvit;
          this.dayKvitItem = response.data.dayKvitItem;
          this.dayDolg = response.data.dayDolg;
          this.monthKvitItem = response.data.monthKvitItem;
          this.monthDolg = response.data.monthDolg;
          this.dayPay = response.data.dayPay;
          this.monthPay = response.data.monthPay;
          this.TotalPayItem = response.data.TotalPayItem;
          this.TotalPay = response.data.TotalPay;
          this.IsInformation = response.data.IsInformation==1?true:false;
          this.IsContact = response.data.IsContact==1?true:false;
          this.IsCostHouse = response.data.IsCostHouse==1?true:false;
          this.IsCostIndividual = response.data.IsCostIndividual==1?true:false;
          this.IsIndividualAppliance = response.data.IsIndividualAppliance==1?true:false;
          this.InformationText = response.data.InformationText;
          this.PloshGilaya = response.data.PloshGilaya;
          this.PloshObsh = response.data.PloshObsh;
          this.PloshRaschOtopl= response.data.PloshRaschOtopl;
          this.PloshNeGilaya = response.data.PloshNeGilaya;
          this.PloshObshImush = response.data.PloshObshImush;
          this.PloshRaschElectro = response.data.PloshRaschElectro;

          this.DatePenyOt = response.data.DatePenyOt;
          this.DatePenyDo = response.data.DatePenyDo;

          if(response.data.RSNum==''){
            this.$store.dispatch('GET_TSG_BANK', {
              id:response.house.IdTsj,
            }).then(bank => {
              this.RSSityBank = bank.data.RSSityBank;
              this.RSNum = bank.data.RSNum;
            }).catch(err => {
              console.warn(err);
            });
          }else{
            this.RSSityBank = response.data.RSSityBank;
            this.RSNum = response.data.RSNum;
          }
          this.lsItem = response.ls;
          this.house = response.house;
        }
      }
    }).catch(err => {
      console.warn(err);
    });
  },
  data() {
    let date = new Date();
    let options = {
      year: 'numeric',
      month: 'long',
    };
    let dateMonth = date.toLocaleString("ru", options);
    return {
      dialogSucces: false,
      dialogSuccesText: '',
      IdKvSet:'',
      TypeKvitItem:[],
      TypeKvit:'',
      dayKvitItem:[],
      dayDolg:'',
      monthKvitItem:[],
      monthDolg:'',
      dayPay:'',
      monthPay:'',
      TotalPayItem:[],
      TotalPay:'',
      IsInformation:false,
      IsContact:false,
      IsCostHouse:false,
      IsCostIndividual:false,
      IsIndividualAppliance:false,
      InformationText:'',
      PloshGilaya:'',
      PloshObsh:'',
      PloshRaschOtopl:'',
      PloshNeGilaya:'',
      PloshObshImush:'',
      PloshRaschElectro:'',
      menu: false,
      menu2: false,
      menu3: false,
      datePenyOt: '',
      datePenyDo: '',
      dateM: '',
      DatePenyOt: '',
      DatePenyDo: '',
      RSSityBank: '',
      RSNum: '',
      house:[],
      lsItem:[],
      dateMonth: dateMonth,
      TypeFl:0,
      IsKapremont:0,
    }
  },
  methods: {
    changeFilterLs() {
      this.$store.dispatch('GET_LS_SERVICE_FILTER', {IdHouse: this.$props.id,IsKapremont:this.IsKapremont,TypeFl: this.TypeFl,IdPost:0}).then(response => {
        this.lsItem = response.data;
      }).catch(err => {
        console.warn(err);
      });
    },
    clickAllLs(){
      let ret = [];
      this.lsItem.forEach(ls => {
        ret.push({IdLs: ls.IdLs,LicSchet: ls.LicSchet,checked:true});
      });
      this.lsItem = ret;
    },
    clickDeleteLs(){
      let ret = [];
      this.lsItem.forEach(ls => {
        ret.push({IdLs: ls.IdLs,LicSchet: ls.LicSchet,checked:false});
      });
      this.lsItem = ret;
    },
    onClickKvitancia(){
      if (!this.dateMonth) {
        this.dialogSuccesText = 'Введите расчетный период';
        this.dialogSucces = true;
        return;
      }
      let retLs = [];
      this.lsItem.forEach(ls => {
        if(ls.checked)
          retLs.push({IdLs: ls.IdLs,LicSchet: ls.LicSchet,checked:ls.checked});
      });
      if (retLs.length == 0){
        this.dialogSuccesText = 'Выберите квитанции';
        this.dialogSucces = true;
        return;
      }

      this.$store.dispatch('KVITANCIA_FORM', {
        IdHouse: this.$props.id,
        lsItem: retLs,
        dateMonth: this.dateMonth,
        IdKvSet: this.IdKvSet,
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
    addKvitancia(){
      this.$store.dispatch('KVITANCIA_ADD', {

        IdKvSet: this.IdKvSet,
        TypeKvit:this.TypeKvit,
        dayDolg:this.dayDolg,
        monthDolg:this.monthDolg,
        dayPay:this.dayPay,
        monthPay:this.monthPay,
        TotalPay:this.TotalPay,
        IsInformation:this.IsInformation==false?0:1,
        IsContact:this.IsContact==false?0:1,
        IsCostHouse:this.IsCostHouse==false?0:1,
        IsCostIndividual:this.IsCostIndividual==false?0:1,
        IsIndividualAppliance:this.IsIndividualAppliance==false?0:1,
        InformationText:this.InformationText,
        PloshGilaya:this.PloshGilaya,
        PloshObsh:this.PloshObsh,
        PloshRaschOtopl:this.PloshRaschOtopl,
        PloshNeGilaya:this.PloshNeGilaya,
        PloshObshImush:this.PloshObshImush,
        PloshRaschElectro:this.PloshRaschElectro,
        DatePenyOt: this.DatePenyOt,
        DatePenyDo: this.DatePenyDo,
        RSSityBank: this.RSSityBank,
        RSNum: this.RSNum,

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

      if(this.datePenyOt) {
        let date = new Date(this.datePenyOt);
        let month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DatePenyOt = day + '.' + month + '.' + date.getFullYear();
      }
      if(this.datePenyDo) {
        let date = new Date(this.datePenyDo);
        let month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DatePenyDo = day + '.' + month + '.' + date.getFullYear();
      }
      if(this.dateM) {
        let date = new Date(this.dateM);
        let options = {
          year: 'numeric',
          month: 'long',
        };
        this.dateMonth = date.toLocaleString("ru", options);
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