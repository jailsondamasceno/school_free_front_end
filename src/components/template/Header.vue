<template>
  <header class="header" :class="{'muda':!usuario}" >
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title text-left" v-if="usuario">
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <UserDropdown v-if="!hideUserDropdown"/>
  </header>
</template>

<script>
import UserDropdown from "./UserDropdown";
import { mapState } from "vuex";

export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    ...mapState(["usuario"]),
    icon() {
      return this.$store.state.isMenuVisible
        ? "far fa-times"
        : "fas fa-chevron-right";
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
  background-image: linear-gradient(to left, #02BD9F 0%, #0373A1 100%);

  display: flex;
  justify-content: center;
  align-items: center;
}
.header.muda {
 background-image: linear-gradient(to left, #02BD9F 0%, #0373A1 100%);
}

.title {
  font-size: 1.2rem;
  color: #fff;
  flex-grow: 1;
  margin-left: 15px;
}

.title a {
  color: #fff;
  text-decoration: none;
}

.title a:hover {
  color: #fff;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
