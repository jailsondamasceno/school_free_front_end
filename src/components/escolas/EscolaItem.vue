<template>
  <div class="escola">
  <!--   <router-link 
      :to="{ name: 'escolaDetalhe',params:{id_instituicao:escola.id_instituicao,id_escola:escola.id}}"
    > -->
      <div class="escola-image">
        <img v-if="escola.url_imagem" :src="escola.url_imagem" height="150" width="100%" alt="Escola">
        <img v-else src="@/assets/escola.jpg" height="150" width="100%" alt="Escola">
      </div>
      <div class="escola-info">
        <h2>{{ escola.nome_escola }}</h2>
        <p>{{`Categoria: ${escola.categoria}`}}</p>
        <p>{{` Cobraça automática por e-mail: ${escola.cobranca_automatica}`}}</p>
       
        <div>
          <b-row>
            <b-col>
            <router-link :to="{ name: 'escolaDetalhe',params:{id_instituicao:escola.id_instituicao,id_escola:escola.id}}">
              <b-button
              @click="setarEscolaNoStorage(escola)"
                variant="warning"
                class="mr-2"
                v-b-tooltip.hover
                title="Editar Curso!"
              >
                <i class="fa fa-pencil"></i>
              </b-button>
            </router-link>
            </b-col>
          </b-row>
        </div>
      </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EscolaItem",
  computed: mapState(["usuario"]),
  props: ["escola"],
   methods:{
    setarEscolaNoStorage(escola){
      localStorage.setItem('escola',JSON.stringify(escola))
    }
  }
};
</script>

<style>
.escola {
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

.escola a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.escola-info h2 {
  font-size: 1.7rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);

}

.escola-image {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #aaa;
}

.escola-image img {
  border-radius: 5px;
}

.escola-info {
   flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: column;
  
}

.escola-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
}



</style>
