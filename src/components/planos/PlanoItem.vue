<template>
  <div>
    <b-card
      :title="plano.nome"
      :img-src="plano.url_imagem"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >

        <p class="card-text">{{plano.descricao}}</p>
        <h2>R$: {{plano.valor_anual}} anual</h2>
        <h2>R$: {{plano.valor_mensal}} mensal</h2>


        <b-button class="botao" href="#" variant="primary">Escolher</b-button>

    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PlanoItem",
  computed: mapState(["usuario"]),
  props: ["plano"]  
};
</script>

<style>
.mb-2{
  animation:pulse 2s  ;
}
@keyframes pulse {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.card{
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
    box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
    border: none;
    margin-bottom: 30px;
    margin-right: 5px;
}
.card-img-top {
  width: 50%;
  margin: 5px auto;
  height: 10rem;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
}
.card-body {
  display: flex;
  -webkit-box-flex: 1;
  flex-direction: column;
  padding: 1.25rem;
  height: 20rem;
  animation: pulse 3s;  

}
</style>
