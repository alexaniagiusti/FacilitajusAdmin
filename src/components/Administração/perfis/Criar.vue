<template>
  <Molde title="Novo perfil" btn="Voltar" icon="arrow_back" :action="() => $router.go(-1)" :pesquisa="false" >
    <v-form ref="perfil">

        <div class="pa-4" style="display: flex; width: 100%; flex-direction: row" >
            <v-flex pa-1 xs6>
              <v-text-field :rules="rules.label" v-model="dados.profile" label="Nome do perfil" />
            </v-flex>
        </div>

        <v-btn class="ma-4 white--text" @click="storeProfile" color="green">
            <v-icon class="mr-2" >save</v-icon>
            <span>Salvar</span>
        </v-btn>
      
    </v-form>
  </Molde>
</template>

<script>
export default {
    data() {
        return {
            dados: {
                profile: ''
            },
            rules: {
                label: [ v => !!v || "Preencha este campo" ]
            }
        }
    },
    methods: {
        storeProfile() {
        
            if(this.$refs.perfil.validate())
            {
                this.$store.commit("setVueLoad", true)

                this.$axios.post(`${this.$api}/api/v1/profiles`, this.dados, this.$headers)
                    .then(() => {this.$store.dispatch('snackbar_success', 'Perfil Adicionado Com Sucesso'); this.$router.go(-1); this.$store.commit('setVueLoad', false)})
                    .catch(() => this.$store.dispatch('snackbar_error', 'Erro ao adicionar, tente novamente!'), this.$store.commit('setVueLoad', false))
                
                
            }

        }
    }
}
</script>