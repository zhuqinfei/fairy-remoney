<template>
  <div class="statistics">
<!--    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>-->
      <div class="nav-item">
          <el-date-picker
              v-model="value2"
              type="month"
              placeholder="选择月">
          </el-date-picker>
        <ul class="details">
          <li v-for="item in recordTypeList" :key="item.value"
              class="detail"
              :class="{selected:item.value===type}"
              @click="select(item)">{{item.text}}
            <div v-if="item.value!==type">0.00</div>
            <div class="aa">
              {{totals}}
            </div>
          </li>
        </ul>
      </div>
    <Layout class="statistics-item">
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">
            <span>{{beautify(group.title)}}</span>
            <span class="weeks">{{weeks(group.title)}} </span>
            <span>￥{{group.total.toFixed(2)}}</span>
          </h3>
          <router-link to="">
            <ol>
              <li v-for="item in group.items" :key="item.id" class="record">
                <svg class="icon" aria-hidden="true" >
                  <use :xlink:href="'#icon-'+tagStringName(item.tags)"/>
                </svg>
                <span>{{tagStringValue(item.tags)}}</span>
                <span class="notes">{{item.notes}}</span>
                <span>{{item.type}}{{item.amount.toFixed(2)}}</span>
                <svg class="forward" aria-hidden="true" >
                  <use :xlink:href="'#icon-qianjin'"/>
                </svg>
              </li>
            </ol>
          </router-link>
        </li>
      </ol>
      <div v-else class="noResult">
        目前没有相关记录
      </div>
    </Layout>
    <Nav/>
  </div>
 </template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeLists';
import dayjs  from 'dayjs';
import clone from '@/lib/clone';

type DataSourceItem={text:string,value:string}
@Component({
  components:{Tabs},
})
export default class Statistics extends Vue{
  tagStringValue(tags:Tag){
     return tags.value
  }

  tagStringName(tags:Tag){
    return tags.name
  }

  beautify(string:string){
    const day=dayjs(string)
    const now=dayjs()
    if(day.isSame(now,'day')){
      return '今天'
    }else if(day.isSame(now.subtract(1,'day'),'day')){
      return '昨天'
    }else if(day.isSame(now.subtract(2,'day'),'day')){
      return '前天'
    }else if(day.isSame(now,'year')){
      return day.format('MM月DD日')
    }else{
      return day.format('YYYY年MM月DD日')
    }
  }

  weeks(string:string) {
    const day = parseInt(dayjs(string).format('d'))
    switch (day) {
      case 1:
        return '星期一';
      case 2:
        return '星期二';
      case 3:
        return'星期三';
      case 4:
        return'星期四';
      case 5:
        return '星期五';
      case 6:
        return '星期六';
      case 0:
        return '星期日';
    }
  }

  value2:Date=new Date()

  get recordList(){
    return (this.$store.state as RootState).recordList;
  }

  select(item:DataSourceItem){
     this.type=item.value
  }

 get groupedList(){
    const {recordList}=this

    const newList=clone(recordList)
        .filter(r=>r.type===this.type)
        .filter(r=>dayjs(r.createdAt).format('YYYY年MM月')===dayjs(this.value2.toISOString()).format('YYYY年MM月'))
        .sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
    type Result={title:string,total?:number,items:RecordItem[]}[]
    if(newList.length===0){return [];}
    const result:Result=[{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
    for(let i=1;i<newList.length;i++){
      const current=newList[i]
      const last=result[result.length-1]
      if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
        last.items.push(current)
      }else{
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items:[current]})
      }
    }
     result.map(group=>{
       group.total=group.items.reduce((sum,item)=>sum+item.amount,0)
     })
    return result
  }

  get totals(){
    return this.groupedList.map((group)=>{ return group.total || 0}).reduce((a,b)=>{return a+b},0).toFixed(2)
  }


  beforeCreate(){
      this.$store.commit('fetchRecords')
  }

  type = '-';
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep.el-date-editor{
  border-right: 1px solid #ffffff;
  &.el-input{
    width: 24%;
  }
  >.el-input__prefix{
    margin:-12px 0 0 8px;
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
    padding: 20px 0 0 16px;
    &:focus{
      border:none;
    }
  }
}

 .nav-item{
   display: flex;
   flex-direction: row;
   background: #01c1c6;
   color:#ffffff;
   padding:10px 0;
   >.details{
     display: flex;
     flex-direction: row;
     width: 76%;
     >.detail{
       width:50%;
       font-size: 14px;
       &.detail:nth-child(1){
         padding:8px 0 8px 16px;
         margin:0 8px 0 18px;
       }
       &.detail:nth-child(2){
         padding:8px 0 8px 16px;
         margin:0 16px 0 8px;
       }
       &.selected{
         background: #08abb2;
         -webkit-border-radius: 6px;
         -moz-border-radius: 6px;
         border-radius: 6px;
         border-top-right-radius:30px ;
         color:#ffffff;
         >.aa{
           display: block;
         }
       }
       >.aa{
         display: none;
       }
     }


   }
 }

 .noResult{
    padding:16px;
    text-align: center;
  }
  //::v-deep .type-tabs-item{
  //  background: #c4c4c4;
  //  &.selected{
  //    background: white;
  //    &::after{
  //      display: none;
  //    }
  //  }
  //}
  //::v-deep .interval-tabs-item{
  //  height: 48px;
  //}
  %item{
    padding: 7px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title{
    @extend %item;
    font-size: 13px;
    color:#929395;
    >.weeks{
      margin-right: auto;
      margin-left: 6px;
    }
  }
  .record{
    @extend %item;
    background:white;
    line-height: 40px;
    color:#262626;
    font-size: 15px;
      >.icon {
        width: 2em; height: 2em;
        vertical-align: -0.15em;
        fill: #10dbe1;
        overflow: hidden;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background: #f6f6f6;
        padding:6px;
        margin:5px 6px 0 0;
      }
      >.forward{
        width: 2em; height: 2em;
        vertical-align: -0.15em;
        fill: #e3e3e3;
        padding:5px;
        margin:4px 0 0 0 ;
     }
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
  .statistics{
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #f6f6f6;
    >.statistics-item{
      flex-grow: 1;
      margin:0 10px;
      overflow: auto;
    }
  }
</style>