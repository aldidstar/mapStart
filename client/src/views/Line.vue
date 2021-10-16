<template>
  <div id="app">
    <div class="container">
    <h1 class="mb-4">Line Chart</h1>
    <Chart />
  </div>
  </div>
</template>

<script>
import Chart from '../components/LineChart.vue'

export default {
  name: 'app',
  components: {
    Chart
  },

  
}
</script>