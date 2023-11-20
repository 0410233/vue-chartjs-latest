<template>
  <div :style="{width: width || '100%', height: height || 'auto'}">
    <canvas ref="line_chart"></canvas>
  </div>
</template>

<script>
// import Chart from 'chart.js/auto';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
  Legend,
  Tooltip,
} from 'chart.js'
import { handleDataChange, handleOptionsChange } from './utils'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
  Legend,
  Tooltip,
);

export default {
  name: 'BarChart',
  
  props: {
    width: String,
    height: String,
    chartData: Object,
    chartOptions: Object,
  },

  data() {
    return {
      chart: null,
      updateTimer: undefined,
    }
  },

  watch: {
    chartData: {
      handler(nextData, prevData) {
        const shouldUpdate = handleDataChange(this.chart, nextData, prevData)
        if (shouldUpdate) {
          this.update()
        }
      },
      deep: true,
    },
    chartOptions: {
      handler(nextOptions, prevOptions) {
        const shouldUpdate = handleOptionsChange(this.chart, nextOptions, prevOptions)
        if (shouldUpdate) {
          this.update()
        }
      },
      deep: true,
    },
  },

  mounted() {
    const ctx = this.$refs.line_chart
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.chartData || {},
      options: this.chartOptions || {},
    });
  },

  beforeDestroy() {
    clearTimeout(this.updateTimer)
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  },

  methods: {
    update() {
      if (this.chart) {
        clearTimeout(this.updateTimer)
        this.updateTimer = setTimeout(() => {
          this.chart.update()
        }, 200);
      }
    }
  }
}
</script>
