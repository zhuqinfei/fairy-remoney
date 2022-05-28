<template>
  <div class="account">
    <div class="accountTime">
      <el-date-picker
          v-model="value3"
          type="year"
          placeholder="选择年">
      </el-date-picker>
      <div class="accountTitle">
         <p>账单</p>
      </div>
    </div>
    <Layout class="accountItem">
      <header class="accountShow">
        <div class="totals"
             :class="{selected:(getYearData('+')-getYearData('-')).toFixed(2)<0}">
          {{(getYearData('+')-getYearData('-')).toFixed(2)}}
        </div>
        <div>结余</div>
        <div class="charge">
          <div class="income">收入 {{getYearData('+')}}</div>
          <div class="expenses">支出 {{getYearData('-')}}</div>
        </div>
      </header>
       <main>
          <ul class="title">
            <li class="monthTitle">月份</li>
            <li class="incomeTitle">收入</li>
            <li class="expensesTitle">支出</li>
            <li class="totalsTitle">结余</li>
          </ul>
          <div class="accountContent">
            <ul v-for="(item,index) in month " :key=index class="accountContentItem">
              <li class="common">{{item}}月</li>
              <li class="common">{{getMonData(item,'+')}}</li>
              <li class="common">{{getMonData(item,'-')}}</li>
              <li class="common"
                  :class="{selected:(getMonData(item,'+')-getMonData(item,'-')).toFixed(2)<0}">
                {{(getMonData(item,'+')-getMonData(item,'-')).toFixed(2)}}
              </li>
            </ul>
          </div>
       </main>
    </Layout>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs  from 'dayjs';
import clone from '@/lib/clone';

@Component
export default class Account extends Vue {
  value3:Date=new Date()

  month:number[]=[12,11,10,9,8,7,6,5,4,3,2,1]

  get recordList(){
    return (this.$store.state as RootState).recordList;
  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }

  get getYearList(){
     const {recordList}=this
     return clone(recordList)
         .filter(r=>dayjs(r.createdAt).format('YYYY年')
             === dayjs(this.value3.toISOString()).format('YYYY年'))
  }

   getMonData(value:number,type:string) {
     const newList=this.getYearList
        .filter(r => dayjs(r.createdAt).format('YYYY/MM')
            === dayjs(dayjs(this.value3.toISOString()).format('YYYY')+'-'+value.toString()).format('YYYY/MM'))
        .filter(r=>r.type===type)
     return newList.map(r=>{return r.amount || 0}).reduce((a,b)=>{return a+b},0).toFixed(2)
  }

  getYearData(type:string){
      const newList=this.getYearList.filter(r=>r.type===type)
      return newList.map(r=>{return r.amount || 0}).reduce((a,b)=>{return a+b},0).toFixed(2)
  }


}
</script>

<style lang="scss" scoped>
.account{
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f6f6f6;
  >.accountItem{
    flex-grow:1;
    overflow: auto;
    background: #ffffff;
  }
  >.accountTime{
    background: #01c1c6;
    padding:10px 0;
    display: flex;
    flex-direction: row;
    ::v-deep.el-date-editor{
      &.el-input{
        width: 20%;
      }
      >.el-input__prefix{
        margin:-6px 0 0 44px;
        color:#ffffff;
      }
      >.el-input__suffix{
        display: none;
      }
      >.el-input__inner{
        border:none;
        height: 100%;
        background: #01c1c6;
        color:#ffffff;
        padding: 0 0 0 16px;
        &:focus{
          border:none;
        }
      }
    }
    >.accountTitle{
      color:#ffffff;
      font-size: 18px;
      width:60%;
      text-align: center;
    }
  }
}

.accountShow{
  text-align: center;
  background: #01c1c6;
  color:#ffffff;
  font-size: 14px;
  padding:16px 0;
  >.totals{
    font-size: 26px;

  }
  .selected{
    color:red;
  }
  >.charge{
    display: flex;
    flex-direction: row;
    margin:10px 0 0 0 ;
    >.income,.expenses{
      width: 50%;
      font-size: 16px;
    }
    >.income{
      border-right:1px solid rgba(255, 255, 255,0.3);
    }
  }
}
.title{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #f7f8fc;
  padding:8px 0;
  font-size: 13px;
}
.accountContentItem{
  display: flex;
  flex-direction: row;
  font-size: 13px;
  padding:10px 0;
  border-bottom: 1px solid #e3e3e3;
  text-align: center;
  >.common{
    width: 25%;
  }
  >.selected{
    color:red;
  }
}
</style>