<template>
  <Layout class-prefix="layout">
    <NumberPad  @update:value="onUpdateAmount"  @submit="saveRecord"/>

    <div class="notes">
      <el-date-picker class="date"
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
      </el-date-picker>
      <FormItem field-name="备注"
                placeholder="点击写备注..."
                :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="record.tags=$event"
          :type="record.type"/>

      <Tabs :data-source="recordTypeList"
            :value.sync="record.type"/>


  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'

import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component,Watch} from 'vue-property-decorator';
import recordTypeLists from '@/constants/recordTypeLists';
import Tabs from '@/components/Tabs.vue';

@Component(
    {
      components: {Tags, FormItem, Tabs, NumberPad},
      computed:{
        recordList(){
          return this.$store.state.recordList;
        },
      }
    }
)
export default class Money extends Vue {
   get recordList(){
    return this.$store.state.recordList;
  }


  value1:Date= new Date()

  @Watch('value1')
  onChangeValue(newVal:Date){
     console.log(newVal)
     this.record.createdAt=newVal.toISOString()
  }


  recordTypeList=recordTypeLists;

   record:RecordItem={
    tags:{id:'',name:'',value:'',type:''},notes:'',type:'-',amount:0, createdAt:new Date().toISOString()
  };

   created(){
     this.$store.commit('fetchRecords' )
   }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord(){
     if(!this.record.tags){
        return window.alert('请至少选择一个标签')
     }
    this.$store.commit('createRecord',this.record);
    if(this.$store.state.createRecordError===null){
      window.alert('已保存')
      this.record.notes=''
    }
  }
}
</script>


<style lang="scss" scoped>
.layout-content{

}
.notes{
  display: flex;
  flex-direction: row;
  background:#ffffff;
  >.date{
    width: 40%;
  }
}


</style>