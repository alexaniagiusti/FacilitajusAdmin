<template>
  <div>
    <v-app-bar class="elevation-0" color="#061161" app fixed>
      <v-btn @click="drawer=!drawer" mt-1 icon>
        <v-icon color="white" size="20">menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- <v-icon color="white">account_circle</v-icon> -->
      <!--	<span class="white--text ml-3 mr-5"> {{ nome }} </span>  -->
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" width="250" class="grey lighten-4" app>
      <div
        class="mb-5"
        style="border-bottom:1px solid #E0E0E0;background: linear-gradient(to right, #fff, #fff); display: flex; width: 100%; align-items: center; flex-direction: column"
      >
        <div @click="$router.push({name: 'home'})" class="mt-3 mb-2" style="display: flex">
          <img
            class="mt-2 animated delay-1s fadeIn"
            src="https://firebasestorage.googleapis.com/v0/b/centraldeoportunidades-de3a9.appspot.com/o/Untitled-1.png?alt=media&token=1ecc2ffb-2b00-492f-a05e-d5a7382990c7"
            height="40"
          />
        </div>
        <!--	<h3 class="animated delay-1s fadeIn font-weight-light black--text">{{ nome }}</h3> -->
      </div>
      <!-- Grupo com informações do perfil do usuário -->
      <v-list nav dense class="pa-0 mt-0">
        <!-- <v-subheader class="ml-3">
          INÍCIO
        </v-subheader>-->

        <v-list-item @click="$router.push({'name': 'dashboard'})">
          <v-icon class="mr-5">pie_chart</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push({'name': 'usuarios'})">
          <v-icon class="mr-5">perm_identity</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Usuários</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push({'name': 'diligencias'})">
          <v-icon class="mr-5">work</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Serviços</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push({'name': 'duvidas'})">
          <v-icon class="mr-5">gavel</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Dúvidas Jurídicas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push({'name': 'listar perfil'})">
          <v-icon class="mr-5">contacts</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Perfis</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="$router.push({'name': 'listar permissao'})">
          <v-icon class="mr-5">lock</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Permissões</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="sair">
          <v-icon class="mr-5">power_settings_new</v-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      masculino: false,
      feminino: false,
      semSexo: true,
      drawer: true
    };
  },
  methods: {
    sair() {
      sessionStorage.removeItem("usuario");
      this.$router.push("/");
      location.reload();
    }
  }
};
</script>