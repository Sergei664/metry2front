<template>
  <div class="tabcontent">
    <v-row>
      <v-col cols="6" >
          <v-row>
            <v-col cols="6" >
              <v-select
                  :items="HouseItem"
                  v-model="IdHouse"
                  label="Объект"
                  @input="changeFilterHouse"
                  dense
              ></v-select>
            </v-col>
            <v-col cols="6" >
              <v-select
                  :items="FlatItem"
                  v-model="IdFlat"
                  label="Помещение"
                  @input="changeFilter"
                  dense
              ></v-select>
            </v-col>
          </v-row>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn color="primary" @click="dialogAddLs=true">Добавить лицевой счёт</v-btn>
      </v-col>
    </v-row>
    <v-skeleton-loader :loading="loading">
      <template>
        <v-data-table
            :headers="headers"
            :items="ls"
            class="elevation-1"
            @click:row="onClickLsUpdate"
        >
          <template v-slot:body.prepend>
            <tr>
              <td>
                <v-text-field
                    label="Введите номер"
                    v-model="LicSchet"
                ></v-text-field>
              </td>
              <td colspan="9"></td>
            </tr>
          </template>
        </v-data-table>
      </template>
    </v-skeleton-loader>
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
              @input="changeFilter"
              dense
          ></v-select>
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
    name: "Ls",
    mounted() {
      this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
        this.tsg = response.data;
      }).catch(err => {
        console.warn(err);
      });
      this.$store.dispatch('GET_OBJECT_LIST', {IdTsj: 0,IsDeleted: 0}).then(response => {
        this.object = response.data;
        this.IdHouse = this.object[0].IdHouse;
      }).catch(err => {
        console.warn(err);
      });
      this.$store.dispatch('GET_FLAT_LIST', {IdHouse:1}).then(() => {

      }).catch(err => {
        console.warn(err);
      });
      this.$store.dispatch('GET_LS_LIST', {IdHouse:1}).then(() => {
        this.loading = false;
      }).catch(err => {
        console.warn(err);
      });
    },
    data()
    {
      return {
        loading: true,
        dialogAddLs: false,
        dialogSucces: false,
        dialogSuccesText: '',
        headers: [
          {
            text: 'Номер',
            align: 'start',
            value: 'LicSchet',
            filter: value => {
              if (!this.LicSchet) return true
              return value.toString().indexOf(this.LicSchet) !== -1
            },
          },
          { text: 'Собственник', value: 'Resident' },
          { text: 'Помещение', value: 'flatAdress' },
          { text: 'Площадь общая', value: 'PloschObsch' },
          { text: 'Площадь жилая', value: 'PloschJil' },
          { text: 'Проживает', value: 'cntResident' },
          { text: 'Задолженность', value: 'Balance' },
          { text: 'Дата открытия', value: 'DateAdd' },
          { text: 'Дата закрытия', value: 'DateClose' },
          { text: 'Закрыт', value: 'IsClose' },
        ],
        tsg:[],
        object:[],
        IdHouse:'',
        IdFlat:'',
        LicSchet:'',
        IsKapremont:false,
      }
    },
    computed: {
      ls(){
        return this.$store.getters.LS_LIST ? this.$store.getters.LS_LIST.data : [];
      },
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
      addLs(){
        this.$store.dispatch('LS_ADD', {
          IdFlat:this.IdFlat,
          IdHouse:this.IdHouse,
          IsClose:0,
          IsKapremont:this.IsKapremont==true?1:0,
        }).then(response => {
          if(response.status==1){

            this.dialogAddLs = false;
            this.dialogSuccesText = response.message;
            this.dialogSucces = true;
            this.loading = true;
            this.$store.dispatch('GET_LS_LIST', {IdHouse:this.IdHouse,IdFlat:this.IdFlat}).then(() => {
              this.loading = false;
            }).catch(err => {
              console.warn(err);
            });
          }else{
            this.dialogSuccesText = response.message;
            this.dialogSucces = true;
          }
        }).catch(err => {
          console.warn(err);
        });
      },
      onClickLsUpdate(item){
        this.$parent.addTab('Лицевой счёт '+ item.LicSchet, item.IdLs, 'LsAdd', {id: item.IdLs});
      },
      changeFilterHouse(){
        this.loading = true;
        this.IdFlat = '';
        this.$store.dispatch('GET_FLAT_LIST', {IdHouse:this.IdHouse}).then(() => {
        }).catch(err => {
          console.warn(err);
        });
        this.$store.dispatch('GET_LS_LIST', {IdHouse:this.IdHouse,IdFlat:this.IdFlat}).then(() => {
          this.loading = false;
        }).catch(err => {
          console.warn(err);
        });
      },
      changeFilter(){
        this.loading = true;
        this.$store.dispatch('GET_LS_LIST', {IdHouse:this.IdHouse,IdFlat:this.IdFlat}).then(() => {
          this.loading = false;
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
</style>