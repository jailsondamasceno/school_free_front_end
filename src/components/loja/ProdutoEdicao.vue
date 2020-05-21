<template>
  <div>
    <b-modal
      class="entrada-modal"
      id="modalEdicao"
      title="Editar Produto"
      ref="modalEdicao"
      @hidden="fechouModal()"
    >
      <form>
        <b-row>
          <b-col md="6" sm="9">
            <p>Tipo:</p>
            <b-form-select :options="tipos" v-model="produto.tipo"/>
          </b-col>
          <b-col md="6" sm="9">
            <p>Valor:</p>
            <b-form-input type="number" placeholder="R$" v-model="produto.valor"></b-form-input>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col md="6" sm="12">
            <p>Categoria:</p>
            <b-form-select
              :options="categorias"
              v-model="produto.id_categoria"
              @change="buscarSubcategoria()"
            />
          </b-col>
          <b-col md="6" sm="12">
            <p>Subcategoria:</p>
            <b-form-select :options="subcategorias" v-model="produto.id_subcategoria"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <p>Nome:</p>
            <b-form-input type="text" v-model="produto.nome"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" sm="12">
            <p></p>
            <b-form-textarea
              id="descricao"
              v-model="produto.descricao"
              placeholder="Descrição"
              :rows="2"
              :max-rows="2"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row v-if="SU_AD()">
          <b-col>
            <b-form-group label="Disponível nas escolas:">
              <b-form-checkbox-group
                switch
                id="escolas"
                name="escolas"
                v-model="produto.para_escolas"
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
              v-model="produto.aparecer_na_loja"
              name="check-button"
            >Aparecer na loja</b-form-checkbox>
          </b-col>
          <b-col md="6" sm="9">
            <b-form-checkbox
              switch
              value="SIM"
              unchecked-value="NÃO"
              v-model="produto.aceita_desconto"
              name="check-button"
            >Aceita desconto</b-form-checkbox>
          </b-col>
        </b-row>
        <b-row v-if="produto.aparecer_na_loja==='SIM'">
          <b-col md="12" sm="12">
            <p>Imagem:</p>
            <b-form-input
              required
              type="url"
              placeholder="Cole um link de uma imagem pra o item"
              v-model="produto.url_imagem"
            ></b-form-input>
          </b-col>
        </b-row>

        <hr>
        <b-button class="ml-2" @click="cancelar()">Cancelar</b-button>
        <b-button variant="primary" @click="atualizar_Pro_Serv()">Atualizar</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ProdutoEdicao",
  data() {
    return {
      carregou: true,
      tipos: ["PRODUTO", "SERVIÇO"],
      produto: {},
      escolas: {},
      categorias: {},
      subcategorias: {}
    };
  },

  methods: {
    fechouModal() {
      this.produto = {};
      this.$router.push('/loja');
    },
    setarUrlEscola() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/escolas/todasInstituicao/${
          this.$store.state.usuario.id_instituicao
        }`;
      } else {
        return `${baseApiUrl}/escolas/escolaPorId/${
          this.$store.state.usuario.id_instituicao
        }/${this.$store.state.usuario.id_escola}`;
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
    buscarProd_Serv_Por_Id() {
      this.produto = {};
      const url = `${baseApiUrl}/loja/produtoPorId/${
        this.$route.params.produto.id_instituicao
      }/${this.$route.params.produto.id}`;
      axios
        .get(url)
        .then(res => {
          this.produto = res.data;
          this.$root.$emit("bv::show::modal", "modalEdicao");
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
        this.$store.state.usuario.id_instituicao
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
        this.produto.id_subcategoria = "";
        const url = `${baseApiUrl}/categoriasReceitas/subcategorias/todasCategoria/${
          this.produto.id_instituicao
        }/${this.produto.id_categoria}`;
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
   
    cancelar() {
      this.produto = {};
      this.$refs.modalEdicao.hide();
      //this.$router.push('/loja');
    },
    atualizar_Pro_Serv() {
      const url = `${baseApiUrl}/loja/atualizar/${
        this.$store.state.usuario.id_instituicao
      }/${this.produto.id}`;
      axios
        .patch(url, this.produto)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.produto = {};
          this.$refs.modalEdicao.hide();
          // this.$router.push('/loja');
        })
        .catch(showError);
    },
   
  }, //fim methods
  mounted(){
       this.buscarCategorias()
       this.buscarProd_Serv_Por_Id()
       this.buscarEscolas()
  }
};
</script>

<style>
</style>
