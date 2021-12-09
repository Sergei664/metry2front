<template>
  <div class="tabcontent">
    <v-row>
    </v-row>
    <template>
      <v-tabs>
        <v-tab>Общие данные</v-tab>
        <v-tab>Счётчики</v-tab>
        <v-tab>Начисления</v-tab>
        <v-tab>Платежи</v-tab>
        <v-tab>Перерасчёты</v-tab>
        <v-tab>Собственники жители</v-tab>
        <v-tab>Услуги</v-tab>
        <v-tab>Заметки</v-tab>


          <v-tab-item>
            <v-skeleton-loader :loading="loading">
              <p>
                Номер лицевого счёта: {{ls.LicSchet}}
              </p>
              <p>
                Задолженность: {{ls.Balance}}
              </p>
              <p v-show="ls.IsClose == 0">
                Открыт: {{ls.DateAdd}}
              </p>
              <p v-show="ls.IsClose == 1">
                Закрыт: {{ls.DateClose}}
              </p>
              <p>
                Адрес: {{ls.Adress}}
              </p>
              <p>
                Собственник: {{ls.SobstvennikFIO}}
              </p>
              <p>
                Количество проживающих: {{ls.cntResident}}
              </p>
              <p>
                Площадь общая: {{ls.PloschObsch}}
              </p>
              <p>
                Площадь жилая: {{ls.PloschJil}}
              </p>
              <p>
                Тип помещения: {{ls.TypeFl}}
              </p>
              <p>
                Число комнат: {{ls.CntRooms}}
              </p>
              <p>
                Подъезд: {{ls.Podesd}}
              </p>
              <p>
                Этаж: {{ls.Etaj}}
              </p>
            </v-skeleton-loader>
          </v-tab-item>
          <v-tab-item>
            Счётчики
          </v-tab-item>
          <v-tab-item>
            Начисления
          </v-tab-item>
          <v-tab-item>
            Платежи
          </v-tab-item>
          <v-tab-item>
            Перерасчёты
          </v-tab-item>
          <v-tab-item>

            <ul>
              <template v-for="(resident) in residents">
                <li class="mb-3" style="cursor: pointer;color: #1976d2;" :key="resident.IdResid" @click="onClickResidentUpdate(resident)" :dense="true">
                  {{resident.Surname}} {{resident.Name}} {{resident.Patronymic}}
                </li>
              </template>
            </ul>
          </v-tab-item>
          <v-tab-item>
            <ul>
              <template v-for="(service) in services">
                <li class="mb-3" style="cursor: pointer;color: #1976d2;" :key="service.IdPost" @click="onClickServiceUpdate(service)" :dense="true">
                  {{service.NameUsluga}}
                </li>
              </template>
            </ul>
          </v-tab-item>
          <v-tab-item>
            Заметки
          </v-tab-item>

      </v-tabs>
    </template>

  </div>
</template>

<script>
export default {
  name: "LsAdd",
  props: ['id'],
  mounted() {
    this.$store.dispatch('GET_LS', {
      id:this.$props.id,
    }).then(response => {
      if(response.status==1){
        if(response.data.IdLs>0){

          this.ls = response.data;
          this.flat = response.flat;
          this.residents = response.residents;
          this.services = response.services;
          this.loading = false;

        }
      }
    }).catch(err => {
      console.warn(err);
    });
  },
  data() {
    return {
      loading: true,
      ls:[],
      flat:[],
      residents:[],
      services:[],
    }
  },
  methods: {
    onClickResidentUpdate(item){
      console.log(item);
    },
    onClickServiceUpdate(item){
      this.$parent.addTab('Изменить услугу '+ item.NameUsluga, item.IdPost, 'ServiceAdd', {id: item.IdPost});
    }
  },

}
</script>

<style scoped>
  .tabcontent {
    padding-top: 60px;
  }
</style>