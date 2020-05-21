<template>
  <div class="menu" v-show="isMenuVisible">
    <vue-tree-navigation :items="menu" />
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: "Menu",
  components: { },
  computed: mapState(['isMenuVisible']),
  data: function() {
    return {
         menu:[]    
    };
  },
  methods: {
    setarMenu(){
         const perfil_usuario= this.$store.state.usuario.perfil_atual
         if(perfil_usuario==='SUPER_ADMIN'){

              this.menu  = [
          { name: 'Painel de Controle', path:'//'},
          { name: 'Instituicão', children: [
               { name: 'Gerenciar Instituições', path: 'instituicoes'},
               { name: 'Configurações', path: '/configuracoesI'}              
          ]},
          { name: 'Escolas', children: [
               {name:'Minhas escolas',path:'escolas'} 
          ]},
          { name: 'Cursos', children: [
               {name:'Cursos',path:'cursos'} 
          ]},
          { name: 'Turmas', children: [
               {name:'Turmas',path:'turmas'},
               {name:'Matricula',path:'matricular'} 
          ]},
          { name: 'Planos', children: [
               {name:'Planos Dispoíveis',path:'planos'} 
          ]},
          { name: 'Usuários', children: [
               {name:'Gerenciar Usuários',path:'usuarios'} 
          ]}, 
           { name: 'Produtos e Serviços', children: [
               {name:'Gerenciar Produtos e Serviços',path:'prod_serv'} 
          ]},
           { name: 'Loja', children: [
               {name:'Visitar Loja',path:'loja'} 
          ]},
          { name: 'Receitas', children: [
               {name:'Minhas Receitas',path:'receitas'} 
          ]}, 
          { name: 'Despesas', children: [
               {name:'Minhas Despesas',path:'despesas'} 
          ]}, 
           { name: 'Eventos', children: [
               {name:'Calendário',path:'eventos'} 
          ]},
          { name: 'Tickets', children: [
               {name:'Meus Tickets',path:'tickets'} 
          ]},
           ]

         }else if(perfil_usuario==='ADMIN'){

              this.menu  = [
          { name: 'Painel de Controle', path:'//'},
          { name: 'Instituicão', children: [
               { name: 'Editar Instituição', path: '/instituicao/detalhes'} ,        
               { name: 'Configurações', path: '/configuracoesI'}         
          ]},
          { name: 'Escolas', children: [
               {name:'Minhas escolas',path:'escolas'} 
          ]},
          { name: 'Cursos', children: [
               {name:'Cursos',path:'cursos'} 
          ]},
          { name: 'Turmas', children: [
               {name:'Turmas',path:'turmas'},
               {name:'Matricula',path:'matricular'}
          ]},
          { name: 'Planos', children: [
               {name:'Planos Dispoíveis',path:'planos'} 
          ]},
          { name: 'Usuários', children: [
               {name:'Gerenciar Usuários',path:'usuarios'} 
          ]},
          { name: 'Produtos e Serviços', children: [
               {name:'Gerenciar Produtos e Serviços',path:'prod_serv'} 
          ]},
           { name: 'Loja', children: [
               {name:'Visitar Loja',path:'loja'} 
          ]},
          { name: 'Receitas', children: [
               {name:'Minhas Receitas',path:'receitas'} 
          ]},
           { name: 'Despesas', children: [
               {name:'Minhas Despesas',path:'despesas'} 
          ]},  
          { name: 'Eventos', children: [
               {name:'Calendário',path:'eventos'} 
          ]},
          { name: 'Tickets', children: [
               {name:'Meus Tickets',path:'tickets'} 
          ]},
           ]

         }else{
              this.menu  = [
          { name: 'Painel de Controle', path:'//'},
          { name: 'Escolas', children: [
               {name:'Minhas escolas',path:'escolas'} 
          ]},
          { name: 'Cursos', children: [
               {name:'Cursos',path:'cursos'} 
          ]},
          { name: 'Turmas', children: [
               {name:'Turmas',path:'turmas'},
               {name:'Matricula',path:'matricular'}
          ]},
          { name: 'Planos', children: [
               {name:'Planos Dispoíveis',path:'planos'} 
          ]},
          { name: 'Usuários', children: [
               {name:'Gerenciar Usuários',path:'usuarios'} 
          ]},
          { name: 'Produtos e Serviços', children: [
               {name:'Gerenciar Produtos e Serviços',path:'prod_serv'} 
          ]},
           { name: 'Loja', children: [
               {name:'Visitar Loja',path:'loja'} 
          ]},
           { name: 'Receitas', children: [
               {name:'Minhas Receitas',path:'receitas'} 
          ]},
           { name: 'Despesas', children: [
               {name:'Minhas Despesas',path:'despesas'} 
          ]}, 
         { name: 'Eventos', children: [
               {name:'Calendário',path:'eventos'} 
          ]},
         { name: 'Tickets', children: [
               {name:'Meus Tickets',path:'tickets'} 
          ]},
           ]

         }

    }

  },//methods
  mounted(){
       this.setarMenu()
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  background-image: linear-gradient(to top, rgb(76, 89, 112) 0%, #3F4D66 100%);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-y: auto;
}
.NavigationItem{
     color: #000;
}
.NavigationItem__router-link{
    text-decoration: none;
    color: #ffffff 
}
.NavigationItem__router-link:hover{
     text-decoration: none;
    color: #ffffff 
}
.NavigationItem__router-link.router-link-exact-active{
     text-decoration: none;
    color: #ffffff 
}
.NavigationItem__router-link.router-link-exact-active :hover{
     text-decoration: none;
    color: #000; 
}
.NavigationItem__router-link.router-link-exact-active.router-link-active{
     text-decoration: none;
     color: #7cc1fa;
}
.NavigationItem__router-link.router-link-exact-active.router-link-active :hover{
     text-decoration: none;
     color: #000;
}
.TreeNavigation li {
    padding-left: 20px;
    padding-top: 6px;
    padding-bottom: 6px;
}
.TreeNavigation li:hover span {
     cursor: pointer;
     color: #ffffff;
}
.NavigationLevel__parent span, 
.NavigationItem__router-link{
     color: #dcdcdc;
}
.NavigationToggle__icon{
     border-color: #dcdcdc !important;
}

</style>
