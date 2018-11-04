import DefaultLayout from '../layouts/Default'
import Home from '../views/Home'
import Categorias from '../views/Categorias'
import Obras from '../views/Obras'
import Usuarios from '../views/Usuarios'
import Configuracoes from '../views/Configuracoes'

export default [
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
          subtitle: 'Subtitle',
          auth: true,
          possuiNivel: () => true
        }
      },
      {
        path: '/categorias',
        name: 'categorias',
        component: Categorias,
        meta: {
          title: 'Categorias',
          subtitle: 'Página de manutenção de categorias',
          auth: true,
          possuiNivel: () => true
        }
      },
      {
        path: '/obras',
        name: 'obras',
        component: Obras,
        meta: {
          title: 'Obras',
          subtitle: 'Página de manutenção das obras',
          auth: true,
          possuiNivel: () => true
        }
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        component: Usuarios,
        meta: {
          title: 'Usuários',
          subtitle: 'Página de manutenção de usuários',
          auth: true,
          possuiNivel: () => true
        }
      },
      {
        path: '/configuracoes',
        name: 'configuracoes',
        component: Configuracoes,
        meta: {
          title: 'Configurações',
          subtitle: 'Página de manutenção das configurações do sistema',
          auth: true,
          possuiNivel: () => true
        }
      }
    ]
  },

  {
    path: '/login',
    name: 'Acesso',
    component: () => import('../views/Login'),
    hidden: true,
    meta: {
      auth: false,
      possuiNivel: () => true
    }
  },

  {
    path: '*',
    name: 'Página de erro',
    component: () => import('../views/404'),
    hidden: true,
    meta: {
      auth: false,
      possuiNivel: () => true
    }
  }
]
