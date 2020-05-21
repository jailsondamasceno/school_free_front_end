<template>
  <div>
    <b-form>
      <b-form-group label="Pefis do usuário:">
        <b-form-checkbox-group id="perfis" name="pefis" v-model="user.perfis" :options="perfis"></b-form-checkbox-group>
      </b-form-group>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-group id="idioma" label="Idioma:" label-for="idioma-usuario" >
            <b-form-select id="idioma-usuario" :options="idiomas" required v-model="user.idioma"  :readonly="mode === 'leitura'"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group id="escola" label="Escola:" label-for="escola-usuario">
            <b-form-select id="escola-usuario" :options="escolas" required v-model="user.id_escola"  :readonly="mode === 'leitura'"></b-form-select>
          </b-form-group>
        </b-col>
        
        <b-col md="3" sm="9">
          <b-form-group id="data_cadastro" label="Data cadastro:" label-for="data_cadastro-usuario">
            <b-form-input
              id="data_cadastro-usuario"
              type="text"
              v-model="user.data_cadastro"
               :readonly="mode === 'leitura'"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group id="nome" label="Nome:" label-for="nome-usuario">
            <b-form-input
              id="nome-usuario"
              type="text"
              v-model="user.nome"
               :readonly="mode === 'leitura'"
              required
              placeholder="Nome"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group id="sobrenome" label="Sobrenome:" label-for="sobrenome-usuario">
            <b-form-input
              id="sobrenome-usuario"
              type="text"
              v-model="user.sobrenome"
               :readonly="mode === 'leitura'"
              required
              placeholder="Sobrenome"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group
            id="email"
            label="E-mail:"
            label-for="email-usuario"
            description="Não permitimos mais de um usuário com o mesmo e-mail!"
          >
            <b-form-input
              id="email-usuario"
              type="email"
              v-model="user.email"
              required
               :readonly="mode === 'leitura'"
              placeholder="exemplo@email.com.br"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group id="telefone" label="Telefone:" label-for="telefone">
            <b-form-input
              id="url"
              type="url"
              v-model="user.telefone"
              required
               :readonly="mode === 'leitura'"
              placeholder="(00)0 0000-0000"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group id="data_nascimento" label="Data nascimento:" label-for="data_nascimento">
            <b-form-input
              id=data_nascimento
              type="text"
              v-model="user.data_nascimento"
               :readonly="mode === 'leitura'"
              required
              placeholder="00/00/0000"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-group id="cpf" label="CPF:" label-for="cpf-usuario">
            <b-form-input
              id="cpf-usuario"
              type="text"
              v-model="user.cpf"
              :readonly="mode === 'leitura'"
              required
              placeholder="000.000.000-00"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group id="rg" label="RG:" label-for="rg-usuario">
            <b-form-input
              id="rg-usuario"
              type="text"
              v-model="user.rg"
              :readonly="mode === 'leitura'"
              required
              placeholder="000.000.000-0"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group
            id="pais"
            label="País:"
            label-for="pais"
          >
            <b-form-input
              id="pais"
              type="text"
              v-model="user.pais"
              :readonly="mode === 'leitura'"
              required
              placeholder="País"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group
            id="estado"
            label="Estado:"
            label-for="estado"
          >
            <b-form-input
              id="estado"
              type="text"
              v-model="user.estado"
               :readonly="mode === 'leitura'"
              required
              placeholder="Estado:"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group
            id="logradouro"
            label="Rua:"
            label-for="logradouro"
          >
            <b-form-input
              id="logradouro"
              type="text"
              v-model="user.logradouro"
               :readonly="mode === 'leitura'"
              required
              placeholder="Rua:"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group
            id="numero"
            label="Número:"
            label-for="numero"
          >
            <b-form-input
              id="numero"
              type="number"
              v-model="user.numero"
               :readonly="mode === 'leitura'"
              required
              placeholder="Número:"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group
            id="cidade"
            label="Cidade:"
            label-for="cidade"
          >
            <b-form-input
              id="cidade"
              type="text"
              v-model="user.cidade"
               :readonly="mode === 'leitura'"
              required
              placeholder="Cidade:"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-checkbox-group>
            <b-form-group id="aplica-desconto">
              <b-form-checkbox
                value="SIM"
                unchecked-value="NÂO"
                v-model="user.aplicaDesconto"
              >Usuário pode aplicar desconto!</b-form-checkbox>
            </b-form-group>
          </b-form-checkbox-group>
        </b-col>
        <b-col md="3" sm="9" v-if="user.aplicaDesconto==='SIM'">
          <b-form-group
            id="desconto"
            label="Desconto máximo:"
            label-for="desconto"
            description="Defina o desconto máximo que o usuário pode aplicar!"
          >
            <b-form-input
              id="url"
              type="number"
              v-model="user.desconto_max  "
              required
              placeholder="Somente número"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9" >
          <b-form-group
            id="url_imagem"
            label="Imagem perfil:"
            label-for="url_imagem"
            description="Cole o link de uma imagem para seu perfil!"
          >
            <b-form-input
             :readonly="mode === 'leitura'"
              id="url_imagem"
              type="url"
              v-model="user.imagem_perfil  "
              placeholder="Link imagem"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

       <hr>

      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode==='edicao'" @click="salvar()" class="mr-2">
            <i class="fa fa-check"></i>
          </b-button>
          <b-button variant="secundary" v-if="mode==='edicao'" @click="cancelar()" class="mr-2">
            <i class="fa fa-undo"></i>
          </b-button>
          <b-button variant="warning" v-else-if="mode==='leitura'" @click="editar()" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "UsuarioDetalhe",
  computed:mapState(["usuario"]),
  data() {
    return {
      mode:'leitura',
      user: {},
      idiomas: ["PORTUGUÊS", "INGLÊS"],
      perfis: [],
      instituicoes: [],
      escolas: []
    };
  },
  filters: {
    dataFiltro(data) {
      const d = data.split("");
      d.splice(3, 0, "/");
      d.splice(6, 0, "/");

      return d.join("");
    }
  },
  methods: {
    editar() {
      this.mode = "edicao";
    },
    cancelar() {
      this.mode = "leitura";
    },
     buscarUsuario() {
       const url = `${baseApiUrl}/usuarios/usuarioPorId/${this.usuario.id_instituicao}/${this.$route.params.user.id}`
      axios
        .get(url)
        .then(res => {
          this.user = res.data    
           })
        .catch(showError);
    },
    setarUrlEscola() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/escolas/todasInstituicao/${this.usuario.id_instituicao}`;
      } else {
        return `${baseApiUrl}/escolas/escolaPorId/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }
    },
    buscarEscolas() {
      const url = this.setarUrlEscola();
      axios(url).then(res => {
        this.escolas = res.data.map(escola => {
          return { value: escola.id, text: escola.nome_escola };
        });
      });
    },
    salvar() {
      const url = `${baseApiUrl}/usuarios/atualizar/${
        this.user.id_instituicao
      }/${this.user.id}`;
      axios
        .patch(url, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.buscarUsuario();
        })
        .catch(showError);
    },
     
    SU_AD_DI() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (
        perfil_usuario === "SUPER_ADMIN" ||
        perfil_usuario === "ADMIN" ||
        perfil_usuario === "DIRETOR"
      ) {
        return true;
      } else {
        return false;
      }
    },
    setarPerfis() {
      const perfi_usuario = this.$store.state.usuario.perfil_atual;
      if (perfi_usuario === "SUPER_ADMIN" || perfi_usuario === "ADMIN") {
        this.perfis = [
          { text: "ADMIN", value: "ADMIN" },
          { text: "ALUNO", value: "ALUNO" },
          { text: "DIRETOR", value: "DIRETOR" },
          { text: "FILIACAO", value: "FILIACAO" },
          { text: "PROFESSOR", value: "PROFESSOR" },
          { text: "RECEPCIONISTA", value: "RECEPCIONISTA" }
        ];
      } else {
        this.perfis = [
          { text: "ALUNO", value: "ALUNO" },
          { text: "DIRETOR", value: "DIRETOR" },
          { text: "FILIACAO", value: "FILIACAO" },
          { text: "PROFESSOR", value: "PROFESSOR" },
          { text: "RECEPCIONISTA", value: "RECEPCIONISTA" }
        ];
      }
    }
  },
  mounted() {
    this.setarPerfis()
    this.buscarEscolas()
    this. buscarUsuario()
  }
};
</script>

<style>
</style>
