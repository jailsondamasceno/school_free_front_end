<template>
  <div class="lista-de-tickets">
    <PageTitle icon="fa fa-bullhorn" :main="tickets_cad" sub="Cadastrados"/>
    <BotaoCadastrar cadastro="cadastro-ticket" titulo="Cadastrar Ticket"/>
    <hr>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <TicketItem :ticket="ticket"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";

import PageTitle from "@/components/template/PageTitle";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";
import TicketItem from "./TicketItem";

export default {
  name: 'TicketsLista',
  components: { PageTitle, BotaoCadastrar,TicketItem },
  computed: {
    ...mapState({
      usuario: state => state.usuario
    })
  },
  data() {
    return {
      tickets_cad: "Tickets",
      tickets: [
        {
          titulo: "Ticket teste",
          descricao: " Esta é uma descrição teste. Onde o usuário irá descrever seu ticket com mais detalhes",
          data_criacao: "25/02/2019",
          status: "Em andamento",
          tipo:'SUPORTE',
        },
        {
          titulo: "Ticket teste 2",
          descricao: " Esta é uma descrição teste. Onde o usuário irá descrever seu ticket com mais detalhes",
          data_criacao: "26/02/2019",
          status: "Em andamento",
          tipo:'SUGESTÃO',
        }
      ],
      ticket: {}
    };
  }
};
</script>

<style>
.lista-de-tickets ul{
     display: flex;
     flex-wrap: wrap;
     list-style-type: none;
     padding: 0px;
}
</style>
