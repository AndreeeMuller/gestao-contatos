<template>
  <q-checkbox v-model="scope.selected" color="positive" dense>
    <q-tooltip
      anchor="center right"
      self="center start"
      transition-show="rotate"
      transition-hide="rotate"
    >
      Clique para alterar todos os dados
    </q-tooltip>
  </q-checkbox>
</template>

<script>
export default {
  name: "APMTableBodySelection",
  props: {
    setScope: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      scope: this.setScope
    };
  }
};
</script>
