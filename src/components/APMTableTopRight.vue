<template>
  <div class="row">
    <q-btn
      flat
      round
      dense
      :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
      @click="props.toggleFullscreen"
      class="q-ml-md"
    >
      <q-tooltip
        anchor="center left"
        self="center end"
        transition-show="rotate"
        transition-hide="rotate"
      >
        Modo tela cheia ou não
      </q-tooltip>
    </q-btn>
    <q-select
      v-model="visibleColumns"
      class="q-ml-md"
      multiple
      transition-show="flip-up"
      transition-hide="flip-down"
      outlined
      dense
      options-dense
      :display-value="$q.lang.table.columns"
      emit-value
      map-options
      :options="columns.filter(x => x.label)"
      option-value="name"
    >
      <q-tooltip
        anchor="center left"
        self="center end"
        transition-show="rotate"
        transition-hide="rotate"
      >
        Exibir ou ocultar colunas
      </q-tooltip>
    </q-select>
  </div>
</template>

<script>
export default {
  name: "APMTableTopRight",
  props: {
    setProps: {
      type: Object,
      default: () => {
        return {};
      }
    },
    setVisibleColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    setColumns: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      visibleColumns: this.setVisibleColumns,
      columns: this.setColumns,
      props: this.setProps
    };
  },
  watch: {
    visibleColumns(val) {
      this.$emit("update:setVisibleColumns", val);
    }
  }
};
</script>
