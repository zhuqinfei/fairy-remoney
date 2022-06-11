<template>
  <div class="wrapper" id="wrapper">{{options}}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as ECharts from 'echarts';

@Component
export default class Chart1 extends Vue {
  @Prop() options?:any
  chart?:any

  mounted(){
    if(this.options===undefined){
     return  console.error('options 为空')
    }
    this.chart=ECharts.init(document.getElementById('wrapper') as any)
    this.chart.setOption(this.options)
  }

  @Watch('options')
  onOptionsChange(newvalue:any){
    this.chart.setOption(newvalue)
  }

}
</script>

<style lang="scss" scoped>
 .wrapper{
   height: 340px;
   margin: 20px 0;
 }

</style>