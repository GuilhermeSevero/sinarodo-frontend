import login from '../plugins/login'
import DefaultLayout from '../layouts/Default'
import Home from '../views/Home'
import Categorias from '../views/Categorias'
import Categoria from '../views/Categoria'
import Obras from '../views/Obras'
import Usuarios from '../views/Usuarios'
import Usuario from '../views/Usuario'
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
          possuiNivel: login.validarNivel(1, 2, 3)
        }
      },
      {
        path: '/categorias',
        name: 'categorias',
        component: Categorias,
        meta: {
          title: 'Categorias',
          subtitle: 'Página de consulta de categorias',
          auth: true,
          possuiNivel: login.validarNivel(1, 2)
        }
      },
      {
        path: '/categorias/:id',
        name: 'categoria',
        component: Categoria,
        meta: {
          title: 'Categoria',
          subtitle: 'Página de manutenção da categoria',
          auth: true,
          possuiNivel: login.validarNivel(1)
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
          possuiNivel: login.validarNivel(1, 2, 3)
        }
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        component: Usuarios,
        meta: {
          title: 'Usuários',
          subtitle: 'Página de consulta de usuários',
          auth: true,
          possuiNivel: login.validarNivel(1, 2)
        }
      },
      {
        path: '/usuarios/:id',
        name: 'usuario',
        component: Usuario,
        meta: {
          title: 'Usuário',
          subtitle: 'Página de manutenção do usuário',
          auth: true,
          possuiNivel: login.validarNivel(1, 2)
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
          possuiNivel: login.validarNivel(1)
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