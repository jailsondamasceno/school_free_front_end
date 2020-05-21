<template>
  <div class="escola-admin" v-if="quemPodeVer()">
    <PageTitle icon="fa fa-university" :main="escola.nome_escola" sub=""/>
    <b-form>
      <input id="escola-id" type="hidden" v-model="escola.id">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome da Escola:" label-for="escola-nome">
            <b-form-input
              id="escola-nome"
              type="text"
              v-model="escola.nome_escola"
              required
              :readonly="mode === 'leitura'"
              placeholder="Nome da Escola..."
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Razão Social:" label-for="escola-razao-social">
            <b-form-input
              id="escola-razao-social"
              type="text"
              v-model="escola.razao_social"
              required
              :readonly="mode === 'leitura'"
              placeholder="Informe a razão social.."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="CNPJ:" label-for="escola-cnpj">
            <b-form-input
              id="escola-password"
              type="text"
              v-model="escola.cnpj"
              required
              :readonly="mode === 'leitura'"
              placeholder="Informe o CNPJ"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Pais:" label-for="escola-pais">
            <b-form-input
              id="escola-pais"
              type="text"
              v-model="escola.pais"
              required
              :readonly="mode === 'leitura'"
              placeholder="Informe o País.."
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Cep:" label-for="escola-cep">
            <b-form-input
              id="escola-cep"
              type="text"
              v-model="escola.cep"
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
          <b-form-group label="Rua:" label-for="escola-logradouro">
            <b-form-input
              id="escola-rua"
              type="text"
              v-model="escola.logradouro"
              required
              :readonly="mode === 'leitura'"
              placeholder="Rua"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Número:" label-for="escola-numero">
            <b-form-input
              id="escola-numero"
              type="number"
              v-model="escola.numero"
              required
              :readonly="mode === 'leitura'"
              placeholder="Nº"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="Estado:" label-for="escola-estado">
            <b-form-input
              id="escola-estato"
              type="text"
              v-model="escola.estado"
              required
              :readonly="mode === 'leitura'"
              placeholder="Estado"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Cidade:" label-for="escola-cidade">
            <b-form-input
              id="escola-cidade"
              type="text"
              v-model="escola.cidade"
              required
              :readonly="mode === 'leitura'"
              placeholder="Cidade"
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Bairro:" label-for="escola-bairro">
            <b-form-input
              id="escola-bairro"
              type="text"
              v-model="escola.bairro"
              required
              :readonly="mode === 'leitura'"
              placeholder="Bairro"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="3" sm="9">
        <b-form-group  label="Categoria da Escola:" label-for="categoria-escola">
          <b-form-select
           :disabled="mode==='leitura'"
            required
            id="categoria-escola"
            :options="categorias"
            v-model="escola.categoria"
          />
        </b-form-group>
        <b-form-checkbox  name="check-button"
        :disabled="mode==='leitura'"
        value="SIM"
        unchecked-value="NÂO"
        switch
        v-model="escola.cobranca_automatica"
        >Cobrança automática por e-mail:  
        </b-form-checkbox>
        </b-col>
      </b-row>

      <!-- <b-row class="planos">
        <b-col md="6" sm="12">
          <strong class="plano">Plano Contratado:</strong>
          {{escola.plano_contratado}}
          <strong></strong>
          <strong class="status">Status:</strong>
          {{escola.status_plano}}
          <hr>
          <b-button
            variant="danger"
            v-if="escola.status_plano ==='ATIVO' && mode ==='edicao' && soSuperAdmin()"
            @click="editar()"
            class="mr-2"
          >Bloquear Escola</b-button>
          <b-button
            variant="success"
            v-if="escola.status_plano ==='INATIVO' && mode ==='edicao' && soSuperAdmin()"
            @click="editar()"
            class="mr-2"
          >Ativar Escola</b-button>
        </b-col>
      </b-row> -->
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
  name: "EscolaDetalhes",
  components:{PageTitle},
  data: function() {
    return {
      computed: mapState(["usuario"]),
      props: ["escola"],
      categorias:[],
      mode: "leitura",
      escola: {}
      //cep: null,
      // endereco: {},
      
    };
  },
  methods: {
     pegarEscolaDoStorage(){
      this.escola = JSON.parse(localStorage.getItem("escola"))
    },
    carregarEscola() {
      //this.$store.state.usuario.id_escola  pode ser feito assim tambem
      //$route.params.id_escola (recebi como parametro pelas rotas)
      const url = `${baseApiUrl}/escolas/escolaPorId/${this.escola.id_instituicao}/${this.escola.id}`;
      axios.get(url).then(res => {
        this.escola = res.data;
      });
    },
    buscarCategorias(){
      const url =`${baseApiUrl}/escolas/categorias`
      axios.get(url).then(res=>{
                this.categorias = res.data.map(categoria => {
                    return { value: categoria.categoria, text: categoria.categoria }
                })
            })
    },
    editar() {
      this.mode = "edicao";
    },
    cancelar() {
      this.mode = "leitura";
    },
    salvar() {
      const url = `${baseApiUrl}/escolas/atualizar/${this.escola.id_instituicao}/${this.escola.id}`;
      axios
        .patch(url, this.escola)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.mode = "leitura";
        })
        .catch(showError);
    },

    /*  loadescola(escola, mode = "save") {
      this.mode = mode;
      this.escola = { ...escola };
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
        this.escola.rua = this.endereco.logradouro;
        this.escola.bairro = this.endereco.bairro;
        this.escola.cidade = this.endereco.localidade;
        this.escola.estado = this.endereco.uf;
      }
    } */
  }, //Fim de Métodos
  mounted() {
    this.pegarEscolaDoStorage()
    this.carregarEscola();
    this.buscarCategorias();
  }, //Fim da montagem
  created() {
    this.quemPodeVer();
  }
};
</script>

<style>
</style>