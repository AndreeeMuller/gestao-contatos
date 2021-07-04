<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      transition-show="flip-left"
      transition-hide="flip-right"
    >
      <div class="row q-col-gutter-md q-pa-sm">
        <div class="col-12 col-md-4">
          <APMSelect
            label="Estado *"
            :default-options="estados"
            :set-model.sync="estado"
            :val-min-length-to-filter="0"
            option-label="Nome"
            option-value="Sigla"
            @inputAfter="getCidades"
          />
        </div>
        <div class="col-12 col-md-4">
          <APMSelect
            label="Cidade *"
            :default-options="cidades"
            :set-model.sync="cidade"
            :val-min-length-to-filter="0"
            option-label="Nome"
            option-value="ID"
            :disable="!estado"
            ref="cidade"
            @inputAfter="focus('logradouro')"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-input
            filled
            name="logradouro"
            ref="logradouro"
            type="text"
            :dense="$q.screen.lt.md"
            v-model="logradouro"
            label="Logradouro *"
            hide-bottom-space
            lazy-rules
            :rules="[val => (val && val.length > 0) || '']"
          >
            <template v-slot:append>
              <APMInputAppendObrigatorio />
            </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-btn
            color="secondary"
            label="Buscar"
            icon="search"
            class="full-width"
            :dense="$q.screen.lt.md"
            type="submit"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
              transition-show="rotate"
              transition-hide="rotate"
            >
              Busca um ou mais endereços com base nos filtros informados
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-form>
    <div class="row q-col-gutter-md q-pa-sm">
      <div
        class="col-12 col-md-4"
        v-for="(endereco, index) in enderecos"
        v-bind:key="index"
      >
        <q-card>
          <q-img
            src="https://maplink.global/wp-content/uploads/2019/09/google-maps.png"
          />
          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
              @click="
                openURL(
                  `https://www.google.com/maps/search/?api=1&query=${
                    endereco.logradouro ? endereco.logradouro : ''
                  }${endereco.complemento ? ', ' + endereco.complemento : ''}${
                    endereco.bairro ? ', ' + endereco.bairro : ''
                  }${endereco.cidade ? ', ' + endereco.cidade : ''}${
                    endereco.uf ? ', ' + endereco.uf : ''
                  }${endereco.cep ? ', ' + endereco.cep : ''}`
                )
              "
            >
              <q-tooltip
                anchor="top middle"
                self="center middle"
                transition-show="rotate"
                transition-hide="rotate"
              >
                Clique aqui para abrir o endereço no google maps
              </q-tooltip>
            </q-btn>
            <div class="row no-wrap items-center">
              <div class="col text-h6">
                {{ endereco.logradouro }}
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none bg-secondary text-white">
            <div class="text-subtitle1">Bairro・{{ endereco.bairro }}</div>
            <div class="text-subtitle1">
              Complemento・{{ endereco.complemento }}
            </div>
            <div class="text-subtitle1">CEP・{{ endereco.cep }}</div>
            <div class="text-subtitle1">DDD・{{ endereco.ddd }}</div>
            <div class="text-subtitle1">GIA・{{ endereco.gia }}</div>
            <div class="text-subtitle1">Siafi・{{ endereco.siafi }}</div>
            <div class="text-subtitle1">IBGE・{{ endereco.ibge }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "ConsultaEndereco",
  components: {
    APMSelect: () => import("components/APMSelect"),
    APMInputAppendObrigatorio: () =>
      import("components/APMInputAppendObrigatorio")
  },
  data() {
    return {
      estados: this.$defaultOptions.estados,
      cidades: [],
      estado: null,
      cidade: null,
      logradouro: null,
      enderecos: []
    };
  },
  methods: {
    getCidades() {
      const vm = this;

      vm.cidades = vm.$defaultOptions.getCidadesByEstadoSigla(vm.estado);

      vm.$nextTick(() => {
        vm.$refs.cidade.$refs.select.focus();
      });
    },
    onSubmit() {
      const vm = this;

      let cidade = vm.cidades.find(x => x.ID === vm.cidade);

      vm.$q.loading.show();
      vm.$service.viacep
        .getByLogradouro(vm.estado, cidade.Nome, vm.logradouro)
        .then(response => {
          vm.enderecos = response;
        })
        .catch(error => {
          vm.$q.notify({
            type: "negative",
            message:
              "Não foi possível manter conexão com o servidor. Por favor, entre em contato com o suporte. (getByLogradouro)"
          });
        })
        .then(() => {
          vm.$nextTick(() => {
            vm.$q.loading.hide();
          });
        });
    },
    focus(ref) {
      const vm = this;

      vm.$refs[ref].focus();
    },
    openURL
  }
};
</script>
