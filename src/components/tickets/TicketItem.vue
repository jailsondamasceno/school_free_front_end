<template>
  <div class="ticket">
    <div class="ticket-image">
      <img src="@/assets/ticket.png" height="150" width="100%" alt="ticket">
    </div>
    <div class="ticket-info">
      <h2>{{ ticket.titulo }}</h2>
      <p>{{`Tipo: ${ticket.tipo}`}}</p>
      <p>{{`Descrição: ${ticket.descricao}`}}</p>
      <p>{{`Data criação: ${ticket.data_criacao}`}}</p>
      <p>{{` Status: ${ticket.status}`}}</p>

      <div>
        <b-row>
          <b-col>
            <router-link
              :to="{ name: 'escolaDetalhe',params:{id_instituicao:ticket.id_instituicao,id_escola:ticket.id}}"
            >
              <b-button
                @click="setarEscolaNoStorage(ticket)"
                variant="warning"
                class="mr-2"
                v-b-tooltip.hover
                title="Editar Ticket!"
              >
                <i class="fa fa-pencil"></i>
              </b-button>
            </router-link>

            <router-link
              :to="{ name: 'escolaDetalhe',params:{id_instituicao:ticket.id_instituicao,id_escola:ticket.id}}"
            >
              <b-button
                @click="setarEscolaNoStorage(ticket)"
                variant="primary"
                class="mr-2"
                v-b-tooltip.hover
                title="Editar Ticket!"
              >
                <i class="fa fa-eye"></i>
              </b-button>
            </router-link>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketItem",
  props: ["ticket"],
  data() {
    return {};
  }
};
</script>

<style>
.ticket {
  width: 20rem;
  height: auto;
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

.ticket-image {
  width: 50%;
  margin: 5px auto;
  height: 10rem;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  /* border-bottom: 1px solid #aaa; */
}

.ticket-image img {
  vertical-align: middle;
  border-style: none;
  margin: 5px;
  margin: 5px auto;
  align-items: center;
  align-content: center;
}

.ticket-info {
  flex: 1;
  display: flex;
  align-self: stretch;
  flex-direction: column;
  
}
.ticket-info h2 {
  font-size: 1.7rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);

}

.ticket-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);  
}
.p{
  margin-inline-end: 5px;
}
</style>
