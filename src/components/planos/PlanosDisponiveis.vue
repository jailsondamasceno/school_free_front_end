<template>
    <div class="lista-de-planos" >
        <PageTitle icon="fa fa-university"
            :main="planos_d" sub="Disponíveis" />
        <ul>
            <li v-for="plano in planos" :key="plano.id">
                <PlanoItem :plano="plano" />
            </li>
        </ul>        
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import {mapState} from 'vuex'
import axios from 'axios'
import PageTitle from '@/components/template/PageTitle'
import PlanoItem from './PlanoItem'

export default {
    name: 'PlanosDisponiveis',
    computed:mapState(['usuario']),
    components: { PageTitle, PlanoItem },
    data: function() {
        return {
            planos_d:'Planos',
            planos:Array,           
        }
    },
    methods: {       
        buscarPlanos() {
            const url = `${baseApiUrl}/planos/todos`
            axios(url).then(res => {
                this.planos = res.data
               
            })
        },
        quemPodeVer() {
      const perfil_atual = this.$store.state.usuario.perfil_atual;
      if (perfil_atual === "SUPER_ADMIN" || perfil_atual === "ADMIN") {
        return true;
      } else {
        return false;
      }
    }
    },//Fim de methods
       
    mounted() {
        this.buscarPlanos()
    }

    
}
</script>

<style>
    
    .lista-de-planos ul {
        display:flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 5px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .lista-de-planos .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
