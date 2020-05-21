<template>
  <div class="lista-de-escolas" v-if="quemPodeVer()">
    <PageTitle icon="fa fa-university" :main="escolas_cad" sub="Cadastradas"/>
    <BotaoCadastrar cadastro="cadastro-escola" titulo="Cadastrar Escola: "/>
    
    <hr>
    <ul>
      <li v-for="escola in escolas" :key="escola.id">
        <EscolaItem :escola="escola"/>
      </li>
    </ul>
    <!-- <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="buscarescolas">Carregar Mais </button>
    </div>-->
    <div>
      <b-modal class="entrada-modal" id="cadastro-escola" title="Cadastrar Escola" ref="modal">
        <form >
          <b-form-input type="text" placeholder="Nome da escola..." v-model="escola.nome_escola"></b-form-input>
          <hr>
          <b-form-input type="text" placeholder="Razão social..." v-model="escola.razao_social"></b-form-input>
          <hr>
           <b-form-checkbox
            id="checkbox1"
            v-model="escola.cobranca_automatica"
            value="SIM"
            unchecked-value="NÂO"
          >Ativar cobrança automática por e-mail!</b-form-checkbox>
          <hr>
          <b-row class="instituicao-modal">
            <p>Instituição:</p>
            <b-form-select :options="instituicoes" v-model="escola.id_instituicao"/>
          </b-row>
          <hr>         
          <b-row class="categoria-modal">
            <p>Categoria:</p>
            <b-form-select :options="categorias" v-model="escola.categoria"/>
          </b-row>
          <hr>
          <b-form-input type="text" placeholder="CNPJ:" v-model="escola.cnpj"></b-form-input>
          <hr>
          <b-form-input type="text" placeholder="País" v-model="escola.pais"></b-form-input>
          <hr>
          <b-form-input type="text" placeholder="CEP:" v-model="escola.cep"></b-form-input>
          <hr>
          <b-form-input type="text" placeholder="Rua:" v-model="escola.logradouro"></b-form-input>
          <hr>
          <b-form-input type="number" placeholder="Número:" v-model="escola.numero"></b-form-input>
          <hr>
          <b-form-input type="text" placeholder="Estado:" v-model="escola.estado"></b-form-input>
          <hr>
          <b-form-input type="text" placeholder="Cidade:" v-model="escola.cidade"></b-form-input>
          <hr>
          <b-form-input type="text" placeholder="Bairro:" v-model="escola.bairro"></b-form-input>
          <hr>
          <b-button class="ml-2" @click="cancelar()">Cancelar</b-button>
          <b-button variant="primary" @click="salvar()">Salvar</b-button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import EscolaItem from "./EscolaItem";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";

export default {
  name: "EscolasLista",
  computed: mapState(["usuario"]),
  components: { PageTitle, EscolaItem, BotaoCadastrar },
  data: function() {
    return {
      escolas_cad: "Escolas",
      escolas: Array,
      instituicoes: [],
      escola: {},
      categorias: [],
      page: 1,
      loadMore: true
    };
  },
  methods: {
    cancelar() {
      this.escola = {};
      this.$refs.modal.hide();
    },
    dadosOk(evt) {
      evt.preventDefault();
      if (!this.escola.nome_escola) {
        alert("Nome da escola vazio!");
      } else {
        this.salvar();
      }
    },
    salvar() {
      const url = `${baseApiUrl}/escolas/cadastrar/${
        this.escola.id_instituicao
      }`;
      axios
        .post(url, this.escola)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$refs.modal.hide();
        })
        .catch(showError);
    },

    buscarEscolas() {
      const url = `${baseApiUrl}/escolas/todasInstituicao/${this.usuario.id_instituicao}`;
      axios(url).then(res => {
        this.escolas = res.data;
        // this.page++

        if (res.data.length === 0) this.loadMore = false; //para paginação
      });
    },
    buscarCategorias() {
      const url = `${baseApiUrl}/escolas/categorias`;
      axios.get(url).then(res => {
        this.categorias = res.data.map(categoria => {
          return { value: categoria.categoria, text: categoria.categoria };
        });
      });
    },
    buscarInstituicoes() {
      const url = `${baseApiUrl}/instituicoes/buscarPorCriador/${
        this.usuario.id
      }`;
      axios(url).then(res => {
        this.instituicoes = res.data.map(instituicao => {
          return { value: instituicao.id, text: instituicao.nome_instituicao };
        });
      });
    },

    /*  pegarUrl(){
           const perfilUsuario = this.$store.state.usuario.perfil_atual
        }, */
    quemPodeVer() {
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN" || perfil_atual === "ADMIN") {
        return true;
      } else {
        return false;
      }
    }
  }, //Fim de methods

  mounted() {
    this.buscarEscolas();
    this.buscarCategorias();
    this.buscarInstituicoes();
  }
};
</script>

<style>
.lista-de-escolas ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
}

.lista-de-escolas .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
.categoria-modal {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
}
.instituicao-modal {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
}
.modal-footer {
  display: none;
}

/* .ml-2 {
  margin-right: 10px;
} */
</style>
