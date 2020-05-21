<template>
  <div>
    <b-modal ref="modalDetalhe" hide-footer id="modalDetalhe" :title="produto.nome">
      <div>
        <img :src="produto.url_imagem" height="100%" width="100%" alt="produto">
      </div>
      <div>
        <span>{{produto.descricao}}</span>
      </div>

      <b-button variant="danger" v-b-tooltip.hover title="Fechar" @click="fecharDetalhes()">
        <i class="fa fa-close"></i>
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
     name:"produtoDetalhe",
     data(){
          return{
           produto:this.$route.params.produto    
          }
     },
  methods: {
    fecharDetalhes() {      
      this.$refs.modalDetalhe.hide();
      this.$router.push('/loja')
    },
    buscar_Pro_Por_Id() {
      this.produtoD = {};
      const url = `${baseApiUrl}/loja/produtoPorId/${
        this.produto.id_instituicao
      }/${this.produto.id}`;
      axios
        .get(url)
        .then(res => {
          this.produto = res.data;
        })
        .catch(showError);
    }
  },
  mounted() {
    this.buscar_Pro_Por_Id();
    //this.$root.$on("bv::modal::show", (bvEvent, modalDetalhe) => {});
    this.$refs.modalDetalhe.show()
  }
};
</script>

<style>
</style>
