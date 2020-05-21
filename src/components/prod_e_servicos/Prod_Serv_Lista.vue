<template>
  <div class="prod_serv">
    <PageTitle icon="fa fa-gift" :main="prod_serv_cad" sub="Cadastrados"/>
    <BotaoCadastrar cadastro="cadastro_prod_serv" titulo="Novo Cadastro"/>
    <hr>
    <b-container fluid>
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="4" label-cols-lg="3" label="Filtrar:">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Buscar"/>
              <b-input-group-append>
                <b-btn variant="primary" :disabled="!filter" @click="filter = ''">Limpar</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="4" label-cols-lg="3" label="Por página:">
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
        :items="prod_servs"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        @filtered="onFiltered"
        empty-filtered-text="Nenhum intem encontrado!"
      >
        <template slot="actions" slot-scope="row">
          <!--  <router-link :to="{name: 'destalhe_Prod_Serv',params:{prod_serv:row.item}}">
            <b-button
              variant="primary"
              class="mr-2"
              id="ver"
              v-b-tooltip.hover
              title="Ver Detalhes"
            >
              <i class="fa fa-eye"></i>
            </b-button>
          </router-link>-->
          <b-button
            variant="warning"
            class="mr-2"
            id="ficha_financeira"
            v-b-tooltip.hover
            title="Editar!"
            @click.prevent="buscarProd_Serv_Por_Id(row.item,$event.target)"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button
            variant="danger"
            class="mr-2"
            id="ficha_financeira"
            v-b-tooltip.hover
            title="Editar!"
            @click.prevent="deletar_Prod_Serv(row.item)"
          >
            <i class="fa fa-trash-o"></i>
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

    <div>
      <b-modal
        class="entrada-modal"
        id="cadastro_prod_serv"
        title="Cadastrar Produto ou Serviço"
        ref="modal"
        @hidden="fechouModal()"
      >
        <form>
          <b-row>
            <b-col md="6" sm="9">
              <p>Tipo:</p>
              <b-form-select :options="tipos" v-model="prod_serv.tipo"/>
            </b-col>
            <b-col md="6" sm="9">
              <p>Valor:</p>
              <b-form-input type="number" placeholder="R$" v-model="prod_serv.valor"></b-form-input>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col md="6" sm="12">
              <p>Categoria:</p>
              <b-form-select
                :options="categorias"
                v-model="prod_serv.id_categoria"
                @change="buscarSubcategoria()"
              />
            </b-col>
            <b-col md="6" sm="12">
              <p>Subcategoria:</p>
              <b-form-select :options="subcategorias" v-model="prod_serv.id_subcategoria"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" sm="12">
              <p>Nome:</p>
              <b-form-input type="text" v-model="prod_serv.nome"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" sm="12">
              <p></p>
              <b-form-textarea
                id="descricao"
                v-model="prod_serv.descricao"
                placeholder="Descrição"
                :rows="2"
                :max-rows="2"
              ></b-form-textarea>
            </b-col>
          </b-row>
          <b-row v-if="SU_AD()" >
            <b-col >
            <b-form-group label="Disponível nas escolas:">
              <b-form-checkbox-group
                switch
                id="escolas"
                name="escolas"
                v-model="prod_serv.para_escolas"
                :options="escolas"
              ></b-form-checkbox-group>
            </b-form-group>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col md="6" sm="9">
              <b-form-checkbox
                switch
                value="SIM"
                unchecked-value="NÃO"
                v-model="prod_serv.aparecer_na_loja"
                name="check-button"
              >Aparecer na loja</b-form-checkbox>
            </b-col>
            <b-col md="6" sm="9">
              <b-form-checkbox
                switch
                value="SIM"
                unchecked-value="NÃO"
                v-model="prod_serv.aceita_desconto"
                name="check-button"
              >Aceita desconto</b-form-checkbox>
            </b-col>
          </b-row>
          <b-row v-if="prod_serv.aparecer_na_loja==='SIM'">
            <b-col md="12" sm="12">
              <p>Imagem:</p>
              <b-form-input
                required
                type="url"
                placeholder="Cole um link de uma imagem pra o item"
                v-model="prod_serv.url_imagem"
              ></b-form-input>
            </b-col>
          </b-row>

          <hr>
          <b-button class="ml-2" @click="cancelar()">Cancelar</b-button>
          <b-button v-if="mode==='salvar'" variant="primary" @click="salvar()">Salvar</b-button>
          <b-button v-else variant="primary" @click="atualizar_Pro_Serv()">Atualizar</b-button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";

import PageTitle from "@/components/template/PageTitle";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";

