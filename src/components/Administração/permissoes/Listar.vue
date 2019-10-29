<template>
  <Molde title="Permissões" btn="Criar Permissão" icon="add" :action="() => $router.push('/criar-permissao')">
    <v-simple-table>
      <template v-slot:default>
        
        <thead>
          <tr>
            <th class="text-left">#ID</th>
            <th class="text-left">Nome:</th>
            <th class="text-left">Descrição</th>
            <th class="text-left">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in permissoes" :key="item.id">
            <td>#{{ item.id }}</td>
            <td>{{ item.label }}</td>
            <td>{{ item.permission }}</td>
            <td>
              <v-btn @click="abreServico(item)" icon small>
                <v-icon>edit</v-icon>
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
            permissoes: [],
            permissoesBkp: []
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
        getPermissions() {
            this.$store.commit('setVueLoad', true)

            this.$axios.get(`${this.$api}/api/v1/permissions`, this.$headers)
            .then(res => {this.permissoes = res.data; this.permissoesBkp = res.data})
            .catch(() => this.$store.dispatch('snackbar_error', 'Erro ao carregar dados, tente novamente'))
            
            this.$store.commit('setVueLoad', false)
        },

        pesquisa(termo) {
        }
    },
    created() {
        this.getPermissions()
    }
    //
    
}
</script>
