<template>
  <div class="lista-de-turmas">
    <PageTitle icon="fa fa-graduation-cap" :main="turma_cad" sub="Cadastradas"/>
    <div class="botoes_cabecalho">   
        <BotaoCadastrar cadastro="cadastro-turma" titulo="Cadastrar turma: "/>

         <router-link :to="{ name: 'cursos'}">
        <b-button variant="secundary"  class="mr-2"  v-b-tooltip.hover
          title="Voltar para Cursos!">
          <i class="fa fa-undo"></i>
        </b-button>  
        </router-link>

    </div>

    <hr>
    <ul>
      <li v-for="turma in turmas" :key="turma.id">
        <turmaItem :turma="turma"/>
      </li>
    </ul>
    <!-- <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="buscarturmas">Carregar Mais </button>
    </div>-->
    <div>
      <b-modal class="entrada-modal" id="cadastro-turma" title="Cadastrar turma" ref="modal">
        <form>
          <b-form-input type="text" placeholder="Nome da turma..." v-model="turma.nome"></b-form-input>
          <hr>
          <b-form-textarea
            id="descricao"
            v-model="turma.descricao"
            placeholder="Descrição da turma, máximo 150 caracteres"
            :rows="3"
            :max-rows="3"
            maxlength="150"
          ></b-form-textarea>
          <hr>
          <b-form-input
            type="number"
            placeholder="Total de vagas da turma..."
            v-model="turma.total_de_vagas"
          ></b-form-input>
          <hr>
          <b-form-input
            type="number"
            placeholder="Vagas disponíves..."
            v-model="turma.vagas_disponiveis"
          ></b-form-input>
          <hr>
          <b-row class="turno-modal">
            <b-col md="3" sm="12">
              <p>Turno:</p>
              <b-form-select :options="turnos" v-model="turma.turno"/>
            </b-col>
          </b-row>
          <hr>
          <b-row class="data_inicio">
            <b-form-group>
              <p>Data início:</p>
              <datepicker
                :language="pt"
                :format="formatarData"
                v-model="turma.data_inicio"
                name="uniquename"
              ></datepicker>
            </b-form-group>
          </b-row>
          <b-row class="data_inicio">
            <b-form-group>
              <p>Data conclusão:</p>
              <datepicker
                :language="pt"
                :format="formatarData"
                v-model="turma.data_fim"
                name="uniquename"
              ></datepicker>
            </b-form-group>
          </b-row>
          <hr>          
          <b-row class="ativacao-modal">
            <p>Status da turma:</p>
            <b-form-select :options="status" v-model="turma.status_turma"/>
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
import { ptBR } from "vuejs-datepicker/dist/locale";
import { baseApiUrl, showError } from "@/global";
import Datepicker from "vuejs-datepicker";
import moment from "moment";
import { mapState } from "vuex";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import TurmaItem from "./TurmaItem";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";

export default {
  name: "TurmasPorCurso",
  computed: mapState(["usuario"]),
  components: { PageTitle, TurmaItem, BotaoCadastrar, Datepicker },
  data: function() {
    return {
      pt: ptBR,
      turma_cad: "Turmas",
      turmas: Array,
      turma: {},
      curso:this.$route.params.curso,
      status: ["ABERTA", "FECHADA"],
      turnos: ["MANHA", "TARDE", "NOITE", "INTEGRAL"],
      page: 1,
      loadMore: true
    };
  },
  methods: {
    formatarData(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    cancelar() {
      this.curso = {};
      this.$refs.modal.hide();
    },

    salvar() {
      this.turma.data_inicio = this.formatarData(this.turma.data_inicio);
      this.turma.data_fim = this.formatarData(this.turma.data_fim);
      const url = `${baseApiUrl}/turmas/cadastrar/${this.curso.id_instituicao}`;
      axios
        .post(url, this.turma)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$refs.modal.hide();
          this.buscarTurmas();
        })
        .catch(showError);
    },

    setarUrl(){
         const perfil_usuario = this.$store.state.usuario.perfil_atual
         if(perfil_usuario==='SUPER_ADMIN'|| perfil_usuario==='ADMIN'){
              return `${baseApiUrl}/turmas/turmasPorCurso/${
        this.$route.params.curso.id_instituicao
      }/${this.$route.params.curso.id}`;
         }else{
              return `${baseApiUrl}/turmas/turmasPorCursoEscola/${
        this.$route.params.curso.id_instituicao
      }/${this.usuario.id_escola}/${this.$route.params.curso.id}`;
         }
         },

    buscarTurmas() {
      const url = this.setarUrl()
      axios(url).then(res => {
        this.turmas = res.data;
        // this.page++

        if (res.data.length === 0) this.loadMore = false; //para paginação
      });
    },

    setar_Esc_Curso_na_Turma() {
      this.turma.id_escola = this.$route.params.curso.id_escola
      this.turma.id_curso = this.$route.params.curso.id
    },

  }, //Fim de methods

  mounted() {
     this.buscarTurmas()
     this.setar_Esc_Curso_na_Turma();
    //this.setarInsituicaoNaTurma();
  }
};
</script>

<style>
.lista-de-turmas ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
}

.lista-de-turmas .load-more {
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
.curso-modal {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
}

.data_inicio {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
}
.data_fim {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-content: space-between;
  align-items: center;
  margin-left: 2px;
  margin-right: 2px;
}
input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  border-radius: 5px;
}
.modal-footer {
  display: none;
}

.ml-2 {
  margin-right: 10px;
}

.botoes_cabecalho{
     display:  flex;
     flex-direction: row;
     align-content: space-between;
     align-items: center;
}
</style>
