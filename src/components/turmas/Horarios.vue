<template>
  <div>
    <div class="botoes-profs">
      <b-button
        variant="success"
        class="mr-2"
        v-b-tooltip.hover
        title="Cadastrar Horário!"
        v-b-modal.cadastrar-horario
      >
        <i class="fa fa-clock-o"></i>
      </b-button>
    </div>
    <hr>

    <div class="container">
      <Domingo :h_domingo="h_domingo" v-if="horarios_dias.domingo>0"/>
      <Segunda :h_segunda="h_segunda" v-if="horarios_dias.segunda>0"/>
      <Terca :h_terca="h_terca" v-if="horarios_dias.terca>0"/>
      <Quarta :h_quarta="h_quarta" v-if="horarios_dias.quarta>0"/>
      <Quinta :h_quinta="h_quinta" v-if="horarios_dias.quinta>0"/>
      <Sexta :h_sexta="h_sexta" v-if="horarios_dias.sexta>0"/>
      <Sabado :h_sabado="h_sabado" v-if="horarios_dias.sabado>0"/>
    </div>

    <b-modal id="cadastrar-horario" title="Horário" ref="modal">
      <b-form>
           <p>Disciplina:</p>
        <b-form-group class="disc" >
          <b-form-radio-group
            id="disciplinas"
            v-model="horarioSalvar.disciplina"
            :options="disciplinas_curso"
            name="disciplinas"
          ></b-form-radio-group>
        </b-form-group>
        <p>Professor:</p>
        <b-form-group class="disc">
          <b-form-radio-group
            id="professores"
            v-model="horarioSalvar.id_professor"
            :options="profs_turma"
            name="professores"
          ></b-form-radio-group>
        </b-form-group>
        <p>Dias da Semana:</p>
        <b-form-group class="disc">
          <b-form-radio-group
            id="dia_semana"
            v-model="horarioSalvar.dia"
            :options="dias_semana"
            name="dia_semana"
          ></b-form-radio-group>
        </b-form-group>
        <p>Hora início:</p>
        <b-form-input type="time" v-model="horarioSalvar.hora_inicio"></b-form-input>
        <hr>
        <p>Hora fim:</p>
        <b-form-input type="time" v-model="horarioSalvar.hora_fim"></b-form-input>
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
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";
import Domingo from "./diasDaSemana/Domingo";
import Segunda from "./diasDaSemana/Segunda";
import Terca from "./diasDaSemana/Terca";
import Quarta from "./diasDaSemana/Quarta";
import Quinta from "./diasDaSemana/Quinta";
import Sexta from "./diasDaSemana/Sexta";
import Sabado from "./diasDaSemana/Sabado";

export default {
  name: "Horarios",
  components: { Domingo, Segunda, Terca, Quarta, Quinta, Sexta, Sabado },
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  data() {
    return {
      turma: {},
      horarioSalvar: {},
      profs_turma: [],
      disciplinas_curso: [],
      horario: {},
      dias_semana: [
        "DOMINGO",
        "SEGUNDA",
        "TERCA",
        "QUARTA",
        "QUINTA",
        "SEXTA",
        "SABADO"
      ],
      horarios_dias: {
        domingo: 0,
        segunda: 0,
        terca: 0,
        quarta: 0,
        quinta: 0,
        sexta: 0,
        sabado: 0
      },
      h_domingo: [],
      h_segunda: [],
      h_terca: [],
      h_quarta: [],
      h_quinta: [],
      h_sexta: [],
      h_sabado: []
    };
  },

  methods: {
    cancelar() {
      this.horarioSalvar = {};
      this.$refs.modal.hide();
    },
    salvar() {
      this.horarioSalvar.id_turma = this.turma.id;
      const url = `${baseApiUrl}/horarios/cadastrar/${
        this.usuario.id_instituicao
      }`;
      axios.post(url, this.horarioSalvar).then(() => {
        this.limparHorarios();
        this.buscarHorariosDaTurma();
        this.$toasted.global.defaultSuccess();
        this.$refs.modal.hide();
        this.horarioSalvar = {};
      });
    },
    pegarTurmaDoStorage() {
      this.turma = JSON.parse(localStorage.getItem("turma"));
    },
    limparHorarios() {
      this.h_domingo = [];
      this.h_segunda = [];
      this.h_terca = [];
      this.h_quarta = [];
      this.h_quinta = [];
      this.h_sexta = [];
      this.h_sabado = [];
    },
    buscarHorariosDaTurma() {
      const url = `${baseApiUrl}/horarios/horariosPorTurma/${
        this.usuario.id_instituicao
      }/${this.turma.id}`;
      axios
        .get(url)
        .then(res => {
          res.data.map(item => {
            if (item.dia === "DOMINGO") {
              this.h_domingo.push(item);
              this.horarios_dias.domingo++;
            } else if (item.dia === "SEGUNDA") {
              this.h_segunda.push(item);
              this.horarios_dias.segunda++;
            } else if (item.dia === "TERCA") {
              this.h_terca.push(item);
              this.horarios_dias.terca++;
            } else if (item.dia === "QUARTA") {
              this.h_quarta.push(item);
              this.horarios_dias.quarta++;
            } else if (item.dia === "QUINTA") {
              this.h_quinta.push(item);
              this.horarios_dias.quinta++;
            } else if (item.dia === "SEXTA") {
              this.h_sexta.push(item);
              this.horarios_dias.sexta++;
            } else if (item.dia === "SABADO") {
              this.h_sabado.push(item);
              this.horarios_dias.sabado++;
            }
          });
        })
        .catch(showError);
    },
    buscarDisciplinasCurso() {
      const url = `${baseApiUrl}/disciplinas/todasCurso/${
        this.usuario.id_instituicao
      }/${this.turma.id_curso}`;
      axios.get(url).then(res => {
        this.disciplinas_curso = res.data.map(item => {
          return { value: item.nome, text: item.nome };
        });
      });
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
      });
    }
  }, //methods

  mounted() {
    this.pegarTurmaDoStorage();
    this.buscarHorariosDaTurma();
    this.buscarDisciplinasCurso();
    this.buscarProfessoresDaTurma();
  }
};
</script>


<style>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: flex-start;
  background-color: #efefef;
  padding: 20px;
}

.container li {
  list-style-type: none;
}
.container ul {
  align-content: center;
  margin-top: 0;
  margin-bottom: 10px;
  margin-right: 35px;
}
.container p {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.disc {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: flex-start;
  border-radius: 10px;
  background-color: #F1F3F4;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);

}
</style>
