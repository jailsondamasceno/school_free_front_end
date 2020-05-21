<template>
  <div class="tipoEvento" :style="style">
    <div class="tipoEvento-info">
      <span class="tipoEvento-title">{{ tipo.tipo }}</span>

      <router-link :to="{ name: 'tipoEventoEdicao',params:{tipo:tipo}}">
        <b-button variant="warning" size="sm" v-b-tooltip.hover title="Editar!">
          <i class="fa fa-pencil"></i>
        </b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TipoEventoItem",
  props: ["tipo"],
  computed: {
    style() {
      return "background-color:" + (this.tipo.cor || "#000");
    }
  }
};
</script>

<style>
.tipoEvento {
  height: 40px;
  width: 8rem;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
}

.tipoEvento-info {
  width: 8rem;
  display: flex;
  justify-content: space-between;

}


.tipoEvento-title {
  font-size: 1.2rem;
  padding: 5px;
}

</style>
