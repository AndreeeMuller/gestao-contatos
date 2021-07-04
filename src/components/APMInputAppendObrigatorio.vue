<template>
  <div>
    <q-icon name="outlined_flag" color="negative">
      <q-tooltip
        anchor="center left"
        self="center end"
        transition-show="rotate"
        transition-hide="rotate"
      >
        Campo obrigatório
      </q-tooltip>
    </q-icon>
  </div>
</template>

<script>
export default {
  name: "APMInputAppendObrigatorio"
};
</script>
