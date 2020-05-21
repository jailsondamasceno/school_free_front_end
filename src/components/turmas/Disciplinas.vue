<template>
  <div>
    <!-- <div class="botoes-profs">
      <b-button
        variant="success"
        class="mr-2"
        v-b-tooltip.hover
        title="Cadastrar Disciplina!"
        v-b-modal.cadastro-usuario
      >
        <i class="fa fa-user-plus"></i>
      </b-button>
    </div>
    <hr> -->
    <div>
      <b-container fluid>
        <b-table hover striped show-empty stacked="md" :items="disciplinas" :fields="fields">
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <b-button
              @click.prevent="row.toggleDetails"
              variant="primary"
              class="mr-2"
              id="ver"
              @click.stop="buscarProfessoresDisciplina(row.item)"
            >
              <i class="fa fa-eye"></i>
            </b-button>
          </template>
          <template slot="row-details" slot-scope="variavel">
           <b-table :items="professoresDisc" :fields="fieldsProfs">
            <p>{{variavel}}</p>
            <!-- <template slot="actions" slot-scope="data">
              <b-button 
                variant="success"
                v-b-tooltip.hover
                title="Pagar Pacela!"
                class="mr-2"
              > <i class="fa fa-money"></i>
              </b-button>
              
              <b-button
                variant="warning"
                v-b-tooltip.hover
                title="Editar Pacela!"
                class="mr-2"
              > <i class="fa fa-pencil"></i>
              </b-button>
            </template> -->
          </b-table>
          </template>
        </b-table>
      </b-container>

      <div>
        <b-modal
          class="entrada-modal"
          id="add-disciplina"
          title="Adicionar disciplina"
          ref="modalDisciplina"
        >
          
          <hr>
          <b-button class="ml-2" @click="cancelar()">Cancelar</b-button>
          <b-button variant="primary" @click="salvar()">Salvar</b-button>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "DisciplinasProf",
  computed: mapState(["usuario"]),
  data() {
    return {
      turma: {},
      disciplinas: [],
      professoresTurma:Array,
      professoresDisc: Array,
      fields: [
        { key: "nome", label: "Disciplina", sortable: true },
        { key: "carga_horaria", label: "Carga Horária", sortable: true },
        { key: "actions", label: "Professores" }
      ],
      fieldsProfs: [
        { key: "nome", label: "Nome", sortable: true },
        { key: "sobrenome", label: "Sobrenome", sortable: true }
      ],
    };
  },

  methods: {
    pegarTurmaDoStorage() {
      this.turma = JSON.parse(localStorage.getItem("turma"));
    },
    buscarDisciplinasCurso() {
      const url = `${baseApiUrl}/disciplinas/todasCurso/${
        this.usuario.id_instituicao
      }/${this.turma.id_curso}`;
      axios.get(url).then(res => {
        this.disciplinas = res.data;
      });
    },
    buscarProfessoresTurma() {
      const url = `${baseApiUrl}/turmas/professoresDaTurma/${
        this.usuario.id_instituicao
      }/${this.turma.id}`;
      axios.get(url).then(res => {
        this.professoresTurma = res.data
      });
    },
    buscarProfessoresDisciplina(item){
         this.professoresDisc = []
          const url = `${baseApiUrl}/disciplinas/profsPorDisciplina/${
        this.usuario.id_instituicao
      }/${item.id}`;
      axios.get(url).then(res => {
        this.professoresDisc = res.data 
      });
    }
  }, //methods
  mounted() {
    this.pegarTurmaDoStorage();
     this.buscarProfessoresTurma();
    this.buscarDisciplinasCurso();
  }
};
</script>

<style>
</style>
