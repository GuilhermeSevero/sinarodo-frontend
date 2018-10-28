import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import Checklists from './views/Checklists.vue'
import Configuracoes from './views/Configuracoes.vue'
import Obras from './views/Obras.vue'
import Usuarios from './views/Usuarios.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            title: 'Home page',
            subtitle: 'Subtitle'
          }
        },
        {
          path: '/checklists',
          name: 'checklists',
          component: Checklists,
          meta: {
            title: 'CheckLists',
            subtitle: 'Página de manutenção de checklists'
          }
        },
        {
          path: '/obras',
          name: 'obras',
          component: Obras,
          meta: {
            title: 'Obras',
            subtitle: 'Página de manutenção das obras'
          }
        },
        {
          path: '/usuarios',
          name: 'usuarios',
          component: Usuarios,
          meta: {
            title: 'Usuários',
            subtitle: 'Página de manutenção de usuários'
          }
        },
        {
          path: '/configuracoes',
          name: 'configuracoes',
          component: Configuracoes,
          meta: {
            title: 'Configurações',
            subtitle: 'Página de manutenção das configurações do sistema'
          }
        }
      ]
    }
  ]
})
