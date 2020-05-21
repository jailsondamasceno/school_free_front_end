<template>
  <div>
    <div>
      <PageTitle icon="fa fa-usd" :main="receita_cad" sub="Usuário"/>
    </div>
    <b-container fluid>
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Buscar:" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Buscar"/>
              <b-input-group-append>
                <b-btn variant="primary" :disabled="!filter" @click="filter = ''">Limpar</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Por página:" class="mb-0">
            <b-form-select :options="pageOptions" v-model="perPage"/>
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <!-- Main table element -->
      <b-table
        hover
        striped
        show-empty
        stacked="md"
        :items="receitas"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        @filtered="onFiltered"
        empty-filtered-text="Nenhum item encontrado!"
      >
        <template slot="acoes" slot-scope="row">
          <!-- Nós usamos @click.stop aqui para prevenir que o evento 'row-clicked' também aconteça-->
          <b-button
            class="mr-2"
            variant="primary"
            @click.prevent="row.toggleDetails"
            @click.stop="buscarParcelas(row.item)"
            v-b-tooltip.hover
            title="Ver parcelas!"
          >
            <i class="fa fa-eye"></i>
          </b-button>
        </template>

        <template slot="row-details" slot-scope="variavel">
          <b-table :items="parcelas" :fields="fieldsParcelas">
            <p>{{variavel}}</p>
            <template slot="actions" slot-scope="data">
              <b-button
                v-if="data.item.id_usuario===usuario.id"
                :disabled="ativa_inativa_botoes(data.item)"
                variant="success"
                @click.prevent="buscarParcelaPorID(data.item,$event.target)"
                v-b-tooltip.hover
                title="Pagar Pacela!"
                class="mr-2"
              >
                <i class="fa fa-money"></i>
              </b-button>

              <b-button
                :disabled="ativa_inativa_botoes(data.item)"
                variant="warning"
                @click.prevent="buscarParcelaPorID(data.item,$event.target)"
                v-b-tooltip.hover
                title="Editar Pacela!"
                class="mr-2"
              >
                <i class="fa fa-pencil"></i>
              </b-button>
            </template>
          </b-table>
        </template>
      </b-table>

      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            class="my-0"
          />
        </b-col>
      </b-row>

      <!-- Info modal -->
      <b-modal title="Parcela:" id="modalParcela" @hide="resetModal" ok-only>
        <div class="parcela">
          <b-row class="dv">
            <p>Data vencimento:</p>
            <b-form-input type="text" v-model="parcela.data_vencimento" readonly></b-form-input>
          </b-row>
          <b-row class="v">
            <p>Valor à pagar:</p>
            <b-form-input type="text" v-model="parcela.valor_a_pagar" readonly></b-form-input>
          </b-row>
          <b-row class="st">
            <p>Status:</p>
            <b-form-select :options="status" v-model="parcela.status"/>
          </b-row>
          <b-row class="fp">
            <p>Forma pagamento:</p>
            <b-form-select :options="form_pag" v-model="parcela.form_pag"/>
          </b-row>
        </div>
        <b-button
          variant="warning"
          @click.prevent="pegarCodePag(parcela)"
          v-b-tooltip.hover
          title="Editar Pacela!"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { mapState } from "vuex";

export default {
  name: "UsuarioReceitas",
  components: { PageTitle },
  data() {
    return {
      PagSeguro:
        "https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js",
      codigoPag: "",
      bot: "disabled",
      user: this.$route.params.user,
      receita_cad: "Ficha Financeira",
      receitas: [],
      parcelas: [],
      parcela: {},
      status: ["EM ATRASO", "PAGO", "A PAGAR", "CANCELADA"],
      form_pag: ["DINHEIRO", "CARTÃO DE CRÉDITO"],
      fields: [
        { key: "nome", label: "Nome", sortable: true },
        { key: "descricao", label: "Descrição", sortable: true },
        { key: "valorTotal", label: "Valor" },
        { key: "data_lancamento", label: "Data Lançamento" },
        { key: "n_parcelas", label: "Nº parcelas" },
        { key: "acoes", label: "Parcelas" }
      ],
      fieldsParcelas: [
        { key: "data_vencimento", label: "Data Vencimento", sortable: true },
        { key: "valor", label: "Valor", sortable: true },
        { key: "desconto", label: "Desconto" },
        { key: "valor_a_pagar", label: "Valo à Pagar" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Ações" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      filter: null,
      modalParcela: { title: "", content: "" }
    };
  },
  computed: {
    ...mapState(["usuario"]),
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  methods: {
    pegarCodePag(parcela) {
      const url = `${baseApiUrl}/receitas/pagarParcela`;
      axios.post(url, parcela).then(res => {});
    },

    ativa_inativa_botoes(item) {
      if (item.status === "PAGO") {
        return "disabled";
      } else {
        return null;
      }
    },
    buscarReceitas() {
      const url = `${baseApiUrl}/receitas/receitasPorUsuario/${
        this.user.id_instituicao
      }/${this.user.id}`;
      axios
        .get(url)
        .then(res => {
          this.totalRows = res.data.length;
          this.receitas = res.data;
        })
        .catch(showError);
    },
    buscarParcelas(item) {
      this.parcelas = [];
      const url = `${baseApiUrl}/receitas/parcelasPorReceita/${
        this.user.id_instituicao
      }/${item.id}`;
      axios
        .get(url)
        .then(res => {
          this.parcelas = res.data.map(item => {
            item._rowVariant = this.setarVariant(item.status);
            return item;
          });
        })
        .catch(showError);
    },
    statusParcela() {
      const url = `${baseApiUrl}`;
    },
    buscarParcelaPorID(item, button) {
      this.parcela = {};
      const url = `${baseApiUrl}/receitas/parcelaPorId/${
        this.user.id_instituicao
      }/${item.id}`;
      axios
        .get(url)
        .then(res => {
          this.parcela = res.data;
          this.$root.$emit("bv::show::modal", "modalParcela", button);
        })
        .catch(showError);
    },
    setarVariant(status) {
      switch (status) {
        case "EM ATRASO":
          return "danger";
        case "PAGO":
          return "success";
        default:
          return "null";
      }
    },

    resetModal() {
      this.modalParcela.title = "";
      this.modalParcela.content = "";
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  mounted() {
    this.buscarReceitas();
  }
};
</script>

<style>
.dv {
  padding-left: 20px;
  padding-right: 20px;
}
.v {
  padding-left: 20px;
  padding-right: 20px;
}
.st {
  padding-left: 20px;
  padding-right: 20px;
}
.fp {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
