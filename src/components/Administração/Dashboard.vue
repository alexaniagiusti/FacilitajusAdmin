<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md4>
        <v-card
          class="mt-5 ml-4 mx-auto"
          max-width="400"
        >
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="teal"
          elevation="12"
          max-width="calc(100% - 100px)"
        >
        <v-icon color="white" size="60" class="pa-2">
          person
        </v-icon>
        <div>
          <p class="text-right pa-3 mt-5" style="font-size: 35pt; color: white">10</p>
        </div>
    </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-bold mb-2 text-center">Usuários Cadastrados</div>
        
      </v-card-text>
      
      </v-card>
    </v-flex>
      <v-flex xs12 md4>
        <v-card
          class="mt-5 ml-4 mx-auto"
          max-width="400"
        >
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="cyan"
          elevation="12"
          max-width="calc(100% - 100px)"
        >
        <v-icon color="white" size="60" class="pa-2">
          work
        </v-icon>
        <div>
          <p class="text-right pa-3 mt-5" style="font-size: 35pt; color: white">20</p>
        </div>
    </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-bold mb-2 text-center">Serviços Cadastrados</div>
      </v-card-text>
      </v-card>
    </v-flex>
      <v-flex xs12 md4>
        <v-card
          class="mt-5 ml-4 mr-4 mx-auto"
          max-width="400"
        >
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="#C62828"
          elevation="12"
          max-width="calc(100% - 100px)"
        >
        <v-icon color="white" size="60" class="pa-2">
          gavel
        </v-icon>
        <div>
          <p class="text-right pa-3 mt-5" style="font-size: 35pt; color: white">30</p>
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

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>