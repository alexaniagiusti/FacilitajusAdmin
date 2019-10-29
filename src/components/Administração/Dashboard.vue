<template>
  <v-container fluid>
    <v-layout row>
      <v-flex  :style="`cursor: pointer`" @click="$router.push('/usuarios')" xs12 md4>
        <v-card  class="mt-5 pt-4 ml-4 mx-auto">
          <v-sheet
            class="btnn v-sheet--offset mx-auto"
            color="white"
            max-width="calc(100% - 25px)"
          >
            <Chart id="Novos usuários" type="line" :labels="labels" :dados="chartUsuarios" />
          </v-sheet>

          <v-card-text class="pt-0">
            <div
              class="title font-weight-bold mb-2 text-center"
            >{{ usuarios.length }} Usuários Cadastrados</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex style="cursor: pointer" @click="$router.push('/diligencias')" xs12 md4>
        <v-card class="mt-5 pt-4 ml-4 mx-auto">
          <v-sheet
            class="btnn1 v-sheet--offset mx-auto"
            max-width="calc(100% - 25px)"
          >
            <Chart id="Novos serviços" type="line" :labels="labels" :dados="chartServicos" />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-bold mb-2 text-center">{{servicos.length}} Serviços Cadastrados</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex style="cursor: pointer" @click="$router.push('/duvidas')" xs12 md4>
        <v-card class="mt-5 pt-4 ml-4 mr-4 mx-auto">
          <v-sheet
            class="btnn2 v-sheet--offset mx-auto"
            max-width="calc(100% - 25px)"
          >
            <Chart id="Novas dúvidas" type="line" :labels="labels" :dados="chartDuvidas" />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-bold mb-2 text-center">{{duvidas.length}} Dúvidas Cadastradas</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      effects: {
        userScale: 0.9,
        class: ''
      },
      usuarios: [],
      servicos: [],
      duvidas: [],
      chartUsuarios: [],
      chartServicos: [],
      chartDuvidas: [],
      labels: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ]
    };
  },
  methods: {
    getUsuarios() {
      this.$axios
        .get(`${this.$api}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getToken}`
          }})
        .then(
          res => {
            this.usuarios = res.data
            this.chart(res.data, "usuarios")
          },
          
        )
        .then(() => this.getServicos());
    },
    getServicos() {
      this.$axios
        .get(`${this.$api}/api/v1/diligences`, this.$headers)
        .then(
          res => {
            this.servicos = res.data
            this.chart(res.data, "servicos")
          },
        )
        .then(() => this.getDuvidas());
    },
    getDuvidas() {
      this.$axios
        .get(`${this.$api}/api/v1/legal-cases`, this.$headers)
        .then(
          res => {
            this.duvidas = res.data
            this.chart(res.data, "duvidas")
          },
        )
        .then(() => this.$store.commit("setVueLoad", false));
    },
    chart(dados, origem) {
      console.log("dados", dados)
      let retultado = [];

      let meses = [0,0,0,0,0,0,0,0,0,0,0,0];

      dados.filter(item => {
        console.log("mes", moment(item.created_at).format("MM"))
        switch (`${moment(item.created_at).format("MM")}`) {
          case '01':
            return meses[0] = 1;
            break;
          case '02':
            return meses[1] += 1;
            break;
          case '03':
            return meses[2] += 1;
            break;
          case '04':
            return meses[3] += 1;
            break;
          case '05':
            return meses[4] += 1;
            break;
          case '06':
            return meses[5] += 1;
            break;
          case '07':
            return meses[6] += 1;
            break;
          case '08':
            return meses[7] += 1;
            break;
          case '09':
            return meses[8] += 1;
            break;
          case '10':
            return meses[9] += 1;
            break;
          case '11':
            return meses[10] += 1;
            break;
          case '12':
            return meses[11] += 1;
            break;
          default:
            console.log("n/a");
        }
      });

      switch (origem) {
        case "usuarios":
          this.chartUsuarios = meses;
          break;
        case "servicos":
          this.chartServicos = meses;
          break;
        case "duvidas":
          this.chartDuvidas = meses;
          break;
        default:
          console.log("n/a");
      }
    }
  },
  created() {
    this.$store.commit("setVueLoad", true);
    this.getUsuarios();
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}

.btnn {
  background: linear-gradient(45deg, #a8e063 30%, #c5e79a 90%);
  border-radius: 3px;
  border: 0;
  min-height: 150px;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(21, 255, 0, 0.1);
}
.btnn1 {
  background: linear-gradient(45deg, #8280f1 30%, #9ab9e7 90%);
  border-radius: 3px;
  border: 0;
  min-height: 150px;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(0, 38, 255, 0.1);
}
.btnn2 {
  background: linear-gradient(45deg, #e06363 30%, #e79a9a 90%);
  border-radius: 3px;
  border: 0;
  min-height: 150px;
  color: white;
  box-shadow: 0 3px 5px 2px rgba(255, 0, 0, 0.1);
}
</style>