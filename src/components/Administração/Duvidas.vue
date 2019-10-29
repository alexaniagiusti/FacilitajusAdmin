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
                <tr v-for="i in duvidas" :key="i.id">
                  <td>{{ i.name }}</td>
                  <td>{{ i.city | filterCity }}</td>
                  <td>{{ i.actuation.actuation }}</td>
                  <td>{{ i.created_at | filterDate }}</td>
                  <td>{{ i.id }}</td>
                  <td>
                    <v-btn @click="abreDuvida(i)" icon small>
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
                      <v-btn @click="abreConfirm('delete', 'Confirmar Exclusão', () => excluirDuvida())" small color="red">
                        <span class="white--text">
                          <v-icon class="mr-2">delete</v-icon>Excluir
                        </span>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" xs="12" md="12">
                            <v-text-field v-model="duvidaSelecionada.name" label="Nome:" required></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-text-field v-model="duvidaSelecionada.email" label="E-mail:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field v-model="duvidaSelecionada.phone" label="Celular:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-autocomplete
                                required
                                autocomplete="new-case"
                                label="Tipo de dúvida:"
                                :items="actuations"
                                v-model="duvidaSelecionada.actuation_id"
                                item-value="id"
                                item-text="actuation"
                                hide-no-data
                                placeholder="Qual a sua dúvida?"
                              />
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-autocomplete
                              :rules="rules.city"
                              required
                              autocomplete="new-city"
                              v-model="duvidaSelecionada.city_id"
                              :items="cities"
                              hide-no-data
                              label="Cidade"
                              placeholder="Cidade"
                              item-text="city"
                              item-value="id"
                            >
                              <template v-slot:selection="data">
                                  {{ data.item.city }} - {{ data.item.state }}
                              </template>
                              <template v-slot:item="data">
                                <template v-if="typeof data.item !== 'object'">
                                  <v-list-item-content v-text="data.item.city"></v-list-item-content>
                                </template>
                                <template v-else>
                                  <v-list-item-avatar class="elevation-1">
                                    <v-icon>place</v-icon>
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title v-html="data.item.city"></v-list-item-title>
                                    <v-list-item-subtitle v-html="data.item.state"></v-list-item-subtitle>
                                  </v-list-item-content>
                                </template>
                              </template>
                            </v-autocomplete>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-textarea v-model="duvidaSelecionada.message" label="Explique melhor a sua dúvida"></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
                      <v-btn color="blue darken-1" text @click="atualizarDuvida">Salvar</v-btn>
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
                        <v-form ref="formCase">
                          <v-layout row>
                            <v-flex xs12 md4 pa-2>
                              <v-text-field
                                :rules="rules.name"
                                required
                                label="Nome:"
                                v-model="cadastrarDuvida.name"
                                placeholder="Qual o seu nome?"
                                >
                              </v-text-field>
                            </v-flex>
                      
                            <v-flex xs12 md4 pa-2>
                              <v-text-field
                                :rules="rules.phone"
                                required
                                label="Celular:"
                                v-model="cadastrarDuvida.phone"
                                placeholder="Qual o seu celular?"
                                v-mask="masktelefone"
                                >

                            </v-text-field>
                          </v-flex>
                            <v-flex xs12 md4 pa-2>
                              <v-text-field
                                :rules="rules.email"
                                required
                                autocomplete="new-email"
                                label="E-mail:"
                                v-model="cadastrarDuvida.email"
                                placeholder="Qual o seu e-mail?"
                                >
                              </v-text-field>
                            </v-flex>
                          </v-layout>

                          <v-layout row>

                            <v-flex xs12 md6 pa-2>
                              <v-autocomplete
                                :rules="rules.duvida"
                                required
                                autocomplete="new-case"
                                label="Tipo de dúvida:"
                                :items="actuations"
                                v-model="cadastrarDuvida.actuation_id"
                                item-value="id"
                                item-text="actuation"
                                hide-no-data
                                placeholder="Qual a sua dúvida?"
                                />

                            </v-flex>
                            <v-flex xs12 md6 pa-2>
                            <v-autocomplete
                                  :rules="rules.city"
                                  required
                                  autocomplete="new-city"
                                  v-model="cadastrarDuvida.city_id"
                                  :items="cities"
                                  hide-no-data
                                  label="Cidade"
                                  placeholder="Cidade"
                                  item-text="city"
                                  item-value="id"
                                >
                                  <template v-slot:selection="data">
                                      {{ data.item.city }} - {{ data.item.state }}
                                  </template>
                                  <template v-slot:item="data">
                                    <template v-if="typeof data.item !== 'object'">
                                      <v-list-item-content v-text="data.item.city"></v-list-item-content>
                                    </template>
                                    <template v-else>
                                      <v-list-item-avatar class="elevation-1">
                                        <v-icon>place</v-icon>
                                      </v-list-item-avatar>
                                      <v-list-item-content>
                                        <v-list-item-title v-html="data.item.city"></v-list-item-title>
                                        <v-list-item-subtitle v-html="data.item.state"></v-list-item-subtitle>
                                      </v-list-item-content>
                                    </template>
                                  </template>
                                </v-autocomplete>
                            </v-flex>
                          </v-layout>

                          <v-layout row>
                            <v-flex xs12 md12 pa-2>
                              <v-textarea
                                :rules="rules.duvida"
                                required
                                v-model="cadastrarDuvida.message"
                                label="Explique melhor a sua dúvida:"
                              >
                              </v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="dialogCadastro = false">Fechar</v-btn>
                      <v-btn color="blue darken-1" text @click="storeCase">Cadastrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <Confirm
      :open="confirm.open"
      :icon="confirm.icon"
      :text="confirm.text"
      :action="confirm.action"
      :close="confirm.close"
    />
  </v-container>
