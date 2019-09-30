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
                <v-btn @click="dialogCadastro=true" color="primary" class="pa-2 mb-5"> <v-icon class="mr-3">person_add</v-icon>Novo Usuário</v-btn>
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
                  <th class="text-left">CPF:</th>
                  <th class="text-left">E-mail:</th>
                  <th class="text-left">Editar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.nome }}</td>
                  <td>{{ item.cpf }}</td>
                  <td>{{ item.email }}</td>
                  <td><v-btn @click="dialog=true" icon small><v-icon >edit</v-icon></v-btn> </td>
                </tr>
              </tbody>
              <!-- Dialog para editar cadastro, correspondente ao perfil dos usuários que já possuem cadastro -->
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="700px">
                  <template v-slot:activator="{ on }">
                  </template>
                  <v-card>
                    <v-card-title>
                      <v-btn @click="dialog=false" icon>
                        <v-icon color="black">arrow_back</v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <span class="title">Editar perfil do usuário</span>
                      <v-spacer></v-spacer>
                      <v-btn small="" color="red"><span class="white--text"><v-icon class="mr-2">block</v-icon>Bloquear</span></v-btn>
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
                            <v-textarea  label="Resumo Profissional"></v-textarea>
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
              
              <!-- Dialogo para Cadastro do Usuário -->
              <v-row justify="center">
                <v-dialog v-model="dialogCadastro" persistent max-width="700px">
                  <template v-slot:activator="{ on }">
                  </template>
                  <v-card>
                    <v-card-title>
                      <v-btn @click="dialogCadastro=false" icon><v-icon color="black">arrow_back</v-icon></v-btn>
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
                            <v-textarea  label="Resumo Profissional"></v-textarea>
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
    data () {
      return {
        dialog: false,
        dialogCadastro: false,
        desserts: [
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
          {
            nome: 'Alexânia Giusti',
            cpf: '026.533.642-20',
            email: 'alexaniagiusti@gmail.com',
          },
        ],
      }
    }, 
  }
</script>