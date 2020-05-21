<template>
  <div class="prod_car_item">
    <span>{{prod.nome}}</span>
    <p>
      <span>Valor:</span>
      <span :style="styleTipo">{{`R$ ${prod.valor}`}}</span>
    </p>
    <p v-if="prod.valor_com_desconto">
      <span>Valor com desconto:</span>
      <span :style="styleTipo">{{`R$ ${prod.valor_com_desconto}`}}</span>
    </p>
    <b-row>
      <b-col md="3" sm="9">
        <b-form-group id="desc" label="Aplicar desconto:" label-for="desc">
          <b-form-input 
           @input="retornaDesconto()"
           @change="retornaDesconto()"
            id="desc"
            type="number"
            v-model.number="prod.descontoAplicado"
            placeholder="Valor em  %:"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { showError } from "@/global";
export default {
  name: "ProdutoCarrinhoItem",
  props: ["prod","dados_carrinho"],
  computed: {
    ...mapState({
      usuario: state => state.usuario
    }),
    styleTipo() {
      return "font-weight: bolder;";
    }
  },
  methods: {
    retornaDesconto() {
      if (
        this.prod.descontoAplicado > this.usuario.desconto_max ||
        this.prod.descontoAplicado > 100
      ) {
        this.prod.descontoAplicado = 0;
        showError("Desconto inválido");
      }
     this.prod.total_desconto = ((this.prod.valor * this.prod.descontoAplicado)/100)
      this.prod.valor_com_desconto = (this.prod.valor -  this.prod.total_desconto) || this.prod.valor
       this.$store.commit('repassar_carrinho')//Ao adicionar um disconto atualizamos os valores para o usuário
    }
  }
 
};
</script>

<style>
.prod_car_item {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 8px;
  margin-right: 20px;
  padding: 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  margin-bottom: 30px;
}
</style>
