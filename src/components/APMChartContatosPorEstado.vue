<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Contatos por Estado</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <apexchart
        type="pie"
        height="150"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "APMChartContatosPorEstado",
  props: {
    setContatos: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      contatos: this.setContatos,
      series: [],
      chartOptions: {
        chart: {
          type: "pie",
          toolbar: {
            show: true
          }
        },
        labels: [],
        legend: {
          labels: {
            colors: this.$q.dark.isActive ? "#FFF" : "#000"
          }
        },
        theme: {
          palette: "palette3"
        }
      }
    };
  },
  methods: {
    setValues() {
      const vm = this;

      let result = Object.values(
        vm.contatos.reduce((c, { estado }) => {
          c[estado] = c[estado] || { label: estado, value: 0 };
          c[estado].value++;
          return c;
        }, {})
      );

      vm.series = result.map(x => x.value);
      vm.chartOptions.labels = result.map(x => x.label);
    }
  },
  created() {
    const vm = this;

    vm.setValues();
  },
  watch: {
    setContatos(val) {
      this.contatos = val;
    }
  }
};
</script>
