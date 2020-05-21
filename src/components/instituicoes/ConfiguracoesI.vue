<template>
  <div>
    <div>
      <PageTitle icon="fa fa-cogs" main="Configurações" sub/>
    </div>
    <div class="api_pagamento">
      <span>Api de Pagamento:</span>
    </div>
    <div class="api_pagamento_dados">
      <span>Client ID:</span>
      <b-form-input
        :readonly="mode==='leitura'"
        v-model="instituicao.pay_client_id"
        type="text"
        placeholder="cole a chave client_id da sua conta Gerencianet"
      />
      <span>Client Secret:</span>
      <b-form-input
        :readonly="mode==='leitura'"
        v-model="instituicao.pay_client_secret"
        type="text"
        placeholder="cole a chave client_secret da sua conta Gerencianet"
      />
    </div>
    <div>
      <b-button
        variant="primary"
        v-if="mode==='edicao'"
        @click="salvarChavesAPI_PAY()"
        class="mr-2"
      >
        <i class="fa fa-check"></i>
      </b-button>
      <b-button variant="secundary" v-if="mode==='edicao'" @click="cancelar()" class="mr-2">
        <i class="fa fa-undo"></i>
      </b-button>
      <b-button variant="warning" v-else-if="mode==='leitura'" @click="editar()" class="mr-2">
        <i class="fa fa-pencil"></i>
      </b-button>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ConfiguracoesI",
  computed: mapState(["usuario"]),
  components: { PageTitle },
  data: () => {
    return {
      mode: "leitura",
      instituicao: {}
    };
  },
  methods: {
    buscarChavesAPI_PAY() {
      const url = `${baseApiUrl}/instituicoes/chavesPagamento/${
        this.usuario.id_instituicao
      }`;
      axios
        .get(url)
        .then(res => {
          const dados = res.data;
          const id_part1 = dados.pay_client_id.slice(0, 15);
          const id_part2 = dados.pay_client_id.slice(45, 50);
          dados.pay_client_id = `${id_part1}*****************************${id_part2}`;

          const c_secret1 = dados.pay_client_secret.slice(0, 20);
          const c_secret2 = dados.pay_client_secret.slice(49, 54);
          dados.pay_client_secret = `${c_secret1}***************************${c_secret2}`;

          this.instituicao = dados
        })
        .catch(showError);
    },
    salvarChavesAPI_PAY() {
      const url = `${baseApiUrl}/instituicoes/atualizar/${
        this.usuario.id_instituicao
      }`;
      axios
        .patch(url, this.instituicao)
        .then(() => {
          this.buscarChavesAPI_PAY();
          this.$toasted.global.defaultSuccess();
          this.mode = "leitura";
        })
        .catch(showError);
    },
    editar() {
      this.mode = "edicao";
    },
    cancelar() {
      this.mode = "leitura";
    }
  }, //fim de methofds
  mounted() {
    this.buscarChavesAPI_PAY();
  }
};
</script>

<style>
.api_pagamento {
  padding-bottom: 5px;
}
.api_pagamento_dados {
  padding-bottom: 10px;
}
.api_pagamento span {
  font-weight: bolder;
}
</style>
