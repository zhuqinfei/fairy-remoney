<template>
  <div class="chart">
    <div class="nav">
      <span class="nav-wrapper">统计</span>
    </div>
    <Layout class="chart-item">
      <div class="block">
        <el-date-picker
            v-model="value2"
            type="month"
            placeholder="选择月">
        </el-date-picker>
      </div>
      <div class="chartDetail">
        <div class="income"
             @click="select('-')"
             :class="{selected:'-'===type}">
          <div class="income-item1">支出</div>
          <div class="income-item2">{{getMonData('-')}}</div>
        </div>
        <div class="expenses"
             @click="select('+')"
             :class="{selected:'+'===type}">
          <div class="expenses-item1">收入</div>
          <div class="expenses-item2">{{getMonData('+')}}</div>
        </div>
      </div>
      <hr class="underline">
      <Chart1 :options="x"/>
    </Layout>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs  from 'dayjs';
import clone from '@/lib/clone';
import Chart1 from '@/components/Chart1.vue'
import recordTypeList from '@/constants/recordTypeLists';
import _ from 'lodash'

@Component({
  components:{Chart1}
})
export default class Chart extends Vue {

  value2:Date=new Date()

  type = '-';
  recordTypeList = recordTypeList;

  chartData:any=[]

  get recordList(){
    return (this.$store.state as RootState).recordList;
  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }

  getMonData(type:string){
    const {recordList}=this
    const newList=clone(recordList)
        .filter(r=>dayjs(r.createdAt).format('YYYY年MM月')
            === dayjs(this.value2.toISOString()).format('YYYY年MM月'))
        .filter(r=>r.type===type)
    return newList.map(r=>{return r.amount || 0}).reduce((a,b)=>{return a+b},0).toFixed(2)
  }

  select(item:string){
    this.type=item
  }

  get x(){
    const {recordList}=this
    const newArray= clone(recordList)
        .filter(r=>dayjs(r.createdAt).format('YYYY年MM月')
            === dayjs(this.value2.toISOString()).format('YYYY年MM月'))
        .filter(r=>r.type===this.type)
        .map(r=>_.pick(r,['tags.value','amount']))

    this.chartData=[]
    const valueArray=Array.from(new Set(newArray.map(r=>r.tags).map(r=>r?.value)))


    for(let i=0;i<valueArray.length;i++){
      //@ts-ignore
      const amountArray= newArray.filter(r=>r.tags.value==valueArray[i])
      const aa=amountArray.map(r=>{return r.amount || 0}).reduce((a,b)=>{return a+b},0).toFixed(2)

      this.chartData.push({value:aa,name:valueArray[i]})
    }

    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: 0,
        left: 'center',
      },
      grid: {
        x:  0,
        y:  0,
        x2: 20,
        y2: 0,
      },
      series: [
        {
          name: '记录为空',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          top:40,
          label: {
            show: true, position: 'inside', textStyle: { color: 'white', fontSize: 12 },

          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
            }
          },
          labelLine: {
            show: false
          },
          data: this.chartData
        }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
.chart{
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f6f6f6;
  >.chart-item{
    flex-grow: 1;
    margin:10px 12px;
    overflow: auto;
    background: #ffffff;
    border-radius: 4px;
  }
  >.nav{
    background: #01c1c6;
    text-align: center;
    padding:10px 0;
    >.nav-wrapper{
      background: #ffffff;
      padding:6px 30px;
      border-radius: 4px;
      color:#01c1c6;
    }
  }
}
.block{
  text-align: center;
  margin:10px 0 15px 0;
  ::v-deep.el-date-editor,el-input{
    text-align: center;
    width: 260px;
    >.el-input__inner{
      border-radius: 30px;
      text-align: center;
      background: #eff0f4;
    }
  }
}
.chartDetail{
  display: flex;
  flex-direction: row;
  >.income{
    width: 50%;
    padding:10px 10px 10px 16px;
    margin:0 10px 20px 20px;
    border-radius: 2px;
    position: relative;
    >.income-item2{
      font-size: 22px;
    }
  }
  >.expenses{
    width: 50%;
    padding:10px 10px 10px 16px;
    margin:0 20px 20px 10px;
    border-radius: 2px;
    position: relative;
    >.expenses-item2{
      font-size: 22px;
    }
  }
  >.selected{
    background: linear-gradient(45deg, #1e5799 0%,#2989d8 0%,#e4f7f9 0%,#f9ffff 100%);
    &:after{
      content: '';
      width: 0; height: 0;
      border-color: #01c1c6 transparent;
      border-width: 18px 0 0 18px;
      border-style: solid;
      position: absolute;
      top:0;
      right: 0;
    }
  }
}
.underline{
  margin: 0 20px;
  border: 1px solid  #f6f6f6;
}
</style>