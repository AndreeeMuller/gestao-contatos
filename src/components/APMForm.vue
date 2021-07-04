<template>
  <div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      :ref="formRef"
      transition-show="flip-left"
      transition-hide="flip-right"
    >
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-h6">
                {{ messageAction }}
              </div>
            </div>
            <div class="col-12 col-md-6 text-right">
              <q-btn-group outline :dense="$q.screen.lt.md">
                <q-btn
                  color="primary"
                  label="Novo"
                  icon="restart_alt"
                  :dense="$q.screen.lt.md"
                  type="reset"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >
                    Redefinir os campos para criar um novo registro
                  </q-tooltip>
                </q-btn>
                <q-btn
                  color="negative"
                  label="Excluir"
                  icon="delete"
                  :dense="$q.screen.lt.md"
                  @click="onDelete"
                  v-if="messageAction.includes('Editando')"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >
                    Exclui o registro
                  </q-tooltip>
                </q-btn>
                <q-btn
                  color="secondary"
                  label="Copiar"
                  icon="content_copy"
                  :dense="$q.screen.lt.md"
                  @click="onCopy"
                  v-if="messageAction.includes('Editando')"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >
                    Copia as informações do registro para criar um novo registro
                  </q-tooltip>
                </q-btn>
                <q-btn
                  color="positive"
                  label="Salvar"
                  icon="save"
                  :dense="$q.screen.lt.md"
                  type="submit"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >
                    Salva as informações do registro
                  </q-tooltip>
                </q-btn>
              </q-btn-group>
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-gutter-y-md full-width">
          <slot :form="form"></slot>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { extend } from "quasar";

export default {
  name: "APMForm",
  props: {
    defaultForm: {
      type: Object,
      default: function() {
        return {};
      }
    },
    editForm: {
      type: Object,
      default: null
    },
    fields: {
      type: Object,
      default: function() {
        return {
          ids: ["id"],
          descricao: "descricao"
        };
      }
    },
    formRef: {
      type: String,
      default: "form"
    }
  },
  data() {
    return {
      form: {},
      messageAction: "Cadastrar",
      lastAction: "onReset"
    };
  },
  methods: {
    onReset() {
      const vm = this;

      vm.form = Object.assign({}, vm.defaultForm);

      vm.messageAction = "Cadastrar";

      vm.lastAction = "onReset";
      vm.$emit("onReset");
    },
    onSubmit() {
      const vm = this;

      vm.$refs[vm.formRef].validate().then(success => {
        if (success) {
          vm.lastAction = "onSubmit";
          vm.$emit("onSubmit", vm.form);
        } else {
          vm.$q.notify({
            type: "negative",
            message: "Verifique os campos."
          });
        }
      });
    },
    onCopy() {
      const vm = this;

      const copyForm = Object.assign({}, vm.form);

      vm.fields.ids.forEach(field => {
        copyForm[field] = null;
      });

      vm.messageAction = "Copiando - " + copyForm[vm.fields.descricao];

      vm.form = copyForm;

      vm.lastAction = "onCopy";
      vm.$emit("onCopy");
    },
    onEdit(editForm) {
      const vm = this;

      vm.form = extend(true, {}, vm.defaultForm, editForm);

      vm.messageAction = "Editando - " + vm.form[vm.fields.descricao];

      vm.lastAction = "onEdit";
      vm.$emit("onEdit");
    },
    onDelete() {
      const vm = this;

      vm.lastAction = "onDelete";
      vm.$emit("onDelete", vm.getValuesOfFieldsIds());
    },
    getValuesOfFieldsIds() {
      const vm = this;
      const ids = {};

      vm.fields.ids.forEach(field => {
        ids[field] = vm.form[field];
      });

      return ids;
    }
  },
  created() {
    const vm = this;

    vm.onReset();
  },
  watch: {
    editForm(val) {
      const vm = this;

      if (val) {
        vm.onEdit(val);
      } else if (vm.lastAction != "onCopy") {
        vm.onReset();
      }
    }
  }
};
</script>
