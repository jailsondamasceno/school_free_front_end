<template>
  <div class="lista-de-cursos">
    <div>
      <PageTitle icon="fa fa-th-list" :main="disciplinas_cad" sub="curso"/>
      <BotaoCadastrar cadastro="cadastro-disciplina" titulo="Cadastrar Disciplinas: "/>
    </div>
    <hr>
    <ul>
      <li v-for="disciplina in disciplinas" :key="disciplina.id">
        <DisciplinaItem :disciplina="disciplina"/>
      </li>
    </ul>

    <b-modal id="cadastro-disciplina"  title="Disciplina" ref="modal" >
    <b-form>
      <b-form-input type="text" placeholder="Nome da disciplina" v-model="disciplina.nome"></b-form-input>
      <hr>
      <b-form-input type="number" placeholder="Carga horária" v-model="disciplina.carga_horaria"></b-form-input>
      <hr>
      <b-button class="ml-2" @click="cancelar()" v-b-tooltip.hover title="Cancelar"  > <i class="fa fa-undo"></i></b-button>
      <b-button variant="primary" @click="salvar()" v-b-tooltip.hover title="Salvar"> <i class="fa fa-check"></i></b-button>
    </b-form>
  </b-modal>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";
import DisciplinaItem from "./DisciplinaItem";

export default {
  name: "DisciplinasCurso",
  components: { DisciplinaItem, PageTitle, BotaoCadastrar },
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  data() {
    return {
      disciplinas_cad: "Disciplinas",
      disciplinas: [],
      disciplina: {},
      id_curso: ""
    };
  },

  methods: {
    buscarDisciplinas() {
      const url = `${baseApiUrl}/disciplinas/todasCurso/${
        this.usuario.id_instituicao
      }/${this.id_curso}`;
      axios.get(url).then(res => {
        this.disciplinas = res.data;
      });
    },

    pegarCursoDoStorage() {
      const curso = JSON.parse(localStorage.getItem("curso"))
      this.id_curso  = curso.id
    },

    cancelar() {
      this.disciplina = {};
      this.$refs.modal.hide();
    },
    salvar(){
      this.disciplina.id_curso = this.id_curso
      const url= `${baseApiUrl}/disciplinas/cadastrar/${this.usuario.id_instituicao}`
      axios.post(url,this.disciplina).then(()=>{
          this.$toasted.global.defaultSuccess()
          this.buscarDisciplinas()
          this.disciplina = {}
          this.$refs.modal.hide()
      })  
    },

  }, ///methods

  mounted() {
    this.pegarCursoDoStorage();
    this.buscarDisciplinas();
  }
};
</script>

<style>
</style>
