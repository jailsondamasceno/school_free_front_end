<template>
  <div class="evento">
    <div class="evento-image" >
      <img v-if="evento.url_imagem" :src="evento.url_imagem" height="150" width="100%" alt="evento">
      <img v-else src="@/assets/evento.png" height="150" width="100%" alt="evento">
    </div>
    <div class="evento-info">
      <h2>{{ evento.titulo }}</h2>
      <p>{{evento.descricao}}</p>
      <p>
        <span>Tipo: </span>
        <span :style="styleTipo">{{evento.tipo}}</span>
      </p>
      <p>
        <span>Local:</span>
        {{evento.local}}
      </p>

      <p>
        <span>Início:</span>
        {{evento.data_i_evento}}
      </p>
      <p>
        <span>Fim:</span>
        {{evento.data_f_evento}}
      </p>

      <div>       
        <b-row>
          <b-col>
            <router-link :to="{ name: 'eventoEdicao',params:{evento:evento}}"> 
            <b-button variant="warning" class="mr-2" v-b-tooltip.hover title="Editar Evento!">
              <i class="fa fa-pencil"></i>
            </b-button>
            </router-link>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EventoItem",
  props: ["evento"],
  computed: {
    ...mapState({
      usuario: state => state.usuario
    }),
    styleTipo() {
      return "color: " + (this.evento.cor || "#000");
    }
  },

  methods: {}
};
</script>

<style>
.evento {
  width: 20rem;
  height: auto;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.2);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.2);
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

.evento a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.evento-info h2 {
  font-size: 1.7rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
}

.evento-image {
  padding-bottom: 20px;
  margin-bottom: 20px; 
  border-bottom: 1px solid #aaa;
}

.evento-image img {
  border-radius: 5px;
}

.evento-info {
  flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: column;
}
.evento-info span {
  color: #000;
  font-weight: bold;
}

.evento-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
}
</style>
