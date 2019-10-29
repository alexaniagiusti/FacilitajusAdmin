<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <!-- Titulo da Página -->
        <h3 class="pa-3">Serviços Cadastrados</h3>
        <v-card>
          <v-card-title>
            <!-- Topo da Página, com botão para realizar cadastro de novos usuários e barra de pesquisa -->
            <v-row>
              <v-col cols="12" xs="12" md="12">
                <v-btn @click="dialogCadastro=true" color="primary" class="pa-2 mb-5">
                  <v-icon class="mr-3">work</v-icon>Novo Serviço
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
                <tr v-for="item in servicos" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.city.city }}</td>
                  <td>{{ item.service.service }}</td>
                  <td>{{ item.date | filterDate }}</td>
                  <td>{{ item.id }}</td>
                  <td>
                    <v-btn @click="abreServico(item)" icon small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
              <!-- Dialog para editar serviços cadastrados -->
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="700px">
                  <template v-slot:activator="{ on }"></template>
                  <v-card>
                    <v-card-title>
                      <v-btn @click="dialog=false" icon>
                        <v-icon color="black">arrow_back</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <span class="title">Editar dados do serviço</span>
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
                            <v-text-field v-model="servicoSelecionado.name" label="Nome:" required></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="12">
                            <v-text-field v-model="servicoSelecionado.email" label="E-mail:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="6">
                            <v-text-field v-model="servicoSelecionado.service.service" label="Serviço:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="6">
                            <v-text-field v-model="servicoSelecionado.price" label="Preço:"></v-text-field>
                          </v-col>

                          <v-col cols="12" xs="12" md="4">
                            <v-text-field v-model="servicoSelecionado.city.city" label="Cidade:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field v-model="servicoSelecionado.date" label="Data:"></v-text-field>
                          </v-col>
                          <v-col cols="12" xs="12" md="4">
                            <v-text-field v-model="servicoSelecionado.time" label="Horário:"></v-text-field>
                          </v-col>

                          <v-col cols="12" xs="12" md="12">
                            <v-textarea v-model="servicoSelecionado.message" label="Descreva o serviço a ser solicitado:"></v-textarea>
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

              <!-- Dialogo para Cadastro de novo serviço -->
              <v-row justify="center">
                <v-dialog v-model="dialogCadastro" persistent max-width="700px">
                  <template v-slot:activator="{ on }"></template>
                  <v-card>
                    <v-card-title>
                      <v-btn @click="dialogCadastro=false" icon>
                        <v-icon color="black">arrow_back</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <span class="title">Cadastrar Serviço</span>
                      <v-spacer></v-spacer>
                      <v-icon class="ml-2" size="30">work</v-icon>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form ref="formDiligencia">
                          <v-layout row>
                            <v-flex xs12 md4 pa-2>
                              <v-text-field
                                label="Nome:"
                                v-model="name"
                                required
                                :rules="rules.name"
                                placeholder="Patrick Carvalho"
                                autocomplete="new-name"
                                aria-required=""
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md4 pa-2>
                              <v-text-field
                              v-mask="masktelefone"
                              label="Celular:"
                              v-model="phone"
                              required
                              :rules="rules.phone"
                              placeholder="(96) 9 81335498">
                              </v-text-field>
                            </v-flex>
                            <v-flex xs12 md4 pa-2>
                              <v-text-field
                                :rules="rules.email"
                                required
                                label="E-mail:"
                                v-model="email"
                                placeholder="email@provedor.com"
                                autocomplete="new-email"
                              ></v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout row>
                            <v-flex xs12 md3 pa-2>
                              <v-autocomplete
                                :rules="rules.service"
                                required
                                label="Serviço:"
                                :items="services"
                                v-model="serviceSelected"
                                item-value="id"
                                item-text="service"
                                hide-no-data
                                placeholder="Serviço que deseja solicitar"
                              />
                            </v-flex>
                            <v-flex xs12 md2 pa-2>
                              <v-text-field
                                :rules="rules.price"
                                required
                                label="Preço Sugerido:"
                                v-model="price"
                                :persistent-hint="true"
                                hint="Você mesmo pode colocar um preço"
                                prefix="R$"
                              ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md3 pa-2>
                              <v-autocomplete
                                :rules="rules.city"
                                required
                                autocomplete="new-city"
                                v-model="citySelected"
                                :items="cities"
                                hide-no-data
                                return-object
                                label="Cidade"
                                placeholder="Cidade"
                                item-text="city"
                                item-value="id"
                              >
                                <template v-slot:selection="data">{{ data.item.city }} - {{ data.item.state }}</template>
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
                            <v-flex xs12 md2 pa-2>
                              <v-text-field
                                :rules="rules.data"
                                required
                                label="Data:" 
                                v-mask="maskData" 
                                v-model="date" 
                                placeholder="12/12/2029">
                              </v-text-field>
                            </v-flex>
                            <v-flex xs12 md2 pa-2>
                              <v-text-field
                                :rules="rules.hour"
                                required
                                label="Horário:" 
                                v-mask="maskHour" 
                                v-model="hour" 
                                placeholder="15:30">
                              </v-text-field>
                            </v-flex>
                          </v-layout>
                          <v-layout row>
                            <v-flex xs12 md12 pa-2>
                              <v-textarea
                                :rules="rules.message"
                                required
                                v-model="message" 
                                label="Fale sobre o serviço que deseja solicitar:">
                              </v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="dialogCadastro = false">Fechar</v-btn>
                      <v-btn color="blue darken-1" text @click="sendDiligence">Cadastrar</v-btn>
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
import "moment/locale/pt-br";
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },
  data() {
    return {
      rules: {
        name: [v => !!v || 'Preencha o nome'],
        phone: [v => !!v || 'Insira um número de telefone'],
        email: [v => !!v || 'Insira o seu e-mail'],
        service: [v => !!v || 'Selecione  o serviço que deseja solicitar'],
        price: [v => !!v || 'Escolha um valor para o serviço solicitado'],
        city: [v => !!v || 'Selecione a cidade onde o serviço será realizado'],
        data: [v => !!v || 'Preencha em qual data o serviço deverá ser realizado'],
        hour: [v => !!v || 'Preencha em qual horário o serviço deverá ser realizado'],
        message: [v => !!v || 'É necessário escrever um resumo sobre o serviço que deseja solicitar'],
      },
      maskData: '##/##/####',
      maskHour: '##:##',
      masktelefone: '(##) # #### ####',
      name: "",
      phone: "",
      email: "",
      date: "",
      dateFormat: "",
      hour: "",
      message: "",
      cities: [],
      citySelected: "",
      services: [],
      serviceSelected: "",
      price: "",
      dialog: false,
      dialogCadastro: false,
      cadastrarServico: {
      },
      servicos: [],
      servicoSelecionado: {
        service: {
          service: ''
        },
        city: {
          city: ''
        }
      }
    };
  },
  watch: {
    serviceSelected() {
      if (this.serviceSelected !== "") {
        this.$store.commit("setVueLoad", true);
        this.$axios
          .get(
            `${this.$api}/api/v1/services-prices/${this.serviceSelected}`
          )
          .then(res => {
            this.price = `${res.data[0].price}`;
          })
          .then(() => this.$store.commit("setVueLoad", false))
          .catch(err => console.log("erro: " + err));
      }
    }
  },
  filters: {
    filterDate(val) {
      return moment(val).format("DD/MM/YYYY");
    }
  },
  methods: {
    abreConfirm(icon, text, action) {
      this.confirm = {
        open: true,
        icon: icon,
        text: text,
        action: action
      }
    },
    //
    getServices() {
      this.$axios
        .get(this.$store.getters.api + "/api/v1/services", {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => (this.services = res.data));
      this.$store.commit("setVueLoad", false);
    },
    //
    getCities() {
      this.$axios
        .get(this.$store.getters.api + "/api/v1/cities", {
          headers: { Authorization: `Bearer ${this.$store.getters.getToken}` }
        })
        .then(res => (this.cities = res.data));
      this.$store.commit("setVueLoad", false);
    },
    //
    sendDiligence() {
      if (this.$refs.formDiligencia.validate()) {
      this.$store.commit("setVueLoad", true);
      const dataFormatada = moment(this.date).format('YYYY-MM-DD')
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        message: this.message,
        service_id: this.serviceSelected,
        city_id: this.citySelected.id,
        time: this.hour,
        date: dataFormatada,
        price: this.price
      };

      this.$axios
        .post(`${this.$api}/api/v1/diligences`, data, this.$headers)
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch(
            "snackbar_success",
            "Serviço solicitado com sucesso"
          );
        })
        .catch(() =>
          this.$$store.dispatch("snackbar_error", "Erro, tente novamente")
        ); } else {
          this.$$store.dispatch(
          "snackbar_warning",
          "Erro, Preencha todos os campos corretamente"
          );
        }
    },
    //
    abreServico(service) {
      this.servicoSelecionado = service
      this.dialog = true
    },
    //
    storeService() {
      this.$store.commit("setVueLoad", true);
      const data = this.cadastrarServico
      this.$axios.post(`${this.$api}/api/v1/diligences`, data, this.$headers)
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch('snackbar_success', 'O serviço foi cadastrado')
        })
        .catch(() => this.$store.dispatch('snackbar_error', 'Verifique sua conexão com a internet e tente novamente.'))
    },
    //
    getServicos() {
      this.$axios
        .get(`${this.$api}/api/v1/diligences`, this.$headers)
        .then(res => (this.servicos = res.data))
        .then(() => this.$store.commit("setVueLoad", false));
    },
    //
    atualizarServico() {
      this.$store.commit("setVueLoad", true);
      const data = this.servicoSelecionado
      this.$axios.put(`${this.$api}/api/v1/diligences/${this.servicoSelecionado.uuid}`, data, this.$headers)
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch('snackbar_success', 'O serviço foi atualizado')
        })
        .catch(() => this.$store.dispatch('snackbar_error', 'Verifique sua conexão com a internet e tente novamente.'))
    },
    //
    excluirServico() {
      this.$store.commit("setVueLoad", true);
      const data = this.servicoSelecionado
      this.$axios.delete(`${this.$api}/api/v1/diligences/${this.servicoSelecionado.uuid}`, this.$headers)
        .then(() => {
          this.$store.commit("setVueLoad", false);
          this.$store.dispatch('snackbar_success', 'O serviço foi atualizado')
        })
        .catch(() => this.$store.dispatch('snackbar_error', 'Verifique sua conexão com a internet e tente novamente.'))
    }
    //
  },
  mounted() {
    this.$store.commit("setVueLoad", true);
    this.getServicos();
    this.getServices();
    this.getCities();
  }
};
</script>