<template>
  <div>
    <PageTitle icon="fa fa-calendar" main="Eventos" sub/>
    <div class="b_cad">
      <b-row>
        <div class="evento-busca">
          <b-button :variant="periodo_dia" @click="eventosDoDia()">Eventos do dia</b-button>
          <b-button :variant="periodo_semana" @click="eventosDaSemana()">Eventos do semana</b-button>
          <b-button :variant="periodo_mes" @click="eventosDoMes()">Eventos dos mês</b-button>
        </div>      
        <div class="filtro-escola" v-if="SU_AD()">
          <span>Escola:</span>
          <b-form-select :options="escolas" v-model="filtro.id_escola" @change="buscarEventosEscola()"/>
        </div>
          <div class="botoes-add">
          <BotaoCadastrar class="bot-e" cadastro="modalEvento" titulo="Evento: "/>

          <BotaoCadastrar class="bot-t" cadastro="modalTipoEvento" titulo="Tipos:"/>
        </div>
      </b-row>
    </div>
    <hr>
    <div class="main">
      <div class="tipos">
        <ul>
          <li v-for="tipo in tiposE" :key="tipo.id">
            <TipoEventoItem :tipo="tipo"/>
          </li>
        </ul>
      </div>
      <div class="lista-de-eventos">
        <ul>
          <li v-for="evento in eventos" :key="evento.id">
            <EventoItem :evento="evento"/>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <b-modal class="modal-evento" id="modalEvento" title="Evento" ref="modalEvento">
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

          <hr>
          <b-row class="d_i">
            <b-col>
              <b-form-group>
                <p>Data início:</p>
                <datepicker :language="pt" v-model="evento.data_i_evento" name="uniquename"></datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <p>Data fim:</p>
                <datepicker :language="pt" v-model="evento.data_f_evento" name="uniquename"></datepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <hr>

          <b-button class="ml-2" @click="cancelarCadEvento()">Cancelar</b-button>
          <b-button variant="primary" @click="adicionarEvento()">Salvar</b-button>
        </form>
      </b-modal>

      <b-modal
        class="modal-tipo-evento"
        id="modalTipoEvento"
        title="Tipo de evento"
        ref="modalTipoEvento"
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
        <b-button variant="primary" @click="cadastrarTipos()">Salvar</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { ptBR } from "vuejs-datepicker/dist/locale";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import EventoItem from "./EventoItem";
import TipoEventoItem from "./TipoEventoItem";

