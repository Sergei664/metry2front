<template>
  <div class="tabcontent">
    <v-row>
      <v-col cols="6" >

            <v-select
                style="max-width: 300px"
                :items="tsgItem"
                v-model="IdTsj"
                label="Организация"
                @input="changeFilter"
                dense
            ></v-select>

      </v-col>

    </v-row>
    <v-skeleton-loader :loading="loading">
      <template>
        <v-data-table
            :headers="headers"
            :items="objects"
            class="elevation-1"
            @click:row="onClickKvitanciaUpdate"
        >
        </v-data-table>
      </template>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: "Kvitancia",
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: this.isDeleted}).then(response => {
      this.tsg = response.data;
      this.tsgItem.push({value: 0, text: 'Все организации',});
      this.tsg.forEach(item => {
        if(item.IsDeleted==0)
          this.tsgItem.push({value: item.IdTsj, text: item.Name,});
      });
    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_OBJECT_LIST', {IdTsj: this.IdTsj,IsDeleted: this.isDeleted}).then(() => {
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
          text: 'Адрес',
          align: 'start',
          value: 'adress',
        },
        { text: 'Название компании', value: 'companyName' },
        { text: 'Кол-во квартир', value: 'CntFlat' },
        { text: 'Этажей', value: 'CntEtaj' },
        { text: 'S общая', value: 'PloshObsh' },
        { text: 'S жильцов', value: 'PloshGilaya' },
        { text: 'Начало обслуживания', value: 'DateStartUpravlen' },
        { text: 'Статус договора', value: 'status' },
      ],
      tsg:[],
      tsgItem:[],
      IdTsj:0,
      isDeleted:0,
    }
  },
  computed: {
    objects() {
      let objects = this.$store.getters.OBJECT_LIST ? this.$store.getters.OBJECT_LIST.data : [];
      if (objects && this.tsg) {
        let ret = [];
        this.tsg.forEach(item => {
          ret[item.IdTsj] = item.Name;
        });
        objects.forEach(item => {
          item.companyName = ret[item.IdTsj]
        })

      }
      return objects;
    },
  },
  methods: {
    onClickKvitanciaUpdate(item){
      this.$parent.addTab('Квитанции '+ item.adress, item.IdHouse, 'KvitanciaAdd', {id: item.IdHouse});
    },
    changeFilter(){
      this.$store.dispatch('GET_OBJECT_LIST', {IdTsj: this.IdTsj,IsDeleted: this.isDeleted==true?1:0});
    }
  }
}
</script>

<style scoped>
  .tabcontent {
    padding-top: 60px;
  }
</style>