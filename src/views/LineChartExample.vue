<template>
  <LineChart width="800px" height="600px" :chartData="chartData" :chartOptions="chartOptions"></LineChart>
</template>

<script>
import { LineChart } from '../components/charts';
// import HelloWorld from "../components/HelloWorld";

export default {
  name: 'PageDesignerView',
  components: {LineChart},
  // components: {HelloWorld},
  data() {
    return {
      chartData: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [14, 42, 28, 85, 57, 71],
          borderWidth: 1,
          fill: 'start',
          pointRadius: 5,
          pointHoverRadius: 7,
          // tension: 0.3,
          cubicInterpolationMode: 'monotone'
        }]
      },
      chartOptions: {
        scales: {
          y: {beginAtZero: true}
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