export default {
  name: "Eventos",
  components: {
    PageTitle,
    BotaoCadastrar,
    Datepicker,
    EventoItem,
    TipoEventoItem
  },
  computed: mapState(["usuario"]),
  data() {
    return {
      periodo_selecionado:'',
      periodo_mes: "outline-primary",
      periodo_semana: "outline-primary",
      periodo_dia: "outline-primary",
      pt: ptBR,
      tipoEv: {},
      evento: {},
      datasCompara: [],
      datasComEventos: [],
      escolas: [],
      datasBusca: {},
      eventos: [],
      tiposEvento: [],
      tiposE: [],
      filtro: {}
    };
  },

  methods: {
    formatarData(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    SU_AD(){
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if(perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN"){
        return true
      }else{
        return false
      }
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
    setarUrlEventosDoMes() {  //Seta a url de acordo com o perfil
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/eventos/eventosDoMesInstituicao/${
          this.usuario.id_instituicao
        }`;
      } else {
        return `${baseApiUrl}/eventos/eventosDoMesEscola/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }
    },
    setarUrlEventosSemana() { //Seta a url de acordo com o perfil
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/eventos/eventosDaSemanaInstituicao/${
          this.usuario.id_instituicao
        }`;
      } else {
        return `${baseApiUrl}/eventos/eventosDaSemanaEscola/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }
    },
    setarUrlEventosDia() { //Seta a url de acordo com o perfil
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/eventos/eventosDoDiaInstituicao/${
          this.usuario.id_instituicao
        }`;
      } else {
        return `${baseApiUrl}/eventos/eventosDoDiaEscola/${
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
        })
        .catch(showError);
    },
    editarTipo() {},
    aplicarCorNoEvento() {
      const tipos = this.tiposE;
      const eventos = this.eventos;
      for (var i = 0; i < eventos.length; i++) {
        for (var j = 0; j < tipos.length; j++) {
          if (eventos[i].id_tipo === tipos[j].id) {
            eventos[i].cor = tipos[j].cor;
            eventos[i].tipo = tipos[j].tipo;
            this.eventos = eventos;
          }
        }
      }
    },

    buscarEventosEscola(){//Só o SUPER_ADMIN ADMIN terá  acesso a essa função quando filtrar por escola
      if(this.periodo_selecionado==='mes'){
        this.eventosDoMesE()
      }else if(this.periodo_selecionado==='semana'){
        this.eventosDaSemanaE()
      }else{
        this.eventosDoDiaE()
      }
    },
    eventosDoMesE(){ //Eventos do mês da escola
      this.periodo_selecionado = 'mes'
      this.periodo_mes = "primary";
      this.periodo_semana = "outline-primary";
      this.periodo_dia = "outline-primary";
      const id_esc =  this.filtro.id_escola || this.usuario.id_escola 
      const url =`${baseApiUrl}/eventos/eventosDoMesEscola/${this.usuario.id_instituicao}/${id_esc}`
      axios
        .get(url)
        .then(res => {
          this.eventos = res.data;
          this.aplicarCorNoEvento();
        })
        .catch(showError);
    },
    eventosDaSemanaE(){//Eventos da semana da escola
      this.periodo_selecionado = 'semana'
      this.periodo_mes = "outline-primary";
      this.periodo_semana = "primary";
      this.periodo_dia = "outline-primary";
      const id_esc =  this.filtro.id_escola || this.usuario.id_escola 
      const url =`${baseApiUrl}/eventos/eventosDaSemanaEscola/${this.usuario.id_instituicao}/${id_esc}`
      axios
        .get(url)
        .then(res => {
          this.eventos = res.data;
          this.aplicarCorNoEvento();
        })
        .catch(showError);
    },
    eventosDoDiaE(){//Eventos do dia da escola
      this.periodo_selecionado = 'dia'
      this.periodo_mes = "outline-primary";
      this.periodo_semana = "outline-primary";
      this.periodo_dia = "primary";
      const id_esc =  this.filtro.id_escola || this.usuario.id_escola 
      const url =`${baseApiUrl}/eventos/eventosDoDiaEscola/${this.usuario.id_instituicao}/${id_esc}`
      axios
        .get(url)
        .then(res => {
          this.eventos = res.data;
          this.aplicarCorNoEvento();
        })
        .catch(showError);
    },
   
    eventosDoMes() {  //Chama o eventos do mes insitituicao ou escola de acordo com o perfil
      this.periodo_selecionado = 'mes'
      this.periodo_mes = "primary";
      this.periodo_semana = "outline-primary";
      this.periodo_dia = "outline-primary";
      const url = this.setarUrlEventosDoMes();
      axios
        .get(url)
        .then(res => {
          this.eventos = res.data;
          this.aplicarCorNoEvento();
        })
        .catch(showError);
    },
    eventosDaSemana() {//Chama o eventos da semana insitituicao ou escola de acordo com o perfil
      this.periodo_selecionado = 'semana'
      this.periodo_mes = "outline-primary";
      this.periodo_semana = "primary";
      this.periodo_dia = "outline-primary";
      const url = this.setarUrlEventosSemana();
      axios
        .get(url)
        .then(res => {
          this.eventos = res.data;
          this.aplicarCorNoEvento();
        })
        .catch(showError);
    },
    eventosDoDia() {//Chama o eventos do dia insitituicao ou escola de acordo com o perfil
      this.periodo_selecionado = 'dia'
      this.periodo_mes = "outline-primary";
      this.periodo_semana = "outline-primary";
      this.periodo_dia = "primary";
      const url = this.setarUrlEventosDia();
      axios
        .get(url)
        .then(res => {
          this.eventos = res.data;
          this.aplicarCorNoEvento();
        })
        .catch(showError);
    },

    cadastrarTipos() {
      const url = `${baseApiUrl}/eventos/tipos/cadastrar/${
        this.usuario.id_instituicao
      }`;
      axios
        .post(url, this.tipoEv)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.buscarTipos();
          this.tipoEv = {};
          this.$refs.modalTipoEvento.hide();
        })
        .catch(showError);
    },
    cancelarCadEvento() {
      this.$refs.modalEvento.hide();
      this.evento = {};
    },
    cancelarTipEvento() {
      this.$refs.modalTipoEvento.hide();
      this.tipoEv = {};
    },

    adicionarEvento() {
      this.evento.data_i_evento = this.formatarData(this.evento.data_i_evento);
      this.evento.data_f_evento = this.formatarData(this.evento.data_f_evento);
      this.evento.id_instituicao = this.usuario.id_instituicao;
      const url = `${baseApiUrl}/eventos/cadastrar/${
        this.usuario.id_instituicao
      }`;
      axios
        .post(url, this.evento)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.$refs.modalEvento.hide();
          this.evento = {};
          this.eventosDaSemana();
        })
        .catch(showError);
    },
    fechaMenu() {
      if (this.$mq === "xs" || this.$mq === "sm") {
        return true;
      } else {
        return false;
      }
    }
    /*  mesclarDataComEvento() {
      var eves = this.eventos;
      var datas = this.datasCompara;
      for (var j = 0; j < datas.length; j++) {
        for (var i = 0; i < eves.length; i++) {
          if (datas[j].data_compara === eves[i].data_evento) {
            const ev =[]
            ev.push(eves[i])
            datas[j].eventos = ev
          }
        }
        this.datasCompara = datas
      }
    }, */
    /*  pegarDia(dia) {
      return dia < 10 ? "0" + dia : "" + dia;
    }, */
    /*  setarDatasIniciais() {
      function pegarMes() {
        var mes = new Date().getMonth() + 1;
        return mes < 10 ? "0" + mes : "" + mes;
      }

      this.datasBusca.dia = this.pegarDia(new Date().getDate()); //pega o dia atual
      this.datasBusca.mes = pegarMes(); //Pegamos o mês
      this.datasBusca.ano = new Date().getFullYear(); // pegamos o ano
    }, */
    /* gerarDiasCalendario() {
      const dat = new Date(this.datasBusca.ano, this.datasBusca.mes, 1); //passa a data (indice +1), (ou passamos o mes real)
      const ultimo_dia_mes = new Date(dat - 1).getDate(); //tiramos um dia e pegamos o último dia do mês

      for (var i = 1; i < ultimo_dia_mes + 1; i++) {
        const data = {
          eventos: [],
          id:i,
          dia: this.pegarDia(i), //passando o indice
          mes: this.datasBusca.mes,
          ano: this.datasBusca.ano,
          data_compara: `${this.pegarDia(i)}/${this.datasBusca.mes}/${
            this.datasBusca.ano
          }`
        };
        this.datasCompara.push(data);
      }
    }, */
  }, //fim methods
  mounted() {
    this.buscarEscolas();
    this.buscarTipos();
    this.eventosDaSemana();
  }
};
</script>

<style>
.filtro-escola {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}
.filtro-escola span {
  width: max-content;
  margin: 5px;
}
.botoes-add {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}
 .botoes-add .bot-e {
  margin: 5px;
}
.botoes-add .bot-t {
 margin: 5px;
} 
.evento-busca {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}
.evento-busca button {
  width: 10rem;
  margin: 5px;
  align-items: center;
}
.b_cad {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
}
.main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.lista-de-eventos ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px;
}
.tipos {
  width: 20rem;
  height: max-content;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.2);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.2);
  border: none;
  animation: pulse 2s;
}
@keyframes pulse {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

