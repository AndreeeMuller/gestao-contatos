<template>
  <div class="row">
    <div class="col-12 q-gutter-y-md">
      <div class="row">
        <div class="col-8" :class="hasLittleSpace ? 'col-md-8' : 'col-md-4'">
          <q-input
            filled
            name="cep"
            type="tel"
            :dense="$q.screen.lt.md"
            v-model="cep"
            label="CEP"
            @input="getEnderecoByCEP"
            :rules="[
              val => (val && (val.length == 0 || val.length == 8)) || !val || ''
            ]"
            hide-bottom-space
            mask="#####-###"
            unmasked-value
          >
            <template v-slot:append>
              <APMInputAppendObrigatorio />
            </template>
          </q-input>
        </div>
        <div class="col-4 col-md-4">
          <q-btn
            @click.stop="getEnderecoByCEP(cep, true)"
            color="primary"
            square
            icon="search"
            class="float-right full-height"
            :dense="$q.screen.lt.md"
          >
            <q-tooltip
              anchor="bottom middle"
              self="center middle"
              transition-show="rotate"
              transition-hide="rotate"
            >
              Buscar endereço com base no CEP informado
            </q-tooltip>
          </q-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-12" :class="hasLittleSpace ? 'col-md-12' : 'col-md-8'">
          <q-input
            filled
            name="estado"
            type="text"
            :dense="$q.screen.lt.md"
            v-model="estado"
            label="Estado *"
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
        <div class="col-12" :class="hasLittleSpace ? 'col-md-12' : 'col-md-8'">
          <q-input
            filled
            name="cidade"
            type="text"
            :dense="$q.screen.lt.md"
            v-model="cidade"
            label="Cidade *"
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
        <div class="col-12" :class="hasLittleSpace ? 'col-md-12' : 'col-md-8'">
          <q-input
            filled
            name="logradouro"
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
      </div>
      <div class="row">
        <div class="col-12" :class="hasLittleSpace ? 'col-md-12' : 'col-md-8'">
          <q-input
            filled
            name="bairro"
            type="text"
            :dense="$q.screen.lt.md"
            v-model="bairro"
            label="Bairro *"
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
        <div class="col-12" :class="hasLittleSpace ? 'col-md-12' : 'col-md-8'">
          <q-input
            filled
            name="numero"
            type="text"
            :dense="$q.screen.lt.md"
            v-model="numero"
            label="Número"
          >
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-12" :class="hasLittleSpace ? 'col-md-12' : 'col-md-8'">
          <q-input
            filled
            name="complemento"
            type="text"
            :dense="$q.screen.lt.md"
            v-model="complemento"
            label="Complemento"
          >
          </q-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "APMFormEndereco",
  components: {
    APMInputAppendObrigatorio: () =>
      import("components/APMInputAppendObrigatorio")
  },
  props: {
    hasLittleSpace: {
      type: Boolean,
      default: false
    },
    useCepApi: {
      type: Boolean,
      default: true
    },
    setCep: {
      type: String
    },
    setEstado: {
      type: String
    },
    setCidade: {
      type: String
    },
    setLogradouro: {
      type: String
    },
    setBairro: {
      type: String
    },
    setNumero: {
      type: String
    },
    setComplemento: {
      type: String
    }
  },
  data() {
    return {
      cep: this.setCep,
      estado: this.setEstado,
      cidade: this.setCidade,
      logradouro: this.setLogradouro,
      bairro: this.setBairro,
      numero: this.setNumero,
      complemento: this.setComplemento
    };
  },
  methods: {
    getEnderecoByCEP(cep, useApi = false) {
      const vm = this;

      // Determina quando deve fazer a busca, pois em determinados momentos o formulário é apenas visual.
      if ((vm.useCepApi || useApi) && vm.$service.viacep.validaCEP(cep)) {
        vm.$q.loading.show();
        vm.$service.viacep
          .getByCEP(cep)
          .then(response => {
            vm.estado = response.uf;
            vm.cidade = response.localidade;
            vm.logradouro = response.logradouro;
            vm.bairro = response.bairro;
            //vm.complemento = response.complemento;
          })
          .catch(error => {
            vm.$q.notify({
              type: "negative",
              message:
                "Não foi possível manter conexão com o servidor. Por favor, entre em contato com o suporte. (getByCEP)"
            });
          })
          .then(() => {
            vm.$nextTick(() => {
              vm.$q.loading.hide();
            });
          });
      }
    }
  },
  watch: {
    cep(val) {
      this.$emit("update:setCep", val);
    },
    setCep(val) {
      this.cep = val;
    },
    estado(val) {
      this.$emit("update:setEstado", val);
    },
    setEstado(val) {
      this.estado = val;
    },
    cidade(val) {
      this.$emit("update:setCidade", val);
    },
    setCidade(val) {
      this.cidade = val;
    },
    logradouro(val) {
      this.$emit("update:setLogradouro", val);
    },
    setLogradouro(val) {
      this.logradouro = val;
    },
    bairro(val) {
      this.$emit("update:setBairro", val);
    },
    setBairro(val) {
      this.bairro = val;
    },
    numero(val) {
      this.$emit("update:setNumero", val);
    },
    setNumero(val) {
      this.numero = val;
    },
    complemento(val) {
      this.$emit("update:setComplemento", val);
    },
    setComplemento(val) {
      this.complemento = val;
    }
  }
};
</script>
