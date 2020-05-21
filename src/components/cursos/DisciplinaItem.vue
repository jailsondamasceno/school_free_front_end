<template>
  <div class="disciplina">
    <h1>{{disciplina.nome}}</h1>
    <router-link :to="{ name: 'editarDisciplinaCurso',params:{disciplina:disciplina}}">
      <b-button variant="warning" v-b-tooltip.hover title="Editar Disciplina!">
        <i class="fa fa-pencil"></i>
      </b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "DisciplinaItem",
  props: ["disciplina"]
};
</script>

<style>
.disciplina {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
  padding: 20px;
  border-radius: 8px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}
.disciplina button {
  margin-left: 10px;
}
</style>
