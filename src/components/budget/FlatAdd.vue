<template>
  <div class="tabcontent">
    <v-row>
      <v-col cols="6">
        <v-select
            :items="HouseItem"
            v-model="IdHouse"
            label="Объект*"
            required
            dense
        ></v-select>
        <v-text-field
            v-model="NumFlat"
            label="Номер помещения*"
            required
        ></v-text-field>
        <v-radio-group
            v-model="TypeFl"
            label="Тип помещения*"
            row
            mandatory
        >
          <v-radio
              label="жилое"
              value="0"
          ></v-radio>
          <v-radio
              label="нежилое"
              value="1"
          ></v-radio>
        </v-radio-group>
        <v-text-field
            v-model="PloschObsch"
            label="Площадь общая"
        ></v-text-field>
        <v-text-field
            v-model="PloschJil"
            label="Площадь жилая"
        ></v-text-field>
        <v-text-field
            v-model="CntRooms"
            label="Число комнат"
            required
        ></v-text-field>
        <v-text-field
            v-model="Podesd"
            label="Подъезд"
        ></v-text-field>
        <v-btn
            color="primary"
            @click="addFlat"
        >
          Сохранить
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field
            v-model="Etaj"
            label="Этаж"
        ></v-text-field>
        <v-text-field
            v-model="CadastrNum"
            label="Кадастровый номер"
        ></v-text-field>
        <p>Лицевые счета</p>


          <ul>
            <template v-for="(l) in ls">
              <li class="mb-3" style="cursor: pointer;color: #1976d2;" :key="l.IdLs" @click="onClickLsUpdate(l)" :dense="true">
                {{l.LicSchet}}
              </li>
            </template>
          </ul>

        <v-btn
            v-show="this.IdFlat>0"
            color="primary"
            @click="dialogAddLs = true"
        >
          Добавить лицевой счёт
        </v-btn>
        <p style="margin-top: 20px;">Потребители</p>
        <p v-show="this.ls.length===0">Внесите лицевой счёт чтобы добавить потребителя</p>

          <ul>
            <template v-for="(resident) in residents">
              <li class="mb-3" style="cursor: pointer;color: #1976d2;" :key="resident.IdResid" @click="onClickResidentUpdate(resident)" :dense="true">
                {{resident.Surname}} {{resident.Name}} {{resident.Patronymic}}
              </li>
            </template>
          </ul>

        <v-btn
            v-show="this.ls.length>0"
            color="primary"
            @click="addResident"
        >
          Добавить потребителя
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialogAddLs"
        max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Добавить лицевой счёт?
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="dialogAddLs = false"
          >
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>

        </v-card-title>
        <v-card-text>
          <v-checkbox
              v-model="IsKapremont"
              label="Капремонт"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              @click="addLs"
          >
            Добавить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialogAddLs = false"
          >
            Нет
          </v-btn>
        </v-card-actions>
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
  </div>
</template>

<script>
export default {
  name: "FlatAdd",
  props: ['id','IdHouseObj'],
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
      this.tsg = response.data;
    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_OBJECT_LIST', {IdTsj: 0,IsDeleted: 0}).then(response => {
      this.object = response.data;
    }).catch(err => {
      console.warn(err);
    });

    this.$store.dispatch('GET_FLAT', {
      id:this.$props.id,
    }).then(response => {
      if(response.status==1){
        if(response.data.IdFlat>0){
          this.IdFlat = response.data.IdFlat;
          this.IdHouse = response.data.IdHouse;
          this.NumFlat = response.data.NumFlat;
          this.TypeFl = response.data.TypeFl;
          this.PloschObsch = response.data.PloschObsch;
          this.PloschJil = response.data.PloschJil;
          this.CntRooms = response.data.CntRooms;
          this.Podesd = response.data.Podesd;
          this.CadastrNum = response.data.CadastrNum;
          this.Etaj = response.data.Etaj;
          this.ls = response.ls;
          this.residents = response.residents;
        }
      }
    }).catch(err => {
      console.warn(err);
    });

  },
  data() {
    return {
      loading: true,
      dialogAddLs: false,
      dialogSucces: false,
      dialogSuccesText: '',
      tsg:[],
      object:[],
      IdFlat:'',
      NumFlat:'',
      TypeFl:0,
      PloschObsch:'',
      PloschJil:'',
      CntRooms:'',
      Podesd:'',
      CadastrNum:'',
      IdHouse:this.$props.IdHouseObj,
      Etaj:'',
      ls:[],
      residents:[],
      IsKapremont:false,
    }
  },
  computed: {

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
    addFlat() {
      this.$store.dispatch('FLAT_ADD', {
        IdFlat:this.IdFlat,
        IdHouse:this.IdHouse,
        NumFlat:this.NumFlat,
        TypeFl:this.TypeFl,
        PloschObsch:this.PloschObsch,
        PloschJil:this.PloschJil,
        CntRooms:this.CntRooms,
        Podesd:this.Podesd,
        CadastrNum:this.CadastrNum,
        Etaj:this.Etaj,
      }).then(response => {
        if(response.status==1){
          if(this.IdFlat==0) {
            this.IdHouse = '';
            this.TypeFl = 0;
            this.NumFlat = '';
            this.PloschObsch = '';
            this.PloschJil = '';
            this.CntRooms = '';
            this.Podesd = '';
            this.CadastrNum = '';
            this.Etaj = '';
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
    },
    addLs(){
      this.$store.dispatch('LS_ADD', {
        IdFlat:this.IdFlat,
        IdHouse:this.IdHouse,
        IsClose:0,
        IsKapremont:this.IsKapremont==true?1:0,
      }).then(response => {
        if(response.status==1){
          this.ls = response.ls;
          this.dialogAddLs = false;
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
    addResident(){

    },
    onClickLsUpdate(item){
      this.$parent.addTab('Лицевой счёт '+ item.LicSchet, item.IdLs, 'LsAdd', {id: item.IdLs});
      //this.$parent.addTab('Изменить услугу '+ item.NameUsluga, item.IdPost, 'ServiceAdd', {id: item.IdPost});
    },
    onClickResidentUpdate(item){
      this.$parent.addTab('Потребитель ' + item.Surname+' '+item.Name+' '+item.Patronymic, item.IdResid, 'ResidentAdd', {id: item.IdResid});
      //this.$parent.addTab('Изменить услугу '+ item.NameUsluga, item.IdPost, 'ServiceAdd', {id: item.IdPost});
    },
  }
}
</script>

<style scoped>
  .tabcontent {
    padding-top: 60px;
  }
</style>