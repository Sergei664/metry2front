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
                label="УК Организация"
                @input="changeFilter"
                dense
            ></v-select>
          </v-row>
        </v-col>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn color="primary" @click="onClickKontragentAdd">Добавить организацию</v-btn>
      </v-col>
    </v-row>
    <v-skeleton-loader :loading="loading">
      <template>
        <v-data-table
            :headers="headers"
            :items="kontragents"
            class="elevation-1"
            @click:row="onClickKontragentUpdate"
        >
          <template v-slot:item.Kontdata="{ item }">
            <span v-html="item.Kontdata"></span>
          </template>
          <template v-slot:item.NameUsluga="{ item }">
            <span v-html="item.NameUsluga"></span>
          </template>
        </v-data-table>
      </template>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: "Kontragents",
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
      this.tsg = response.data;
    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_KONTRAGENT_LIST', {}).then(() => {
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
          text: 'КОНТРАГЕНТ',
          align: 'start',
          value: 'UrLicoPost',
        },
        { text: 'УСЛУГИ', value: 'NameUsluga' },
        { text: 'КОНТАКТЫ', value: 'Kontdata' },
      ],
      tsg:[],
      object:[],
      IdTsj:'',
    }
  },
  computed: {
    kontragents() {
      return this.$store.getters.KONTRAGENT_LIST ? this.$store.getters.KONTRAGENT_LIST.data : [];
    },
    TsjItem(){
      if (this.tsg) {
        let ret = [];
        this.tsg.forEach(itemtsg => {
          ret.push({text: itemtsg.Name,value: itemtsg.IdTsj});
        });
        return ret;
      }else{
        return [];
      }
    }
  },
  methods: {
    onClickKontragentAdd(){
      this.$parent.addTab('Добавить организацию', 0, 'KontragentAdd', {id: 0});
    },
    onClickKontragentUpdate(item){
      this.$parent.addTab('Изменить организацию '+ item.UrLicoPost, item.IdKontragent, 'KontragentAdd', {id: item.IdKontragent});
    },
    changeFilter(){
      this.loading = true;
      this.$store.dispatch('GET_KONTRAGENT_LIST', {IdTsj:this.IdTsj}).then(() => {
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