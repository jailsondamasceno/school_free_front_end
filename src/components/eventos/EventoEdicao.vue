<template>
  <div>
    <div>
      <b-modal
        class="modal-evento"
        id="modalEvento"
        title="Evento"
        ref="modalEvento"
        @hidden="fechouModal()"
      >
        <form>
          <b-row class="tituloEvento">
            <b-col>
              <p>Titulo:</p>
              <b-form-input type="text" placeholder="..." v-model="evento.titulo"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="descricaoEvento">
            <b-col>
              <p>Descrição:</p>
              <b-form-input type="text" placeholder="..." v-model="evento.descricao"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="localEvento">
            <b-col>
              <p>Local:</p>
              <b-form-input type="text" placeholder="..." v-model="evento.local"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="imagemEvento">
            <b-col>
              <p>Imagem:</p>
              <b-form-input type="url" placeholder="link..." v-model="evento.url_imagem"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="tipo">
            <b-col>
              <p>Tipo:</p>
              <b-form-select :options="tiposEvento" v-model="evento.id_tipo"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>Para escolas:</p>
              <b-form-checkbox-group
                id="escolas"
                name="escolas"
                v-model="evento.para_escolas"
                :options="escolas"
              ></b-form-checkbox-group>
            </b-col>
          </b-row>

           <b-row class="data_i_evento">
            <b-col>
              <p>Iníco:</p>
              <b-form-input type="text" placeholder="..." v-model="evento.data_i_evento"></b-form-input>
            </b-col>
          </b-row>
           <b-row class="data_f_evento">
            <b-col>
              <p>Fim:</p>
              <b-form-input type="text" placeholder="..." v-model="evento.data_f_evento"></b-form-input>
            </b-col>
          </b-row>

          

          <b-button class="ml-2" @click="cancelarCadEvento()">Cancelar</b-button>
          <b-button variant="primary" @click="editarEvento()">Salvar</b-button>
           <b-button variant="danger" @click="deletarEvento()">
          <i class="fa fa-trash"></i>
        </b-button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { ptBR } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";

export default {
  name: "EventoEdicao",
  components: { Datepicker },
  computed: mapState(["usuario"]),
  data() {
    return {
      pt: ptBR,
      tipoEv: {},
      evento: {},
      escolas: [],
      tiposEvento: [],
      tiposE: []
    };
  },

  methods: {
    fechouModal() {
      this.evento = {};
      this.$router.push("/eventos");
    },
    setarEvento() {
      this.evento = this.$route.params.evento;    
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
    buscarEscolas() {
      const url = this.setarUrlEscola();
      axios(url).then(res => {
        this.escolas = res.data.map(escola => {
          return { text: escola.nome_escola, value: escola.id };
        });
      });
    },

    buscarTipos() {
      const url = `${baseApiUrl}/eventos/buscarTipos/${
        this.usuario.id_instituicao
      }`;
      axios
        .get(url)
        .then(res => {
          this.tiposE = res.data;
          this.tiposEvento = res.data.map(item => {
            return { text: item.tipo, value: item.id };
          });
          this.$root.$emit("bv::show::modal", "modalEvento");
        })
        .catch(showError);
    },

    cancelarCadEvento() {
      this.$refs.modalEvento.hide();
      this.evento = {};
    },

    editarEvento() {
      const url = `${baseApiUrl}/eventos/atualizar/${this.usuario.id_instituicao}/${this.evento.id}`;
      axios.patch(url, this.evento).then(() => {
        this.$toasted.global.defaultSuccess();
        this.$refs.modalEvento.hide();
         this.evento = {};
      });
    },
    deletarEvento() {
      const url = `${baseApiUrl}/eventos/deletar/${this.usuario.id_instituicao}/${this.evento.id}`;
      axios.delete(url).then(() => {
        this.$toasted.global.defaultSuccess();
        this.$refs.modalEvento.hide();
         this.evento = {};
      });
    },

    fechaMenu() {
      if (this.$mq === "xs" || this.$mq === "sm") {
        return true;
      } else {
        return false;
      }
    }
  }, //fim methods
  mounted() {
    this.setarEvento();
    this.buscarTipos();
    this.buscarEscolas();
  }
};
</script>

<style>
.main ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
}
</style>
