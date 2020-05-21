<template>
  <div class="turma-admin">
    <b-form>
      <input id="turma-id" type="hidden" v-model="turma.id">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome da turma:" label-for="turma-nome">
            <b-form-input
              id="turma-nome"
              type="text"
              v-model="turma.nome"
              required
              :readonly="mode === 'leitura'"
              placeholder="Nome da turma..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Descrição:" label-for="turma-nome">
            <b-form-textarea
              id="descricao"
              v-model="turma.descricao"
              required
              :readonly="mode === 'leitura'"
              placeholder="Descrição da turma, máximo 150 caracteres"
              :rows="3"
              :max-rows="3"
              maxlength="150"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Total de vagas:" label-for="total_de_vagas">
            <b-form-input
              id="total_de_vagas"
              type="number"
              v-model="turma.total_de_vagas"
              required
              :readonly="mode === 'leitura'"
              placeholder="Total de vagas da turma..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Vagas disponíveis:" label-for="vagas_disponiveis">
            <b-form-input
              id="vagas_disponiveis"
              type="number"
              v-model="turma.vagas_disponiveis"
              required
              :readonly="mode === 'leitura'"
              placeholder="Vagas disponíveis..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="Turno:" label-for="tipo-turno">
            <b-form-select
              required
              :readonly="mode === 'leitura'"
              id="tipo-turno"
              :options="turnos"
              v-model="turma.turno"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Data início:" label-for="data-inicio">
            
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="data-inicio"
              type="text"
              v-model="turma.data_inicio"
              required
              :readonly="mode==='leitura'"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Data conclusão:" label-for="data-fim">
           
          </b-form-group>
          <b-form-group>
            <b-form-input
              id="data-fim"
              type="text"
              v-model="turma.data_fim"
              required
              :readonly="mode==='leitura'"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Escola:" label-for="turma-escola">
            <b-form-input
              id="turma-escola"
              type="text"
              v-model="escola.nome_escola"
              required
              readonly
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Curso:" label-for="turma-curso">
            <b-form-input id="turma-curso" type="text" v-model="curso.nome" required readonly/>
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="Status da turma:" label-for="status-turma">
            <b-form-select
              required
              :readonly="mode === 'leitura'"
              id="status-turma"
              :options="status"
              v-model="turma.status_turma"
            />
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
    <hr>
  </div>
</template>

<script>
import { ptBR } from "vuejs-datepicker/dist/locale";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "TurmaDetalhe",
  computed: mapState(["usuario"]),
  components: { Datepicker },
  data: function() {
    return {
      pt: ptBR,
      mode: "leitura",
      data_i: null,
      data_f: null,
      turma: {},
      curso: {},
      escola: {},
      status: ["ABERTA", "FECHADA"],
      turnos: ["MANHA", "TARDE", "NOITE","INTEGRAL"]
    };
  },
  methods: {
    formatarData(data) {
      return moment(data).format("DD/MM/YYYY");
    },

    pegarTurmaDoStorage(){
      this.turma = JSON.parse(localStorage.getItem("turma"))
    },

    carregarTurma() {
      const url = `${baseApiUrl}/turmas/turmaPorId/${
        this.usuario.id_instituicao
      }/${this.turma.id}`;
      axios.get(url).then(res => {
        this.turma = res.data;

        this.carregarEscola();
        this.carregarCurso();
      });
    },
    carregarEscola() {
      const url = `${baseApiUrl}/escolas/escolaPorId/${
        this.usuario.id_instituicao
      }/${this.turma.id_escola}`;
      axios.get(url).then(res => {
        this.escola = res.data;
      });
    },
    carregarCurso() {
      const url = `${baseApiUrl}/cursos/cursoPorId/${
        this.usuario.id_instituicao
      }/${this.turma.id_curso}`;
      axios.get(url).then(res => {
        this.curso = res.data;
      });
    },

    /* buscarEscolas() {
      const url = `${baseApiUrl}/escolas/todas/${
        this.$route.params.turma.id_instituicao
      }`;
      axios(url).then(res => {
        this.escolas = res.data.map(escola => {
          return { value: escola.id, text: escola.nome_escola };
        });
      });
    }, */

    editar() {
      this.mode = "edicao";
    },
    cancelar() {
      this.mode = "leitura";
    },

    salvar() {
      this.turma.data_inicio = this.formatarData(this.turma.data_inicio);
      this.turma.data_fim = this.formatarData(this.turma.data_fim);
      const url = `${baseApiUrl}/turmas/atualizar/${
        this.usuario.id_instituicao
      }/${this.turma.id}`;
      axios
        .patch(url, this.turma)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.mode = "leitura";
        })
        .catch(showError);
    },

    /*  loadturma(turma, mode = "save") {
      this.mode = mode;
      this.turma = { ...turma };
    }, */
    SU_AD() {
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
  }, //Fim de Métodos
  mounted() {
    this.pegarTurmaDoStorage()
    this.carregarTurma();
    //this.buscarEscolas();
  } //Fim da montagem
};
</script>

<style>
</style>