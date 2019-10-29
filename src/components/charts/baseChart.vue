<template>
  <canvas :id="this.id"></canvas>
</template>

<script>
import Chart from "chart.js";
export default {
  props: ["id", "type", "labels", "dados"],
  watch: {
    dados() {
      this.montaChart()
    }
  },
  methods: {
    montaChart() {
      console.log("dados chart", this.dados)
      var tela = document.getElementById(this.id).getContext("2d");
      var chart = new Chart(tela, {
        // The type of chart we want to create
        type: "bar",

        // The data for our dataset
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.id,
              backgroundColor: "rgba(255, 255, 155, 0.8)",
              borderColor: "rgba(255, 255, 055, 0.3)",
              data: this.dados
            }
          ]
        },

        // Configuration options go here
        options: {}
      });
    }
  },
  mounted() {
    this.montaChart()
  }
};
</script>