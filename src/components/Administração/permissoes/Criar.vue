<template>
  <Molde title="Nova Permissão" btn="Voltar" icon="arrow_back" :action="() => $router.go(-1)" :pesquisa="false" >
    <v-form ref="permissao">

        <div class="pa-4" style="display: flex; width: 100%; flex-direction: row" >
            <v-flex pa-1 xs6>
              <v-text-field :rules="rules.label" v-model="dados.label" label="Nome" />
            </v-flex>

            <v-flex pa-1 xs6>
              <v-text-field :rules="rules.label" v-model="dados.permission" label="Permissão" />
            </v-flex>
        </div>

        <v-btn class="ma-4 white--text" @click="storePermission" color="green">
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
                label: '',
                permission: ''
            },
            rules: {
                label: [ v => !!v || "Preencha este campo" ],
                permission: [ v => !!v || "Preencha este campo" ]
            }
        }
    },
    methods: {
        storePermission() {
        
            if(this.$refs.permissao.validate())
            {
                this.$store.commit('setVueLoad', true)

                this.$axios.post(`${this.$api}/api/v1/permissions`, this.dados, this.$headers)
                    .then(() => {this.$store.dispatch('snackbar_success', 'Permissão Adicionada Com Sucesso'); this.$router.go(-1)})
                    .catch(() => this.$store.dispatch('snackbar_error', 'Erro ao adicionar, tente novamente!'))
                
                this.$store.commit('setVueLoad', false)
            }

        }
    }
}
</script>