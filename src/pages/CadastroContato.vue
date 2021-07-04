<template>
  <q-page>
    <div class="full-height full-width absolute q-pa-md overflow-auto">
      <q-table
        title="Contatos"
        ref="table"
        :dense="$q.screen.lt.md"
        :data="contatos"
        :filter="filter"
        :columns="columns"
        :visible-columns="visibleColumns"
        row-key="idcontato"
        :selected.sync="selected"
        separator="cell"
        binary-state-sort
        selection="single"
        @row-click="(event, row, index) => (selected = [row])"
        class="apm-table apm-table__GG"
      >
        <template v-slot:loading>
          <APMTableLoading />
        </template>
        <template v-slot:top-right="props">
          <APMTableTopRight
            :set-props="props"
            :set-columns="columns"
            :set-visible-columns.sync="visibleColumns"
          />
        </template>
        <template v-slot:body-selection="scope">
          <APMTableBodySelection :set-scope="scope" />
        </template>
        <template v-slot:top-row>
          <q-tr>
            <q-td colspan="100%">
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Procurar"
              >
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  transition-show="rotate"
                  transition-hide="rotate"
                >
                  Digite aqui para procurar um registro na tabela
                </q-tooltip>
                <q-icon slot="append" name="search"></q-icon>
              </q-input>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:body-cell-situacao="props">
          <q-td :props="props">
            <q-btn
              :color="props.row.situacao === 'A' ? 'positive' : 'negative'"
              text-color="white"
              square
              class="full-width full-height"
              dense
            >
              {{ props.row.situacao === "A" ? "Ativo" : "Inativo" }}
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <APMForm
        :edit-form="selected.length ? selected[0] : null"
        :default-form="{
          idcontato: null,
          situacao: 'A',
          nome: null,
          telefone: null,
          email: null,
          cep: null,
          estado: null,
          cidade: null,
          logradouro: null,
          bairro: null,
          numero: null,
          complemento: null
        }"
        class="q-mt-md"
        :fields="{
          descricao: 'nome',
          ids: ['idcontato']
        }"
        @onSubmit="onSubmit"
        @onReset="selected = []"
        @onCopy="selected = []"
        @onDelete="onDelete"
      >
        <template slot-scope="props">
          <div class="row">
            <div class="col-8 col-md-4">
              <q-input
                filled
                :dense="$q.screen.lt.md"
                name="idcontato"
                type="text"
                v-model="props.form.idcontato"
                label="Código"
                readonly
              >
              </q-input>
            </div>
            <div class="col-4 col-md-4">
              <q-btn
                @click.stop="
                  props.form.situacao = props.form.situacao === 'A' ? 'I' : 'A'
                "
                :color="props.form.situacao == 'A' ? 'positive' : 'negative'"
                square
                class="float-right full-height"
                :dense="$q.screen.lt.md"
              >
                <q-tooltip
                  anchor="bottom middle"
                  self="center middle"
                  transition-show="rotate"
                  transition-hide="rotate"
                >
                  Clique para alterar
                </q-tooltip>
                {{ props.form.situacao == "A" ? "Ativo" : "Inativo" }}
              </q-btn>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-8">
              <q-input
                filled
                name="nome"
                type="nome"
                :dense="$q.screen.lt.md"
                v-model="props.form.nome"
                label="Nome *"
                hide-bottom-space
                lazy-rules
                :rules="[val => (val && val.length > 0) || '']"
              >
                <template v-slot:append>
                  <APMInputAppendObrigatorio />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-8">
              <q-input
                filled
                name="email"
                type="email"
                :dense="$q.screen.lt.md"
                v-model="props.form.email"
                label="E-mail *"
                hide-bottom-space
                lazy-rules
                :rules="[val => (val && val.length > 0) || '']"
              >
                <template v-slot:append>
                  <APMInputAppendObrigatorio />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-8">
              <q-input
                filled
                name="telefone"
                type="tel"
                :dense="$q.screen.lt.md"
                v-model="props.form.telefone"
                label="Telefone *"
                :mask="
                  props.form.telefone &&
                  !['8', '9'].includes(props.form.telefone.substring(3, 4))
                    ? '(##) ####-####'
                    : '(##) #####-####'
                "
                unmasked-value
                hide-bottom-space
                lazy-rules
                :rules="[
                  val =>
                    (val &&
                      (['8', '9'].includes(props.form.telefone.substring(3, 4))
                        ? val.length == 11
                        : val.length == 10)) ||
                    ''
                ]"
              >
                <template v-slot:append>
                  <APMInputAppendObrigatorio />
                </template>
              </q-input>
            </div>
          </div>
          <APMFormEndereco
            :use-cep-api="props.form.idcontato ? false : true"
            :set-cep.sync="props.form.cep"
            :set-estado.sync="props.form.estado"
            :set-cidade.sync="props.form.cidade"
            :set-logradouro.sync="props.form.logradouro"
            :set-bairro.sync="props.form.bairro"
            :set-numero.sync="props.form.numero"
            :set-complemento.sync="props.form.complemento"
          >
          </APMFormEndereco>
        </template>
      </APMForm>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "CadastroContato",
  components: {
    APMForm: () => import("components/APMForm"),
    APMFormEndereco: () => import("components/APMFormEndereco"),
    APMInputAppendObrigatorio: () =>
      import("components/APMInputAppendObrigatorio"),
    APMTableLoading: () => import("components/APMTableLoading"),
    APMTableTopRight: () => import("components/APMTableTopRight"),
    APMTableBodySelection: () => import("components/APMTableBodySelection")
  },
  data() {
    return {
      contatos: this.$q.localStorage.getItem("contatos") || [],
      filter: "",
      columns: [
        {
          name: "idcontato",
          field: "idcontato",
          label: "Cód.",
          align: "right",
          sortable: true,
          style: "width: 80px"
        },
        {
          name: "nome",
          field: "nome",
          label: "Nome",
          align: "left",
          sortable: true
        },
        {
          name: "situacao",
          field: "situacao",
          label: "Situação",
          align: "center",
          sortable: true,
          style: "width: 100px"
        },
        {
          name: "telefone",
          field: "telefone",
          label: "Telefone",
          align: "right",
          sortable: true,
          style: "width: 120px"
        },
        {
          name: "email",
          field: "email",
          label: "E-mail",
          align: "left",
          sortable: true,
          style: "width: 120px"
        },
        {
          name: "cep",
          field: "cep",
          label: "CEP",
          align: "right",
          sortable: true,
          style: "width: 120px"
        },
        {
          name: "estado",
          field: "estado",
          label: "Estado",
          align: "center",
          sortable: true,
          style: "width: 60px"
        },
        {
          name: "cidade",
          field: "cidade",
          label: "Cidade",
          align: "left",
          sortable: true,
          style: "width: 120px"
        },
        {
          name: "logradouro",
          field: "logradouro",
          label: "Logradouro",
          align: "left",
          sortable: true
        },
        {
          name: "bairro",
          field: "bairro",
          label: "Bairro",
          align: "left",
          sortable: true,
          style: "width: 120px"
        },
        {
          name: "numero",
          field: "numero",
          label: "Número",
          align: "right",
          sortable: true,
          style: "width: 120px"
        },
        {
          name: "complemento",
          field: "complemento",
          label: "Complemento",
          align: "left",
          sortable: true,
          style: "width: 120px"
        }
      ],
      visibleColumns: ["idcontato", "nome", "situacao", "telefone", "email"],
      selected: []
    };
  },
  methods: {
    onSubmit(form) {
      const vm = this;

      // Simula requisição com servidor
      vm.$q.loading.show();
      setTimeout(() => {
        if (!form.idcontato) {
          // Cria
          form.idcontato = vm.getIdContato(); // simula a sequência de um id no banco.
          vm.contatos.push(form);

          // Vai até a última página, que é onde está localizado o novo contato
          vm.$refs.table.lastPage();
        } else {
          // atualiza
          let index = vm.contatos.map(x => x.idcontato).indexOf(form.idcontato);
          vm.contatos[index] = form;
        }

        // Armazena
        vm.$q.localStorage.set("contatos", vm.contatos);

        // Define como selecionado, para voltar a editar o contato que acabou de criar
        vm.selected = [form];

        // Notifca
        vm.$q.notify({
          type: "positive",
          message: "Contato gravado com sucesso!"
        });

        // Finaliza loader
        vm.$nextTick(() => {
          vm.$q.loading.hide();
        });
      }, 1000);
    },
    onDelete(ids) {
      const vm = this;

      // Simula requisição com servidor
      vm.$q.loading.show();
      setTimeout(() => {
        // exclui
        let index = vm.contatos.map(x => x.idcontato).indexOf(ids.idcontato);
        vm.contatos.splice(index, 1);

        // Armazena
        vm.$q.localStorage.set("contatos", vm.contatos);

        vm.selected = [];

        // Notifca
        vm.$q.notify({
          type: "positive",
          message: "Contato excluído com sucesso!"
        });

        // Finaliza loader
        vm.$nextTick(() => {
          vm.$q.loading.hide();
        });
      }, 1000);
    },
    getIdContato() {
      // simula a sequência de um id no banco.
      const vm = this;

      // Localiza
      let idContato =
        parseInt(vm.$q.localStorage.getItem("seq_idContato")) || 0;

      // Incrementa
      idContato++;

      // Armazena
      vm.$q.localStorage.set("seq_idContato", idContato);

      return idContato;
    }
  }
};
</script>
