<template>
  <div class="home">
    <PageTitle icon="fa fa-tachometer" main="Painel de Controle" sub=""/>
    <div class="stats">
      <Stat
        class="alunos"
        title="Total de Alunos"
        :value="alunos.quantAlunos"
        icon="fa fa-user-o"
        color="#333333"
      />
      <Stat
        class="usuariosTotal"
        title="Total de Usuários"
        :value="totalUsuarios"
        icon="fa fa-users"
        color="#333333"
      />
      <Stat
        class="turmas"
        title="Turmas Abertas"
        :value="turmasAbertas"
        icon="fa  fa-graduation-cap"
        color="#333333"
      />
    </div>
    <div>
      <div>
        <VueApexCharts width="500" type="bar" :options="options" :series="series"></VueApexCharts>
      </div>
    </div>
  </div>
</template>

<script>
import GraficoTeste from "./GraficoTeste";
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Home",
  computed: mapState(["usuario"]),
  components: { PageTitle, Stat, VueApexCharts },
  data: function() {
    return {
      alunos: {},
      totalUsuarios:0,
      turmasAbertas:0,
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ],      

    };//return
  },

  methods: {
    setarUrlUsuario(){
      const perfil_usuario =this.$store.state.usuario.perfil_atual;
      if(perfil_usuario==='SUPER_ADMIN'){
        return  `${baseApiUrl}/usuarios/usuariosDaPlataforma`
      }else if(perfil_usuario==='ADMIN'){
         return  `${baseApiUrl}/usuarios/usuariosInstituicao/${this.usuario.id_instituicao}`
      }else{
        return `${baseApiUrl}/usuarios/usuariosEscola/${this.usuario.id_instituicao}/${this.usuario.id_escola}`
      }
    },
    buscarTurmasAbertas(){ //refatorar pra pegar também por escola
      const url = `${baseApiUrl}/turmas/turmasAbertasValor/${this.usuario.id_instituicao}`
      axios.get(url).then(res=>{
        this.turmasAbertas =res.data
      }).catch(showError)
    },
    buscarTotalUsuarios(){
      const url = this.setarUrlUsuario()
      axios.get(url).then(res=>{
        this.totalUsuarios = res.data
      }).catch((showError))
    },
    buscarQuantAlunos() {
      var url = ''
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        url =  `${baseApiUrl}/relatoriosAcademicos/quantAlunosI/${
          this.usuario.id_instituicao
        }`;
      } else {
        url =  `${baseApiUrl}/relatoriosAcademicos/alunosPorE/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }
      axios.get(url).then(res => (this.alunos = res.data));
    }
  }, //fim méthods
  mounted() {
    this.buscarQuantAlunos();
    this.buscarTotalUsuarios();
    this.buscarTurmasAbertas();
  },
  
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.stat-icon i{
  color: #ffffff !important;
}
.alunos {
  background: -webkit-gradient(linear,left top,right top,from(#fe5d70),to(#fe909d));
  background: linear-gradient(to right,#fe5d70,#fe909d);
  color: #ffffff;
}
.usuariosTotal {
  background: -webkit-gradient(linear,left top,right top,from(#01a9ac),to(#01dbdf));
  background: linear-gradient(to right,#01a9ac,#01dbdf);
  color: #ffffff;
}
.turmas {
    background: -webkit-gradient(linear,left top,right top,from(#0ac282),to(#0df3a3));
    background: linear-gradient(to right,#0ac282,#0df3a3);
  color: #ffffff;
}
.apexcharts-canvas{
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
    box-shadow: 0 1px 20px 0 rgba(69,90,100,.08);
    border: none;
    margin-bottom: 30px;
}
</style>
