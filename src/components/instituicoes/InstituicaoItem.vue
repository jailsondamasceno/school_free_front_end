<template>
  <div class="instituicao">
   <!--  <router-link :to="{ name: 'instituicaoDetalhes',params:{id_instituicao:instituicao.id}}"> -->
      <div class="instituicao-image d-none d-sm-block">
        <img
          v-if="instituicao.imageUrl"
          :src="instituicao.imageUrl"
          height="150"
          width="150"
          alt="Instituicao"
        >
        <img v-else src="@/assets/instituicao.png" height="150" width="100%" alt="Escola">
      </div>
      <div class="instituicao-info">
        <h2>{{ instituicao.nome_instituicao }}</h2>
        <p v-if="instituicao.dias_de_teste>0">{{ `Período de teste restante: ${instituicao.dias_de_teste}  dias` }}</p>
        <p>{{ `Plano Contratado: ${instituicao.plano_contratado}` }}</p>
        <p>{{ `Status Plano: ${instituicao.status_plano}` }}</p>
        <p>{{ `Status Instituicao: ${instituicao.status_instituicao}` }}</p>        
       
      </div>
      <div>
        <b-row>
          <b-col>
           <router-link :to="{ name: 'instituicaoDetalhes',params:{instituicao:instituicao}}">
              <b-button
              @click="setarInstituicaoNoStorage(instituicao)"
                variant="primary"
                class="mr-2"
                v-b-tooltip.hover
                title="Ver Instituicao!"
              >
                <i class="fa fa-eye"></i>
              </b-button>
            </router-link>
          </b-col>
        </b-row>
      </div>
   <!--  </router-link> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   name: "InstituicaoItem",
  computed: mapState(["usuario"]),
  props: ["instituicao"],
   methods:{
    setarInstituicaoNoStorage(instituicao){
      localStorage.setItem('instituicao',JSON.stringify(instituicao))
    }
  }
};
</script>

<style>
.instituicao {
   width: 20rem;
  height: auto;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69,90,100,0.20);
  box-shadow: 0 1px 20px 0 rgba(69,90,100,0.20);
  border: none;
  animation: pulse 2s;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.instituicao a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.instituicao-info h2 {
  font-size: 1.7rem;
}

.instituicao-image {
  border-bottom: 1px solid #aaa;
}

.instituicao-image img {
  border-radius: 5px;
}

.instituicao-info {
  flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.instituicao-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}
</style>
