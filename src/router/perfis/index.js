import perfilCriar from '@/components/Administração/perfis/Criar.vue'
import perfilListar from '@/components/Administração/perfis/Listar.vue'
import perfilEditar from '@/components/Administração/perfis/Editar.vue'

export const perfilRotas = [
  {
    path: '/criar-perfil',
    name: 'criar perfil',
    component: perfilCriar
  },
  {
    path: '/listar-perfil',
    name: 'listar perfil',
    component: perfilListar,
  },
  {
    path: '/editar-perfil/:id',
    name: 'editar perfil',
    component: perfilEditar,
    props: true
  }
]

export default {}