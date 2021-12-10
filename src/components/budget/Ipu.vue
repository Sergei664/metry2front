<template>
  <div class="tabcontent">
    <template>
      <v-tabs>
        <v-tab>Показания</v-tab>
        <v-tab>Приборы учёта</v-tab>

        <v-tab-item>
          <v-row>
            <v-col cols="3" >
              <v-select
                  :items="HouseItem"
                  v-model="IdHouse"
                  label="Объект"
                  @input="changeFilterHouse"
                  dense
              ></v-select>
            </v-col>
            <v-col cols="3" >
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
                      v-model="dateMonth"
                      persistent-hint
                      v-bind="attrs"
                      width="290"
                      label="Расчетный период"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker width="290" type="month" v-model="dateM" @change="changeDate" no-title @input="menu = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="3"></v-col>
            <v-col cols="3" align="right">
              <v-btn color="primary" @click="dialogAddSchetData=true">Добавить показания</v-btn>
            </v-col>
          </v-row>
          <template>
            <v-data-table
                :headers="headers"
                class="elevation-1"
                :items="schetchikData"
                @click:row="onClickSchetDataUpdate"
            >
              <template v-slot:body.prepend>
                <tr>
                  <td>
                    <v-text-field
                        label="Введите номер помещения"
                        v-model="NumFlat"
                    ></v-text-field>
                  </td>
                  <td colspan="9"></td>
                </tr>
              </template>
            </v-data-table>
          </template>
        </v-tab-item>

        <v-tab-item>
          <v-row>
            <v-col cols="3" >
              <v-select
                  :items="HouseItem"
                  v-model="IdHouse"
                  label="Объект"
                  @input="changeFilterHouse"
                  dense
              ></v-select>
            </v-col>
            <v-col cols="6" >
            </v-col>
            <v-col cols="3" align="right">
              <v-btn color="primary" @click="resetAddSchet">Добавить счётчик</v-btn>
            </v-col>
          </v-row>
          <template>
            <v-data-table
                :headers="headersShet"
                class="elevation-1"
                :items="schetchiks"
                :footer-props="{
                  'items-per-page-options': [20, 50, 100, 200, 300]
                }"
                :items-per-page="20"
                @click:row="onClickSchetUpdate"
            >
              <template v-slot:body.prepend>
                <tr>
                  <td>
                    <v-text-field
                        label="Введите номер помещения"
                        v-model="NumFlat"
                    ></v-text-field>
                  </td>
                  <td colspan="9"></td>
                </tr>
              </template>
            </v-data-table>
          </template>
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
    <v-dialog
        v-model="dialogAddSchet"
        max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5 text-md-center">
          Прибор учета
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="dialogAddSchet = false"
          >
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-select
                  :items="HouseItem"
                  v-model="IdHouse"
                  label="Объект"
                  @input="changeFilterHouse"
                  dense
              ></v-select>
              <v-select
                  :items="TypeSchetchikItem"
                  v-model="TypeSchetchik"
                  label="Тип счетчика"
                  dense
              ></v-select>
              <v-text-field
                  label="Размещение (санузел/кухня)"
                  v-model="NameSchetch"
              ></v-text-field>
              <v-text-field
                  label="Модель"
                  v-model="Model"
              ></v-text-field>
              <v-text-field
                  label="Номер пломбы"
                  v-model="NumPlomba"
              ></v-text-field>
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
                      v-model="DateInstall"
                      persistent-hint
                      v-bind="attrs"
                      label="Дата установки"
                      @blur="dateinstall = parseDate(DateInstall)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateinstall" @change="changeDate" no-title @input="menu3 = false"></v-date-picker>
              </v-menu>

            </v-col>
            <v-col cols="6">
              <v-select
                  :items="FlatItem"
                  v-model="IdFlat"
                  label="Помещение"
                  dense
              ></v-select>
              <v-text-field
                  label="Марка"
                  v-model="Marka"
              ></v-text-field>
              <v-text-field
                  label="Номер счетчика*"
                  v-model="NumSchetchik"
              ></v-text-field>
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
                      v-model="DatePlombZavod"
                      persistent-hint
                      v-bind="attrs"
                      label="Дата опломбирования"
                      @blur="datePlomb = parseDate(DatePlombZavod)"
                      v-on="on"
                      :dense="true"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="datePlomb" @change="changeDate" no-title @input="menu2 = false"></v-date-picker>
              </v-menu>
              <v-text-field
                  label="Базовое показание"
                  v-model="FirstPokazan"
              ></v-text-field>
              <v-select
                  :items="VerifIntervalItem"
                  v-model="VerifInterval"
                  label="Межповер. интервал"
                  dense
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-radio-group
                  v-model="IsActive"
                  row
                  mandatory
              >
                <v-radio
                    label="Счетчик включен"
                    value="1"
                ></v-radio>
                <v-radio
                    label="Счетчик отключен"
                    value="0"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              @click="AddSchet"
          >
            Сохранить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialogAddSchet = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="dialogAddSchetData"
        max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5 text-md-center">
          Показания счётчиков
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="dialogAddSchetData = false"
          >
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-select
                  :items="HouseItem"
                  v-model="IdHouse"
                  label="Объект"
                  @input="changeFilterHouse"
                  dense
              ></v-select>
              <v-menu
                  ref="menu4"
                  v-model="menu4"
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
                <v-date-picker width="290" type="month" v-model="dateM" @change="changeSchetData" no-title @input="menu4 = false;"></v-date-picker>
              </v-menu>
              <v-text-field
                  v-show="SchHv2!='-'"
                  label="ХВ2"
                  v-model="SchHv2"
              ></v-text-field>
              <v-text-field
                  v-show="SchGv2!='-'"
                  label="ГВ2"
                  v-model="SchGv2"
              ></v-text-field>
              <v-text-field
                  v-show="SchEnerg!='-'"
                  label="Электроэнергия"
                  v-model="SchEnerg"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                  :items="FlatItem"
                  v-model="IdFlat"
                  label="Помещение"
                  @input="changeSchetData"
                  dense
              ></v-select>
              <v-text-field
                  v-show="SchHv1!='-'"
                  label="ХВ1"
                  v-model="SchHv1"
              ></v-text-field>
              <v-text-field
                  v-show="SchGv1!='-'"
                  label="ГВ1"
                  v-model="SchGv1"
              ></v-text-field>
              <v-text-field
                  v-show="SchGaz!='-'"
                  label="ГAЗ"
                  v-model="SchGaz"
              ></v-text-field>
              <v-text-field
                  v-show="SchОt!='-'"
                  label="Отопление"
                  v-model="SchОt"
              ></v-text-field>
            </v-col>

          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              @click="AddSchetData"
          >
            Сохранить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialogAddSchetData = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: "Ipu",
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
      this.tsg = response.data;
    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_OBJECT_LIST', {IdTsj: 0, IsDeleted: 0}).then(response => {
      this.object = response.data;
      this.IdHouse = this.object[0].IdHouse;
    }).catch(err => {
      console.warn(err);
    });

    this.$store.dispatch('GET_FLAT_LIST', {IdHouse: 1}).then(() => {

    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_IPU_LIST', {IdHouse: 1}).then(response => {
      this.schetchiks = response.data;
    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_IPU_LIST_DATA', {IdHouse: 1, dateMonth: this.dateMonth}).then(response => {
      this.schetchikData = response.data;
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
      dialogAddSchet: false,
      dialogSucces: false,
      dialogAddSchetData: false,
      dialogSuccesText: '',
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      dateM: '',
      dateMonth: dateMonth,
      datePlomb: '',
      dateinstall: '',
      tsg: [],
      object: [],
      IdHouse: '',
      NumFlat: '',
      IdFlat: '',
      TypeSchetchik: '',
      NameSchetch: '',
      Marka: '',
      Model: '',
      NumSchetchik: '',
      NumPlomba: '',
      DatePlombZavod: '',
      DateInstall: '',
      VerifInterval: '',
      VerifIntervalItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      IsActive: 1,
      TypeSchetchikItem: [
        {value: 0, text: 'ХВ'},
        {value: 1, text: 'ГВ'},
        {value: 2, text: 'ГАЗ'},
        {value: 3, text: 'ЭЛЕКТРОЭНЕРГИЯ'},
        {value: 4, text: 'ОТОПЛЕНИЕ'},
      ],
      FirstPokazan: '',
      headers: [
        {
          text: 'Номер помещения',
          align: 'start',
          value: 'NumFlat',
          filter: value => {
            if (!this.NumFlat) return true
            return value.toString().indexOf(this.NumFlat) !== -1
          },
        },
        {text: 'ХВ1', value: 'HV1'},
        {text: 'ХВ2', value: 'HV2'},
        {text: 'ГВ1', value: 'GV1'},
        {text: 'ГВ2', value: 'GV2'},
        {text: 'ГАЗ', value: 'GAZ'},
        {text: 'ЭЛЕКТРОЭНЕРГИЯ', value: 'EE'},
        {text: 'ОТОПЛЕНИЕ', value: 'OTOP'},
        {text: 'Дата внесения', value: 'DateIn'},
        {text: 'ИСТОЧНИК', value: 'istochnik'},
      ],
      headersShet: [
        {
          text: 'Номер помещения',
          align: 'start',
          value: 'NumFlat',
          filter: value => {
            if (!this.NumFlat) return true
            return value.toString().indexOf(this.NumFlat) !== -1
          },
        },
        {text: 'ТИП СЧЕТЧИКА', value: 'TypeSchetchik'},
        {text: '№ СЧЕТЧИКА', value: 'NumSchetchik'},
        {text: 'ДАТА УСТАНОВКИ', value: 'DateInstall'},
        {text: '№ ПЛОМБЫ', value: 'NumPlomba'},
        {text: 'ПОСЛЕДНЯЯ ПОВЕРКА ДАТА', value: 'DatePoverkaSchet'},
        {text: 'ПОСЛЕДНЯЯ ПОВЕРКА ПОКАЗАНИЯ', value: 'DatePoverkaPokaz'},
        {text: 'ДАТА СЛЕДУЮЩЕЙ ПОВЕРКИ', value: 'SrokPoverki'},
      ],
      schetchiks: [],
      schetchikData: [],
      IdSchechData: '',
      SchHv1: '-',
      SchHv2: '-',
      SchGv1: '-',
      SchGv2: '-',
      SchGaz: '-',
      SchEnerg: '-',
      SchОt: '-',
      ID: '',
    }
  },
  computed: {
    HouseItem() {
      if (this.object && this.tsg) {
        let ret = [];
        this.tsg.forEach(itemtsg => {
          ret.push({header: itemtsg.Name});
          this.object.forEach(itemobject => {
            if (itemtsg.IdTsj == itemobject.IdTsj) {
              ret.push({text: itemobject.adress, value: itemobject.IdHouse});
            }
          });
        });
        return ret;
      } else {
        return [];
      }
    },
    FlatItem() {
      let ret = [];
      if (this.$store.getters.FLAT_LIST) {
        let flat = this.$store.getters.FLAT_LIST.data;
        flat.forEach(item => {
          ret.push({text: item.NumFlat, value: item.IdFlat});
        });
      }
      return ret;
    },
  },
  methods: {
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split('.');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    AddSchet() {
      this.$store.dispatch('SCHET_ADD', {

        ID: this.ID,
        IdFlat: this.IdFlat,
        TypeSchetchik: this.TypeSchetchik,
        NameSchetch: this.NameSchetch,
        Marka: this.Marka,
        Model: this.Model,
        NumSchetchik: this.NumSchetchik,
        NumPlomba: this.NumPlomba,
        DatePlombZavod: this.DatePlombZavod,
        DateInstall: this.DateInstall,
        VerifInterval: this.VerifInterval,
        FirstPokazan: this.FirstPokazan,
        IsActive: this.IsActive,

      }).then(response => {
        if (response.status == 1) {

          this.dialogSuccesText = response.message;
          this.dialogAddSchet = false;
          this.dialogSucces = true;
          this.$store.dispatch('GET_IPU_LIST', {IdHouse: this.IdHouse}).then(response => {
            this.schetchiks = response.data;
          }).catch(err => {
            console.warn(err);
          });
        } else {
          this.dialogSuccesText = response.message;
          this.dialogSucces = true;
        }
      }).catch(err => {
        console.warn(err);
      });
    },
    AddSchetData() {
      this.$store.dispatch('SCHET_DATA_ADD', {

        IdSchechData: this.IdSchechData,
        IdFlat: this.IdFlat,
        dateMonth: this.dateMonth,
        SchHv1: this.SchHv1,
        SchHv2: this.SchHv2,
        SchGv1: this.SchGv1,
        SchGv2: this.SchGv2,
        SchGaz: this.SchGaz,
        SchEnerg: this.SchEnerg,
        SchОt: this.SchОt,

      }).then(response => {
        if (response.status == 1) {

          this.dialogSuccesText = response.message;
          this.dialogAddSchetData = false;
          this.dialogSucces = true;
          this.$store.dispatch('GET_IPU_LIST_DATA', {
            IdHouse: this.IdHouse,
            dateMonth: this.dateMonth
          }).then(response => {
            this.schetchikData = response.data;
          }).catch(err => {
            console.warn(err);
          });
        } else {
          this.dialogSuccesText = response.message;
          this.dialogSucces = true;
        }
      }).catch(err => {
        console.warn(err);
      });
    },

    changeFilterHouse() {
      this.IdFlat = '';
      this.$store.dispatch('GET_FLAT_LIST', {IdHouse: this.IdHouse}).then(() => {
      }).catch(err => {
        console.warn(err);
      });
      this.$store.dispatch('GET_IPU_LIST', {IdHouse: this.IdHouse}).then(response => {
        this.schetchiks = response.data;
      }).catch(err => {
        console.warn(err);
      });
      this.$store.dispatch('GET_IPU_LIST_DATA', {IdHouse: this.IdHouse, dateMonth: this.dateMonth}).then(response => {
        this.schetchikData = response.data;
      }).catch(err => {
        console.warn(err);
      });
    },
    onClickSchetUpdate(item) {
      this.$store.dispatch('GET_IPU', {id: item.ID}).then(response => {
        this.ID = response.data.ID;
        this.IdFlat = response.data.IdFlat;
        this.TypeSchetchik = response.data.TypeSchetchik;
        this.NameSchetch = response.data.NameSchetch;
        this.Marka = response.data.Marka;
        this.Model = response.data.Model;
        this.NumSchetchik = response.data.NumSchetchik;
        this.NumPlomba = response.data.NumPlomba;
        this.DatePlombZavod = response.data.DatePlombZavod;
        this.DateInstall = response.data.DateInstall;
        this.VerifInterval = response.data.VerifInterval;
        this.FirstPokazan = response.data.FirstPokazan;
        this.IsActive = response.data.IsActive;
        this.dialogAddSchet = true;
      }).catch(err => {
        console.warn(err);
      });
    },
    onClickSchetDataUpdate(item) {
      this.IdFlat = item.IdFlat;
      this.$store.dispatch('GET_IPU_DATA', {IdFlat: this.IdFlat, dateMonth: this.dateMonth}).then(response => {

        this.IdSchechData = response.data.IdSchechData;
        this.SchHv1 = response.data.SchHv1;
        this.SchHv2 = response.data.SchHv2;
        this.SchGv1 = response.data.SchGv1;
        this.SchGv2 = response.data.SchGv2;
        this.SchGaz = response.data.SchGaz;
        this.SchEnerg = response.data.SchEnerg;
        this.SchОt = response.data.SchОt;
        this.dialogAddSchetData = true;
      }).catch(err => {
        console.warn(err);
      });
    },
    resetAddSchet() {
      this.ID = '';
      this.IdFlat = '';
      this.TypeSchetchik = '';
      this.NameSchetch = '';
      this.Marka = '';
      this.Model = '';
      this.NumSchetchik = '';
      this.NumPlomba = '';
      this.DatePlombZavod = '';
      this.DateInstall = '';
      this.VerifInterval = '';
      this.FirstPokazan = '';
      this.IsActive = '';
      this.dialogAddSchet = true;
    },
    changeSchetData() {
      if (this.dateM) {
        let date = new Date(this.dateM);
        let options = {
          year: 'numeric',
          month: 'long',
        };
        this.dateMonth = date.toLocaleString("ru", options);
      }
      this.$store.dispatch('GET_IPU_DATA', {IdFlat: this.IdFlat, dateMonth: this.dateMonth}).then(response => {

        this.IdSchechData = response.data.IdSchechData;
        this.SchHv1 = response.data.SchHv1;
        this.SchHv2 = response.data.SchHv2;
        this.SchGv1 = response.data.SchGv1;
        this.SchGv2 = response.data.SchGv2;
        this.SchGaz = response.data.SchGaz;
        this.SchEnerg = response.data.SchEnerg;
        this.SchОt = response.data.SchОt;
      }).catch(err => {
        console.warn(err);
      });
      this.$store.dispatch('GET_IPU_LIST_DATA', {IdHouse: this.IdHouse, dateMonth: this.dateMonth}).then(response => {
        this.schetchikData = response.data;
      }).catch(err => {
        console.warn(err);
      });
    },
    changeDate() {

      if (this.dateinstall) {
        let date = new Date(this.dateinstall);
        let month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateInstall = day + '.' + month + '.' + date.getFullYear();
      }
      if (this.datePlomb) {
        let date = new Date(this.datePlomb);
        let month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DatePlombZavod = day + '.' + month + '.' + date.getFullYear();
      }
      if (this.dateM) {
        let date = new Date(this.dateM);
        let options = {
          year: 'numeric',
          month: 'long',
        };
        this.dateMonth = date.toLocaleString("ru", options);
        this.$store.dispatch('GET_IPU_LIST_DATA', {IdHouse: this.IdHouse, dateMonth: this.dateMonth}).then(response => {
          this.schetchikData = response.data;
        }).catch(err => {
          console.warn(err);
        });
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