export default {
  name: "Prod_e_Serv_Lista",
  components: { PageTitle, BotaoCadastrar },
  computed: {
    ...mapState({
      usuario: state => state.usuario
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  data() {
    return {
      carregou: true,
      mode: "salvar",
      prod_serv_cad: "Produtos e Serviços",
      prod_servs: [],
      tipos: ["PRODUTO", "SERVIÇO"],
      categorias: [],
      subcategorias: [],
      escolas: [],
      prod_serv: {},
      fields: [
        { key: "nome", label: "Nome", sortable: true }, //A descrição pode ser grande, então virar em detalhes
        { key: "tipo", label: "Tipo", sortable: true },
        { key: "valor", label: "Valor", sortable: true },
        { key: "aceita_desconto", label: "Aceita Desconto", sortable: true },
        { key: "aparecer_na_loja", label: "Na loja", sortable: true },
        { key: "actions", label: "Ações" }
      ],

      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      filter: null
    };
  },
  methods: {
    fechouModal() {
      this.mode = "salvar";
      this.prod_serv = {};
    },
    setarUrlEscola() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/escolas/todasInstituicao/${
          this.usuario.id_instituicao
        }`;
      } else {
        return `${baseApiUrl}/escolas/escolaPorId/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }
    },
    SU_AD() {
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN" || perfil_atual === "ADMIN") {
        return true;
      } else {
        return false;
      }
    },
    buscarProd_Serv_Por_Id(item, target) {
      this.mode = "atualizar";
      this.prod_serv = {};
      const url = `${baseApiUrl}/prod_servicos/prodServPorId/${
        this.usuario.id_instituicao
      }/${item.id}`;
      axios
        .get(url)
        .then(res => {
          this.prod_serv = res.data;
          this.$root.$emit("bv::show::modal", "cadastro_prod_serv", target);
        })
        .catch(showError);
    },
    buscarProd_Serv() {
      const url = `${baseApiUrl}/prod_servicos/todosInstituicao/${
        this.usuario.id_instituicao
      }`;
      axios
        .get(url)
        .then(res => {
          this.totalRows = res.data.length;
          this.prod_servs = res.data;
        })
        .catch(showError);
    },
    buscarEscolas() {
      const url = this.setarUrlEscola();
      axios(url).then(res => {
        this.escolas = res.data.map(escola => {
          return { text: escola.nome_escola, value: escola.id };
        });
      });
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
        })
        .catch(showError);
    },
    buscarSubcategoria() {
      setTimeout(() => {
        // A função tentava carregar o id_categoria quando ainda estava vazio no momento que o componente era montado
        this.carregou = false;
        this.subcategorias = [];
        this.prod_serv.id_subcategoria = "";
        const url = `${baseApiUrl}/categoriasReceitas/subcategorias/todasCategoria/${
          this.usuario.id_instituicao
        }/${this.prod_serv.id_categoria}`;
        axios
          .get(url)
          .then(res => {
            this.subcategorias = res.data.map(item => {
              return { value: item.id, text: item.nome };
            });
            this.carregou = true; //Requisição vazia ou não escodemos o loading
          })
          .catch(showError);
        this.carregou = true;
      }, 1000);
    },
    deletar_Prod_Serv(item) {
      const url = `${baseApiUrl}/prod_servicos/deletar/${
        this.usuario.id_instituicao
      }/${item.id}`;
      axios
        .delete(url)
        .then(() => {
          this.buscarProd_Serv();
          this.$toasted.global.defaultSuccess();
        })
        .catch(showError);
    },
    cancelar() {
      this.prod_serv = {};
      this.$refs.modal.hide();
    },
    atualizar_Pro_Serv() {
      this.prod_serv.id_instituicao = this.usuario.id_instituicao;
      const url = `${baseApiUrl}/prod_servicos/atualizar/${
        this.usuario.id_instituicao
      }/${this.prod_serv.id}`;
      axios
        .patch(url, this.prod_serv)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.buscarProd_Serv();
          this.prod_serv = {};
          this.$refs.modal.hide();
          this.mode = "salvar";
        })
        .catch(showError);
    },
    salvar() {
      this.prod_serv.id_instituicao = this.usuario.id_instituicao;
      const url = `${baseApiUrl}/prod_servicos/cadastrar/${
        this.usuario.id_instituicao
      }`;
      axios
        .post(url, this.prod_serv)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.buscarProd_Serv();
          this.prod_serv = {};
          this.$refs.modal.hide();
        })
        .catch(showError);
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }, //Fim de methods

  mounted() {
    this.buscarProd_Serv();
    this.buscarCategorias();
    this.buscarEscolas();
  }
};
</script>

<style>
.lista-de-tickets ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
}
</style>
