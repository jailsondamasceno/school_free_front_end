import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/components/auth/Auth'
import Home from '@/components/home/Home'
import Eventos from '@/components/eventos/Eventos'
import EventoEdicao from '@/components/eventos/EventoEdicao'
import TipoEventoEdicao from '@/components/eventos/TipoEventoEdicao'
import TicketsLista from '@/components/tickets/TicketsLista'
import Usuarios from '@/components/usuarios/Usuarios'
import UsuarioDetalhe from '@/components/usuarios/UsuarioDetalhe'
import UsuarioReceitas from '@/components/usuarios/UsuarioReceitas'
import InstituicoesPorCriador from '@/components/instituicoes/InstituicoesPorCriador'
import TodasInstituicoes from '@/components/instituicoes/superAdmin/TodasInstituicoes'
import InstituicaoDetalhes from '@/components/instituicoes/InstituicaoDetalhes'
import ConfiguracoesI from '@/components/instituicoes/ConfiguracoesI'
import EscolasLista from '@/components/escolas/EscolasLista'
import EscolaDetalhe from '@/components/escolas/EscolaDetalhe'
import CursosLista from '@/components/cursos/CursosLista'
import CursoDetalhe from '@/components/cursos/CursoDetalhe'
import DisciplinasCurso from '@/components/cursos/DisciplinasCurso'
import EditarDisciplinaCurso from '@/components/cursos/EditarDisciplinaCurso'
import TurmasLista from '@/components/turmas/TurmasLista'
import TurmasPorCurso from '@/components/turmas/TurmasPorCurso'
import VerTurma from '@/components/turmas/VerTurma'
import TurmaDetalhe from '@/components/turmas/TurmaDetalhe'
import Matricular from '@/components/turmas/Matricular'
import EditarHorario from '@/components/turmas/EditarHorario'
import PlanosDisponiveis from '@/components/planos/PlanosDisponiveis'
import Prod_Serv_Lista from '@/components/prod_e_servicos/Prod_Serv_Lista'
import Loja from '@/components/loja/ProdutosLista'
import ProdutoDetalhe from '@/components/loja/ProdutoDetalhe'
import ProdutoEdicao from '@/components/loja/ProdutoEdicao'
import ReceitasLista from '@/components/receitas/ReceitasLista'
import DespesasLista from '@/components/despesas/DespesasLista'



import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'eventos',
    path: '/eventos',
    component: Eventos
}, {
    name: 'eventoEdicao',
    path: '/eventoEdicao',
    component: EventoEdicao
}, {
    name: 'tipoEventoEdicao',
    path: '/tipoEventoEdicao',
    component: TipoEventoEdicao
}, {
    name: 'tickets',
    path: '/tickets',
    component: TicketsLista
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'usuario',
    path: '/usuarios',
    component: Usuarios
}, {
    name: 'usuarioDetalhe',
    path: '/usuarioDetalhe',
    component: UsuarioDetalhe
}, {
    name: 'usuarioReceitas',
    path: '/usuarioReceitas',
    component: UsuarioReceitas
}, {
    name: 'instituicoesPorCriador',
    path: '/instituicoesPorCriador',
    component: InstituicoesPorCriador
}, {
    name: 'todasInstituicoes',
    path: '/instituicoes',
    component: TodasInstituicoes
}, {
    name: 'instituicaoDetalhes',
    path: '/instituicao/detalhes',
    component: InstituicaoDetalhes
},{
    name: 'configuracoesI',
    path: '/configuracoesI',
    component: ConfiguracoesI
}, {
    name: 'escolasLista',
    path: '/escolas',
    component: EscolasLista
}, {
    name: 'escolaDetalhe',
    path: '/escolaDetalhe',
    component: EscolaDetalhe
}, {
    name: 'cursos',
    path: '/cursos',
    component: CursosLista
}, {
    name: 'cursoDetalhe',
    path: '/cursoDetalhe',
    component: CursoDetalhe
}, {
    name: 'disciplinasCurso',
    path: '/disciplinasCurso',
    component: DisciplinasCurso
}, {
    name: 'editarDisciplinaCurso',
    path: '/editarDisciplinaCurso',
    component: EditarDisciplinaCurso
}, {
    name: 'turmas',
    path: '/turmas',
    component: TurmasLista
}, {
    name: 'turmasPorCurso',
    path: '/turmasPorCurso',
    component: TurmasPorCurso
}, {
    name: 'verTurma',
    path: '/verTurma',
    component: VerTurma
}, {
    name: 'turmaDetalhe',
    path: '/turmaDetalhe',
    component: TurmaDetalhe
},{
    name: 'matricular',
    path: '/matricular',
    component: Matricular
}, {
    name: 'editarHorario',
    path: '/editarHorario',
    component: EditarHorario
}, {
    name: 'planos',
    path: '/planos',
    component: PlanosDisponiveis
}, {
    name: 'prod_serv',
    path: '/prod_serv',
    component: Prod_Serv_Lista
}, {
    name: 'loja',
    path: '/loja',
    component: Loja
}, {
    name: 'produtoDetalhe',
    path: '/produtoDetalhe',
    component: ProdutoDetalhe
}, {
    name: 'produtoEdicao',
    path: '/produtoEdicao',
    component: ProdutoEdicao
}, {
    name: 'receitas',
    path: '/receitas',
    component: ReceitasLista
}, {
    name: 'despesas',
    path: '/despesas',
    component: DespesasLista
}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const usuario = JSON.parse(json)
        usuario && usuario.perfil_atual === 'SUPER_ADMIN' ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
