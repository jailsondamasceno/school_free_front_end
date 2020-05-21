<template>
  <div class="dia" >
    <p>SÁBADO</p>
    <ul>
      <li v-for="sabado in h_sabado" :key="sabado.id">
        <HorarioItem :horario="sabado"/>
      </li>
    </ul>
  </div>
</template>

<script>
import HorarioItem from "../HorarioItem";

export default {
  name: "Sabado",
  props: ["h_sabado"],
  components: { HorarioItem }
};
</script>

<style>
.dia {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}
</style>
