<template>
 <div class="lista-de-produtos">
    <PageTitle icon="fa fa-shopping-cart" :main="produtos_cad" sub="Produtos e Serviços"/>
    <ul>
      <li v-for="produto in produtos" :key="produto.id">
         <Produto :produto="produto"/>
      </li>
    </ul>
    
</div>

</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";
import PageTitle from "@/components/template/PageTitle";

import Produto from './Produto'

export default {
  name: "ProdutosLista",
  components:{Produto,PageTitle},
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  data() {
    return {
         produtos_cad:'Loja',
         produtos:[]
    };
  },
  methods:{  
    setarUrlProdutos(){
      const perfil = this.usuario.perfil_atual
      if(perfil==='SUPER_ADMIN'|| perfil==='ADMIN'){
        return `${baseApiUrl}/loja/produtosInstituicao/${this.usuario.id_instituicao}`
      }else{
       return `${baseApiUrl}/loja/produtosEscola/${this.usuario.id_instituicao}/${this.usuario.id_escola}`
      }
    },  
    buscarProdutos(){
      var url = this.setarUrlProdutos()
      
      axios.get(url).then(res=>{
        this.produtos = res.data
      }).catch(showError)
    },
    
  },//Fim methods
  
  mounted(){
    this.buscarProdutos()
  }
};
</script>

<style>
.lista-de-produtos ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
}
</style>
