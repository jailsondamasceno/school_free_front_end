<template>
  <div>
    <div>
      <PageTitle icon="fa fa-graduation-cap" main="Matrícula" sub/>
    </div>
    <div class="botoes_c">
      <b-button
        v-b-modal.modal_aluno
        variant="success"
        class="mr-2"
        v-b-tooltip.hover
        title="Matricular!"
      >
        Matricular Aluno
        <i class="fa fa-user"></i>
      </b-button>
    </div>
    <hr>
    <!-- INICIO MODAL ALUNO=========================================================================== -->
    <b-modal size="lg" id="modal_aluno" title="Aluno" ref="modal_aluno">
      <div class="botoes_c">
        <b-button
          :disabled="salvou_aluno===false"
          v-b-modal.modal_filiacao
          variant="success"
          class="mr-2"
          v-b-tooltip.hover
          title="Cadastrar Responsável !"
        >
          Responsável
          <i class="fa fa-users"></i>
        </b-button>
        <b-button
          :disabled="salvou_aluno===false"
          @click="buscarPro_Serv_por_Escola()"
          variant="primary"
          class="mr-2"
          v-b-tooltip.hover
          title="Adicionar Prod e Serviços!"
        >
          <i class="fa fa-shopping-basket"></i>
        </b-button>
        <b-button
          :disabled="salvou_aluno===false"
          variant="danger"
          class="mr-2"
          v-b-tooltip.hover
          title="Carrinho de compras!"
        >
          <i class="fa fa-cart-plus"></i>
        </b-button>
      </div>
      <div>
        <b-form-checkbox
          @input="abrirModal_buscarUsuario('ALUNO')"
          id="buscar_usuario"
          name="buscar_usuario"
        >Usuário já tem cadastro?</b-form-checkbox>
      </div>
      <b-form>
        <b-row>
          <b-col md="6" sm="6">
            <b-form-group id="escola" label="Escola:" label-for="escola-usuario">
              <b-form-select
                id="escola-usuario"
                :options="escolas"
                required
                v-model="aluno.id_escola"
                @change="buscarCursosPorEscola()"
                :readonly="mode === 'leitura'"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="6">
            <b-form-group id="curso" label="Curso:" label-for="curso-usuario">
              <b-form-select
                id="curso-usuario"
                :options="cursos"
                required
                v-model="cursoEscolhido"
                @change="buscarTurmasPorCurso()"
                :readonly="mode === 'leitura'"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" sm="6">
            <b-form-group id="turmas" label="Turmas:" label-for="turmas-usuario">
              <b-form-checkbox-group
                switch
                id="turmas"
                name="turmas"
                v-model="aluno.turmas"
                :options="turmas"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" sm="12">
            <b-form-group id="nome" label="Nome:" label-for="nome-usuario">
              <b-form-input
                id="nome-usuario"
                type="text"
                v-model="aluno.nome"
                :readonly="mode === 'leitura'"
                required
                placeholder="Nome"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group id="sobrenome" label="Sobrenome:" label-for="sobrenome-usuario">
              <b-form-input
                id="sobrenome-usuario"
                type="text"
                v-model="aluno.sobrenome"
                :readonly="mode === 'leitura'"
                required
                placeholder="Sobrenome"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              id="email"
              label="E-mail:"
              label-for="email-usuario"
              description="Não permitimos mais de um usuário com o mesmo e-mail!"
            >
              <b-form-input
                id="email-usuario"
                type="email"
                v-model="aluno.email"
                required
                :readonly="mode === 'leitura'"
                placeholder="exemplo@email.com.br"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="telefone" label="Telefone:" label-for="telefone">
              <b-form-input
                id="url"
                type="url"
                v-model="aluno.telefone"
                required
                :readonly="mode === 'leitura'"
                placeholder="(00)0 0000-0000"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="data_nascimento" label="Data nascimento:" label-for="data_nascimento">
              <b-form-input
                id="data_nascimento"
                type="text"
                v-model="aluno.data_nascimento"
                :readonly="mode === 'leitura'"
                required
                placeholder="00/00/0000"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="3" sm="9">
            <b-form-group id="cpf" label="CPF:" label-for="cpf-usuario">
              <b-form-input
                id="cpf-usuario"
                type="text"
                v-model="aluno.cpf"
                :readonly="mode === 'leitura'"
                required
                placeholder="000.000.000-00"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="rg" label="RG:" label-for="rg-usuario">
              <b-form-input
                id="rg-usuario"
                type="text"
                v-model="aluno.rg"
                :readonly="mode === 'leitura'"
                required
                placeholder="000.000.000-0"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="cep" label="Cep:" label-for="cep">
              <b-form-input
                @input="buscarCepAluno()"
                id="cep"
                type="number"
                v-model="aluno.cep"
                :readonly="mode === 'leitura'"
                required
                placeholder="Cep"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group id="logradouro" label="Rua:" label-for="logradouro">
              <b-form-input
                id="logradouro"
                type="text"
                v-model="aluno.logradouro"
                :readonly="mode === 'leitura'"
                required
                placeholder="Rua:"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="numero" label="Número:" label-for="numero">
              <b-form-input
                id="numero"
                type="number"
                v-model="aluno.numero"
                :readonly="mode === 'leitura'"
                required
                placeholder="Número:"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="9">
            <b-form-group id="bairro" label="Bairro:" label-for="bairro">
              <b-form-input
                id="bairro"
                type="text"
                v-model="aluno.bairro"
                :readonly="mode === 'leitura'"
                required
                placeholder="Bairro:"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="cidade" label="Cidade:" label-for="cidade">
              <b-form-input
                id="cidade"
                type="text"
                v-model="aluno.cidade"
                :readonly="mode === 'leitura'"
                required
                placeholder="Cidade:"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="estado" label="Estado:" label-for="estado">
              <b-form-input
                id="estado"
                type="text"
                v-model="aluno.estado"
                :readonly="mode === 'leitura'"
                required
                placeholder="Estado:"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="pais" label="País:" label-for="pais">
              <b-form-input
                id="pais"
                type="text"
                v-model="aluno.pais"
                :readonly="mode === 'leitura'"
                required
                placeholder="País"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="9">
            <b-form-group id="idioma" label="Idioma:" label-for="idioma-usuario">
              <b-form-select
                id="idioma-usuario"
                :options="idiomas"
                required
                v-model="aluno.idioma"
                :readonly="mode === 'leitura'"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <div>
        <b-button
          variant="primary"
          @click="matricular()"
          class="mr-2"
          v-b-tooltip.hover
          title="Salvar"
        >
          Matricular
          <!-- <i class="fa fa-check"></i> -->
        </b-button>
        <b-button @click="cancelarAluno()" class="mr-2" v-b-tooltip.hover title="Cancelar">
          <i class="fa fa-undo"></i>
        </b-button>
      </div>
    </b-modal>
    <!-- -- FIM MODAL ALUNO======================================================================= -->

    <!-- INICIO MODAL FILIAÇÃO  ========================================================================-->

    <b-modal size="lg" id="modal_filiacao" title="Filiação" ref="modal_filiacao">
      <b-button variant="primary" @click="abrirModal_buscarUsuario('FILIACAO')" class="mr-2" v-b-tooltip.hover title="Buscar Responsável">
       Já cadastrado?
      </b-button>
      <b-form>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group id="nome" label="Nome:" label-for="nome-usuario">
              <b-form-input
                id="nome-usuario"
                type="text"
                v-model="responsavel.nome"
                :readonly="mode === 'leitura'"
                required
                placeholder="Nome"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group id="sobrenome" label="Sobrenome:" label-for="sobrenome-usuario">
              <b-form-input
                id="sobrenome-usuario"
                type="text"
                v-model="responsavel.sobrenome"
                :readonly="mode === 'leitura'"
                required
                placeholder="Sobrenome"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" sm="12">
            <b-form-group
              id="email"
              label="E-mail:"
              label-for="email-usuario"
              description="Não permitimos mais de um usuário com o mesmo e-mail!"
            >
              <b-form-input
                id="email-usuario"
                type="email"
                v-model="responsavel.email"
                required
                :readonly="mode === 'leitura'"
                placeholder="exemplo@email.com.br"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="telefone" label="Telefone:" label-for="telefone">
              <b-form-input
                id="url"
                type="url"
                v-model="responsavel.telefone"
                required
                :readonly="mode === 'leitura'"
                placeholder="(00)0 0000-0000"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="data_nascimento" label="Data nascimento:" label-for="data_nascimento">
              <b-form-input
                id="data_nascimento"
                type="text"
                v-model="responsavel.data_nascimento"
                :readonly="mode === 'leitura'"
                required
                placeholder="00/00/0000"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="3" sm="9">
            <b-form-group id="cpf" label="CPF:" label-for="cpf-usuario">
              <b-form-input
                id="cpf-usuario"
                type="text"
                v-model="responsavel.cpf"
                :readonly="mode === 'leitura'"
                required
                placeholder="000.000.000-00"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="rg" label="RG:" label-for="rg-usuario">
              <b-form-input
                id="rg-usuario"
                type="text"
                v-model="responsavel.rg"
                :readonly="mode === 'leitura'"
                required
                placeholder="000.000.000-0"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="cep" label="Cep:" label-for="cep">
              <b-form-input
                @input="buscarCepResponsavel()"
                id="cep"
                type="number"
                v-model="responsavel.cep"
                :readonly="mode === 'leitura'"
                required
                placeholder="Cep"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="6" sm="12">
            <b-form-group id="logradouro" label="Rua:" label-for="logradouro">
              <b-form-input
                id="logradouro"
                type="text"
                v-model="responsavel.logradouro"
                :readonly="mode === 'leitura'"
                required
                placeholder="Rua:"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="numero" label="Número:" label-for="numero">
              <b-form-input
                id="numero"
                type="number"
                v-model="responsavel.numero"
                :readonly="mode === 'leitura'"
                required
                placeholder="Número:"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="9">
            <b-form-group id="bairro" label="Bairro:" label-for="bairro">
              <b-form-input
                id="bairro"
                type="text"
                v-model="responsavel.bairro"
                :readonly="mode === 'leitura'"
                required
                placeholder="Bairro"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="cidade" label="Cidade:" label-for="cidade">
              <b-form-input
                id="cidade"
                type="text"
                v-model="responsavel.cidade"
                :readonly="mode === 'leitura'"
                required
                placeholder="Cidade:"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="estado" label="Estado:" label-for="estado">
              <b-form-input
                id="estado"
                type="text"
                v-model="responsavel.estado"
                :readonly="mode === 'leitura'"
                required
                placeholder="Estado:"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="3" sm="9">
            <b-form-group id="pais" label="País:" label-for="pais">
              <b-form-input
                id="pais"
                type="text"
                v-model="responsavel.pais"
                :readonly="mode === 'leitura'"
                required
                placeholder="País"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" sm="9">
            <b-form-group id="idioma" label="Idioma:" label-for="idioma-usuario">
              <b-form-select
                id="idioma-usuario"
                :options="idiomas"
                required
                v-model="responsavel.idioma"
                :readonly="mode === 'leitura'"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <div>
        <b-button variant="primary" @click="cancelarFiliacao()" class="mr-2" v-b-tooltip.hover title="Salvar">
          <i class="fa fa-check"></i>
        </b-button>
        <b-button @click="cancelarFiliacao()" class="mr-2" v-b-tooltip.hover title="Cancelar">
          <i class="fa fa-undo"></i>
        </b-button>
      </div>
    </b-modal>
    <!-- FIM MODAL FILIAÇÃO  ========================================================================-->

    <!-- INICIO  MODAL COMPRA  ========================================================================-->

    <b-modal size="lg" id="modal_compra" ref="modal_compra" title=" Selecionar Produtos e Serviços">
      <b-form-group id="produtos" label-for="produtos">
        <b-form-checkbox-group
          @input="adicionarProdutosNoCarrinho()"
          id="compra"
          name="compras"
          v-model="carrinho"
          :options="produtos_e_servicos"
        ></b-form-checkbox-group>
      </b-form-group>
      <hr>
      <div class="lista_carrinho">
        <ul>
          <li v-for="prod in carrinho" :key="prod.id">
            <ProdutoCarrinhoItem :prod="prod"/>
          </li>
        </ul>
      </div>
      <p>
        <span>Valor da compra:</span>
        <span style="font-weight: bold;">{{`R$ ${valor_total_carrinho}`}}</span>
      </p>
      <p>
        <span>Total de descontos:</span>
        <span style="font-weight: bold;">{{`R$ ${valor_total_desconto}`}}</span>
      </p>
      <p>
        <span>Total à pagar:</span>
        <span style="font-weight: bold;">{{`R$ ${valor_a_pagar}`}}</span>
      </p>
      <div>
        <b-button variant="primary" @click="salvar()" class="mr-2" v-b-tooltip.hover title="Salvar">
          <i class="fa fa-check"></i>
        </b-button>
        <b-button @click="cancelarProduto()" class="mr-2" v-b-tooltip.hover title="Cancelar">
          <i class="fa fa-undo"></i>
        </b-button>
      </div>
    </b-modal>

    <!-- FIM MODAL COMPRA  ========================================================================-->
    <!-- INICIO  MODAL BUSCAR USUÁRIO==============================================================-->

    <b-modal id="modal_buscar_usuario" title="Buscar Usuário" ref="modal_buscar_usuario">
      <b-form>
        <b-row>
          <b-col md="3" sm="9">
            <b-form-group id="idioma" label="Idioma:" label-for="buscar_usuario">
              <b-form-select
                id="buscar_usuario"
                :options="buscar_por"
                required
                v-model="busca_usuario_por.tipo_busca"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-input
          v-if="busca_usuario_por.tipo_busca==='EMAIL'"
          v-model="busca_usuario_por.email"
          placeholder="Digite o e-mail do usuário para buscar"
        ></b-form-input>
        <b-form-input
          v-if="busca_usuario_por.tipo_busca==='CPF'"
          v-model="busca_usuario_por.cpf"
          placeholder="Digite cpf do usuário para buscar"
        ></b-form-input>
      </b-form>
      <div>
        <b-button
          variant="primary"
          @click="buscar_usuario()"
          class="mr-2"
          v-b-tooltip.hover
          title="Buscar Usuário"
        >
          <i class="fa fa-search"></i>
        </b-button>
        <b-button @click="cancelarBuscarUsuario()" class="mr-2" v-b-tooltip.hover title="Cancelar">
          <i class="fa fa-undo"></i>
        </b-button>
      </div>
    </b-modal>
    <!-- FIM MODAL BUSCAR USUÁRIO  ========================================================================-->
    <!-- INÍCIO MODAL PERGUTAR SE QUER PAGAR===============================================================-->
    <b-modal centered id="modal_pergutar" ref="modal_pergutar">
      <div>
        <div class="d-block text-center">
          <h3>Deseja realizar o pagamento agora?</h3>
        </div>
        <div class="d-block text-center">
          <b-button class="mt-3" variant="outline-success" @click="naoPagarAgora()">Sim</b-button>
          <b-button class="mt-3" variant="outline-warning" @click="naoPagarAgora()">Não</b-button>
        </div>
      </div>
    </b-modal>

    <!-- FIM MODAL PERGUTAR SE QUER PAGAR===============================================================-->
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import BotaoCadastrar from "@/components/globais/BotaoCadastrar";
import ProdutoCarrinhoItem from "./ProdutoCarrinhoItem";
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Matricular",
  components: { PageTitle, BotaoCadastrar, ProdutoCarrinhoItem },
  computed: {
    ...mapState({
      usuario: state => state.usuario,
      //Ao criar uma propriedade podemos acessá-la como se fosse um um atributo
      valor_total_carrinho() {
        return this.$store.state.dados_carrinho.valor_total_carrinho;
      },
      valor_total_desconto() {
        return this.$store.state.dados_carrinho.valor_total_desconto;
      },
      valor_a_pagar() {
        return this.$store.state.dados_carrinho.valor_a_pagar;
      }
    })
  },
  data() {
    return {
      salvou_aluno: true,
      mode: "edicao",
      aluno: {},
      responsavel: {},
      escolas: [],
      cursos: [],
      cursoEscolhido: "",
      turmas: [],
      produtos_e_servicos: [],
      carrinho: [],
      idiomas: ["PORTUGUÊS", "INGLÊS"],
      buscar_por: ["EMAIL", "CPF"],
      busca_usuario_por: {},
      buscou_perfil_de: ""
    };
  },
  methods: {
    buscarCepAluno() {
      const url = `${baseApiUrl}/usuarios/buscarCep/${this.aluno.cep}`;
      if (this.aluno.cep.length == 8) {
        axios
          .get(url)
          .then(res => {
            this.aluno.logradouro = res.data.logradouro;
            this.aluno.bairro = res.data.bairro;
            this.aluno.cidade = res.data.localidade;
            this.aluno.estado = res.data.uf;
          })
          .catch(showError);
      }
      return;
    },
    buscarCepResponsavel() {
      const url = `${baseApiUrl}/usuarios/buscarCep/${this.responsavel.cep}`;
      if (this.responsavel.cep.length == 8) {
        axios
          .get(url)
          .then(res => {
            this.responsavel.logradouro = res.data.logradouro;
            this.responsavel.bairro = res.data.bairro;
            this.responsavel.cidade = res.data.localidade;
            this.responsavel.estado = res.data.uf;
          })
          .catch(showError);
      }
      return;
    },
    adicionarProdutosNoCarrinho() {
      this.$store.commit("adicionarProdutos", this.carrinho); //Ao adicionar um novo produto atualizamos o carrinho
      this.$store.commit("repassar_carrinho"); //Então atualizamos os valores para o usuário
    },
    matricular() {
      this.aluno.id_instituicao = this.usuario.id_instituicao;
      const matricula = {};
      (matricula.aluno = this.aluno),
        (matricula.responsavel = this.responsavel);
      const url = `${baseApiUrl}/usuarios/matricular/${
        this.usuario.id_instituicao
      }`;
      axios
        .post(url, matricula)
        .then(res => {
          this.aluno = res.data.alunoMatriculado;
          /* this.responsavel = res.data.responsavelDoAluno; */
          this.$toasted.global.defaultSuccess();
          this.$refs.modal_aluno.hide();
          this.$refs.modal_pergutar.show();
        })
        .catch(showError);
    },

    abrirModal_buscarUsuario(perfil) {
      this.buscou_perfil_de = perfil
      this.$root.$emit(
        "bv::show::modal",
        "modal_buscar_usuario",
        "#modal_buscar_usuario"
      );
    },
   
    buscar_usuario() {
      const url = `${baseApiUrl}/usuarios/usuarioPorEmailCpf/${
        this.usuario.id_instituicao
      }`;
      axios
        .post(url, this.busca_usuario_por)
        .then(res => {
          if (this.buscou_perfil_de == "FILIACAO") {
            this.aluno.filicoes = []
            this.aluno.filicoes.push(res.data.id)
            this.responsavel = res.data;
            this.$refs.modal_buscar_usuario.hide();
          } else {
            this.aluno = res.data;
            this.$refs.modal_buscar_usuario.hide();
          }
        })
        .catch(showError);
    },
    naoPagarAgora() {
      this.aluno = {};
      this.responsavel = {};
      this.carrinho = [];
      this.$refs.modal_pergutar.hide();
    },
    cancelarAluno() {
      this.$refs.modal_aluno.hide();
    },
    cancelarFiliacao() {
      this.$refs.modal_filiacao.hide();
    },
    cancelarProduto() {
      this.$refs.modal_compra.hide();
    },
    cancelarBuscarUsuario() {
      this.$refs.modal_buscar_usuario.hide();
    },
    setarUrlEscola() {
      const perfil_usuario = this.$store.state.usuario.perfil_atual;
      if (perfil_usuario === "SUPER_ADMIN" || perfil_usuario === "ADMIN") {
        return `${baseApiUrl}/escolas/todasInstituicao/${
          this.usuario.id_instituicao
        }`;
      } else {
        return `${baseApiUrl}/escolas/escolaPorId/${
          this.usuario.id_instituicao
        }/${this.usuario.id_escola}`;
      }
    },
    buscarEscolas() {
      const url = this.setarUrlEscola();
      axios(url)
        .then(res => {
          this.escolas = res.data.map(escola => {
            return { value: escola.id, text: escola.nome_escola };
          });
        })
        .catch(showError);
    },
    buscarCursosPorEscola() {
      setTimeout(() => {
        const id_escola = this.usuario.id_escola || this.aluno.id_escola;
        const url = `${baseApiUrl}/cursos/cursosDaEscola/${
          this.usuario.id_instituicao
        }/${id_escola}`;
        axios
          .get(url)
          .then(res => {
            this.cursos = res.data.map(curso => {
              return { value: curso.id, text: curso.nome };
            });
          })
          .catch(showError);
      }, 1000);
    },
    buscarTurmasPorCurso() {
      setTimeout(() => {
        const url = `${baseApiUrl}/turmas/turmasPorCurso/${
          this.usuario.id_instituicao
        }/${this.cursoEscolhido}`;
        axios
          .get(url)
          .then(res => {
            this.turmas = res.data.map(turma => {
              return {
                value: turma.id,
                text: `${turma.nome} - ${turma.turno}`
              };
            });
          })
          .catch(showError);
      }, 1000);
    },
    buscarPro_Serv_por_Escola() {
      this.produtos_e_servicos = {};
      const id_escola = this.aluno.id_escola || this.usuario.id_escola;
      const url = `${baseApiUrl}/prod_servicos/prodServPorEscola/${
        this.usuario.id_instituicao
      }/${id_escola}`;
      axios
        .get(url)
        .then(res => {
          this.produtos_e_servicos = res.data.map(prod => {
            return { value: prod, text: `${prod.nome} - R$ ${prod.valor}` };
          });
          this.$root.$emit("bv::show::modal", "modal_compra", "#modal_compra");
        })
        .catch(showError);
    }
  }, //fim de methods

  mounted() {
    this.buscarEscolas();
  }
};
</script>

<style>
.botoes_c button {
  width: 180px;
  margin-bottom: 5px;
}
.lista_carrinho ul {
  list-style: none;
}
</style>
