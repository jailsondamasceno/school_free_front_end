<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !usuario}">
		<Header title="Eduxe Light " 
			:hideToggle="!usuario"
			:hideUserDropdown="!usuario" />
		<Menu v-if="usuario" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
	</div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
import { mapState } from "vuex"
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },
	computed: mapState(['isMenuVisible', 'usuario']),
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUsuario', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/usuarios/validarToken`, userData)

			if (res.data) {
				this.$store.commit('setUsuario', userData)
				
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	.page-title h1{
		font-size: 1.5rem;
		display: block;
		margin-bottom: 0;
		color: #303548;
		font-size: 20px !important;
	}
	.page-title h2 {
		color: #888;
		font-size: .9em !important;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
			
	}
	.custom-control-inline {
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		margin: 5px;
	}
	.custom-control-inline:hover,
	.custom-control-inline *:hover{
		cursor: pointer;
	}
</style>