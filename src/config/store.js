import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        usuarioLogado: false,
        usuario: null,

        carrinho:[],
        dados_carrinho:{
            valor_total_carrinho:0,
            valor_total_desconto:0,
            valor_a_pagar:0
        }
    },
    mutations: {
        adicionarProdutos(state,carrinho){
            state.carrinho = carrinho
        },
        repassar_carrinho(state) {
            var valor_total_c = 0;
            var valor_total_d = 0;
            var valor_a_pagar = 0;
            state.carrinho.map(item => {
            valor_total_c += item.valor;
            valor_total_d = valor_total_d + (item.total_desconto || 0)
            });
            valor_a_pagar = (valor_total_c - valor_total_d)
            
            state.dados_carrinho.valor_total_carrinho= valor_total_c,
            state.dados_carrinho.valor_total_desconto= valor_total_d,
            state.dados_carrinho.valor_a_pagar= valor_a_pagar       
          },
        toggleMenu(state, isVisible) {
            if (!state.usuario) {
                state.isMenuVisible = false
                return
            }

            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUsuario(state, usuario) {
            state.usuario = usuario
            if (usuario) {
                axios.defaults.headers.common['Authorization'] = `${usuario.token}`
                state.isMenuVisible = true
                state.usuarioLogado = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
                state.usuarioLogado = false
            }
        },
    }
})