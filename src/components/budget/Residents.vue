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
        <v-btn color="primary" @click="onClickResidentAdd">Добавить потребителя</v-btn>
      </v-col>
    </v-row>
    <v-skeleton-loader :loading="loading">
      <template>
        <v-data-table
            :headers="headers"
            :items="residents"
            class="elevation-1"
            @click:row="onClickResidentUpdate"
        >
          <template v-slot:body.prepend>
            <tr>
              <td>
                <v-text-field
                    label="Введите фамилию"
                    v-model="Surname"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                    label="Введите имя"
                    v-model="Name"
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                    label="Введите отчество"
                    v-model="Patronymic"
                ></v-text-field>
              </td>
              <td colspan="9"></td>
            </tr>
          </template>
        </v-data-table>
      </template>
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: "Residents",
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
    this.$store.dispatch('GET_FLAT_LIST', {IdHouse:1}).then(() => {

    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_RESIDENT_LIST', {IdHouse:1,IdFlat:0}).then(() => {
      this.loading = false;
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
      tsg: [],
      object: [],
      IdHouse: '',
      IdFlat: '',
      headers: [
        {
          text: 'Фамилия',
          align: 'start',
          value: 'Surname',
          filter: value => {
            if (!this.Surname) return true
            return value.toString().indexOf(this.Surname) !== -1
          },
        },
        { text: 'Имя', value: 'Name',
          filter: value => {
            if (!this.Name) return true
            return value.toString().indexOf(this.Name) !== -1
          },
        },
        { text: 'Отчество', value: 'Patronymic',
          filter: value => {
            if (!this.Patronymic) return true
            return value.toString().indexOf(this.Patronymic) !== -1
          },
        },
        { text: 'Дата рождения', value: 'DateRojden' },
        { text: 'Дата регистрация', value: 'DateRegister' },
        { text: 'Собственник', value: 'IsSobstvennik' },
      ],
      Surname:'',
      Name:'',
      Patronymic:'',
    }
  },
  computed: {
    residents(){
      return this.$store.getters.RESIDENT_LIST ? this.$store.getters.RESIDENT_LIST.data : [];
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
    onClickResidentAdd(){
      this.$parent.addTab('Добавить потребителя', 0, 'ResidentAdd', {id: 0});
    },
    onClickResidentUpdate(item){
      this.$parent.addTab('Потребитель ' + item.FIO, item.IdResid, 'ResidentAdd', {id: item.IdResid});
    },
    changeFilterHouse(){
      this.loading = true;
      this.IdFlat = '';
      this.$store.dispatch('GET_FLAT_LIST', {IdHouse:this.IdHouse}).then(() => {
      }).catch(err => {
        console.warn(err);
      });
      this.$store.dispatch('GET_RESIDENT_LIST', {IdHouse:this.IdHouse,IdFlat:0}).then(() => {
        this.loading = false;
      }).catch(err => {
        console.warn(err);
      });
    },
    changeFilter(){
      this.loading = true;
      this.$store.dispatch('GET_RESIDENT_LIST', {IdHouse:this.IdHouse,IdFlat:this.IdFlat}).then(() => {
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