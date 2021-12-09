<template>
  <div class="tabcontent">
    <v-tabs>
      <v-tab>Организация</v-tab>
      <v-tab v-show="IdPost>0">Объект</v-tab>
      <v-tab v-show="IdPost>0">Лицевые счета</v-tab>

      <v-tab-item>
        <v-row>
          <v-col cols="6">
            <v-select
                :items="TsjItem"
                v-model="IdTsj"
                label="Организация*"
                @input="changeTsj"
                required
                dense
            ></v-select>
            <v-select
                :items="TypeYslugiItem"
                v-model="TypeYslugi"
                label="Тип услуги*"
                required
                dense
            ></v-select>
            <v-select
                :items="TypePostItem"
                v-model="TypePost"
                label="Вид услуги*"
                required
                dense
            ></v-select>
            <v-text-field
                v-model="NameUsluga"
                label="Название услуги*"
                required
            ></v-text-field>
            <v-radio-group
                v-model="IsForLgota"
                label="Льготы"
                row
                mandatory
            >
              <v-radio
                  label="Есть"
                  value="1"
              ></v-radio>
              <v-radio
                  label="Нет"
                  value="0"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="6">
            <v-select
                :items="IdKontragItem"
                v-model="IdKontrag"
                label="Выберите организацию (контрагента)"
                dense
            ></v-select>
            <v-select
                :items="VidZatratItem"
                v-model="VidZatrat"
                label="Выберите статью расходов"
                dense
            ></v-select>
            <v-select
                :items="ObiemEdIzmItem"
                v-model="ObiemEdIzm"
                label="Единица измерения"
                dense
            ></v-select>

            <v-text-field
                v-model="NormativODPU"
                label="Норматив"
                required
            ></v-text-field>



          </v-col>
        </v-row>
        <v-btn
            color="primary"
            @click="addService"
        >
          Сохранить
        </v-btn>
      </v-tab-item>

      <v-tab-item v-show="IdPost>0">
        <h4 style="margin-top: 30px;">Настройка объектов</h4>
        <v-row>
          <v-col cols="6">
            <v-select
                :items="HouseItem"
                v-model="IdHouse"
                label="Объект"
                @input="changeFilterLs();changeHousePost();"
                dense
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
                v-model="TarifSumm"
                label="Тариф"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <h4>Формула расчета</h4>
            <p>Составьте формулу для расчётов</p>
          </v-col>
          <v-col cols="12">
            Математические знаки:
            <span class="formItem" @click="addFormula('+','+')">Плюс (+)</span>
            <span class="formItem" @click="addFormula('-','-')">Минус (-)</span>
            <span class="formItem" @click="addFormula('*','*')">Умножить (*)</span>
            <span class="formItem" @click="addFormula('/','/')">Деление (/)</span>
          </v-col>
          <v-col cols="12">
            Счётчики ИПУ:
            <span class="formItem" @click="addFormula('IPU_HV','ИПУ ХВ')">ХВ</span>
            <span class="formItem" @click="addFormula('IPU_GV','ИПУ ГВ')">ГВ</span>
            <span class="formItem" @click="addFormula('IPU_GAZ','ИПУ ГАЗ')">ГАЗ</span>
            <span class="formItem" @click="addFormula('IPU_EE','ИПУ ЭЭ')">ЭЭ</span>
            <span class="formItem" @click="addFormula('IPU_OTOP','ИПУ Отопление')">Отопление</span>
          </v-col>
          <v-col cols="12">
            Счётчики ОПУ:
            <span class="formItem" @click="addFormula('OPU_HV','ОПУ ХВ')">ХВ</span>
            <span class="formItem" @click="addFormula('OPU_GV','ОПУ ГВ')">ГВ</span>
            <span class="formItem" @click="addFormula('OPU_GAZ','ОПУ ГАЗ')">ГАЗ</span>
            <span class="formItem" @click="addFormula('OPU_EE','ОПУ ЭЭ')">ЭЭ</span>
            <span class="formItem" @click="addFormula('OPU_OTOP','ОПУ Отопление')">Отопление</span>
          </v-col>
          <v-col cols="12">
            <span class="formItem" @click="addFormula('NormativODPU','Норматив')">Норматив</span>
            <span class="formItem" @click="addFormula('TarifSumm','Тариф')">Тариф</span>
            <span class="formItem" @click="addFormula('PloschObsch','Площадь помещения')">Площадь помещения</span>
            <span class="formItem" @click="addFormula('PloshGilaya','Жилая площадь дома')">Жилая площадь дома</span>
            <span class="formItem" @click="addFormula('PloshNeGilaya','Не жилая площадь дома')">Не жилая площадь дома</span>
            <span class="formItem" @click="addFormula('PloshObOsvesh','Площадь МОП освещаемая')">Площадь МОП освещаемая</span>
            <span class="formItem" @click="addFormula('PloshObPolz','Площадь МОП уборочная')">Площадь МОП уборочная</span>
          </v-col>
          <v-col cols="12">
              Своё значение:
              <v-text-field
                  v-model="FormulaTextIndivid"
                  label="Введите число"
                  style="width:200px;display: inline-block;"
                  type="number"
              ></v-text-field>
            <div class="formItem" @click="addFormula(FormulaTextIndivid,FormulaTextIndivid)" style="display: inline-block;padding: 5px 12px;">Вставить</div>
          </v-col>
          <v-col cols="12">
            <h4>Индивидуальная формула расчета</h4>
          </v-col>
          <template v-for="(form, index) in TypeFormulaText">
             <v-chip
               :key="index"
               class="ma-2"
               close
               label
               outlined
               @click:close="closeFormula(index,form.value)"
             >
             {{form.text}}
             </v-chip>
           </template>

           <!--
           <v-col cols="12">
             <v-select
                 :items="TypeFormulaItem"
                 v-model="TypeFormula"
                 label="Формула расчета"
                 dense
             ></v-select>
           </v-col>
           -->
        </v-row>
        <v-btn
            color="primary"
            @click="addServiceHouse"
        >
          Сохранить
        </v-btn>
      </v-tab-item>

      <v-tab-item v-show="IdPost>0">
        <div v-show="IdPost>0">
          <h4 style="margin-top: 30px;">Лицевые счета для этой услуги</h4>
          <v-row>
            <v-col cols="4">
              <v-select
                  :items="HouseItem"
                  v-model="IdHouse"
                  label="Объект"
                  dense
                  @input="changeFilterLs();changeHousePost();"
              ></v-select>
            </v-col>
            <v-col cols="4">
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
            <v-col cols="4">
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
          <v-btn
              color="primary"
              @click="addLsItem"
          >
            Сохранить лицевые счета для этой услуги
          </v-btn>
        </div>
      </v-tab-item>
    </v-tabs>


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
  name: "ServiceAdd",
  props: ['id'],
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
      this.tsg = response.data;
    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_SERVICE', {
      id:this.$props.id,
    }).then(response => {
      if(response.status==1){
        if(response.data.IdPost>0){
          this.IdPost = response.data.IdPost;
          this.IdTsj = response.data.IdTsj;
          this.TypeYslugi = response.data.TypeYslugi;
          this.TypePost = response.data.TypePost;
          this.NameUsluga = response.data.NameUsluga;
          this.IdKontrag = response.data.IdKontrag;
          this.VidZatrat = response.data.VidZatrat;
          this.ObiemEdIzm = response.data.ObiemEdIzm;
          this.TarifSumm = response.data.TarifSumm;
          this.NormativODPU = response.data.NormativODPU;
          this.TypeFormula = response.data.TypeFormula;
          this.IsForLgota = String(response.data.IsForLgota);
          let ret = [];
          let object = response.House;
          object.forEach(itemobject => {
            if(this.IdTsj == itemobject.IdTsj){
              ret.push({text: itemobject.adress,value: itemobject.IdHouse});
            }
          });
          this.HouseItem = ret;
        }
      }
    }).catch(err => {
      console.warn(err);
    });
  },
  data() {
    return {
      loading: true,
      dialogSucces: false,
      dialogSuccesText: '',
      tsg:[],
      IdPost:0,
      IdTsj:'',

      TypeYslugi:0,
      TypePost:'',
      NameUsluga:'',
      IdKontrag:'',
      VidZatrat:'',
      ObiemEdIzm:'',
      TarifSumm:'',
      NormativODPU:'',
      TypeFormula:'',
      IsForLgota:'',
      HouseItem:[],
      IdHouse:'',

      TypeFl:0,
      IsKapremont:0,
      lsItem:[],
      lsChecked:[],
      TypeFormulaText:[],
      IdPosHouse:0,
      FormulaTextIndivid:'',
    }
  },
  computed: {
    TsjItem(){
      if (/*this.$store.getters.SERVICE_ADD && */this.tsg) {
        let ret = [];
        //let object = this.$store.getters.SERVICE_ADD.House;
        this.tsg.forEach(itemtsg => {
          ret.push({text:  itemtsg.Name,value: itemtsg.IdTsj});
         /* object.forEach(itemobject => {
            if(itemtsg.IdTsj == itemobject.IdTsj){
              ret.push({text: itemobject.adress,value: itemobject.IdHouse});
            }
          });*/
        });
        return ret;
      }else{
        return [];
      }
    },
    TypeYslugiItem(){
      return this.$store.getters.SERVICE_ADD ? this.$store.getters.SERVICE_ADD.TypeYslugiItem : [];
    },
    TypePostItem(){

      if(this.TypeYslugi>0 || this.TypeYslugi==0 ){
        return this.$store.getters.SERVICE_ADD ? this.$store.getters.SERVICE_ADD.TypePostItem[this.TypeYslugi] : [];
      }else{
        return [];
      }

    },
    IdKontragItem(){
      if(this.IdTsj>0 && this.$store.getters.SERVICE_ADD ){
        let ret = [];
        let IdTsj = this.IdTsj;
       /* let object = this.$store.getters.SERVICE_ADD.House;
        object.forEach(itemobject => {
          if(this.IdHouse == itemobject.IdHouse){
            IdTsj = itemobject.IdTsj;
          }
        });*/
        let kontrag = this.$store.getters.SERVICE_ADD.IdKontragItem;
        kontrag.forEach(itemkontrag => {
          if(IdTsj == itemkontrag.IdTsj){
            ret.push({text: itemkontrag.text,value: itemkontrag.value});
          }
        });
        return ret;
      }else{
        return this.$store.getters.SERVICE_ADD ? this.$store.getters.SERVICE_ADD.IdKontragItem : [];
      }
    },
    VidZatratItem(){
      if(this.IdTsj>0 && this.$store.getters.SERVICE_ADD ){
        let ret = [];
        let IdTsj = this.IdTsj;
        /*let object = this.$store.getters.SERVICE_ADD.House;
        object.forEach(itemobject => {
          if(this.IdHouse == itemobject.IdHouse){
            IdTsj = itemobject.IdTsj;
          }
        });*/
        let VidZatrat = this.$store.getters.SERVICE_ADD.VidZatratItem;
        VidZatrat.forEach(itemvid => {
          if(IdTsj == itemvid.IdTsj){
            ret.push({text: itemvid.text,value: itemvid.value});
          }
        });
        return ret;
      }else {
        return this.$store.getters.SERVICE_ADD ? this.$store.getters.SERVICE_ADD.VidZatratItem : [];
      }
    },
    ObiemEdIzmItem(){
      return this.$store.getters.SERVICE_ADD ? this.$store.getters.SERVICE_ADD.ObiemEdIzmItem : [];
    },
    TypeFormulaItem(){
      return this.$store.getters.SERVICE_ADD ? this.$store.getters.SERVICE_ADD.TypeFormulaItem : [];
    },
  },
  methods: {
    closeFormula(index,val){
      console.log(this.TypeFormulaText[index]);
      //this.TypeFormulaText.$remove(index);
      this.$delete(this.TypeFormulaText,index);
      console.log(val);
    },
    addFormula(val,text){
      this.TypeFormulaText.push({text: text,value: val});
    },
    addServiceHouse() {
      if(!this.IdHouse>0){
        this.dialogSuccesText = 'Выберите объект';
        this.dialogSucces = true;
        return false;
      }
      this.$store.dispatch('POST_TO_HOUSE', {IdPosHouse: this.IdPosHouse,FormulaItem: this.TypeFormulaText,IdPost:this.IdPost,IdHouse:this.IdHouse,IdTsj: this.IdTsj,TarifSumm: this.TarifSumm}).then(response => {
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
    addLsItem() {
      if(!this.IdHouse>0){
        this.dialogSuccesText = 'Выберите объект';
        this.dialogSucces = true;
        return false;
      }
      this.$store.dispatch('POST_TO_LS', {lsItem: this.lsItem,IdPost:this.IdPost}).then(response => {
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
    changeHousePost() {
      this.$store.dispatch('GET_POST_TO_HOUSE_SERVICE_FILTER', {IdHouse: this.IdHouse,IdPost:this.IdPost}).then(response => {
        this.TypeFormulaText = response.TypeFormulaText;
        this.TarifSumm = response.TarifSumm;
        this.IdPosHouse = response.IdPosHouse;
      }).catch(err => {
        console.warn(err);
      });
    },
    changeFilterLs() {
      this.$store.dispatch('GET_LS_SERVICE_FILTER', {IdHouse: this.IdHouse,IsKapremont:this.IsKapremont,TypeFl: this.TypeFl,IdPost:this.IdPost}).then(response => {
        this.lsItem = response.data;
      }).catch(err => {
        console.warn(err);
      });

    },
    changeTsj() {
      this.$store.dispatch('GET_OBJECT_LIST', {IdTsj: this.IdTsj,IsDeleted: 0}).then(response => {
        let ret = [];
        let object = response.data;
        object.forEach(itemobject => {
          if(this.IdTsj == itemobject.IdTsj){
            ret.push({text: itemobject.adress,value: itemobject.IdHouse});
          }
        });
        this.HouseItem = ret;
      }).catch(err => {
        console.warn(err);
      });
    },
    addService() {
      this.$store.dispatch('SERVICE_ADD', {
        IdPost:this.IdPost,
        IdTsj:this.IdTsj,
        TypeYslugi:this.TypeYslugi,
        TypePost:this.TypePost,
        NameUsluga:this.NameUsluga,
        IdKontrag:this.IdKontrag,
        VidZatrat:this.VidZatrat,
        ObiemEdIzm:this.ObiemEdIzm,
        TarifSumm:this.TarifSumm,
        NormativODPU:this.NormativODPU,
        TypeFormula:this.TypeFormula,
        IsForLgota:this.IsForLgota,

      }).then(response => {
        if(response.status==1){
          if(this.IdPost==0) {
            this.IdTsj = '';
            this.TypeYslugi = 0;
            this.TypePost = '';
            this.NameUsluga = '';
            this.IdKontrag = '';
            this.VidZatrat = '';
            this.ObiemEdIzm = '';
            this.TarifSumm = '';
            this.NormativODPU = '';
            this.TypeFormula = '';
            this.IsForLgota = '';
          }
          this.dialogSuccesText = response.message;
          this.dialogSucces = true;
        }else{
          this.dialogSuccesText = response.message;
          this.dialogSucces = true;
        }
      }).catch(err => {
        console.warn(err);
      });
    }
  }
}
</script>

<style scoped>
  .tabcontent {
    padding-top: 60px;
  }
  .formItem{
    background-color: #1867c0 !important;
    border-color: #1867c0 !important;
    border-radius: 16px;
    font-size: 14px;
    height: 32px;
    margin: 5px;
    padding: 8px;
    color: #fff;
    cursor: pointer;
  }
</style>