<template>
  <div class="instituicao-admin" v-if="quemPodeVer()">
    <PageTitle icon="fa fa-university" :main="instituicao.razao_social" sub/>
    <b-form>
      <input id="instituicao-id" type="hidden" v-model="instituicao.id">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome da Instituição:" label-for="instituicao-nome">
            <b-form-input
              id="instituicao-nome"
              type="text"
              v-model="instituicao.nome_instituicao"
              required
              :readonly="mode === 'leitura'"
              placeholder="Nome da Instituição..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Razão Social:" label-for="instituicao-razao-social">
            <b-form-input
              id="instituicao-razao-social"
              type="text"
              v-model="instituicao.razao_social"
              required
              :readonly="mode === 'leitura'"
              placeholder="Informe a razão social..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="CNPJ:" label-for="instituicao-cnpj">
            <b-form-input
              id="instituicao-password"
              type="text"
              v-model="instituicao.cnpj"
              required
              :readonly="mode === 'leitura'"
              placeholder="Informe o CNPJ"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Pais:" label-for="instituicao-pais">
            <b-form-input
              id="instituicao-pais"
              type="text"
              v-model="instituicao.pais"
              required
              :readonly="mode === 'leitura'"
              placeholder="Informe o País.."
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Cep:" label-for="instituicao-cep">
            <b-form-input
              id="instituicao-cep"
              type="text"
              v-model="instituicao.cep"
              @keyup="buscarCep()"
              required
              :readonly="mode === 'leitura'"
              placeholder="CEP:"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Rua:" label-for="instituicao-logradouro">
            <b-form-input
              id="instituicao-rua"
              type="text"
              v-model="instituicao.logradouro"
              required
              :readonly="mode === 'leitura'"
              placeholder="Rua"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Número:" label-for="instituicao-numero">
            <b-form-input
              id="instituicao-numero"
              type="number"
              v-model="instituicao.numero"
              required
              :readonly="mode === 'leitura'"
              placeholder="Nº"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="Estado:" label-for="instituicao-estado">
            <b-form-input
              id="instituicao-estato"
              type="text"
              v-model="instituicao.estado"
              required
              :readonly="mode === 'leitura'"
              placeholder="Estado"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Cidade:" label-for="instituicao-cidade">
            <b-form-input
              id="instituicao-cidade"
              type="text"
              v-model="instituicao.cidade"
              required
              :readonly="mode === 'leitura'"
              placeholder="Cidade"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Bairro:" label-for="instituicao-bairro">
            <b-form-input
              id="instituicao-bairro"
              type="text"
              v-model="instituicao.bairro"
              required
              :readonly="mode === 'leitura'"
              placeholder="Bairro"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="planos">
        <b-col md="6" sm="12">
          <strong class="plano">Plano Contratado:</strong>
          {{instituicao.plano_contratado}}
          <strong></strong>
          <strong class="status">Status:</strong>
          {{instituicao.status_plano}}
          <hr>
          <b-button
            variant="danger"
            v-if="instituicao.status_instituicao ==='ATIVO' && mode ==='edicao' && soSuperAdmin()"
            @click="ativar_inativar('INATIVO')"
            class="mr-2"
          >Bloquear Instituição</b-button>
          <b-button
            variant="success"
            v-if="instituicao.status_instituicao ==='INATIVO' && mode ==='edicao' && soSuperAdmin()"
            @click="ativar_inativar('ATIVO')"
            class="mr-2"
          >Ativar Instituição</b-button>
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
    <hr>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "InstituicaoDetalhes",
  components: { PageTitle },
  data: function() {
    return {
      computed: mapState(["usuario"]),
      props: ["instituicao"],
      mode: "leitura",
      //cep: null,
      // endereco: {},
      instituicao: {}
    };
  },
  methods: {
    pegarInstituicaoDoStorage() {
      this.instituicao = JSON.parse(localStorage.getItem("instituicao"));
    },
    setaUrl() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN") {
        return `${baseApiUrl}/instituicoes/buscarPorId/${
          this.$route.params.instituicao.id
        }`;
      } else {
        return `${baseApiUrl}/instituicoes/buscarPorId/${
          this.$store.state.usuario.id_instituicao
        }`;
      }
    },
    carregarInstituicao() {
      const url = this.setaUrl();
      axios.get(url).then(res => {
        this.instituicao = res.data;
      });
    },
    editar() {
      this.mode = "edicao";
    },
    cancelar() {
      this.mode = "leitura";
    },
    salvar() {
      const url = `${baseApiUrl}/instituicoes/atualizar/${this.instituicao.id}`;
      axios
        .patch(url, this.instituicao)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.mode = "leitura";
        })
        .catch(showError);
    },
    ativar_inativar(status) {
      this.instituicao.status_instituicao = status;
      const url = `${baseApiUrl}/instituicoes/atualizar/${this.instituicao.id}`;
      axios
        .patch(url, this.instituicao)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.mode = "leitura";
        })
        .catch(showError);
    },

    /*  loadinstituicao(instituicao, mode = "save") {
      this.mode = mode;
      this.instituicao = { ...instituicao };
    }, */
    quemPodeVer() {
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN" || perfil_atual === "ADMIN") {
        return true;
      } else {
        return false;
      }
    },
    soSuperAdmin() {
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN") {
        return true;
      } else {
        return false;
      }
    }
    // Só funciona em ambiente seguro
    /*  buscarCep() {
      if (this.cep.length == 8) {
        axios
          .get(`http://viacep.com.br/ws/${this.cep}/json/`)
          .then(response => (this.endereco = response.data))
          .catch(showError);
        this.instituicao.rua = this.endereco.logradouro;
        this.instituicao.bairro = this.endereco.bairro;
        this.instituicao.cidade = this.endereco.localidade;
        this.instituicao.estado = this.endereco.uf;
      }
    } */
  }, //Fim de Métodos
  mounted() {
    this.pegarInstituicaoDoStorage();
    this.quemPodeVer();
    this.carregarInstituicao();
  }, //Fim da montagem
};
</script>

<style>
</style>