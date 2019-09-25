<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="mr-5">Usuários Cadastrados</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Novo Usuário</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" xs="12" sm="4" md="4">
                    <v-text-field v-model="editedItem.name" label="Nome:"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="CPF:"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="E-mail:"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xs="12" md="3"> 
                    <v-select label="Sexo"></v-select>
                  </v-col>
                  <v-col cols="12" xs="12" md="3"> 
                    <v-text-field label="Nascimento"></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="2"> 
                    <v-text-field label="N° OAB"></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="2"> 
                    <v-select label="UF-OAB"></v-select>
                  </v-col>
                  <v-col cols="12" xs="12" md="2"> 
                    <v-select label="Tipo"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xs="12" md="2">
                    <v-text-field label="CEP:"></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="4">
                    <v-text-field label="Endereço:"></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="3">
                    <v-text-field label="Número:"></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="3">
                    <v-text-field label="Telefone:"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xs="12" md="4">
                    <v-text-field label="Bairro"></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="4">
                    <v-select label="Cidade"></v-select>
                  </v-col>
                  <v-col cols="12" xs="12" md="4">
                    <v-select label="Estado"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" xs="12" md="12">
                    <v-textarea placeholder="Resumo Profissional"></v-textarea>
                    <v-btn block color="green"><span class="white--text">Salvar</span></v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
     <!-- <v-icon
        small
        @click="deleteItem(item)"
      >
        block
      </v-icon> -->
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>


<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Nome',
          align: 'left',
          value: 'name',
        },
        { text: 'CPF', value: 'cpf' },
        { text: 'E-mail', value: 'email' },
        { text: 'Ações', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Perfil do Usuário'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            name: 'Alexânia Jeani Farias Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Tem certeza que deseja bloquear o acesso deste usuário?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>