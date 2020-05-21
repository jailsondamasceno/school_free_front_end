<template>
  <div class="curso" :class="{'apagar':curso.status_curso ==='INATIVO'}">
    <div class="curso-image">
      <img v-if="curso.url_imagem" :src="curso.url_imagem" height="150" width="100%" alt="curso">
      <img v-else src="@/assets/curso.png" height="150" width="100%" alt="curso">
    </div>
    <div class="curso-info">
      <h2>{{ curso.nome }}</h2>
      <p>{{`${curso.descricao}`}}</p>
      <p>{{`Status: ${curso.status_curso}`}}</p>
      <div slot="footer">
        <small class="text-muted">{{`Duração:${curso.duracao} ${curso.tipo_duracao}`}}</small>
      </div>
      <div>
        <hr>
        <b-row>
          <b-col>
            <router-link :to="{ name: 'cursoDetalhe',params:{curso:curso}}">
              <b-button
              @click="setarCursoNoStorage(curso)"
                variant="warning"
                class="mr-2"
                v-b-tooltip.hover
                title="Editar Curso!"
              >
                <i class="fa fa-pencil"></i>
              </b-button>
            </router-link>

             <router-link :to="{ name: 'turmasPorCurso',params:{curso:curso}}">
            <b-button
             @click="setarCursoNoStorage(curso)"
              variant="primary"
              class="mr-2"
              v-b-tooltip.hover
              title="Ver turmas do curso!"
            >
              <i class="fa fa-graduation-cap"></i>
            </b-button>
            </router-link>
              <router-link :to="{ name: 'disciplinasCurso',params:{curso:curso}}">
             <b-button
              @click="setarCursoNoStorage(curso)"
              variant="success"
              class="mr-2"
              v-b-tooltip.hover
              title="Ver disciplinas!"
            >
              <i class="fa fa-th-list"></i>
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
  name: "CursoItem",
  computed: mapState(["usuario"]),
  props: ["curso"],
  methods:{
    setarCursoNoStorage(curso){
      localStorage.setItem('curso',JSON.stringify(curso))
    }
  }
};
</script>

<style>
.curso {
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

.curso.apagar {
  opacity: 0.3;
}


.curso-info h2 {
  font-size: 1.7rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
}

.curso-image {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #aaa;
}

.curso-image img {
  border-radius: 5px;
}

.curso-info {
  flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.curso-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
}
</style>
