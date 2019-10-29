<template>
  <Molde title="Perfis" icon="add" btn="Novo Perfil" :action="() => $router.push('/criar-perfil')">
    <v-simple-table>
      <template v-slot:default>
        
        <thead>
          <tr>
            <th class="text-left">#ID</th>
            <th class="text-left">Nome:</th>
            <th class="text-left">Atualizar Permissão</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in perfis" :key="item.id">
            <td>#{{ item.id }}</td>
            <td>{{ item.profile }}</td>
            <td>
              <v-btn color="blue" class="white--text" small @click="$router.push(`/editar-perfil/${item.id}`)">
                Atualizar Permissões
              </v-btn>
            </td>
          </tr>
        </tbody>
        
      </template>
    </v-simple-table>
  </Molde>
</template>

<script>
export default {
    data() {
        return {
            perfis: [],
            perfisBkp: []
        }
    },
    computed: {
        SEARCH() {
            const termo = this.$store.getters.search
            console.log('termo', termo)
            this.pesquisa(termo)
            return termo
        }
    },
    methods: {
        getProfiles() {
            this.$store.commit('setVueLoad', true)

            this.$axios.get(`${this.$api}/api/v1/profiles`, this.$headers)
            .then(res => {this.perfis = res.data; this.perfisBkp = res.data})
            .catch(() => this.$store.dispatch('snackbar_error', 'Erro ao carregar dados, tente novamente'))
            
            this.$store.commit('setVueLoad', false)
        },

        pesquisa(termo) {
        }
    },
    created() {
      this.getProfiles()
    }
    //
    
}
</script>
