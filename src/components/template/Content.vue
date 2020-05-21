<template>
  <div class="content" :class="{'muda-cor':!usuario}">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Content",
  computed: {
    ...mapState(["usuario"])
  }
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #f6f7fb;
  padding: 20px;
}
.content.muda-cor {
  background-image: linear-gradient(to left, #03c5bc 0%, #20ded5 100%);

}
</style>
