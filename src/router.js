import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';

// Administração
import Dashboard from './components/Administração/Dashboard.vue';
import Diligencias from './components/Administração/Diligencias.vue';
import Duvidas from './components/Administração/Duvidas.vue';
import Usuarios from './components/Administração/Usuarios.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: '/diligencias',
          name: 'diligencias',
          component: Diligencias,
        },
        {
          path: '/duvidas',
          name: 'duvidas',
          component: Duvidas,
        },
        {
          path: '/usuarios',
          name: 'usuarios',
          component: Usuarios,
        },
      ],
    }],
});
