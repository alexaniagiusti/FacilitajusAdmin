import permissoesCriar from '@/components/Administração/permissoes/Criar.vue'
import permissoesListar from '@/components/Administração/permissoes/Listar.vue'
import permissoesEditar from '@/components/Administração/permissoes/Editar.vue'

export const permissoesRotas = [
  {
    path: '/criar-permissao',
    name: 'criar permissao',
    component: permissoesCriar
  },
  {
    path: '/listar-permissao',
    name: 'listar permissao',
    component: permissoesListar,
  },
  {
    path: '/editar-permissao',
    name: 'editar permissao',
    component: permissoesEditar,
    props: true
  }
]

export default {}