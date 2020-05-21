<template>
  <div>
    <div class="load" v-if="carregou===false">
      <Carregando/>
    </div>
    <div v-if="carregou ===true">
      <PageTitle icon="fa fa-money" :main="receitas_cad"/>
      <div class="botoes">
        <BotaoCadastrar
          class="btn-cad"
          v-if="SU_AD_DI()"
          cadastro="cadastro-receita"
          titulo="Cadastrar Receita:"
        />
        <b-button variant="primary" @click="buscarParcelas()">
          Nova Busca
          <i class="fa fa-search"></i>
        </b-button>
        <b-button @click="liparFiltros()">Limpar Filtro</b-button>
      </div>

      <div class="cabecalho">
        <b-row>
          <b-col>
            <b-form-group id="data_inicio" label="Data Início">
              <b-form-input
                id="data_inicio"
                type="text"
                v-model="filtros.dataInicio"
                placeholder="00/00/0000"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="data_inicio" label="Data Fim:">
              <b-form-input
                id="data_fim"
                type="text"
                v-model="filtros.dataFim"
                placeholder="00/00/0000"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="status" label="Status:" label-for="status">
              <b-form-select id="status" :options="status" v-model="filtros.status"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="categoria" label="Categoria:" label-for="categoria">
              <b-form-select
                id="categoria"
                :options="categorias"
                v-model="filtros.id_categoria"
                @change="buscarSubcategoria()"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3" sd="9">
            <b-form-group id="categoria" label="Subcategoria:" label-for="Subcategoria">
              <b-form-select
                id="categoria"
                :options="sub_categorias"
                v-model="filtros.id_subcategoria"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <hr>
      <b-container fluid>
        <b-row>
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Filtrar:" class="mb-0">
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
          empty-text="Nenhum dado!"
          stacked="md"
          :items="parcelas.parcelas"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          @filtered="onFiltered"
          empty-filtered-text="Nenhum intem encontrado!"
        >
          <template slot="acoes" slot-scope="data">
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
      </b-container>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import moment from "moment";
import axios from "axios";
import { mapState } from "vuex";
import PageTitle from "../template/PageTitle";
import Carregando from "@/components/globais/Carregando";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";

export default {
  name: "ReceitasLista",
  components: { PageTitle, BotaoCadastrar, Carregando },
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  data() {
    return {
      carregou: true,
      filtros: {},
      categorias: [],
      sub_categorias: [],
      receitas_cad: "Receitas",
      parcelas: [],
      status: ["A PAGAR", "PAGO", "EM ATRASO", "CANCELADO"],
      fields: [
        { key: "pertence_a_receita", label: "Item", sortable: true },
        { key: "data_vencimento", label: "Vencimento", sortable: true },
        { key: "valor", label: "Valor" },
        { key: "desconto", label: "Desconto" },
        { key: "valor_a_pagar", label: "À pagar" },
        { key: "status", label: "Status" },
        { key: "acoes", label: "Ações" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      filter: null
    };
  },

  methods: {
    formatarData(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    setaUrl() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/relatoriosFinanceiros/receitasComFiltro/${
          this.usuario.id_instituicao
        }`;
      } else {
        return `${baseApiUrl}/relatoriosFinanceiros/receitasComFiltro/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }
    },
    buscarParcelas() {
      this.carregou = false;
      this.parcelas = [];
      const url = this.setaUrl();
      axios
        .post(url, this.filtros)
        .then(res => {
          this.parcelas = res.data;
          this.parcelas.parcelas.map(item => {
            item._rowVariant = this.setarVariant(item.status);
          });
          this.carregou = true;
        })
        .catch(showError);
      this.carregou = true;
    },
    buscarCategorias() {
      const url = `${baseApiUrl}/categoriasReceitas/todasInstituicao/${
        this.usuario.id_instituicao
      }`;
      axios
        .get(url)
        .then(res => {
          this.categorias = res.data.map(item => {
            return { value: item.id, text: item.nome };
          });
          this.filtros.id_categoria = this.categorias[0];
        })
        .catch(showError);
    },
    buscarSubcategoria() {
      setTimeout(() => {
        // A função tentava carregar o id_categoria quando ainda estava vazio no momento que o componente era montado
        this.carregou = false;
        this.sub_categorias = [];
        this.filtros.id_subcategoria = "";
        const url = `${baseApiUrl}/categoriasReceitas/subcategorias/todasCategoria/${
          this.usuario.id_instituicao
        }/${this.filtros.id_categoria}`;
        axios
          .get(url)
          .then(res => {
            this.sub_categorias = res.data.map(item => {
              return { value: item.id, text: item.nome };
            });
            this.carregou = true; //Requisição vazia ou não escodemos o loading
          })
          .catch(showError);
        this.carregou = true;        
      }, 1000);
    },

    liparFiltros() {
      this.selecionou_categoria = false;
      this.filtros = {};
    },

    ativa_inativa_botoes(item) {
      if (item.status === "PAGO") {
        return "disabled";
      } else {
        return null;
      }
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
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    SU_AD_DI() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (
        perfil_usuario === "SUPER_ADMIN" ||
        perfil_usuario === "ADMIN" ||
        perfil_usuario === "DIRETOR"
      ) {
        return true;
      } else {
        return false;
      }
    }
  }, //methods

  mounted() {
    this.SU_AD_DI();
    this.buscarParcelas();
    this.buscarCategorias();
  }
};
</script>

<style>
.cabecalho {
  display: flex;
  flex-direction: row;
  align-content: space-around;
  align-content: center;
  align-items: flex-start;
}
.botoes {
  display: flex;
  flex-direction: row;
  align-content: space-around;
  align-items: flex-start;
}
.botoes button {
  margin: 5px;
}
.btn-cad {
  margin-bottom: 15px;
}
</style>
