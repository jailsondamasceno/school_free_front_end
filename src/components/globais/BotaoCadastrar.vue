<template>
  <div class="botao-cadastrar">
    <div class="info">
      <span class="titulo">{{titulo}}</span>
    </div>
    <div class="botao">
      <b-button variant="success"  class="mr-2" v-b-modal="cadastro">           
       <i class="fa fa-plus" ></i>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
     props:['titulo','cadastro']
};
</script>
<style>
.botao-cadastrar{
     display: flex;
     flex-direction: row;
     align-content: space-between;
     align-items: center;
}
.titulo{
     font-size: 1.2rem;
     margin-right: 10px;
}
</style>
