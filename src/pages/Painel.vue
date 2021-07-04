<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-pa-sm">
      <div class="col-12 col-md-4">
        <APMChartContatosPorEstado :set-contatos.sync="contatos" />
      </div>
      <div class="col-12 col-md-4">
        <APMChartContatosPorSituacao :set-contatos.sync="contatos" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Painel",
  components: {
    APMChartContatosPorEstado: () =>
      import("components/APMChartContatosPorEstado"),
    APMChartContatosPorSituacao: () =>
      import("components/APMChartContatosPorSituacao")
  },
  data() {
    return {
      contatos: this.$q.localStorage.getItem("contatos") || []
    };
  }
};
</script>
