<template>
  <div class="tabcontent">
    <v-row>
      <v-col cols="6">

        <v-text-field
            v-model="UrLicoPost"
            label="Наименование контрагента*"
            required
        ></v-text-field>

        <v-radio-group
            v-model="IsFizLico"
            row
            mandatory
        >
          <v-radio
              label="Физическое лицо"
              value="1"
          ></v-radio>
          <v-radio
              label="Юридическое лицо / ИП"
              value="0"
          ></v-radio>
        </v-radio-group>
        <v-text-field
            v-model="InnPost"
            label="ИНН"
        ></v-text-field>
        <v-text-field
            v-model="Kpp"
            label="КПП"
        ></v-text-field>
        <v-text-field
            v-model="NameBank"
            label="Банк"
        ></v-text-field>
        <v-text-field
            v-model="BicBank"
            label="Бик банка"
        ></v-text-field>
        <v-text-field
            v-model="KorSchet"
            label="Корреспондентский счет"
        ></v-text-field>
        <v-text-field
            v-model="RaschSchet"
            label="Расчетный счет"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-select
            :items="TsjItem"
            v-model="IdTsj"
            label="УК Организация"
            dense
        ></v-select>
        <v-select
            :items="TypeKontragItem"
            v-model="TypeKontrag"
            label="Статус поставщика"
            dense
        ></v-select>
        <v-checkbox
            v-model="PNDS"
            label="Плательщик НДС"
        ></v-checkbox>
        <v-text-field
            v-model="NameDirector"
            label="ФИО директора"
        ></v-text-field>
        <v-textarea
            v-model="Kontdata"
            label="Контактная информация"
        ></v-textarea>
        <div v-show="services.length>0">
          Услуги
          <ul>
            <template v-for="(service) in services">
              <li style="cursor: pointer;color: #1976d2;" :key="service.IdPost" @click="onClickServiceUpdate(service)" :dense="true">
                {{service.NameUsluga}}
              </li>
            </template>
          </ul>
        </div>
      </v-col>
    </v-row>
    <v-btn
        color="primary"
        @click="addKontragent"
    >
      Сохранить
    </v-btn>
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
  name: "KontragentAdd",
  props: ['id'],
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
      this.tsg = response.data;
    }).catch(err => {
      console.warn(err);
    });
    this.$store.dispatch('GET_KONTRAGENT', {
      id:this.$props.id,
    }).then(response => {
      if(response.status==1){
        this.TypeKontragItem = response.TypeKontragItem;
        this.services = response.services;
        if(response.data.IdKontragent>0){
          this.IdKontragent = response.data.IdKontragent;
          this.UrLicoPost = response.data.UrLicoPost;
          this.IdTsj = response.data.IdTsj;
          this.PNDS = response.data.PNDS==1?true:false;
          this.InnPost = response.data.InnPost;
          this.Kpp = response.data.Kpp;
          this.NameBank = response.data.NameBank;
          this.BicBank = response.data.BicBank;
          this.KorSchet = response.data.KorSchet;
          this.RaschSchet = response.data.RaschSchet;
          this.TypeKontrag = response.data.TypeKontrag;
          this.NameDirector = response.data.NameDirector;
          this.Kontdata = response.data.Kontdata;
          this.IsFizLico = String(response.data.IsFizLico);
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
      tsg:[],
      IdKontragent:0,
      dialogSuccesText: '',
      UrLicoPost: '',
      IdTsj:'',
      PNDS:false,
      IsFizLico:'0',
      InnPost: '',
      Kpp: '',
      NameBank: '',
      BicBank: '',
      KorSchet: '',
      RaschSchet: '',
      TypeKontrag: '',
      NameDirector: '',
      Kontdata: '',
      TypeKontragItem:[],
      services:[],
    }
  },
  computed: {
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
    onClickServiceUpdate(item){
      this.$parent.addTab('Изменить услугу '+ item.NameUsluga, item.IdPost, 'ServiceAdd', {id: item.IdPost});
    },
    addKontragent() {
      this.$store.dispatch('KONTRAGENT_ADD', {
        IdKontragent:this.IdKontragent,
        UrLicoPost:this.UrLicoPost,
        IdTsj:this.IdTsj,
        PNDS:this.PNDS==false?0:1,
        IsFizLico:this.IsFizLico,
        InnPost:this.InnPost,
        Kpp:this.Kpp,
        NameBank:this.NameBank,
        BicBank:this.BicBank,
        KorSchet:this.KorSchet,
        RaschSchet:this.RaschSchet,
        TypeKontrag:this.TypeKontrag,
        NameDirector:this.NameDirector,
        Kontdata:this.Kontdata,

      }).then(response => {
        if(response.status==1){
          if(this.IdKontragent==0) {
            this.UrLicoPost = '';
            this.IdTsj = '';
            this.PNDS = false;
            this.IsFizLico = '0';
            this.InnPost = '';
            this.Kpp = '';
            this.NameBank = '';
            this.BicBank = '';
            this.KorSchet = '';
            this.RaschSchet = '';
            this.TypeKontrag = '';
            this.NameDirector = '';
            this.Kontdata = '';
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
</style>