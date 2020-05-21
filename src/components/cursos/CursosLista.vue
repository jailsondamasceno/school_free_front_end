<template>
  <div class="lista-de-cursos">
    <PageTitle icon="fa fa-book" :main="cursos_cad" sub="Gerenciamento de cursos da instituição"/>
    <BotaoCadastrar cadastro="cadastro-curso" titulo="Cadastrar Curso: "/>

    <hr>
    <ul>
      <li v-for="curso in cursos" :key="curso.id">
        <CursoItem :curso="curso"/>
      </li>
    </ul>
    <!-- <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="buscarcursos">Carregar Mais </button>
    </div>-->
    <div>
      <b-modal class="entrada-modal" id="cadastro-curso" title="Cadastrar Curso" ref="modal">
        <form>
          <b-form-input type="text" placeholder="Nome do curso..." v-model="curso.nome"></b-form-input>
          <hr>
          <b-form-textarea
            id="descricao"
            v-model="curso.descricao"
            placeholder="Descrição do curso"
            :rows="3"
            :max-rows="6"
          ></b-form-textarea>
          <hr>
          <b-form-input type="url" placeholder="Url de uma imagem pra o curso" v-model="curso.url_imagem"></b-form-input>
          <hr>
          <b-form-input
            type="number"
            placeholder="Duração, somente número..."
            v-model="curso.duracao"
          ></b-form-input>
          <hr>
          <b-row class="duracao-modal">
            <p>Período:</p>
            <b-form-select :options="tipos_duracao" v-model="curso.tipo_duracao"/>
          </b-row>
          <hr>
          <b-row v-if="SU_AD()" class="escola-modal">          
              <b-form-group label="Disponível nas escolas:">
                <b-form-checkbox-group
                  id="escolas"
                  name="escolas"
                  v-model="escolas_seleciondas"
                  :options="escolas"
                ></b-form-checkbox-group>
              </b-form-group>            
          </b-row>
          <hr>
          <b-row class="ativacao-modal">
            <p>Status do curso:</p>
            <b-form-select :options="status" v-model="curso.status_curso"/>
          </b-row>
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
import CursoItem from "./CursoItem";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";

export default {
  name: "CursosLista",
  computed: mapState(["usuario"]),
  components: { PageTitle, CursoItem, BotaoCadastrar },
  data: function() {
    return {
      escola_selecionada: null,
      cursos_cad: "Cursos",
      cursos: Array,
      curso: {},
      tipos_duracao: [],
      escolas: [],
      escolas_seleciondas:[],
      status:['ATIVO','INATIVO'],
      page: 1,
      loadMore: true
    };
  },
  methods: {
    cancelar() {
      this.curso = {};
      this.$refs.modal.hide();
    },

    salvar() {
      this.setarInsituicaoNocurso();
      this.curso.para_escolas  =this.escolas_seleciondas
      var url = "";
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN" || perfil_atual === "ADMIN") {
        url = `${baseApiUrl}/cursos/cadastrar/${this.curso.id_instituicao}`;
      } else {
        this.setarEscolaNocurso();
        url = `${baseApiUrl}/cursos/cadastrarDiretor/${
          this.curso.id_instituicao
        }/${this.curso.id_escola}`;
      }
      axios
        .post(url, this.curso)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$refs.modal.hide();
          this.buscarCursos()
          this.curso ={para_escolas:this.escolas_seleciondas}
        })
        .catch(showError);
    },

    buscarCursos() {
      var url = "";
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN" || perfil_atual === "ADMIN") {
        url = `${baseApiUrl}/cursos/todos/${this.usuario.id_instituicao}`;
      } else {
        url = `${baseApiUrl}/cursos/cursosDaEscola/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }

      axios(url).then(res => {
        this.cursos = res.data;
        // this.page++

        if (res.data.length === 0) this.loadMore = false; //para paginação
      });
    },
    buscarEscolas() {
      const url = this.setarUrlEscola()
      axios(url).then(res => {
        this.escolas = res.data.map(escola => {
          return {  text: escola.nome_escola,value: escola.id };
        });
      });
    },
    setarInsituicaoNocurso() {
      this.curso.id_instituicao = this.usuario.id_instituicao;
    },
    setarUrlEscola(){
      const perfil_usuario = this.$store.state.usuario.perfil_atual
      if(perfil_usuario==='SUPER_ADMIN' || perfil_usuario==='ADMIN'){
        return `${baseApiUrl}/escolas/todasInstituicao/${this.usuario.id_instituicao}`;
      }else {
        return `${baseApiUrl}/escolas/escolaPorId/${this.usuario.id_instituicao}/${this.usuario.id_escola}`;
      }
    },
    setarEscolaNocurso() {
      this.curso.id_escola = this.usuario.id_escola;
    },

    buscarTiposDuracao() {
      const url = `${baseApiUrl}/cursos/tiposDuracao`;
      axios.get(url).then(res => {
        this.tipos_duracao = res.data.tipo;
      });
    },

    /*  pegarUrl(){
           const perfilUsuario = this.$store.state.usuario.perfil_atual
        }, */
    SU_AD() {
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
    this.buscarCursos();
    this.buscarTiposDuracao();
  }
};
</script>

<style>
.lista-de-cursos ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
}

.lista-de-cursos .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
.escola-modal {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
}
.duracao-modal {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
}
.ativacao-modal {
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

.ml-2 {
  margin-right: 10px;
}
</style>
