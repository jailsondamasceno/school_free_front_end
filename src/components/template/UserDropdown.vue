<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ usuario.nome }}</span>
      <div class="user-dropdown-img">
        <avatar :fullname="usuario.nome" :image="usuario.imagem_perfil"></avatar>
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <router-link :to="{name:'usuarioDetalhe',params:{user:usuario}}">
        <i class="fa fa-user-circle-o"></i> Meu perfil
      </router-link>

      <b-button variant="link" v-b-modal.trocar_senha>
        <i class="fa fa-lock"></i> Trocar Senha
      </b-button>

      <a href @click.prevent="logout">
        <i class="fa fa-sign-out"></i> Sair
      </a>
    </div>
    <b-modal id="trocar_senha" ref="modal" title="Trocar senha">
       <form>
        <b-form-input type="password" placeholder="Senha anterior" v-model="user.senhaAntiga"></b-form-input>
        <hr>
        <b-form-input type="password" placeholder="Nova senha" v-model="user.novaSenha"></b-form-input>
        <hr>
        <b-form-input
          type="password"
          placeholder="Confirmar nova senha"
          v-model="user.confirmaNovaSenha"
        ></b-form-input>
      </form>
      <hr>
          <b-row>
        <b-col xs="12">
          <b-button variant="primary"  @click.stop="trocarSenha()" class="mr-2">
            <i class="fa fa-check"></i>
          </b-button>
          <b-button variant="secundary" @click="cancelar()" class="mr-2">
            <i class="fa fa-undo"></i>
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { userKey } from "@/global";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { mapState } from "vuex";
import Avatar from "vue-avatar-component";

export default {
  name: "UserDropdown",
  components: { Avatar },
  computed: mapState(["usuario"]),
  data(){
    return{
      user:{},
    }
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUsuario", null);
      this.$router.push({ name: "auth" });
    },
    trocarSenha() {
      const url = `${baseApiUrl}/usuarios/trocarSenha/${this.usuario.id}`;
      axios
        .post(url, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
        }).catch(showError);
    },
    cancelar() {
      this.user = {};
      this.$refs.modal.hide()
    }
  }
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.user-dropdown-content a:hover {
  text-decoration: none;
  color: #000;
  background-color: #ededed;
}

button.btn.btn-link {
  display: flex;
  align-items: center;
  color: #0056b3;
  text-decoration: none;
  background-color: transparent;
  border-color: transparent;
}
</style>
