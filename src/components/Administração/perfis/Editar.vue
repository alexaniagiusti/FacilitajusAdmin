<template>
  <Molde title="Adicione Permissões ao perfil" icon="arrow_back" btn="Voltar" :action="() => $router.go(-1)" :search="false" >
    <h3 class="text-center">Clique nas permissões que deseja adicionar</h3>
    
    <v-divider></v-divider>

    <div class="pa-4 editarUsuario " >
      <v-flex class="pa-2" v-for="item in permissions" :key="item.id" xs6 md3 >
        <v-btn v-if="verifyMarked(item.id)" class="white--text" :color="btns.marcado" block @click="setAsUnmarked(item.id)" large>
          {{ item.label }}
          <v-icon class="ml-2" >
            thumb_up
          </v-icon>
        </v-btn>
        
        <v-btn v-else class="white--text" :color="btns.naoMarcado" block @click="setAsMarked(item.id)" large>
          {{ item.label }}
          <v-icon class="ml-2" >
            thumb_down
          </v-icon>
        </v-btn>
      </v-flex>
    </div>
  </Molde>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      btns: {
        marcado: 'green',
        naoMarcado: 'red'
      },
      profile: {},
      permissions: [],
      items: [],
      itemsMarcados: []
    }
  },
  methods: {
    verifyMarked(id) {
      let marcado = false

      this.itemsMarcados.filter(item => {
        if(item.id === id) {
          marcado = true
        }
      })

      return marcado
    },
    getProfile() {
      this.$store.commit('setVueLoad', true)

      this.$axios.get(`${this.$api}/api/v1/profiles/${this.id}`, this.$headers)
      .then(res => {this.profile = res.data; this.profileBkp = res.data; this.itemsMarcados = res.data.permissions})
      .catch(() => this.$store.dispatch('snackbar_error', 'Erro ao carregar dados, tente novamente'))
      
      this.$store.commit('setVueLoad', false)
    },

    getPermissions() {
      this.$store.commit('setVueLoad', true)

      this.$axios.get(`${this.$api}/api/v1/permissions`, this.$headers)
      .then(res => {this.permissions = res.data})
      .catch(() => this.$store.dispatch('snackbar_error', 'Erro ao carregar dados, tente novamente'))
      
      this.$store.commit('setVueLoad', false)
    },

    setAsMarked(id) {
      this.$store.commit('setVueLoad', true)

      let newPermissions = []

      this.itemsMarcados.map(item => {
        newPermissions.push({
          permission_id: item.id
        })
      })

      newPermissions.push({
        permission_id: id
      })

      this.$axios.post(`${this.$api}/api/v1/profile/${this.id}/permissions/update`, {permissions: newPermissions} , this.$headers)
        .then(() => { 
            this.getProfile()
            this.$store.dispatch('snackbar_success', 'Permissão Adicionado')
         })
        .catch(() => {
          this.$store.dispatch('snackbar_error', 'Erro, tente novamente')
          this.$store.commit('setVueLoad', true)
        })
    },

    setAsUnmarked(id) {
      this.$store.commit('setVueLoad', true)

      let newPermissions = []

      this.itemsMarcados.map(item => {
        if(item.id !== id) {
          newPermissions.push({
            permission_id: item.id
          })
        }
      })

      this.$axios.post(`${this.$api}/api/v1/profile/${this.id}/permissions/update`, {permissions: newPermissions} , this.$headers)
        .then(() => { 
            this.getProfile()
            this.$store.dispatch('snackbar_success', 'Permissão Removida')
         })
        .catch(() => {
          this.$store.dispatch('snackbar_error', 'Erro, tente novamente')
          this.$store.commit('setVueLoad', true)
        })
    }
  },
  created() {
    this.getProfile()
    this.getPermissions()
  }
}
</script>

<style scoped>
  .editarUsuario {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row
  }
</style>