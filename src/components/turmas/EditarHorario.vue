<template>
  <b-modal id="editar-horario" title="Horário" ref="modal">
      <b-form>
        <b-form-group label="Disciplina">
          <b-form-radio-group
            id="disciplinas"
            v-model="horario.disciplina"
            :options="disciplinas_curso"
            name="disciplinas"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group label="Professor">
          <b-form-radio-group
            id="professores"
            v-model="horario.id_professor"
            :options="profs_turma"
            name="professores"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group label="Dia da Semana:">
          <b-form-radio-group
            id="dia_semana"
            v-model="horario.dia"
            :options="dias_semana"
            name="dia_semana"
          ></b-form-radio-group>
        </b-form-group>

          <p>Hora início:</p>
        <b-form-input type="time" v-model="horario.hora_inicio"></b-form-input>
        <hr>
        <p>Hora início:</p>
        <b-form-input type="time" v-model="horario.hora_fim"></b-form-input>
 
        <hr>

        <b-button class="ml-2" @click="cancelar()" v-b-tooltip.hover title="Cancelar">
          <i class="fa fa-undo"></i>
        </b-button>
        <b-button variant="primary" @click="salvar()" v-b-tooltip.hover title="Salvar">
          <i class="fa fa-check"></i>
        </b-button>
        <b-button variant="danger" @click="deletar()" v-b-tooltip.hover title="Deletar">
          <i class="fa fa-trash"></i>
        </b-button>
      </b-form>
    </b-modal>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "EditarHorario",
  computed: mapState(["usuario"]),
  data() {
    return {
      horario:this.$route.params.horario,
      turma: {},
      profs_turma:[],
      disciplinas_curso:[],
      dias_semana: [
        "DOMINGO",
        "SEGUNDA",
        "TERCA",
        "QUARTA",
        "QUINTA",
        "SEXTA",
        "SABADO"
      ],
    };
  },

  methods: {
    pegarTurmaDoStorage(){
      this.turma = JSON.parse(localStorage.getItem('turma'))
    },
    abrirModal() {
      this.$root.$emit("bv::show::modal", "editar-horario");//Evento que abre o modal no momento que monta o componente
    },
    buscarDisciplinasCurso() {
      const url = `${baseApiUrl}/disciplinas/todasCurso/${
        this.usuario.id_instituicao
      }/${this.turma.id_curso}`;
      axios.get(url).then(res => {
        this.disciplinas_curso = res.data.map(item => {
          return { value: item.nome, text: item.nome };
        });
      }).catch(showError)
    },
    buscarProfessoresDaTurma() {
      const url = `${baseApiUrl}/disciplinas/profsTurma/${
        this.usuario.id_instituicao
      }/${this.turma.id}`;
      axios.get(url).then(res => {
        this.profs_turma = res.data.map(item => {
          const nome = `${item.nome} ${item.sobrenome}`;
          return { value: item.id, text: nome };
        });
      }).catch(showError)
    },
    cancelar() {
      this.horario = {};
      this.$refs.modal.hide();
      this.$router.push({   name: 'verTurma',   params: { tab_ativa: 3 }});
    },
    salvar() {
      const url = `${baseApiUrl}/horarios/atualizar/${
        this.usuario.id_instituicao
      }/${this.horario.id}`;
      axios.patch(url, this.horario).then(() => {
        this.$toasted.global.defaultSuccess();
        this.horario = {};
        this.$router.push({   name: 'verTurma',   params: { tab_ativa: 3 }});
        this.$refs.modal.hide();
      }).catch(showError)
    },
    deletar() {
      const url = `${baseApiUrl}/horarios/deletar/${
        this.usuario.id_instituicao
      }/${this.horario.id}`;
      axios.delete(url).then(() => {
        this.$toasted.global.defaultSuccess();
        this.horario = {};
        this.$router.push({ name: 'verTurma',   params: { tab_ativa: 3 }});
        this.$refs.modal.hide();
      });
    }
  }, //methods
  mounted() {
    this.pegarTurmaDoStorage();
    this.abrirModal();
    this.buscarProfessoresDaTurma();
    this.buscarDisciplinasCurso();
  }
};
</script>

<style>
.modal-dialog button {
  margin: 10px;
}
.close {
  display: none;
}

.label {
    margin: 5px;
    }
    .custom-control-label {
      position: relative;
      margin: 5px;
    }
</style>