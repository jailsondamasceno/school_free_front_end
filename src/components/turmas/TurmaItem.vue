<template>
  <div class="turma" :class="{'apagar':turma.status_turma ==='FECHADA'}">
    <div class="turma-image">
      <img v-if="turma.url_imagem" :src="turma.url_imagem" height="150" width="100%" alt="turma">
      <img v-else src="@/assets/turma.png" height="150" width="100%" alt="turma">
    </div>
    <div class="turma-info">
      <h2>{{ turma.nome }}</h2>
      <h5>{{`${turma.descricao}`}}</h5>
      <p>{{`Turno: ${turma.turno}`}}</p>
      <p>{{`Data início: ${turma.data_inicio}`}}</p>
      <p>{{`Data conclusão: ${turma.data_fim}`}}</p>
      <p>{{`Vagas disponíveis: ${turma.vagas_disponiveis}`}}</p>
      <p>{{`Status: ${turma.status_turma}`}}</p>
      <hr>
      <div>
        <b-row>
          <b-col>
            <router-link :to="{ name: 'turmaDetalhe',params:{turma:turma}}">
              <b-button
                variant="warning"
                class="mr-2"
                v-b-tooltip.hover
                title="Editar Turma!"
                @click="sertarTurmaNoStorage(turma)"
              >
                <i class="fa fa-pencil"></i>
              </b-button>
            </router-link>

            <router-link :to="{ name: 'verTurma',params:{turma:turma}}">
              <b-button
                variant="primary"
                class="mr-2"
                v-b-tooltip.hover
                title="Entrar na Turma!"
                @click="sertarTurmaNoStorage(turma)"
              >
                <i class="fa fa-eye"></i>
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
  name: "TurmaItem",
  computed: mapState(["usuario"]),
  props: ["turma"],

  methods: {
    sertarTurmaNoStorage(turma) {
      localStorage.setItem("turma", JSON.stringify(turma));
    }
  }
};
</script>

<style>
.turma {
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

.turma.apagar {
  opacity: 0.3;
}

.turma-info h2 {
  font-size: 1.7rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
}

.turma-image {
  width: 50%;
  margin: 5px auto;
  height: 10rem;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  /* border-bottom: 1px solid #aaa; */
}

.turma-image img {
  vertical-align: middle;
  border-style: none;
  margin: 5px;
  margin: 5px auto;
  align-items: center;
  align-content: center;
  border-radius: 80px;
}

.turma-info {
  flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.turma-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
}
</style>
