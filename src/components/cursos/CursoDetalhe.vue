<template>
  <div class="curso-admin">
    <PageTitle icon="fa fa-book" :main="curso.nome" sub=""/>
    <b-form>
      <input id="curso-id" type="hidden" v-model="curso.id">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome do curso:" label-for="curso-nome">
            <b-form-input
              id="curso-nome"
              type="text"
              v-model="curso.nome"
              required
              :readonly="mode === 'leitura'"
              placeholder="Nome do curso..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-textarea
            id="descricao"
            v-model="curso.descricao"
            required
            :readonly="mode === 'leitura'"
            placeholder="Descrição do curso"
            :rows="3"
            :max-rows="6"
          ></b-form-textarea>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Imagem para o curso:" label-for="curso-url_imagem">
            <b-form-input
              id="curso-url_imagem"
              type="url"
              v-model="curso.url_imagem"
              required
              :readonly="mode === 'leitura'"
              placeholder="Cole o endereço de uma imagem para o curso.."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="Duração do curso:" label-for="curso-duracao">
            <b-form-input
              id="curso-duracao"
              type="number"
              v-model="curso.duracao"
              required
              :readonly="mode === 'leitura'"
              placeholder="Duração do curso..."
            />
          </b-form-group>
        </b-col>
        <b-col md="3" sm="9">
          <b-form-group label="Período:" label-for="tipo-duracao">
            <b-form-select
              :disabled="mode==='leitura'"
              id="tipo-duracao"
              :options="tipos_duracao"
              v-model="curso.tipo_duracao"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <b-row v-if="SU_AD()">
        <b-col md="3" sm="9">
          <b-form-group label="Disponível nas escolas:">
            <b-form-checkbox-group
              :disabled="mode==='leitura'"
              id="escolas"
              name="escolas"
              v-model="curso.para_escolas"
              :options="escolas"
            ></b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col md="3" sm="9">
          <b-form-group label="Status do Curso:" label-for="status-curso">
            <b-form-select
              :disabled="mode==='leitura'"
              id="status-curso"
              :options="status"
              v-model="curso.status_curso"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr>

      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode==='edicao'" @click="salvar()" class="mr-2">
            <i class="fa fa-check"></i>
          </b-button>
          <b-button variant="secundary" v-if="mode==='edicao'" @click="cancelar()" class="mr-2">
            <i class="fa fa-undo"></i>
          </b-button>
          <b-button variant="warning" v-else-if="mode==='leitura'" @click="editar()" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CursoDetalhe",
  components: {PageTitle},
  data: function() {
    return {
      computed: mapState(["usuario"]),
      tipos_duracao: [],
      escolas: [],
      status:['ATIVO','INATIVO'],
      mode: "leitura",
      curso: {}
     
    };
  },
  methods: {
    pegarCursoDoStorage(){
      this.curso = JSON.parse(localStorage.getItem("curso"))
    },
    carregarCurso() {
      //this.$store.state.usuario.id_curso  pode ser feito assim tambem
      //$route.params.id_curso (recebi como parametro pelas rotas)
      const url = `${baseApiUrl}/cursos/cursoPorId/${
        this.curso.id_instituicao
      }/${this.curso.id}`;
      axios.get(url).then(res => {
        this.curso = res.data;
      });
    },
    buscarTiposDuracao() {
      const url = `${baseApiUrl}/cursos/tiposDuracao`;
      axios.get(url).then(res => {
        this.tipos_duracao = res.data.tipo;
      });
    },
    buscarEscolas() {
      const url = `${baseApiUrl}/escolas/todasInstituicao/${
        this.curso.id_instituicao
      }`;
      axios(url).then(res => {
        this.escolas = res.data.map(escola => {
          return { value: escola.id, text: escola.nome_escola };
        });
      });
    },
    editar() {
      this.mode = "edicao";
    },
    cancelar() {
      this.mode = "leitura";
    },

    salvar() {
      const url = `${baseApiUrl}/cursos/atualizar/${
        this.curso.id_instituicao
      }/${this.curso.id}`;
      axios
        .patch(url, this.curso)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.mode = "leitura";
        })
        .catch(showError);
    },

    /*  loadcurso(curso, mode = "save") {
      this.mode = mode;
      this.curso = { ...curso };
    }, */
    SU_AD() {
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN" || perfil_atual === "ADMIN") {
        return true;
      } else {
        return false;
      }
    },
    soSuperAdmin() {
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN") {
        return true;
      } else {
        return false;
      }
    }
  }, //Fim de Métodos
  mounted() {
    this.pegarCursoDoStorage()
    this.carregarCurso();
    this.buscarTiposDuracao();
    this.buscarEscolas();
  }, //Fim da montagem
  created() {
    this.SU_AD();
  }
};
</script>

<style>
</style>