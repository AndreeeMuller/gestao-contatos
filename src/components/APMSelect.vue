<template>
  <div>
    <q-select
      v-model="model"
      filled
      clearable
      :multiple="multiple ? true : false"
      ref="select"
      :name="name"
      @input="
        $emit('model:update', $event);
        $nextTick(() => {
          $emit('inputAfter', $event);
        });
        $emit('inputBefore', $event);
      "
      :dense="$q.screen.lt.md || dense"
      use-input
      input-debounce="0"
      emit-value
      map-options
      :disable="disable ? true : false"
      :readonly="readonly ? true : false"
      transition-show="flip-up"
      transition-hide="flip-down"
      hide-bottom-space
      lazy-rules
      :option-value="optionValue"
      :option-label="optionLabel"
      :label="label"
      :options="options"
      :rules="[val => val !== null || '']"
      @filter="filter"
    >
      <q-tooltip
        anchor="center left"
        self="center end"
        transition-show="rotate"
        transition-hide="rotate"
        v-if="valMinLengthToFilter > 0"
      >
        Informe no mínimo {{ valMinLengthToFilter }} caracteres para filtrar
      </q-tooltip>
      <template v-slot:append>
        <APMInputAppendObrigatorio />
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  name: "APMSelect",
  components: {
    APMInputAppendObrigatorio: () =>
      import("components/APMInputAppendObrigatorio")
  },
  props: {
    setModel: null,
    label: {
      type: String,
      default: "Selecione"
    },
    name: {
      type: String,
      default: "select"
    },
    optionLabel: {
      type: String,
      default: "label"
    },
    optionValue: {
      type: String,
      default: "value"
    },
    defaultOptions: {
      type: Array
    },
    valMinLengthToFilter: {
      type: Number,
      default: 3
    },
    dense: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: this.setModel,
      options: []
    };
  },
  methods: {
    filter(val, update, abort) {
      const vm = this;

      if (val.length < vm.valMinLengthToFilter) {
        vm.options = [];
        abort();
        return;
      }

      update(
        () => {
          if (val === "" && vm.valMinLengthToFilter > 0) {
            vm.options = [];
          } else {
            vm.options = vm.defaultOptions.filter(x =>
              (x[vm.optionValue] + " " + x[vm.optionLabel])
                .toLowerCase()
                .includes(val.toLowerCase())
            );
          }
        },
        ref => {
          if (val !== "" && ref.options.length > 0) {
            ref.setOptionIndex(-1); // reset optionIndex in case there is something selected
            ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
          }
        }
      );
    }
  },
  watch: {
    model(val) {
      this.$emit("update:setModel", val);
    }
  }
};
</script>
