<template>
  <div>
    <div>
      <b-modal
        class="modal-tipo-evento"
        id="modalTipoEvento"
        title="Tipo de evento"
        ref="modalTipoEvento"
         @hidden="fechouModal()"
      >
        <form>
          <b-form-input type="text" placeholder="Tipo..." v-model="tipoEv.tipo"></b-form-input>
          <b-row>
            <b-col>
              <p>Cor:</p>
              <b-form-input type="color" placeholder="Cor de fundo..." v-model="tipoEv.cor"></b-form-input>
            </b-col>
          </b-row>
        </form>
        <hr>
        <b-button class="ml-2" @click="cancelarTipEvento()">Cancelar</b-button>
        <b-button variant="primary" @click="editarTipoEvento()">Salvar</b-button>
        <b-button variant="danger" @click="deletarTipoEvento()">
          <i class="fa fa-trash"></i>
        </b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "TipoEventoEdicao",
  components: {},
  computed: mapState(["usuario"]),
  data() {
    return {
      tipoEv: {}
    };
  },

  methods: {
    fechouModal() {
      this.tipoEv = {};
      this.$router.push("/eventos");
    },
    setarEvento() {
      this.tipoEv = this.$route.params.tipo;
       this.$root.$emit("bv::show::modal", "modalTipoEvento");
    },

    cancelarTipEvento() {
      this.$refs.modalTipoEvento.hide();
      this.tipoEv = {};
    },

    editarTipoEvento() {
      const url = `${baseApiUrl}/eventos/atualizarTipoEvento/${
        this.usuario.id_instituicao
      }/${this.tipoEv.id}`;
      axios.patch(url, this.tipoEv).then(() => {
        this.$toasted.global.defaultSuccess();
        this.$refs.modalTipoEvento.hide();
        this.tipoEv = {};
      }).catch(showError)
    },
    deletarTipoEvento() {
      const url = `${baseApiUrl}/eventos/deletarTipoEvento/${
        this.usuario.id_instituicao
      }/${this.tipoEv.id}`;
      axios.delete(url).then(() => {
        this.$toasted.global.defaultSuccess();
        this.$refs.modalTipoEvento.hide();
        this.tipoEv = {};
      }).catch(showError)
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
