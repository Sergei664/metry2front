<template>
  <div class="tabcontent">
    <v-row>
      <v-col cols="6" >
        <v-col cols="12" >
          <v-row>
            <v-select
                style="max-width: 300px"
                :items="HouseItem"
                v-model="IdHouse"
                label="Объект"
                @input="changeFilter"
                dense
            ></v-select>
          </v-row>
        </v-col>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn color="primary" @click="onClickFlatAdd">Добавить помещение</v-btn>
      </v-col>
    </v-row>
    <v-skeleton-loader :loading="loading">
      <template>
        <v-data-table
            :headers="headers"
            :items="flats"
            class="elevation-1"
            @click:row="onClickFlatUpdate"
        >
          <template v-slot:item.LicSchet="{ item }">
            <span v-html="item.LicSchet"></span>
          </template>
        </v-data-table>
      </template>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: "Flats",
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
          text: 'Номер помещения',
          align: 'start',
          value: 'NumFlat',
        },
        { text: 'Лицевой счет', value: 'LicSchet' },
        { text: 'Площадь', value: 'PloschObsch' },
        { text: 'Проживает', value: 'cntResident' },
        { text: 'Тип помещения', value: 'TypeFl' },
      ],
      tsg:[],
      object:[],
      IdHouse:'',
    }
  },
  computed: {
    flats() {
      return this.$store.getters.FLAT_LIST ? this.$store.getters.FLAT_LIST.data : [];
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
    onClickFlatAdd(){
      this.$parent.addTab('Добавить помещение', 0, 'FlatAdd', {id: 0,IdHouseObj: this.IdHouse});
    },
    onClickFlatUpdate(item){
      this.$parent.addTab('Изменить помещение '+ item.NumFlat, item.IdFlat, 'FlatAdd', {id: item.IdFlat,IdHouseObj: this.IdHouse});
    },
    changeFilter(){
      this.loading = true;
      this.$store.dispatch('GET_FLAT_LIST', {IdHouse:this.IdHouse}).then(() => {
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