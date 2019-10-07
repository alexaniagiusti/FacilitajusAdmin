<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <!-- Titulo da Página -->
        <h3 class="pa-3">Dúvidas Cadastradas</h3>
        <v-card>
          <v-card-title>
            <!-- Topo da Página, com botão para realizar cadastro de novas dúvidas jurídicas e barra de pesquisa -->
            <v-row>
              <v-col cols="12" xs="12" md="12">
                <v-btn @click="dialogCadastro=true" color="primary" class="pa-2 mb-5">
                  <v-icon class="mr-3">gavel</v-icon>Nova Dúvida
                </v-btn>
                <v-text-field label="Pesquisar" append-icon="search"></v-text-field>
              </v-col>
            </v-row>
            <!-- Final -->
          </v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nome:</th>
                  <th class="text-left">Cidade:</th>
                  <th class="text-left">Tipo:</th>
                  <th class="text-left">Data:</th>
                  <th class="text-left">ID:</th>
                  <th class="text-left">Ações:</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in duvidas" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.city.city }}</td>
                  <td>{{ item.actuation.actuation }}</td>
                  <td>{{ item.created_at | filterDate }}</td>
                  <td>{{ item.id }}</td>
                  <td>
                    <v-btn @click="dialog=true" icon small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
              <!-- Dialog para editar dúvidas jurídicas cadastradas -->
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="700px">
                  <template v-slot:activator="{ on }"></template>
                  <v-card>
                    <v-card-title>
                      <v-btn @click="dialog=false" icon>
                        <v-icon color="black">arrow_back</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <span class="title">Editar Dúvida Jurídica</span>
                      <v-spacer></v-spacer>
                      <v-btn small color="red">
                        <span class="white--text">
                          <v-icon class="mr-2">delete</v-icon>Excluir
                        </span>
                      </v-btn>
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
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Celular:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-select label="Tipo de Dúvida"></v-select>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-select label="Cidade:"></v-select>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-textarea label="Explique melhor a sua dúvida"></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
                      <v-btn color="blue darken-1" text @click="dialog = false">Salvar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- Final do Dialog -->

              <!-- Dialogo para Cadastro de nova dúvida jurídica   -->
              <v-row justify="center">
                <v-dialog v-model="dialogCadastro" persistent max-width="700px">
                  <template v-slot:activator="{ on }"></template>
                  <v-card>
                    <v-card-title>
                      <v-btn @click="dialogCadastro=false" icon>
                        <v-icon color="black">arrow_back</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <span class="title">Cadastrar Dúvida Jurídica</span>
                      <v-spacer></v-spacer>
                      <v-icon class="ml-2" size="30">gavel</v-icon>
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
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field label="Celular:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-select label="Tipo de Dúvida"></v-select>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-select label="Cidade:"></v-select>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-textarea label="Explique melhor a sua dúvida"></v-textarea>
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
import moment from "moment";
export default {
  data() {
    return {
      dialog: false,
      dialogCadastro: false,
      duvidas: []
    };
  },
  filters: {
    filterDate(val) {
      return moment(val).format("DD/MM/YYYY");
    }
  },
  methods: {
    getDuvidas() {
      this.$axios
        .get(`${this.$api}/api/v1/legal-cases`, this.$headers)
        .then(res => (this.duvidas = res.data))
        .then(() => this.$store.commit("setVueLoad", false));
    }
  },
  created() {
    this.$store.commit("setVueLoad", true);
    this.getDuvidas();
  }
};
</script>