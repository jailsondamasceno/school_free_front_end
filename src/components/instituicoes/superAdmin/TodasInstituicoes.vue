<template>
  <div class="articles-by-category" v-if="quemPodeVer()">
    <PageTitle icon="fa fa-university" :main="instituicoes_cad" sub="Cadastradas"/>
    <ul>
      <li v-for="instituicao in instituicoes" :key="instituicao.id">
        <InstituicaoItem :instituicao="instituicao"/>
      </li>
    </ul>
    <!-- <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="buscarInstituicoes">Carregar Mais </button>
    </div>-->
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import { mapState } from "vuex";
import axios from "axios";
import PageTitle from "@/components/template/PageTitle";
import InstituicaoItem from "../InstituicaoItem";

export default {
  name: "TodasInstituicoes",
  computed: mapState(["usuario"]),
  components: { PageTitle, InstituicaoItem },
  data: function() {
    return {
      instituicoes_cad: "Instituicões",
      instituicoes: Array,
      page: 1,
      loadMore: true
    };
  },
  methods: {
    buscarInstituicoes() {
      const url = `${baseApiUrl}/instituicoes/todas`;
      axios(url).then(res => {
        this.instituicoes = res.data;
        // this.page++

        if (res.data.length === 0) this.loadMore = false;
      });
    },
    quemPodeVer() {
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN") {
        return true;
      } else {
        return false;
      }
    }
  }, //Fim de methods

  mounted() {
    this.buscarInstituicoes();
  }
};
</script>

<style>
.articles-by-category ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
}

.articles-by-category .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}
</style>
