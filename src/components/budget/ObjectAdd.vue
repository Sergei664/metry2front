<template>
  <div class="tabcontent">
    <v-row>
      <v-col cols="6">
        <v-select
            :items="TsjItem"
            v-model="IdTsj"
            label="Организация*"
            required
            dense
        ></v-select>
        <h4>Адрес дома</h4>
        <v-text-field
            v-model="AdresRegion"
            label="Регион*"
            required
        ></v-text-field>
        <v-text-field
            v-model="AdresCity"
            label="Населённый пункт*"
            required
        ></v-text-field>
        <v-text-field
            v-model="AdresStreet"
            label="Улица*"
            required
        ></v-text-field>
        <v-text-field
            v-model="AdresHome"
            label="Номер дома*"
            required
        ></v-text-field>
        <v-textarea
            v-model="NoteHouse"
            label="Примечание к дому"
        ></v-textarea>
        <v-text-field
            v-model="FIASCode"
            label="Код дома по ФИАС"
        ></v-text-field>
        <v-text-field
            v-model="OKTMO"
            label="OKTMO"
        ></v-text-field>
        <v-text-field
            v-model="KodastrNum"
            label="Кадастровый номер"
        ></v-text-field>
        <v-text-field
            v-model="GisgkhId"
            label="Код дома в ГИС ЖКХ"
        ></v-text-field>
        <h4>Дополнительные параметры</h4>
        <v-select
            :items="TypeFoundationItem"
            v-model="TypeFoundation"
            label="Тип фундамента"
            dense
        ></v-select>
        <v-select
            :items="WallMaterialItem"
            v-model="WallMaterial"
            label="Материал стен"
            dense
        ></v-select>
        <v-select
            :items="OverlapMaterialItem"
            v-model="OverlapMaterial"
            label="Материал перекрытия"
            dense
        ></v-select>
        <v-select
            :items="RoofMaterialItem"
            v-model="RoofMaterial"
            label="Материал кровли"
            dense
        ></v-select>
        <v-text-field
            v-model="OverhaulYear"
            label="Год последнего кап.ремонта"
        ></v-text-field>
        <v-text-field
            v-model="CntLS"
            label="Количество лицевых счетов"
        ></v-text-field>
        <v-text-field
            v-model="CntResident"
            label="Количество жителей"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            class="mx-auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
                v-model="DateStartUpravlen"
                persistent-hint
                v-bind="attrs"
                label="Дата начала управления"
                @blur="dateStart = parseDate(DateStartUpravlen)"
                v-on="on"
                :dense="true"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateStart" @change="changeDate" no-title @input="menu = false"></v-date-picker>
        </v-menu>

        <h4>Площади</h4>
        <v-text-field
            v-model="PloshObsh"
            label="Общая площадь дома"
        ></v-text-field>
        <v-text-field
            v-model="PloshGilaya"
            label="Площадь жилых помещений"
        ></v-text-field>
        <v-text-field
            v-model="PloshNeGilaya"
            label="Площадь нежилых помещений"
        ></v-text-field>

        <v-text-field
            v-model="PloshObPolz"
            label="Площадь МОП уборочная"
        ></v-text-field>
        <v-text-field
            v-model="PloshObOsvesh"
            label="Площадь МОП освещаемая"
        ></v-text-field>
        <v-text-field
            v-model="PloshZemUchastka"
            label="Площадь земельного участка"
        ></v-text-field>
        <v-text-field
            v-model="KadastrNumZemlia"
            label="Кадастровый номер земельного участка"
        ></v-text-field>
        <h4>Характеристики дома</h4>
        <v-text-field
            v-model="VidHouse"
            label="Вид жилого дома"
        ></v-text-field>
        <v-select
            :items="SostoyanieItem"
            v-model="Sostoyanie"
            label="Состояние дома"
            dense
        ></v-select>

        <v-select
            :items="TypeHouseItem"
            v-model="TypeHouse"
            label="Тип дома"
            dense
        ></v-select>
        <v-text-field
            v-model="SeriaTipProject"
            label="Серия, тип проекта"
        ></v-text-field>
        <v-text-field
            v-model="YearPostroiki"
            label="Год постройки"
        ></v-text-field>
        <v-text-field
            v-model="YearBuild"
            label="Год ввода в эксплуатацию"
        ></v-text-field>
        <v-text-field
            v-model="CntEtaj"
            label="Количество этажей"
        ></v-text-field>
        <v-text-field
            v-model="CntPodiezd"
            label="Количество подъездов"
        ></v-text-field>
        <v-text-field
            v-model="CntLift"
            label="Количество лифтов"
        ></v-text-field>
        <v-text-field
            v-model="CntGilFlat"
            label="Количество жилых помещений"
        ></v-text-field>
        <v-text-field
            v-model="CntNoGilFlat"
            label="Количество нежилых помещений"
        ></v-text-field>
        <v-select
            :items="KlassEnergEffectivItem"
            v-model="KlassEnergEffectiv"
            label="Класс энергетической эффективности"
            dense
        ></v-select>
        <v-text-field
            v-model="Iznos"
            label="Износ, %"
        ></v-text-field>
        <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            class="mx-auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
                v-model="DateIznos"
                persistent-hint
                v-bind="attrs"
                label="Дата, на которую установлен износ здания"
                @blur="dateSv = parseDate(DateIznos)"
                v-on="on"
                :dense="true"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateSv" @change="changeDate" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>
        <v-checkbox
            v-model="IsKulturNasl"
            label="Наличие статус культурного наследния"
        ></v-checkbox>
        <v-checkbox
            v-model="IsUseGaz"
            label="Использование газа"
        ></v-checkbox>
        <v-checkbox
            v-model="NalichiePodzemPark"
            label="Наличие подземного паркинга"
        ></v-checkbox>
        <v-checkbox
            v-model="NalichPrispbInv"
            label="Наличие приспособление для маломобильных групп населения"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-btn
        color="primary"
        @click="addObject"
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
  name: "ObjectAdd",
  props: ['id'],
  mounted() {
    this.$store.dispatch('GET_TSG_ALL_LIST', {IsDeleted: 0}).then(response => {
      let tsg = response.data;
      tsg.forEach(item => {
          this.TsjItem.push({value: item.IdTsj, text: item.Name,});
      });
    }).catch(err => {
      console.warn(err);
    });
    if(this.$props.id>0){
      this.$store.dispatch('GET_OBJECT', {
        id:this.$props.id,
      }).then(response => {
        console.log(response);
        if(response.status==1){
          this.IdHouse = response.data.IdHouse;
          this.AdresRegion = response.data.AdresRegion;
          this.AdresCity = response.data.AdresCity;
          this.AdresStreet = response.data.AdresStreet;
          this.AdresHome = response.data.AdresHome;
          this.NoteHouse = response.data.NoteHouse;
          this.FIASCode = response.data.FIASCode;
          this.OKTMO = response.data.OKTMO;
          this.KodastrNum = response.data.KodastrNum;
          this.PloshObsh = response.data.PloshObsh;
          this.PloshGilaya = response.data.PloshGilaya;
          this.PloshNeGilaya = response.data.PloshNeGilaya;
          this.PloshObPolz = response.data.PloshObPolz;
          this.PloshObOsvesh = response.data.PloshObOsvesh;
          this.GisgkhId = response.data.GisgkhId;
          this.PloshZemUchastka = response.data.PloshZemUchastka;
          this.KadastrNumZemlia = response.data.KadastrNumZemlia;

          this.VidHouse = response.data.VidHouse;
          this.Sostoyanie = response.data.Sostoyanie;
          this.IsKulturNasl = response.data.IsKulturNasl==1?true:false;
          this.TypeHouse = response.data.TypeHouse;
          this.SeriaTipProject = response.data.SeriaTipProject;
          this.YearPostroiki = response.data.YearPostroiki;
          this.YearBuild = response.data.YearBuild;
          this.DateIznos = response.data.DateIznos;
          this.DateStartUpravlen = response.data.DateStartUpravlen;

          this.CntEtaj = response.data.CntEtaj;
          this.CntPodiezd = response.data.CntPodiezd;
          this.CntLift = response.data.CntLift;
          this.CntGilFlat = response.data.CntGilFlat;
          this.CntNoGilFlat = response.data.CntNoGilFlat;
          this.KlassEnergEffectiv = response.data.KlassEnergEffectiv;
          this.Iznos = response.data.Iznos;
          this.IsUseGaz = response.data.IsUseGaz==1?true:false;
          this.NalichiePodzemPark = response.data.NalichiePodzemPark==1?true:false;
          this.NalichPrispbInv = response.data.NalichPrispbInv==1?true:false;

          this.TypeFoundation = response.data.TypeFoundation;
          this.WallMaterial = response.data.WallMaterial;
          this.OverlapMaterial = response.data.OverlapMaterial;
          this.RoofMaterial = response.data.RoofMaterial;
          this.OverhaulYear = response.data.OverhaulYear;
          this.CntLS = response.data.CntLS;
          this.CntResident = response.data.CntResident;
          this.IdTsj = response.data.IdTsj;
        }

      }).catch(err => {
        console.warn(err);
      });
    }
  },
  data() {
    return {
      loading: true,
      dialogSucces: false,
      dialogSuccesText: '',
      TsjItem:[],
      TypeHouseItem:[
        {text: 'Каменнный, кирпичный', value: 1,},
        {text: 'Панельные', value: 2,},
        {text: 'Блочные', value: 3,},
        {text: 'Смешанные', value: 4,},
        {text: 'Деревянные', value: 5,},
        {text: 'Монолитные', value: 6,},
        {text: 'Иные', value: 7,},
      ],
      SostoyanieItem:[
        {text: 'Аварийный', value: 1,},
        {text: 'Ветхий', value: 2,},
        {text: 'Исправный', value: 3,},
      ],
      KlassEnergEffectivItem:[
        {text: 'A', value: 1,},
        {text: 'B++', value: 2,},
        {text: 'B+', value: 3,},
        {text: 'C', value: 4,},
        {text: 'D', value: 5,},
        {text: 'E', value: 6,},
        {text: 'B', value: 7,},
      ],
      TypeFoundationItem:[
        {text: 'Ленточный', value: 1,},
        {text: 'Бетонные столбы', value: 2,},
        {text: 'Свайный', value: 3,},
        {text: 'Иной', value: 4,},
        {text: 'Столбчатый', value: 5,},
        {text: 'Сплошной', value: 6,},
        {text: 'Сборный', value: 7,},
        {text: 'Отсутсвует', value: 8,},
      ],
      WallMaterialItem:[
        {text: 'Каменнные, кирпичные', value: 1,},
        {text: 'Панельные', value: 2,},
        {text: 'Блочные', value: 3,},
        {text: 'Смешанные', value: 4,},
        {text: 'Деревянные', value: 5,},
        {text: 'Монолитные', value: 6,},
        {text: 'Иные', value: 7,},
      ],
      OverlapMaterialItem:[
        {text: 'Железнобетонные', value: 1,},
        {text: 'Деревянные', value: 2,},
        {text: 'Смешанные', value: 3,},
        {text: 'Иные', value: 4,},
      ],
      RoofMaterialItem:[
        {text: 'Из волнистых и полуволнистых асбестоцементных листов (шиферная)', value: 1,},
        {text: 'Из оцинкованной стали', value: 2,},
        {text: 'Из металлочерепицы', value: 3,},
        {text: 'Из профилированного настила', value: 4,},
        {text: 'Из рулонных материалов', value: 5,},
        {text: 'Мягкая (наплавляемая) крыша', value: 6,},
        {text: 'Из иного материала', value: 7,},
        {text: 'Безрулонная железобетонная крыша', value: 8,},
      ],
      IdHouse:'',
      AdresRegion:'',
      AdresCity:'',
      AdresStreet:'',
      AdresHome:'',
      NoteHouse:'',
      FIASCode:'',
      OKTMO:'',
      KodastrNum:'',
      PloshObsh:'',
      PloshGilaya:'',
      PloshNeGilaya:'',
      PloshObPolz:'',
      PloshObOsvesh:'',
      GisgkhId:'',
      PloshZemUchastka:'',
      KadastrNumZemlia:'',
      VidHouse:'',
      Sostoyanie:'',
      IsKulturNasl:false,
      TypeHouse:'',
      SeriaTipProject:'',
      YearPostroiki:'',
      YearBuild:'',
      DateIznos:'',
      menu2: false,
      dateSv: '',
      DateStartUpravlen:'',
      menu: false,
      dateStart: '',
      CntEtaj: '',
      CntPodiezd: '',
      CntLift: '',
      CntGilFlat: '',
      CntNoGilFlat: '',
      KlassEnergEffectiv: '',
      Iznos: '',
      IsUseGaz:false,
      NalichiePodzemPark:false,
      NalichPrispbInv:false,
      TypeFoundation: '',
      WallMaterial: '',
      OverlapMaterial: '',
      RoofMaterial: '',
      OverhaulYear: '',
      CntLS: '',
      CntResident: '',
      IdTsj: '',
    }
  },
  methods: {
    addObject(){
      this.$store.dispatch('OBJECT_ADD', {

        IdHouse:this.IdHouse,
        AdresRegion:this.AdresRegion,
        AdresCity:this.AdresCity,
        AdresStreet:this.AdresStreet,
        AdresHome:this.AdresHome,
        NoteHouse:this.NoteHouse,
        FIASCode:this.FIASCode,
        OKTMO:this.OKTMO,
        KodastrNum:this.KodastrNum,
        PloshObsh:this.PloshObsh,
        PloshGilaya:this.PloshGilaya,
        PloshNeGilaya:this.PloshGilaya,
        PloshObPolz:this.PloshObPolz,
        PloshObOsvesh:this.PloshObOsvesh,
        GisgkhId:this.GisgkhId,
        PloshZemUchastka:this.PloshZemUchastka,
        KadastrNumZemlia:this.KadastrNumZemlia,
        VidHouse:this.VidHouse,
        Sostoyanie:this.Sostoyanie,
        IsKulturNasl:this.IsKulturNasl==false?0:1,
        TypeHouse:this.TypeHouse,
        SeriaTipProject:this.SeriaTipProject,
        YearPostroiki:this.YearPostroiki,
        YearBuild:this.YearBuild,
        DateIznos:this.DateIznos,
        DateStartUpravlen:this.DateStartUpravlen,
        CntEtaj: this.CntEtaj,
        CntPodiezd: this.CntPodiezd,
        CntLift: this.CntLift,
        CntGilFlat: this.CntGilFlat,
        CntNoGilFlat: this.CntNoGilFlat,
        KlassEnergEffectiv: this.KlassEnergEffectiv,
        Iznos: this.Iznos,
        IsUseGaz:this.IsUseGaz==false?0:1,
        NalichiePodzemPark:this.NalichiePodzemPark==false?0:1,
        NalichPrispbInv:this.NalichPrispbInv==false?0:1,
        TypeFoundation: this.TypeFoundation,
        WallMaterial: this.WallMaterial,
        OverlapMaterial: this.OverlapMaterial,
        RoofMaterial: this.RoofMaterial,
        OverhaulYear: this.OverhaulYear,
        CntLS: this.CntLS,
        CntResident: this.CntResident,
        IdTsj: this.IdTsj,

      }).then(response => {
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
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split('.');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    changeDate() {
      if(this.dateSv) {
        let date = new Date(this.dateSv);
        let month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateIznos = day + '.' + month + '.' + date.getFullYear();
      }
      if(this.dateStart) {
        let date = new Date(this.dateStart);
        let month = date.getMonth() + 1;

        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        this.DateStartUpravlen = day + '.' + month + '.' + date.getFullYear();
      }
    },
  }
}
</script>

<style scoped>
  .tabcontent {
    padding-top: 60px;
  }
</style>