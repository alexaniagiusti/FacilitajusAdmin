<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md4>
        <v-card class="mt-5 pt-4 ml-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="teal"
            elevation="12"
            max-width="calc(100% - 100px)"
          >
            <v-icon color="white" size="60" class="pa-2">person</v-icon>
            <div>
              <p
                class="text-right pa-3 mt-5"
                style="font-size: 35pt; color: white"
              >{{ usuarios.length }}</p>
            </div>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-bold mb-2 text-center">Usuários Cadastrados</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="mt-5 pt-4 ml-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 100px)"
          >
            <v-icon color="white" size="60" class="pa-2">work</v-icon>
            <div>
              <p
                class="text-right pa-3 mt-5"
                style="font-size: 35pt; color: white"
              >{{ servicos.length }}</p>
            </div>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-bold mb-2 text-center">Serviços Cadastrados</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="mt-5 pt-4 ml-4 mr-4 mx-auto" max-width="400">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="#C62828"
            elevation="12"
            max-width="calc(100% - 100px)"
          >
            <v-icon color="white" size="60" class="pa-2">gavel</v-icon>
            <div>
              <p
                class="text-right pa-3 mt-5"
                style="font-size: 35pt; color: white"
              >{{ duvidas.length }}</p>
            </div>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-bold mb-2 text-center">Dúvidas Cadastradas</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      usuarios: [],
      servicos: [],
      duvidas: []
    };
  },
  methods: {
    getUsuarios() {
      this.$axios
        .get(`${this.$api}/api/v1/users`, this.$headers)
        .then(res => (this.usuarios = res.data))
        .then(() => this.getServicos());
    },
    getServicos() {
      this.$axios
        .get(`${this.$api}/api/v1/diligences`, this.$headers)
        .then(res => (this.servicos = res.data))
        .then(() => this.getDuvidas());
    },
    getDuvidas() {
      this.$axios
        .get(`${this.$api}/api/v1/legal-cases`, this.$headers)
        .then(res => (this.duvidas = res.data))
        .then(() => this.$store.commit("setVueLoad", false));
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
  background: linear-gradient(45deg, #56ab2f 30%, #a8e063 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(21, 255, 0, 0.1);
}
</style>