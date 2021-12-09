<template>
  <div class="tabcontent">
    <v-row>
      <v-col cols="6" >
        <v-col cols="12" >
          <v-row>
            <v-select
                style="max-width: 300px"
                :items="TsjItem"
                v-model="IdTsj"
                label="Объект"
                @input="changeFilter"
                dense
            ></v-select>
          </v-row>
        </v-col>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn color="primary" @click="onClickServiceAdd">Добавить услугу</v-btn>
      </v-col>
    </v-row>
    <v-skeleton-loader :loading="loading">
      <template>
        <v-data-table
            :headers="headers"
            :items="services"
            class="elevation-1"
            @click:row="onClickServiceUpdate"
        >
        </v-data-table>
      </template>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: "Services",
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
      this.tsg = response.data;
    }).catch(err => {
      console.warn(err);
    });
    /*this.$store.dispatch('GET_OBJECT_LIST', {IdTsj: 0,IsDeleted: 0}).then(response => {
      this.object = response.data;
    }).catch(err => {
      console.warn(err);
    });*/
    this.$store.dispatch('GET_SERVICE_LIST', {}).then(() => {
      this.loading = false;
    }).catch(err => {
      console.warn(err);
    });
  },
  data() {
    return {
      loading: true,
      headers: [
        {
          text: 'УСЛУГА',
          align: 'start',
          value: 'NameUsluga',
        },
        { text: 'ТАРИФ (ЗА ЕД.) РУБ', value: 'TarifSumm' },
        { text: 'ОРГАНИЗАЦИЯ', value: 'Tsj' },
        { text: 'ТИП УСЛУГИ', value: 'TypeYslugi' },
      ],
      tsg:[],
      object:[],
      IdTsj:'',
    }
  },
  computed: {
    services() {
      if(this.$store.getters.SERVICE_LIST && this.object){
        let ret = [];
        let serv = this.$store.getters.SERVICE_LIST.data;
        serv.forEach(itemserv => {
          if(itemserv.IdTsj>0){
            this.tsg.forEach(itemtsg => {
              if(itemserv.IdTsj == itemtsg.IdTsj){
                ret.push({NameUsluga: itemserv.NameUsluga,TarifSumm: itemserv.TarifSumm,TypeYslugi: itemserv.TypeYslugi,Tsj: itemtsg.Name, IdPost: itemserv.IdPost});
              }
            });
          }else{
            ret.push({NameUsluga: itemserv.NameUsluga,TarifSumm: itemserv.TarifSumm,TypeYslugi: itemserv.TypeYslugi, Tsj: '', IdPost: itemserv.IdPost});
          }
        });
        return ret;
      }else{
        return [];
      }
     // return this.$store.getters.SERVICE_LIST ? this.$store.getters.SERVICE_LIST.data : [];
    },
    TsjItem(){
      if (/*this.object && */this.tsg) {
        let ret = [];
        this.tsg.forEach(itemtsg => {
          ret.push({text: itemtsg.Name, value:itemtsg.IdTsj});
          /*this.object.forEach(itemobject => {
            if(itemtsg.IdTsj == itemobject.IdTsj){
              ret.push({text: itemobject.adress,value: itemobject.IdHouse});
            }
          });*/
        });
        return ret;
      }else{
        return [];
      }

    }
  },
  methods: {
    onClickServiceAdd(){
      this.$parent.addTab('Добавить услугу', 0, 'ServiceAdd', {id: 0});
    },
    onClickServiceUpdate(item){
      this.$parent.addTab('Изменить услугу '+ item.NameUsluga, item.IdPost, 'ServiceAdd', {id: item.IdPost});
    },
    changeFilter(){
      this.loading = true;
      this.$store.dispatch('GET_SERVICE_LIST', {IdTsj:this.IdTsj}).then(() => {
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