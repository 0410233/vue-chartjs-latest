<template>
  <div :style="{width: width || '100%', height: height || 'auto'}">
    <canvas ref="line_chart"></canvas>
  </div>
</template>

<script>
// import Chart from 'chart.js/auto';
import {
  Chart,
  Colors,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js'

Chart.register(
  Colors,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Legend,
  Tooltip,
);

export default {
  props: {
    width: String,
    height: String,
    chartdata: Object,
    options: Object,
  },

  data() {
    return {
      // 
    }
  },

  mounted() {
    const ctx = this.$refs.line_chart
    console.log({ctx})
    new Chart(ctx, {
      type: 'line',
      data: this.chartdata || {},
      options: this.options || {},
    });
  }
}
</script>
