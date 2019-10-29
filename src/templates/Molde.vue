<template>
    <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <!-- Titulo da Página -->
        <h3 class="pa-3">{{ title }}</h3>
        <v-card>
          <v-card-title>
            <!-- Topo da Página, com botão para realizar cadastro de novos usuários e barra de pesquisa -->
            <v-row>
              <v-col cols="12" xs="12" md="12">
                <v-btn @click="action" color="primary" class="pa-2 mb-5">
                  <v-icon class="mr-3">{{ icon }}</v-icon>{{ btn }}
                </v-btn>
                <v-text-field v-if="search" label="Pesquisar" v-model="pesquisa" append-icon="search"></v-text-field>
              </v-col>
            </v-row>

          </v-card-title>

          <slot></slot>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'btn', 'action', "icon", 'search'],
  data() {
    return {
      pesquisa: ''
    }
  },
  watch: {
    pesquisa(val) {
      this.$store.dispatch('search', val)
    }
  }
}
</script>