</template>

<script>
import moment from 'moment'
import 'moment/locale/pt-br'
import { mask } from 'vue-the-mask'

export default {
  data() {
    return {
      directives: {
        mask
      },
      rules: {
        name: [v => !!v || 'Preencha o nome'],
        phone: [v => !!v || 'Insira um número de telefone'],
        email: [v => !!v || 'Insira o seu e-mail'],
        duvida: [v => !!v || 'Selecione qual o tipo da sua dúvida'],
        city: [v => !!v || 'Selecione em qual cidade você está'],
        duvida: [v => !!v || 'Fale mais sobre a sua dúvida'],
      },
      masktelefone: '(##) # #### ####',
      dialog: false,
      dialogCadastro: false,
      cadastrarDuvida: {
        profile_id: this.$store.getters.getUsuario.id,
        name: 'PAtrick',
        phone: '96 9 81335498',
        email: 'ptklorran@gmail.com',
        actuation_id: '',
        city_id: '',
        message: 'teste'
      },
      duvidas: [],
      duvidaSelecionada: {
        actuation: {
          actuation: ''
        },
        city: {
          city: ''
        }
      },
      confirm: {
        open: false,
        icon: '',
        text: '',
        action: () => {},
        close: () => {}
      },
      cities: [],
      actuations: [],
    };
  },
  filters: {
    filterDate(val) {
      return moment(val).format("DD/MM/YYYY");
    },
    filterCity(val) {
      if (!!val) {
        return val.city
      } else {
        return 'Não cadastrada'
      }
    }
  },
  methods: {
    getActuations() {
      this.$axios.get(this.$store.getters.api + '/api/v1/actuations',{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }})
        .then(res => this.actuations = res.data)
    },
    //
    getCities() {
      this.$axios.get(this.$store.getters.api + '/api/v1/cities',{ headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }})
        .then(res => this.cities = res.data)
    },
    //
    fechaConfirm() {
      this.confirm.open = false
    },
    //
    abreConfirm(icon, text, action) {
      this.confirm = {
        open: true,
        icon: icon,
        text: text,
        action: action,
        close: () => this.fechaConfirm()
      }
    },
    //
    abreDuvida(duvida) {
      this.duvidaSelecionada = duvida
      this.dialog = true
    },
    //
    getDuvidas() {
      this.$axios
        .get(`${this.$api}/api/v1/legal-cases`, this.$headers)
        .then(res => (this.duvidas = res.data))
        .then(() => this.$store.commit("setVueLoad", false));
    },
    //
    storeCase() {
      if (this.$refs.formCase.validate()) {
          this.$store.commit('setVueLoad', true)

        this.$axios.post(`${this.$api}/api/v1/legal-cases`, this.cadastrarDuvida, { headers: { 'Authorization' : `Bearer ${this.$store.getters.getToken}`}})
          .then(() => {
            this.$store.commit('setVueLoad', false)
            this.$store.dispatch('snackbar_success', 'A Dúvida foi enviada')
            this.dialogCadastro = false
            setTimeout(() => location.reload(), 2000)
          })
          .catch((erro) => {
            this.$store.commit('setVueLoad', false)
            this.$store.dispatch('snackbar_error', 'Erro, tente novamente' + erro)
          })
      } else {
        this.$store.dispatch('snackbar_error', 'Preencha todos os campos corretamente')
      }
    },
    //
    atualizarDuvida() {
      this.$store.commit("setVueLoad", true);

      const data = {
        name: this.duvidaSelecionada.name,
        email: this.duvidaSelecionada.email,
        phone: this.duvidaSelecionada.phone,
        message: this.duvidaSelecionada.message,
        service_id: this.duvidaSelecionada.service_id,
        city_id: this.duvidaSelecionada.city_id,
        price: this.duvidaSelecionada.price
      }

      this.$axios.put(`${this.$api}/api/v1/legal-cases/${this.duvidaSelecionada.uuid}`, data, this.$headers)
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch('snackbar_success', 'A Dúvida foi atualizada')
          setTimeout(() => location.reload(), 2000)
        })
        .catch(() => this.$store.dispatch('snackbar_error', 'Verifique sua conexão com a internet e tente novamente.'))
    },
    //
    excluirDuvida() {
      this.$store.commit("setVueLoad", true);
      const data = this.duvidaSelecionada
      this.$axios.delete(`${this.$api}/api/v1/legal-cases/${this.duvidaSelecionada.uuid}`, this.$headers)
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch('snackbar_success', 'A Dúvida foi excluída')
          location.reload()
        })
        .catch(() => this.$store.dispatch('snackbar_error', 'Verifique sua conexão com a internet e tente novamente.'))
    }
    //
  },
  created() {
    this.$store.commit("setVueLoad", true);
    this.getDuvidas();
    this.getActuations()
    this.getCities()
  }
};
</script>