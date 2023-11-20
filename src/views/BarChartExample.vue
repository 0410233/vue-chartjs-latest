<template>
  <BarChart width="800px" height="600px" :chartData="chartData" :chartOptions="chartOptions"></BarChart>
</template>

<script>
import { BarChart } from '../components/charts';
// import HelloWorld from "../components/HelloWorld";

export default {
  name: 'PageDesignerView',
  components: {BarChart},
  // components: {HelloWorld},
  data() {
    return {
      chartData: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [14, 42, 28, 85, 57, 71],
          // borderWidth: 1,
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
