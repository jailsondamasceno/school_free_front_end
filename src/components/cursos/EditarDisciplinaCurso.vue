<template>
  <b-modal id="editar-disciplina"  title="Disciplina" ref="modal" >
    <b-form>
      <b-form-input type="text" placeholder="Nome da disciplina" v-model="disciplina.nome"></b-form-input>
      <hr>
      <b-form-input type="number" placeholder="Carga horária" v-model="disciplina.carga_horaria"></b-form-input>
      <hr>
      <b-button class="ml-2" @click="cancelar()" v-b-tooltip.hover title="Cancelar"  > <i class="fa fa-undo"></i></b-button>
      <b-button variant="primary" @click="salvar()" v-b-tooltip.hover title="Salvar"> <i class="fa fa-check"></i></b-button>
      <b-button variant="danger" @click="deletar()" v-b-tooltip.hover title="Deletar"><i class="fa fa-trash"></i></b-button>
    </b-form>
  </b-modal>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "EditarDisciplinaCurso",
  computed:mapState(['usuario']),
  data() {
    return {
      disciplina: {}
    };
  },

  methods: {
     abrirModal(){
     this.$root.$emit('bv::show::modal','editar-disciplina')
     },
    pegarDisciplina() {
      this.disciplina = this.$route.params.disciplina;
    },
    cancelar() {
      this.disciplina = {};
      this.$refs.modal.hide();
      this.$router.push('/disciplinasCurso')
    },
    salvar() {
      const url = `${baseApiUrl}/disciplinas/atualizar/${
        this.usuario.id_instituicao}/${this.disciplina.id}`;
      axios.patch(url, this.disciplina).then(() => {
        this.$toasted.global.defaultSuccess();
        this.disciplina = {};
        this.$router.push('/disciplinasCurso')
        this.$refs.modal.hide();
      });
    },
    deletar(){
       const url = `${baseApiUrl}/disciplinas/deletar/${
        this.usuario.id_instituicao}/${this.disciplina.id}`;
      axios.delete(url).then(() => {
        this.$toasted.global.defaultSuccess();
        this.disciplina = {};
        this.$router.push('/disciplinasCurso')
        this.$refs.modal.hide();
      });

    }
  }, //methods
  mounted(){
       this.abrirModal()
       this.pegarDisciplina()
  }
};
</script>

<style>
 .modal-dialog  button{
  margin: 10px;
}
.close{
  display:  none;
}
</style>
