<template>
  <div>       
    <div class="botoes-alunos">
      <b-button
        variant="success"
        class="mr-2"
        v-b-tooltip.hover
        title="Matricular  Aluno!"
        v-b-modal.cadastro-usuario
      >
        <i class="fa fa-user-plus"></i>
      </b-button>
    </div>
    <hr>
    <div>
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
          stacked="md"
          :items="alunos"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          @filtered="onFiltered"
          empty-filtered-text="Nenhum intem encontrado!"
        >
          <template slot="actions" slot-scope="row">
            <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
            <router-link :to="{name: 'usuarioReceitas',params:{user:row.item}}">
              <b-button
                variant="warning"
                class="mr-2"
                id="ficha_financeira"
                v-b-tooltip.hover
                title="Ficha Financeira!"
              >
                <i class="fa fa-usd"></i>
              </b-button>
            </router-link>
            <router-link :to="{name: 'usuarioDetalhe',params:{user:row.item}}">
              <b-button
                variant="primary"
                class="mr-2"
                id="ver"
                v-b-tooltip.hover
                title="Ver Usuário!"
              >
                <i class="fa fa-eye"></i>
              </b-button>
            </router-link>

            <b-button
              v-if="row.item.status==='ATIVO'"
              variant="danger"
              @click="ativa_inativa(row.item,'INATIVO')"
              id="bloquear"
              v-b-tooltip.hover
              title="Bloquear Usuário!"
            >
              <i class="fa fa-ban"></i>
            </b-button>

            <b-button
              v-else
              variant="success"
              @click="ativa_inativa(row.item,'ATIVO')"
              id="ativar"
              v-b-tooltip.hover
              title="Ativar Usuário!"
            >
              <i class="fa fa-check"></i>
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
          size="lg"
          class="entrada-modal"
          id="cadastro-usuario"
          title="Cadastrar usuário"
          ref="modal"
        >
          <b-form-group label="Perfis do usuário:">
            <b-form-checkbox-group
              id="perfis"
              name="parfis"
              v-model="perfis_selecionados"
              :options="perfis"
            ></b-form-checkbox-group>
          </b-form-group>
          <form>
            <b-row class="peris-usuario">
              <b-col md="3" sm="9">
                <p>Escola:</p>
                <b-form-select :options="escolas" v-model="user.id_escola"/>
              </b-col>
              <b-col md="3" sm="9">
                <p>Idioma:</p>
                <b-form-select :options="idiomas" v-model="user.idioma"/>
              </b-col>
              <b-col md="3" sm="9">
                <p>Instituições:</p>
                <b-form-select :options="instituicoes" v-model="user.id_instituicao"/>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6" sm="12">
                <p>Nome:</p>
                <b-form-input type="text" placeholder="Nome:" v-model="user.nome"></b-form-input>
              </b-col>
              <b-col md="6" sm="12">
                <p>Sobrenome:</p>
                <b-form-input type="text" placeholder="Sobrenome:" v-model="user.sobrenome"></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6" sm="12">
                <p>E-mail:</p>
                <b-form-input type="email" placeholder="user@email.com:" v-model="user.email"></b-form-input>
              </b-col>
              <b-col md="6" sm="12">
                <p>Telefone:</p>
                <b-form-input type="text" placeholder="(00) 0 0000-0000:" v-model="user.telefone"></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="3" sm="9">
                <p>CPF:</p>
                <b-form-input type="text" placeholder="CPF:" v-model="user.cpf"></b-form-input>
              </b-col>
              <b-col md="3" sm="9">
                <p>RG:</p>
                <b-form-input type="text" placeholder="RG:" v-model="user.rg"></b-form-input>
              </b-col>

              <b-col md="3" sm="9">
                <p>Data nascimento:</p>
                <datepicker
                  :language="pt"
                  :format="formatarData"
                  v-model="user.data_nascimento"
                  name="uniquename"
                ></datepicker>
              </b-col>
              <b-col md="3" sm="9">
                <p>País:</p>
                <b-form-input type="text" placeholder="País:" v-model="user.pais"></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6" sm="12">
                <p>Rua:</p>
                <b-form-input type="text" placeholder="Rua:" v-model="user.logradouro"></b-form-input>
              </b-col>
              <b-col md="3" sm="9">
                <p>Número:</p>
                <b-form-input type="number" placeholder="Número:" v-model="user.numero"></b-form-input>
              </b-col>
              <b-col md="3" sm="9">
                <p>Cidade:</p>
                <b-form-input type="text" placeholder="Cidade:" v-model="user.cidade"></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="3" sm="9">
                <p>Bairro:</p>
                <b-form-input type="text" placeholder="Bairro:" v-model="user.bairro"></b-form-input>
              </b-col>
              <b-col md="3" sm="9">
                <p>Estado:</p>
                <b-form-input type="text" placeholder="Estado:" v-model="user.estado"></b-form-input>
              </b-col>
              <b-col md="3" sm="9">
                <p>Cep:</p>
                <b-form-input type="text" placeholder="Cep:" v-model="user.cep"></b-form-input>
              </b-col>
            </b-row>

            <hr>
            <b-row>
              <b-col md="6" sm="12">
                <b-form-checkbox
                  id="checkbox1"
                  v-model="user.aplicaDesconto"
                  value="SIM"
                  unchecked-value="NÂO"
                >Usuário pode aplicar desconto!</b-form-checkbox>
              </b-col>
              <b-col md="6" sm="12" v-if="user.aplicaDesconto==='SIM'">
                <p>Desconto máximo:</p>
                <b-form-input type="number" placeholder="Somente nº" v-model="user.desconto_max"></b-form-input>
              </b-col>
            </b-row>
            <hr>
            <b-row class="turno-modal">
              <b-col md="3" sm="12">
                <p>Status:</p>
                <b-form-select :options="status" v-model="user.status"/>
              </b-col>
              <b-col md="6" sm="12">
                <p>Imagem perfil:</p>
                <b-form-input
                  type="url"
                  placeholder="Cole o link da imagem:"
                  v-model="user.imagem_perfil"
                ></b-form-input>
              </b-col>
            </b-row>

            <hr>
            <b-button class="ml-2" @click="cancelar()">Cancelar</b-button>
            <b-button variant="primary" @click="salvar()">Salvar</b-button>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";
