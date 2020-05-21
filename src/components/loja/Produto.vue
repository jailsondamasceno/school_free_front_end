<template>
  <div class="produto">
    <div class="produto-image">
      <img :src="produto.url_imagem" height="150" width="100%" alt="produto">
      <!--  <img v-else src="@/assets/produto.png" height="150" width="100%" alt="produto"> -->
    </div>
    <div class="produto-info">
      <h2>{{ produto.nome }}</h2>
      <!-- <p>{{`${produto.descricao}`}}</p> -->
      <p>{{`R$: ${produto.valor},00`}}</p>
      <!--  <div slot="footer">
        <small class="text-muted">{{`Duração:${produto.duracao} ${produto.tipo_duracao}`}}</small>
      </div>-->
      <div>
        <b-row>
          <b-col>
            <router-link :to="{ name: 'produtoEdicao',params:{produto:produto}}">
              <b-button
                @click="setarProdutoNoStorage(produto)"
                variant="warning"
                class="mr-2"
                v-b-tooltip.hover
                title="Editar Produto!"
              >
                <i class="fa fa-pencil"></i>
              </b-button>
            </router-link>
            <router-link :to="{ name: 'produtoDetalhe',params:{produto:produto}}"> 
            <b-button
              @click="setarProdutoNoStorage(produto)"
             variant="primary"
              class="mr-2"
              v-b-tooltip.hover
              title="Ver detalhes!"
            >
              <i class="fa fa-eye"></i>
            </b-button>
            </router-link>
            <!-- <router-link :to="{ name: 'turmasPorproduto',params:{produto:produto}}"> -->
              <b-button
                @click="setarProdutoNoStorage(produto)"
                variant="outline-success"
                class="mr-2"
                v-b-tooltip.hover
                title="Comprar"
              >Comprar
                
              </b-button>
            <!-- </router-link> -->
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Produto",
  props: ["produto"],
  data() {
    return {
      produtoD: {}
    };
  },
  methods: {    
    setarProdutoNoStorage(produto) {
      localStorage.setItem("turma", JSON.stringify(produto));
    }
  } //fim methods
};
</script>

<style>
.produto {
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

/* .produto.apagar {
  opacity: 0.3;
}
 */

.produto-info h2 {
  font-size: 1.7rem;
  /* box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2); */
}

.produto-image {
  width: 50%;
  margin: 5px auto;
  height: 10rem;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.produto-image img {
  border-radius: 5px;
}

.produto-info {
  flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.produto-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
  /* box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2); */
}
</style>
