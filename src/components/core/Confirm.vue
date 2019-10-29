<template>
  <!-- SNACKBAR DE CONFIRMAÇÃO GLOBAL -->
  <v-dialog
    width="300"
    persistent
    style="overflow: hidden"
    v-model="open"
  >
    <v-card class="pa-3" style="overflow: hidden; border-radius: 10px;" light width="300">
      <div class="meio">
        <v-flex xs12>
          <div style="display: flex; justify-content: center; width: 100%">
            <v-avatar class="elevation-1 bounceInUp snack" color="green lighten-1">
              <v-icon class="fadeIn" size="40" color="white">{{ icon }}</v-icon>
            </v-avatar>
          </div>
        </v-flex>
        <v-flex class="mt-3 mb-3" xs12>
          <div class="linhaSemQuebra">
            <v-spacer></v-spacer>
            <h3 class="text-xs-center">{{ text }}</h3>
            <v-spacer></v-spacer>
          </div>
        </v-flex>

        <v-flex xs12>
          
          <div class="linhaSemQuebra">

            <v-flex class="pa-2" xs6>
              <v-btn text color="green lighten-2" block class="white--text" @click.prevent="close()">
                Cancelar
              </v-btn>
            </v-flex>

            <v-flex class="pa-2" xs6>
              <v-btn text color="green lighten-1" block class="white--text" @click.prevent="action()">
                Confirmar
              </v-btn>
            </v-flex>


          </div>
          
        </v-flex>

      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['open', 'icon', 'text', 'action', 'close'],
};
</script>