import Datepicker from "vuejs-datepicker";
import { ptBR } from "vuejs-datepicker/dist/locale";
import moment from "moment";

export default {
  name: "Alunos",
  components: { BotaoCadastrar, Datepicker },
  data() {
    return {
      pt: ptBR,
      idiomas: ["PORTUGUÊS", "INGLÊS"],
      status: ["ATIVO", "INATIVO"],
      alunos: Array,
      professores: Array,
      escolas: [],
      turma:{},
      instituicoes: [],
      user: {},
      perfis: [],
      perfis_selecionados: [],
      fields: [
        { key: "nome", label: "Nome", sortable: true },
        {
          key: "sobrenome",
          label: "Sobrenome",
          sortable: true,
          class: "text-center"
        },
        { key: "email", label: "E-mail", sortable: true },
        { key: "status", label: "Status" },
        { key: "actions", label: "Ações" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      filter: null
    };
  },
  computed: {
    ...mapState(["usuario"]),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  methods: {
     pegarTurmaDoStorage() {
      this.turma = JSON.parse(localStorage.getItem("turma"));
    },
    buscarAlunos() {
      const url = `${baseApiUrl}/turmas/alunos/${this.usuario.id_instituicao}/${
        this.turma.id
      }`;
      axios
        .get(url)
        .then(res => {
          this.totalRows = res.data.length;
          this.alunos = res.data.map(item => {
            item._rowVariant = this.setarVariant(item.status);
            return item;
          });
        })
        .catch(showError);
    },
    buscarEscolas() {
      const url = this.setarUrlEscola();
      axios(url).then(res => {
        this.escolas = res.data.map(escola => {
          return { value: escola.id, text: escola.nome_escola };
        });
      });
    },
    buscarInsituicoes() {
      const url = `${baseApiUrl}/instituicoes/todas`;
      axios(url).then(res => {
        this.instituicoes = res.data.map(instituicao => {
          return { value: instituicao.id, text: instituicao.nome_instituicao };
        });
      });
    },
    cancelar() {
      this.user = {};
      this.$refs.modal.hide();
    },
    salvar() {
      this.setarInstituicaoNoUSuario();
      this.user.perfis = this.perfis_selecionados;
      this.user.data_nascimento = this.formatarData(this.user.data_nascimento);
      this.user.perfil_atual = this.user.perfis[0];
      const url = `${baseApiUrl}/usuarios/cadastrar/${
        this.user.id_instituicao
      }`;
      axios
        .post(url, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.buscarAlunos();
          this.user = { perfis: this.perfis_selecionados };
          this.$refs.modal.hide();
        })
        .catch(showError);
    },

    ativa_inativa(usuario, acao) {
      const url = `${baseApiUrl}/usuarios/atualizar/${
        this.usuario.id_instituicao
      }/${usuario.id}`;
      axios
        .patch(url, { status: acao })
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.buscarAlunos();
        })
        .catch(showError);
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
    setarInstituicaoNoUSuario() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN") {
        this.buscarInsituicoes();
      } else {
        return (this.user.id_instituicao = this.usuario.id_instituicao);
      }
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
    },
    formatarData(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    setarUrl() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN") {
        return `${baseApiUrl}/usuarios/todos`;
      } else if (perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/usuarios/todosInstituicao/${
          this.usuario.id_instituicao
        }`;
      } else {
        return `${baseApiUrl}/usuarios/todosEscola/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }
    },
    setarPerfis() {
      const perfi_usuario = this.$store.state.usuario.perfil_atual;
      if (perfi_usuario === "SUPER_ADMIN" || perfi_usuario === "ADMIN") {
        this.perfis = [
          { value: "ADMIN", text: "ADMIN" },
          { value: "ALUNO", text: "ALUNO" },
          { value: "DIRETOR", text: "DIRETOR" },
          { value: "FILIACAO", text: "FILIACAO" },
          { value: "PROFESSOR", text: "PROFESSOR" },
          { value: "RECEPCIONISTA", text: "RECEPCIONISTA" }
        ];
      } else {
        this.perfis = [
          { value: "ALUNO", text: "ALUNO" },
          { value: "DIRETOR", text: "DIRETOR" },
          { value: "FILIACAO", text: "FILIACAO" },
          { value: "PROFESSOR", text: "PROFESSOR" },
          { value: "RECEPCIONISTA", text: "RECEPCIONISTA" }
        ];
      }
    },
    setarVariant(status) {
      switch (status) {
        case "INATIVO":
          return "danger";
        default:
          return "null";
      }
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  mounted() {
    this.pegarTurmaDoStorage()
    this.setarInstituicaoNoUSuario();
    this.buscarEscolas();
    this.setarPerfis();
    this.buscarAlunos();
  }
};
</script>

<style>
input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  height: 40px;
}
.botoes-alunos{
     margin-top: 15px;
}
</style>
