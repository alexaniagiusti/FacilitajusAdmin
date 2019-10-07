<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <!-- Titulo da Página -->
        <h3 class="pa-3">Usuários Cadastrados</h3>
        <v-card>
          <v-card-title>
            <!-- Topo da Página, com botão para realizar cadastro de novos usuários e barra de pesquisa -->
            <v-row>
              <v-col cols="12" xs="12" md="12">
                <v-btn @click="dialogCadastro=true" color="primary" class="pa-2 mb-5">
                  <v-icon class="mr-3">person_add</v-icon>Novo Usuário
                </v-btn>
                <v-text-field label="Pesquisar" v-model="pesquisa" append-icon="search"></v-text-field>
              </v-col>
            </v-row>
            <!-- Final -->
          </v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#ID:</th>
                  <th class="text-left">Nome:</th>
                  <th class="text-left">CPF:</th>
                  <th class="text-left">E-mail:</th>
                  <th class="text-left">Editar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in usuarios" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.cpf }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <v-btn @click="dialog=true, editarUsuario = item" icon small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
              <!-- Dialog para editar cadastro, correspondente ao perfil dos usuários que já possuem cadastro -->
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="700px">
                  <template v-slot:activator="{ on }"></template>
                  <v-card>
                    <v-card-title>
                      <v-btn @click="dialog=false" icon>
                        <v-icon color="black">arrow_back</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <span class="title">Editar perfil do usuário</span>
                      <v-spacer></v-spacer>
                      <v-btn small color="red">
                        <span class="white--text">
                          <v-icon class="mr-2">block</v-icon>Bloquear
                        </span>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" xs="12" md="12">
                            <v-text-field label="Nome:" v-model="editarUsuario.name" required></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-text-field label="E-mail:" v-model="editarUsuario.email"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="6">
                            <v-text-field label="CPF:" v-model="editarUsuario.cpf"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="6">
                            <v-text-field label="Sexo:" v-model="editarUsuario.sex"></v-text-field>
                          </v-col>

                          <v-col cols="12" xs="12" md="3">
                            <v-text-field label="Nascimento:" v-model="editarUsuario.birthdate"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="3">
                            <v-text-field label="N° OAB:" v-model="editarUsuario.oab"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="3">
                            <v-text-field label="UF OAB:" v-model="editarUsuario.oab_uf"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="3">
                            <v-text-field label="Tipo:" v-model="editarUsuario.type_profile"></v-text-field>
                          </v-col>

                          <v-col cols="12" xs="12" md="12">
                            <v-text-field label="Endereço:" v-model="editarUsuario.street"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="CEP:" v-model="editarUsuario.postal_code"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Número:" v-model="editarUsuario.number"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Telefone:" v-model="editarUsuario.phone_1"></v-text-field>
                          </v-col>

                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Bairro:" v-model="editarUsuario.neighborhood"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Cidade:" v-model="editarUsuario.city"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-textarea label="Resumo Profissional" v-model="editarUsuario.about"></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false, editarUsuario = {}"
                      >Fechar</v-btn>
                      <v-btn color="blue darken-1" text @click="putUsuario">Salvar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- Final do Dialog -->

              <!-- Dialogo para Cadastro do Usuário -->
              <v-row justify="center">
                <v-dialog v-model="dialogCadastro" persistent max-width="700px">
                  <template v-slot:activator="{ on }"></template>
                  <v-card>
                    <v-card-title>
                      <v-btn @click="dialogCadastro=false" icon>
                        <v-icon color="black">arrow_back</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <span class="title">Cadastrar Novo Usuário</span>
                      <v-spacer></v-spacer>
                      <v-icon class="ml-2" size="30">person_add</v-icon>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" xs="12" md="12">
                            <v-text-field label="Nome:" required></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-text-field label="E-mail:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="6">
                            <v-text-field label="CPF:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="6">
                            <v-select label="Sexo:"></v-select>
                          </v-col>

                          <v-col cols="12" xs="12" md="3">
                            <v-text-field label="Nascimento:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="3">
                            <v-text-field label="N° OAB:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="3">
                            <v-text-field label="UF OAB:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="3">
                            <v-select label="Tipo:"></v-select>
                          </v-col>

                          <v-col cols="12" xs="12" md="12">
                            <v-text-field label="Endereço:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="CEP:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Número:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Telefone:"></v-text-field>
                          </v-col>

                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Bairro:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-select label="Cidade:"></v-select>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-select label="Cidade:"></v-select>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-textarea label="Resumo Profissional"></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="dialogCadastro = false">Fechar</v-btn>
                      <v-btn color="blue darken-1" text @click="dialogCadastro = false">Salvar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      novoUsuario: {},
      editarUsuario: {},
      dialog: false,
      dialogCadastro: false,
      usuarios: [],
      usuariosBkp: [],
      pesquisa: ""
    };
  },
  watch: {
    pesquisa(val) {
      this.search(val);
    }
  },
  methods: {
    search(term) {
      const clientes = this.usuariosBkp;
      const termo = term.toUpperCase();
      let resultado = [];
      clientes.map(cliente => {
        console.log("chamado");
        if (cliente.name !== null && cliente.name.toUpperCase().match(termo)) {
          return resultado.push(cliente);
        } else if (
          cliente.email !== null &&
          cliente.email.toUpperCase().match(termo)
        ) {
          return resultado.push(cliente);
        } else if (cliente.cpf !== null && cliente.cpf.match(termo)) {
          return resultado.push(cliente);
        } else if (
          cliente.sex !== null &&
          cliente.sex.toUpperCase().match(termo)
        ) {
          return resultado.push(cliente);
        } else if (
          cliente.birthdate !== null &&
          cliente.birthdate.match(termo)
        ) {
          return resultado.push(cliente);
        } else if (cliente.oab !== null && cliente.oab.match(termo)) {
          return resultado.push(cliente);
        } else if (cliente.oab_uf !== null && cliente.oab_uf.match(termo)) {
          return resultado.push(cliente);
        } else if (
          cliente.type_profile !== null &&
          cliente.type_profile.toUpperCase().match(termo)
        ) {
          return resultado.push(cliente);
        } else if (
          cliente.street.toUpperCase() !== null &&
          cliente.street.match(termo)
        ) {
          return resultado.push(cliente);
        } else if (
          cliente.postal_code !== null &&
          cliente.postal_code.match(termo)
        ) {
          return resultado.push(cliente);
        } else if (cliente.number !== null && cliente.number.match(termo)) {
          return resultado.push(cliente);
        } else if (cliente.phone_1 !== null && cliente.phone_1.match(termo)) {
          return resultado.push(cliente);
        } else if (
          cliente.neighborhood !== null &&
          cliente.neighborhood.toUpperCase().match(termo)
        ) {
          return resultado.push(cliente);
        } else if (
          cliente.city !== null &&
          cliente.city.toUpperCase().match(termo)
        ) {
          return resultado.push(cliente);
        }
      });
      if (termo === "") {
        this.usuarios = this.usuariosBkp;
      } else {
        this.usuarios = resultado;
      }
    },
    getUsuarios() {
      this.$axios
        .get(`${this.$api}/api/v1/users`, this.$headers)
        .then(
          res => ((this.usuarios = res.data), (this.usuariosBkp = res.data))
        )
        .then(() => this.$store.commit("setVueLoad", false));
    },
    storeUsuario() {
      this.$store.commit("setVueLoad", true);
      this.$axios
        .post(`${this.$api}/api/v1/users`, this.novoUsuario, this.$headers)
        .then(() =>
          this.$store.dispatch("snackbar_success", "O usuário foi cadastrado")
        )
        .then(() => (this.dialogCadastro = false), (this.novoUsuario = {}))
        .then(() => this.$store.commit("setVueLoad", false));
    },
    putUsuario() {
      this.$store.commit("setVueLoad", true);
      this.$axios
        .put(`${this.$api}/api/v1/users`, this.editarUsuario, this.$headers)
        .then(() =>
          this.$store.dispatch("snackbar_success", "O usuário foi atualizado")
        )
        .then(() => (this.dialog = false), (this.editarUsuario = {}))
        .then(() => this.$store.commit("setVueLoad", false));
    }
  },
  created() {
    this.$store.commit("setVueLoad", true);
    this.getUsuarios();
  }
};
</script>