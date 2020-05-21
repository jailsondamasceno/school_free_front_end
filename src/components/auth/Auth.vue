<template>
<div>
  <div class="auth-content" >
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="200" alt="Logo">
      <hr>
      <div class="auth-title"></div>

      <input v-if="mode==='cadastro'" v-model="usuario.nome" type="text" placeholder="Nome">
      <input
        v-if="mode==='cadastro'"
        v-model="usuario.sobrenome"
        type="text"
        placeholder="Sobrenome"
      >
      <input v-if="mode==='cadastro'" v-model="usuario.cpf" type="number" placeholder="CPF">
      <input
        v-if="mode==='cadastro'"
        v-model="usuario.nomeInstituicao"
        type="text"
        placeholder="Nome da Instituição"
      >
      <input v-if="mode==='cadastro'" v-model="usuario.cnpj" type="number" placeholder="CNPJ">
      <input v-model="usuario.email" name="email" type="email" placeholder="E-mail">
      <input
        v-if="loginOuCadastro()"
        v-model="usuario.senha"
        name="senha"
        type="password"
        placeholder="Senha"
      >
      <input
        v-if="mode==='cadastro'"
        v-model="usuario.confirmaSenha"
        type="password"
        placeholder="Confirme a Senha"
      >
      
      <button v-if="mode==='cadastro'" @click="cadastro()">Cadastrar-se</button>
      <button v-if="mode==='recuperar'" @click="recuperarSenha()">Enviar</button>
      <button v-if="mode==='login'" @click="login()">Entrar</button>
    
       <a href @click.prevent="trocarMode('login')">
       <span v-if="mode==='cadastro'">Já tem cadastro? Vá para a tela de Login!</span>             
      </a>
       <a>
        <span v-if="mode==='recuperar'">Enviaremos uma senha provisória para seu e-mail!</span>        
      </a>
      <a href @click.prevent="trocarMode('recuperar')">
        <span v-if="mode==='login'">Esqueci a senha!</span>        
      </a>     
      <a href @click.prevent="trocarMode('login')">
       <span v-if="mode==='recuperar'">Voltar para a tela de Login!</span>                     
      </a>
      <a href @click.prevent="trocarMode('cadastro')">
        <span v-if="mode==='login'">Não tem cadastro? Registre-se aqui!</span>                      
      </a>
    </div>
  </div>
   <div v-if="carregou===false" class="carregando">
  </div>
</div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      carregou: true,
      mode: "login",
      usuario: {}
    };
  },
  methods: {
    login() {
      this.carregou = false
      axios
        .post(`${baseApiUrl}/usuarios/login`, this.usuario)
        .then(res => {
          this.$store.commit("setUsuario", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));          
          this.$router.push({ path: "/" });
          this.carregou = true
        })
        .catch(showError);
        this.carregou = true
    },
    cadastro() {
      this.carregou = false
      axios
        .post(`${baseApiUrl}/usuarios/cadastro`, this.usuario)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.usuario = {};
           this.carregou = true
        })
        .catch(showError);
        this.carregou = true
    },
    recuperarSenha() {
       this.carregou = false
      const url = `${baseApiUrl}/usuarios/recuperarSenha`;
      axios
        .post(url, this.usuario)
        .then(() => {
          this.mode = "login";
          this.carregou = true;
        })
        .catch(showError);
        this.carregou = true
    },
    loginOuCadastro() {
      if (this.mode === "login" || this.mode === "cadastro") {
        return true;
      } else {
        return false;
      }
    },
    trocarMode(mode){
      this.mode=mode
    }
  }
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  border-radius: 20px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
  border-radius: 10px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
  border-radius: 15px;  
}
.carregando{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  overflow: visible;
  opacity: 0.3;
  background: #1E1E1E  url('../../assets/loading.gif') no-repeat center center;
}

</style>
