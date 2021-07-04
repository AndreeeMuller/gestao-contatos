
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/BoasVindas.vue') },
      { path: 'painel', component: () => import('src/pages/Painel.vue') },
      { path: 'cadastro/contato', component: () => import('src/pages/CadastroContato.vue') },
      { path: 'consulta/endereco', component: () => import('src/pages/ConsultaEndereco.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
