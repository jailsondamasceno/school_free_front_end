<template>
  <div>
    <b-card
      :header="horario.disciplina"
      header-text-variant="white"
      header-tag="header"
      header-bg-variant="primary"
      :footer="`Prof: ${horario.professor}`"
      footer-tag="footer"
      footer-bg-variant="white"
      footer-border-variant="dark"
      style="max-width: 20rem; max-height:15rem;"
    >
      <p class="card-text">{{`Inicio: ${horario.hora_inicio}`}}</p>
      <p class="card-text">{{`Fim: ${horario.hora_fim}`}}</p>   
      <b-row  v-if="SU_AD_DI()">
        <router-link :to="{ name: 'editarHorario',params:{horario:horario}}">
        <b-button
        variant="warning"
        v-b-tooltip.hover
        title="Editar Horário!"
      >
        <i class="fa fa-pencil"></i>
      </b-button>
      </router-link>
      </b-row>   
    </b-card>    
  </div>
</template>

<script>
export default {
  name: "HorarioItem",
  props: ["horario"],
  methods:{
    SU_AD_DI(){
     const perfil_usuario =  this.$store.state.usuario.perfil_atual
     if(perfil_usuario==='SUPER_ADMIN'|| perfil_usuario==='ADMIN' ||perfil_usuario==='DIRETOR'){
       return true
     }else{return false}
    }
  }
 
  
};
</script>

<style>
.card-footer {
  color: darkcyan;
  padding: 10px;
  margin-top: 10px;
}

.card{
  margin-bottom: 10px;
}

.card button{
margin-bottom: 20px;
margin-bottom: 5px;
}
</style>
