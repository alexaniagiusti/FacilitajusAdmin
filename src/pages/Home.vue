<template>
  <v-app>
    <Drawer />
    <v-content>
      <transition name="router-anim" >
        <router-view></router-view>
      </transition>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Drawer from '../components/core/Drawer.vue';
import Footer from '../components/core/Footer.vue';

export default {
  components: {
    Drawer,
    Footer,
  },
};
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    height: 180px;
    position: relative;
  }
  
  .v-minisheet--offset {
    top: -4px;
    position: relative;
  }

  .cards {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }

  .router-anim-enter-active {
  animation: coming 0.4s;
  animation-delay: 0.4s;
  opacity: 0;
}

.router-anim-leave-active {
  animation: going 0.4s;
}

@keyframes going {
  from {
    scale: 1;
    opacity: 1;
  }
  to {
    scale: 0.7;
    opacity: 0.1;
  }
}

@keyframes coming {
  from {
    scale: 0.7;
    opacity: 0.1;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}
</style>