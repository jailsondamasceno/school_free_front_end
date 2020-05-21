<template>
  <div>
    <div>
      <PageTitle icon="fa fa-graduation-cap" :main="turma.nome" sub="Info"/>
    </div>
    <div> 
      <b-tabs v-model="tabIndex"> 
          <b-tab title="Alunos" >
          <Alunos :turma="turma"/>
        </b-tab>
        <b-tab title="Profesores" >
          <Professores :turma="turma"/>
        </b-tab>
        <b-tab title="Disciplinas" >
          <Disciplinas/>
        </b-tab>
        <b-tab title="Horários" >
          <Horarios/>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageTitle from "../template/PageTitle";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";

import Disciplinas from './Disciplinas'
import Horarios from './Horarios'
import Alunos from "./Alunos";
import Professores from "./Professores";

export default {
  name: "VerTurma",
  components: { PageTitle, BotaoCadastrar, Alunos, Professores ,Disciplinas, Horarios},
  data() {
    return {
      tabIndex: this.$route.params.tab_ativa,
      turma: {},
    };
  },
  computed: mapState(["usuario"]),
  methods: {
     pegarTurmaDoStorage() {
      this.turma = JSON.parse(localStorage.getItem("turma"));
    }
  },

  mounted() {
    this.pegarTurmaDoStorage();
  }
};
</script>

<style>
</style>
